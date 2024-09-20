import React, { useState, useEffect } from 'react';
import './EditContact.css';
import { IoChevronBack } from "react-icons/io5";
import video from '../images/video.png';
import { useNavigate } from 'react-router-dom';
import editcontact from '../images/editcontact.png';
import { getDatabase, ref, set, update, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'; // Adjust this import according to your Firebase setup
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function EditContact() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [recordid, setRecordid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);

        const checkAuthAndFetchData = async () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userId = localStorage.getItem('userId');

                    // Retrieve or generate record ID
                    let recordId = localStorage.getItem(`recordid_${userId}`);

                    if (!recordId) {
                        recordId = Date.now().toString(); // Generate a new record ID
                        localStorage.setItem(`recordid_${userId}`, recordId);
                    }

                    setRecordid(recordId); // Set the record ID in state
                    await fetchExistingMediaFiles(recordId);
                } else {
                    console.error('User is not authenticated.');
                    navigate('/login'); // Redirect to login page if not authenticated
                }
            });

            return () => unsubscribe();
        };

        checkAuthAndFetchData();
    }, [navigate]);

    const fetchExistingMediaFiles = async (recordid) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const currentUid = localStorage.getItem('userId');

        if (!currentUid) {
            console.log("User is not authenticated.");
            return;
        }

        const database = getDatabase(app);
        const recordRef = ref(database, `PhotosVideos/${recordid}`);

        try {
            const snapshot = await get(recordRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.uid === currentUid) {
                    const combinedMediaFiles = [
                        ...(data.selectedImages || []).map(url => ({ url, type: 'image' })),
                        ...(data.videosUri || []).map(url => ({ url, type: 'video' })),
                    ];
                    setMediaFiles(combinedMediaFiles);
                } else {
                    console.log("This record does not belong to the current user.");
                    setMediaFiles([]);
                }
            } else {
                console.log('No data found for the provided record ID.');
                setMediaFiles([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMediaFiles([]);
        }
    };

    const handlegoBack = () => {
        navigate('/home');
    };

    const handleImageUpload = async (event) => {
        if (!recordid) {
            console.error('Record ID is not available.');
            return;
        }

        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (mediaFiles.filter(file => file.type === 'image').length + imageFiles.length > 4) {
            console.warn('You can only upload up to 4 images.');
            return;
        }

        const storage = getStorage(app);
        const newMediaFiles = [...mediaFiles];

        for (const file of imageFiles) {
            const fileRef = storageRef(storage, `PhotosVideos/${recordid}/${file.name}`);
            try {
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                newMediaFiles.push({ url, type: 'image' });
                setMediaFiles([...newMediaFiles]);
                await saveMediaFiles(recordid, newMediaFiles); // Pass record ID
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleVideoUpload = async (event) => {
        if (!recordid) {
            console.error('Record ID is not available.');
            return;
        }

        const files = Array.from(event.target.files);
        const videoFile = files.find(file => file.type.startsWith('video/'));

        if (!videoFile) {
            console.warn('No valid video selected.');
            return;
        }

        if (mediaFiles.filter(file => file.type === 'video').length >= 1) {
            console.warn('You can only upload one video.');
            return;
        }

        const storage = getStorage(app);
        const newMediaFiles = [...mediaFiles];

        const fileRef = storageRef(storage, `PhotosVideos/${recordid}/${videoFile.name}`);
        try {
            await uploadBytes(fileRef, videoFile);
            const url = await getDownloadURL(fileRef);
            newMediaFiles.push({ url, type: 'video' });
            setMediaFiles([...newMediaFiles]);
            await saveMediaFiles(recordid, newMediaFiles); // Pass record ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const saveMediaFiles = async (existingRecordId, newMediaFiles) => {
        const database = getDatabase(app);
        let recordId = existingRecordId || Date.now().toString(); // Generate a new record ID if not provided
        const recordRef = ref(database, `PhotosVideos/${recordId}`);

        const mediaData = {
            id: recordId,
            uid: localStorage.getItem('userId'),
            selectedImages: newMediaFiles.filter((media) => media.type === 'image').map((media) => media.url),
            videosUri: newMediaFiles.filter((media) => media.type === 'video').map((media) => media.url),
        };

        try {
            if (mediaData.selectedImages.length === 0 && mediaData.videosUri.length === 0) {
                await remove(recordRef);
                console.log('Main record deleted as no media files are left.');
                return;
            }

            const snapshot = await get(recordRef);
            if (snapshot.exists()) {
                await update(recordRef, mediaData);
                console.log('Data updated successfully');
            } else {
                await set(recordRef, mediaData);
                localStorage.setItem(`recordid_${localStorage.getItem('userId')}`, recordId); // Save the new record ID in localStorage
                console.log('Data saved successfully');
            }
        } catch (error) {
            console.error(`Error saving data: ${error.message}`);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedMediaFiles = mediaFiles.filter((_, i) => i !== index);
        setMediaFiles(updatedMediaFiles);
        saveMediaFiles(recordid, updatedMediaFiles); // Pass record ID
    };

    const handleRemoveVideo = () => {
        const updatedMediaFiles = mediaFiles.filter(file => file.type !== 'video');
        setMediaFiles(updatedMediaFiles);
        saveMediaFiles(recordid, updatedMediaFiles); // Pass record ID
    };
    return (
        <div className="Editcontainer">
            <div className="edit-Contact" style={{marginTop:"20px"}}>
                <nav className='nav2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <IoChevronBack
                        onClick={handlegoBack}
                        style={{ color: "red", fontSize: "25px", cursor: 'pointer', position: 'absolute', left: '0.3rem', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <p style={{ fontSize: '20px', color: 'red', margin: '0' }}>
                        Photos and Videos
                    </p>
                </nav>

                <br />
                <div className="Upload-p">
                    <h2>Upload Photo</h2>
                    <div className="upload-1">
                        <div className="img-btn">
                            {mediaFiles.filter(file => file.type === 'image').length < 4 ? (
                                <>
                                    <img style={{ width: "40px", display: "flex", justifyContent: "center", margin: "20px auto" }} src={editcontact} alt="nav-img" />
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*" // Only accept image files
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        style={{ display: "flex", justifyContent: "center", margin: "20px auto", alignItems: "center" }}
                                        className='save22'
                                        onClick={() => document.querySelector('input[type="file"][accept="image/*"]').click()}
                                    >
                                        Upload
                                    </button>
                                </>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <img src={mediaFiles.filter(file => file.type === 'image')[3].url} alt="Last uploaded" style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "30px" }} />
                                    <button
                                        onClick={() => handleRemoveImage(mediaFiles.findIndex(file => file.type === 'image' && file.url === mediaFiles.filter(file => file.type === 'image')[3].url))}
                                        style={crossButtonStyle}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid-container" style={{ maxWidth: '430px', display: 'flex', gap: '10px' }}>
  {mediaFiles
    .filter((file) => file.type === 'image')
    .slice(0, 3)
    .map((file, index) => (
      <div
        key={index}
        className="grid-item"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: 'calc(33% - 30px)', // Ensures equal width with the gap considered
        height: '90px',
          
        
      
        }}
      >
        <img
          src={file.url}
          alt={`Uploaded ${index}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
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
</div>


                </div>
<br /><br />
                <div className="Upload-p">
                    <h2>Upload Video</h2>
                    <div className="upload-1">
                        <div className="img-btn">
                            {mediaFiles.filter(file => file.type === 'video').length === 0 ? (
                                <>
                                    <img style={{ width: "40px", display: "flex", justifyContent: "center", margin: "20px auto" }} src={video} alt="nav-img" />
                                    <input
                                        type="file"
                                        accept="video/*" // Only accept video files
                                        onChange={handleVideoUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        style={{ display: "flex", justifyContent: "center", margin: "20px auto", alignItems: "center" }}
                                        className='save22'
                                        onClick={() => document.querySelector('input[type="file"][accept="video/*"]').click()}
                                    >
                                        Upload
                                    </button>
                                </>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <video src={mediaFiles.find(file => file.type === 'video').url} controls style={{ width: "100%", height: "140px", borderRadius: "30px" }} />
                                    <button
                                        onClick={handleRemoveVideo}
                                        style={crossButtonStyle}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const crossButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: '#FFEEEE',
    color: 'red',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize:'17px'
};

export default EditContact;
