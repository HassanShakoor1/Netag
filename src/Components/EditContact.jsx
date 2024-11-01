import React, { useState, useEffect } from "react";
import "./EditContact.css";
import { IoChevronBack } from "react-icons/io5";
import video from "../images/video.png";
import { useNavigate } from "react-router-dom";
import editcontact from "../images/editcontact.png";
import CircularProgress from "@mui/material/CircularProgress";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {
  getDatabase,
  ref,
  set,
  get,
  remove
 
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase"; // Adjust this import according to your Firebase setup
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

function EditContact() { 
  
 
  
 const [mediaFiles, setMediaFiles] = useState([]);
 const [imageFiles, setImageFiles] = useState([]);
 const [videoFiles, setVideoFiles] = useState([]);
 const [loading, setLoading] = useState(false);
  const [recordid, setRecordid] = useState(null);

  const navigate = useNavigate();
 
  const userId = localStorage.getItem("userId");



  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Change this according to your need
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows:false
  };




  useEffect(() => {
    const auth = getAuth(app);

    const checkAuthAndFetchData = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = localStorage.getItem("userId");

          // Retrieve or generate record ID
          let recordId = localStorage.getItem(`recordid_${userId}`);

          if (!recordId) {
            recordId = Date.now().toString(); // Generate a new record ID
            localStorage.setItem(`recordid_${userId}`, recordId);
          }

          setRecordid(recordId);
          await fetchExistingMediaFiles(recordId); // Fetch media files and set in state
        } else {
          console.error("User is not authenticated.");
          navigate("/login"); // Redirect to login page if not authenticated
        }
      });

      return () => unsubscribe();
    };

    checkAuthAndFetchData();
  }, [navigate, app]);
  const fetchExistingMediaFiles = async (recordId) => {
    const database = getDatabase(app);
    
    // Reference for featuredPhotos and featuredVideos
    const photosRef = ref(database, `User/${userId}/featuredPhotos`);
    const videosRef = ref(database, `User/${userId}/featuredVideos`);
  
    try {
      // Fetch featuredPhotos
      const photosSnapshot = await get(photosRef);
      let existingMediaFiles = [];
  
      if (photosSnapshot.exists()) {
        const existingPhotos = photosSnapshot.val();
        const photosArray = Object.values(existingPhotos);
        existingMediaFiles = existingMediaFiles.concat(photosArray);
        console.log("Fetched photos successfully:", photosArray);
        setImageFiles(photosArray);
      } else {
        console.log("No existing media files found in featuredPhotos.");
      }
  
      // Fetch featuredVideos
      const videosSnapshot = await get(videosRef);
      
      if (videosSnapshot.exists()) {
        const existingVideos = videosSnapshot.val();
        const videosArray = Object.values(existingVideos);
        existingMediaFiles = existingMediaFiles.concat(videosArray);
        console.log("Fetched videos successfully:", videosArray);
        setVideoFiles(videosArray);
      } else {
        console.log("No existing media files found in featuredVideos.");
      }
  
      // Set the combined media files in state
      setMediaFiles(existingMediaFiles);
      
    } catch (error) {
      console.error(`Error fetching media files: ${error.message}`);
      setMediaFiles([]); // Set an empty array in case of error
    }
  };
  

  const handlegoBack = () => {
    navigate("/home");
  };

  const handleImageUpload = async (event) => {
    // Check if recordid is available
    if (!recordid) {
      console.error("Record ID is not available.");
      return;
    }
  
    // Get the uploaded files and filter out image files
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
  
    // Initialize Firebase storage
    const storage = getStorage(app);
    
    // Set loading state to true
    setLoading(true);
  
    // Iterate through the selected image files and upload them
    for (const file of imageFiles) {
      const fileRef = storageRef(storage, `User/${recordid}/${file.name}`);
      try {
        await uploadBytes(fileRef, file); // Upload the file to Firebase Storage
        const url = await getDownloadURL(fileRef); // Get the download URL
        
        // Create a new media file object
        const newMediaFile = { url, type: "image" };
        
        // Update the media files state immediately after uploading
        setMediaFiles((prevFiles) => [...prevFiles, newMediaFile]); 
        
        // Optionally, save media files to your backend or state
        await saveMediaFiles(recordid, [...mediaFiles, newMediaFile]); // You can choose to update this based on your requirement
  
      } catch (error) {
        console.error("Error uploading file:", error); // Handle upload errors
      }
    }
    
    // Set loading state to false after all uploads are complete
    setLoading(false);
  };
  
  

  const handleVideoUpload = async (event) => {
    if (!recordid) {
      console.error("Record ID is not available.");
      return;
    }

    const files = Array.from(event.target.files);
    const videoFile = files.find((file) => file.type.startsWith("video/"));

    if (!videoFile) {
      console.warn("No valid video selected.");
      return;
    }

    if (mediaFiles.filter((file) => file.type === "video").length >= 1) {
      console.warn("You can only upload one video.");
      return;
    }

    const storage = getStorage(app);
    setLoading(true); // Start loading

    const newMediaFiles = [...mediaFiles];
    const fileRef = storageRef(storage, `User/${recordid}/${videoFile.name}`);

    try {
      // Upload the video file
      await uploadBytes(fileRef, videoFile);
      const url = await getDownloadURL(fileRef);
      newMediaFiles.push({ url, type: "video" });
      setMediaFiles([...newMediaFiles]);
      await saveMediaFiles(recordid, newMediaFiles);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  

  

 
  const saveMediaFiles = async (recordid, newMediaFiles) => {
    const database = getDatabase(app);
    const featuredPhotosRef = `User/${userId}/featuredPhotos`;
    const featuredVideosRef = `User/${userId}/featuredVideos`;

    const imageEntries = newMediaFiles
      .filter(media => media.type === "image")
      .map(media => ({
        detail: "",
        id: `${recordid}`,
        imageUrl: media.url,
        title: "",
      }));

    const videoEntries = newMediaFiles
      .filter(media => media.type === "video")
      .map(media => ({
        detail: "Video details here",
        id: `${recordid}`,
        videoUrl: media.url,
        title: "Video Title",
      }));

    try {
      

      if (imageEntries.length > 0) {
        const snapshot = await get(ref(database, featuredPhotosRef));
        const existingFiles = snapshot.val() || {};
        const newImgKey = Object.keys(existingFiles).length;

        for (const entry of imageEntries) {
          const imageFilePath = `${featuredPhotosRef}/${newImgKey}`;
          await set(ref(database, imageFilePath), entry);
        }
        console.log("Images saved successfully");
      }

      if (videoEntries.length > 0) {
        const videoSnapshot = await get(ref(database, featuredVideosRef));
        const existingVideoFiles = videoSnapshot.val() || {};
        const newVideoKey = Object.keys(existingVideoFiles).length;

        for (const entry of videoEntries) {
          const videoFilePath = `${featuredVideosRef}/${newVideoKey}`;
          await set(ref(database, videoFilePath), entry);
        }
        console.log("Videos saved successfully");
      }
    } catch (error) {
      console.error(`Error saving data: ${error.message}`);
    } finally {
      // Step 3: Set loading to false after the upload
    }
  };
  
  

 // Remove image by index and update mediaFiles
const handleRemoveImage = async (recordId) => {
  const updatedMediaFiles = imageFiles.filter((item, index) => index !== recordId);
  const db = getDatabase();
  
  // Assuming each image is stored under its unique key in the featuredPhotos
  const dataRef = ref(db, `User/${userId}/featuredPhotos/${recordId}`);
  
  try {
    // Get the snapshot of the data
    const snapshot = await get(dataRef); // Await for the promise to resolve

    if (snapshot.exists()) {
      // If data exists, remove it
      await remove(dataRef); // Await for the remove operation to complete
      console.log("image deleted successfully!");
    } else {
      console.log("No data available at this path. image not found.");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
  setImageFiles(updatedMediaFiles);
  setMediaFiles(updatedMediaFiles);
  saveMediaFiles(recordId, updatedMediaFiles);
  
};



// Remove all videos from mediaFiles
const handleRemoveVideo = async (recordId) => {
  console.log(recordId);
 
  const updatedMediaFiles = videoFiles.filter((item, index) => index !== recordId);
  const db = getDatabase();
  const dataRef = ref(db, `User/${userId}/featuredVideos/${recordId}`); // Use the correct path for featuredVideos

  try {
    // Get the snapshot of the data
    const snapshot = await get(dataRef); // Await for the promise to resolve

    if (snapshot.exists()) {
      // If data exists, remove it
      await remove(dataRef); // Await for the remove operation to complete
      console.log("Video deleted successfully!");
    } else {
      console.log("No data available at this path. Video not found.");
    }
  } catch (error) {
    console.error("Error deleting video:", error);
  }

  setVideoFiles(updatedMediaFiles);
  setMediaFiles(updatedMediaFiles);
  saveMediaFiles(recordId, updatedMediaFiles); // Ensure `recordId` is used correctly
};




  console.log("video files is", videoFiles);

  return (


    
    <div className="Editcontainer">
      {loading && (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      <CircularProgress />
    </div>
  )}
      <div className="edit-Contact" style={{ marginTop: "20px" }}>
        <nav
          className="nav2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IoChevronBack
            onClick={handlegoBack}
            style={{
              color: "red",
              fontSize: "25px",
              cursor: "pointer",
              position: "absolute",
              left: "0.3rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <p style={{ fontSize: "20px", color: "red", margin: "0" }}>
            Photos and Videos
          </p>
        </nav>

        <br />
      
              <div className="Upload-p">
  <h2>Upload Photo</h2>
  <div className="upload-1">
    <div className="img-btn">
      <img
        style={{
          width: "40px",
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
        }}
        src={editcontact}
        alt="nav-img"
      />
      <input
        type="file"
        multiple
        accept="image/*" // Only accept image files
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
          alignItems: "center",
        }}
        className="save22"
        onClick={() =>
          document
            .querySelector('input[type="file"][accept="image/*"]')
            .click()
        }
      >
        Upload
      </button>
    </div>
  </div>
  
  <div
    className="grid-container"
    style={{ maxWidth: "430px", display: "flex", gap: "10px", flexWrap: "wrap" }}
  >
    {imageFiles.length > 3 ? ( // Check if more than 3 images
      <Slider {...settings} style={{ width: "100%" }}>
        {imageFiles.map((file, index) => (
          <div
            key={index}
            className="grid-item"
            style={{
              position: "relative",
              overflow: "hidden",
              height: '100%',
              maxHeight: "100px",
            }}
          >
            <img
              src={file?.imageUrl}
              alt={`Uploaded ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={crossButtonStyle}
            >
              &times;
            </button>
          </div>
        ))}
      </Slider>
    ) : (
      imageFiles.map((file, index) => (
        <div
          key={index}
          className="grid-item"
          style={{
            position: "relative",
            overflow: "hidden",
            height: '100%',
            maxHeight: "100px",
          }}
        >
          <img
            src={file?.imageUrl}
            alt={`Uploaded ${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <button
            onClick={() => handleRemoveImage(index)}
            style={crossButtonStyle}
          >
            &times;
          </button>
        </div>
      ))
    )}
  </div>
</div>

        <br />
        <br />
      

        <div className="Upload-p">
  <h2>Upload Video</h2>
  <div className="upload-1">
    <div className="img-btn">
      {videoFiles.length > 0 ? (
        videoFiles.map((item, index) => (
          <div style={{ position: "relative" }} key={index}>
          
            <video
              src={item.videoUrl} // Use video URL from videoFiles array
              controls
              style={{
                width: "100%",
                height: "140px",
                borderRadius: "30px",
                objectFit:"cover"
              }}
            />
            <button
              onClick={() => handleRemoveVideo(index)}
              style={crossButtonStyle}
            >
              &times;
            </button>
          </div>
        ))
      ) : (
        <>
          <img
            style={{
              width: "40px",
              display: "block",
              margin: "20px auto",
            }}
            src={video} // Use a placeholder image if needed
            alt="nav-img"
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: "none" }}
            id="video-upload" // Optional: Add an ID for later reference
          />
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px auto",
              alignItems: "center",
            }}
            className="save22"
            onClick={() =>
              document.querySelector('input[type="file"][accept="video/*"]').click()
            }
          >
            Upload
          </button>
        </>
      )}
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

const crossButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "#FFEEEE",
  color: "red",
  border: "none",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "17px",
};

export default EditContact;
