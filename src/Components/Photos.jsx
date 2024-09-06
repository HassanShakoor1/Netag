import React, { useState, useEffect } from 'react';
import '../App.css';
import { getDatabase, ref, set, update, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Photos() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [recordid, setRecordid] = useState(null);
  const userId = localStorage.getItem('userId');
const navigate=useNavigate();


  useEffect(() => {
    if (recordid) {
      const database = getDatabase(app);
      const userRef = ref(database, `PhotosVideos/${recordid}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const images = data.selectedImages || [];
            const videos = data.videosUri || [];
            const mediaUrls = [
              ...images.map((url) => ({ url, type: 'image' })),
              ...videos.map((url) => ({ url, type: 'video' })),
            ];
            setMediaFiles(mediaUrls);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [recordid]);


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
      uid: userId,
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

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const storage = getStorage(app);
    const newMediaFiles = [...mediaFiles];

    for (const file of files) {
      const fileRef = storageRef(storage, `PhotosVideos/${file.name}`);
      try {
        await uploadBytes(fileRef, file); // Upload the file to Firebase Storage
        const url = await getDownloadURL(fileRef); // Get the download URL of the uploaded file
        const mediaFile = { url, type: file.type.includes('video') ? 'video' : 'image' };
        newMediaFiles.push(mediaFile);
        setMediaFiles([...newMediaFiles]); // Update state with new media files
        await saveMediaFiles(newMediaFiles); // Save to Firebase immediately after uploading
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  const handleImagemove=()=>{
    navigate('/home/editimage')
  }

  
  return (
    <div className='profile-design'>
      <div className="p-vContainer">
        <div className="data" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='head' style={{ fontSize: '22px', fontWeight: '100', color: 'rgb(238, 2, 0)', padding: '10px', margin: '0px' }}>
            Photos & Videos:
          </h2>
        </div>

        <div className="rows" style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
          {mediaFiles.slice(0, 3).map((media, index) => (
            <div
              className="column"
              key={index}
              style={{
                width: '30%',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                marginRight: index < 2 ? '5px' : '0px',
              }}
            >
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt={`Uploaded ${index}`}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          ))}
        </div>

        {mediaFiles.slice(3).map((media, index) => (
          <div
            className="column"
            key={index + 3}
            style={{
              width: '95%',
              height: '100px',
              margin: '10px auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt={`Uploaded ${index + 3}`}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
              />
            ) : (
              <video
                src={media.url}
                controls
                style={{ width: '100%', objectFit: 'contain' }}
              />
            )}
          </div>
        ))}

        <label htmlFor="file-upload" style={{
          display: mediaFiles.length >= 9 ? 'none' : 'block',
          width: '95%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0px auto',
          backgroundColor: '#EFEFEF',
          color: '#747474',
          fontWeight: 'bold',
          cursor: 'pointer',
          textAlign: 'center',
          borderRadius: '12px',
        }}  onClick={handleImagemove}>

          +Add
        </label>
        {/* <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          multiple
         
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        /> */}
      </div>
    </div>
  );
}

export default Photos;
