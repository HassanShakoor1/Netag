import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import editcontact from '../images/editcontact.png';
import './Edit.css';
import '../App.css';
import nav from '../images/nav.png';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { get, update, ref } from "firebase/database";
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Cropper from './Cropper'; // Import Cropper component

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '1rem',
    width: "100%",
    paddingLeft: "20px",
  },
});

function EditProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [nickname, setNickname] = useState("");
  const [name,setName]=useState("")
  const [imageFile, setImageFile] = useState(null);
  const [imageFile1, setImageFile1] = useState(null);
  const [imgurl, setImgurl] = useState("");
  const [imgurl1, setImgurl1] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for cropped profile image
  const [coverImage, setCoverImage] = useState(null); // State for cropped cover image
  const [cropModal, setCropModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageType, setImageType] = useState("");

  const userId = localStorage.getItem("userId");
 
  const [crop, setCrop] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  const handleclosecropper = () => {
    setCropModal(false);
  }

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }
  
    const userRef = ref(database, `User/${userId}`); // Use userId here
  
    const fetchUserData = async () => {
      try {
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
  
          // Log user data to confirm
          console.log("Fetched User Data:", userData);
  
          // Populate state with user data
          setName(userData.name||"");
          setUsername(userData.username || "");
          setDesignation(userData.designation || "");
          setStatus(userData.materialStatus || "");
          setCompany(userData.companyname || "");
          setNickname(userData.nickname || "");
          
          // Set existing images (if available) in the component's state
          if (userData.profilePicture) {
            setProfileImage(userData.profilePicture);
          }
  
          if (userData.backgroundPicture) {
            setCoverImage(userData.backgroundPicture);
          }
        } else {
          console.log("No user data found for this userId");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [userId]);
  
 
  const handleSave = async () => {
    if (!userId) {
      console.error("No userId found, unable to save data");
      return;
    }
  
    setIsSaving(true);
  
    try {
      // Firebase Storage reference
      const storage = getStorage();
      let profileImageUrl = profileImage;
      let coverImageUrl = coverImage;
  
      // 1. Upload Profile Image if it's a new file
      if (profileImage instanceof File) {
        const profileStorageRef = storageRef(storage, `User/${userId}/profilePicture`);
        await uploadBytes(profileStorageRef, profileImage);
        profileImageUrl = await getDownloadURL(profileStorageRef);
      }
  
      // 2. Upload Cover Image if it's a new file
      if (coverImage instanceof File) {
        const coverStorageRef = storageRef(storage, `User/${userId}/backgroundPicture`);
        await uploadBytes(coverStorageRef, coverImage);
        coverImageUrl = await getDownloadURL(coverStorageRef);
      }
  
      // 3. Prepare data to update
      const updatedData = {
        name:name,
        username: username,
        designation: designation,
        materialStatus: status,
        companyname: company,
        nickname: nickname,
        profilePicture: profileImageUrl,  // Set uploaded profile image URL
        backgroundPicture: coverImageUrl, // Set uploaded cover image URL
      };
  
      // 4. Update user data in Firebase Realtime Database
      const userRef = ref(database, `User/${userId}`);
      await update(userRef, updatedData);
  
      console.log("User data successfully updated!");
  
      // After successful save, navigate or show success message
      setIsSaving(false);
      navigate(-1); // Example: Navigate back to the profile page
    } catch (error) {
      console.error("Error updating user data:", error);
      setIsSaving(false);
    }
  };
  
  
  
  
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
        setImageType(type);
        setCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropImage = (croppedImageBlob) => {
    const file = new File([croppedImageBlob], imageType === "profile" ? "cropped-profile-image.jpg" : "cropped-cover-image.jpg", { type: croppedImageBlob.type });

    if (imageType === "profile") {
      setProfileImage(file);
    } else if (imageType === "cover") {
      setCoverImage(file);
    }
    setCropModal(false);
  };


  
  return (
    <div className="container">
      <div className="edit-profile">
        <nav className='nav'>
          <div className="bck" onClick={() => navigate(-1)}>
            <IoChevronBack />
          </div>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
        </nav>

        <div className="rel-div" style={{ flexDirection: "column" }}>
  <div className='lady' style={ladyStyle}>
    {profileImage ? (
      <div style={{ position: 'relative' }}>
        <img
          style={{ width: '120px', height: '120px', borderRadius: "100%", objectFit: 'cover' }}
          src={typeof profileImage === "string" ? profileImage : URL.createObjectURL(profileImage)}
          alt="Uploaded Lady Image"
        />
        <button onClick={() => setProfileImage(null)} style={crossButtonStyle}>&times;</button>
      </div>
    ) : (
      <img style={imgStyle} src={editcontact} alt="Upload Icon" />
    )}
    <input
      type="file"
      accept="image/*"
      id="lady-img-upload"
      style={{ display: 'none' }}
      onChange={(e) => handleFileChange(e, "profile")}
    />
    {!profileImage && (
      <label htmlFor="lady-img-upload" style={uploadLabelStyle}>Upload Photos</label>
    )}
  </div>

  <div>
    <div className='main-img' style={mainImgStyle}>
      {coverImage ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            style={{ width: '100%', height: '100%', borderRadius:'2rem' }}
            src={typeof coverImage === "string" ? coverImage : URL.createObjectURL(coverImage)}
            alt="Uploaded Main Image"
          />
          <button 
          onClick={() => setCoverImage(null)} 
        style={crossButtonStyle}
          
          >&times;</button>
        </div>
      ) : (
        <img style={uploadIconStyle} src={editcontact} alt="Upload Icon" />
      )}
      <input
        type="file"
        accept="image/*"
        id="main-img-upload"
        style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e, "cover")}
      />
      {!coverImage && (
        <label htmlFor="main-img-upload" style={uploadLabelStyle}>Upload Photos</label>
      )}
    </div>
  </div>
</div>


        <br /><br /><br />

        <div className="input-data">
          <div className="edit-field">
            <CustomTextField label="name" name="name" size="small" value={name} onChange={(e) => setName(e.target.value)} />
            <CustomTextField label="Nickname" name="nickname" size="small" value={nickname} onChange={(e) => setNickname(e.target.value)} />
         
          </div>

          <div className="edit-field">
          <CustomTextField label="username" name="username" size="small" value={username} onChange={(e) => setUsername(e.target.value)} />
            <CustomTextField label="designation" name="designation" size="small" value={designation} onChange={(e) => setDesignation(e.target.value)} />


          </div>

          <div className="edit-field">
          <CustomTextField label="status" name="status" size="small" value={status} onChange={(e) => setStatus(e.target.value)} />
            <CustomTextField label="company" name="company" size="small" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <br /><br /><br /><br />

          <div className="btn-s">
            <button onClick={handleSave} style={saveButtonStyle} className='save2'>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {cropModal && (
        <Cropper
          image={currentImage}
          onClose={handleclosecropper}
          onCrop={handleCropImage}
        />
      )}

    </div>
  );
}


const ladyStyle = {
  top: "131px",
  backgroundColor: "#D9D9D9",
  border: '1px solid grey',
  zIndex: "100",
  objectFit:'cover'
};

const imgStyle = {
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  margin: "2px auto",
  width: "30px",
  marginTop: '1.5rem'

};

const mainImgStyle = {
  width: "100%",
  height: '200px',
 
  backgroundColor: "#D9D9D9",
  marginTop: "1rem",
  display: 'flex',
  justifyContent: 'center',
  objectFit:"cover",
  alignItems: "center",
  flexDirection: 'column',
};

const uploadIconStyle = {
  width: '55px',
  height: '55px',
};

const crossButtonStyle = {
  width: '20px',
  height: '20px',
  borderRadius: '100%',
  display: 'flex',
  color:'red',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  background: "#FFB9B9",
  position: 'absolute',
  top: '5px',
  right: '5px',
  cursor: 'pointer',
  zIndex: 1,
  fontSize:"20px",
}

const uploadLabelStyle = {
  marginTop: "1.1rem",
  cursor: 'pointer',
  color: "grey",
  display: 'flex',
  fontSize:"11px",
  justifyContent:"center",
  alignItems:'center',
  margin:' 1px auto'



};

const saveButtonStyle = {
  marginTop: "20px",
  width:'90%',
  color:"white",
  fontSize:'20px'
};

export default EditProfile;