import React, { useState, useEffect } from 'react';
import './EditContact.css';
import { IoChevronBack } from "react-icons/io5";
import video from '../images/video.png';
import { useNavigate } from 'react-router-dom'; 
import editcontact from '../images/editcontact.png';
import { getDatabase, ref, set, update, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'; // Adjust this import according to your Firebase setup
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

function EditContact() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [recordid, setRecordid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch or create record ID
        let id = localStorage.getItem('recordid');
        if (!id) {
            id = uuidv4();
            localStorage.setItem('recordid', id);
        }
        setRecordid(id);

        // Fetch existing media files
        if (id) {
            fetchExistingMediaFiles(id);
        }
    }, []);

    const fetchExistingMediaFiles = async (id) => {
        const database = getDatabase(app);
        const userRef = ref(database, `PhotosVideos/${id}`);

        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Combine images and videos into mediaFiles state
                const combinedMediaFiles = [
                    ...(data.selectedImages || []).map(url => ({ url, type: 'image' })),
                    ...(data.videosUri || []).map(url => ({ url, type: 'video' })),
                ];
                setMediaFiles(combinedMediaFiles);
            } else {
                console.log('No existing data found.');
            }
        } catch (error) {
            console.error('Error fetching existing data:', error);
        }
    };

    const handlegoBack = () => {
        navigate('/home');
    };

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        const storage = getStorage(app);
        const newMediaFiles = [...mediaFiles];

        for (const file of files) {
            const fileRef = storageRef(storage, `PhotosVideos/${file.name}`);
            try {
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                const mediaFile = { url, type: file.type.includes('video') ? 'video' : 'image' };
                newMediaFiles.push(mediaFile);
                setMediaFiles([...newMediaFiles]);
                await saveMediaFiles(newMediaFiles);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const saveMediaFiles = async (newMediaFiles) => {
        if (!recordid) {
            console.error('Record ID is not available.');
            return;
        }

        const database = getDatabase(app);
        const userRef = ref(database, `PhotosVideos/${recordid}`);

        const mediaData = {
            selectedImages: newMediaFiles.filter((media) => media.type === 'image').map((media) => media.url),
            videosUri: newMediaFiles.filter((media) => media.type === 'video').map((media) => media.url),
            uid: 'someUserId', // Replace with actual userId if needed
            id: recordid,
        };

        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                await update(userRef, mediaData);
                console.log('Data updated successfully');
            } else {
                await set(userRef, mediaData);
                console.log('Data saved successfully');
            }
        } catch (error) {
            console.error(`Error saving data: ${error.message}`);
        }
    };

    return (
        <div className="Editcontainer">
            <div className="edit-Contact">
                <nav className='nav2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
                    <IoChevronBack 
                        onClick={handlegoBack} 
                        style={{ color: "red", fontSize: "25px", cursor: 'pointer', position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
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
                            <img style={{ width: "40px", display: "flex", justifyContent: "center", margin: "20px auto" }} src={editcontact} alt="nav-img" />
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <button
                                style={{ display: "flex", justifyContent: "center", margin: "20px auto", alignItems: "center" }}
                                className='save22'
                                onClick={() => document.querySelector('input[type="file"]').click()}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                    <div className="grid-container">
                        {mediaFiles.filter((file) => file.type === 'image').map((file, index) => (
                            <div key={index} className="grid-item">
                                <img src={file.url} alt={`Uploaded ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: "20px" }} className="Upload-p">
                    <h2>Upload Videos</h2>
                    <div className="upload-1">
                        <div className="img-btn">
                            <img style={{ width: "40px", display: "flex", justifyContent: "center", margin: "20px auto", paddingTop: "5px" }} src={video} alt="nav-img" />
                            <input
                                type="file"
                                multiple
                                accept="video/*" // Ensure only video files are selectable
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <button
                                style={{ display: "flex", justifyContent: "center", margin: "20px auto", alignItems: "center" }}
                                className='save22'
                                onClick={() => document.querySelector('input[type="file"]').click()}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                    <div className="grid-container">
                        {mediaFiles.filter((file) => file.type === 'video').map((file, index) => (
                            <div key={index} className="grid-item">
                                <video width="100%" height="auto" controls>
                                    <source src={file.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
                <br /><br />
            </div>
        </div>
    );
}

export default EditContact;
