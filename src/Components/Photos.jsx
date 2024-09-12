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
  const recordId = localStorage.getItem('recordid');
const navigate=useNavigate();

useEffect(() => {
  if (userId) {
    const database = getDatabase(app);
    const userRef = ref(database, `/PhotosVideos`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("photos data", data);
          // Find the specific record associated with the current userId
          const userRecord = Object.keys(data).map(key => {
            const record = data[key];
            if (record.uid === userId) {
              return {
                id: recordid,
                ...record
              };
            }
            return null; // or handle records that don't match
          }).filter(record => record !== null); 
          console.log(userRecord);
          if (userRecord.length > 0) {
            const record = userRecord[0]; // Use the first record or filter based on your needs
            setRecordid(record.id); // Set the record ID for further use
            const images = record.selectedImages || [];
            const videos = record.videosUri || [];
            const mediaUrls = [
              ...images.map((url) => ({ url, type: 'image' })),
              ...videos.map((url) => ({ url, type: 'video' })),
            ];
            setMediaFiles(mediaUrls);
          } else {
            console.log('No record found for this user.');
          }
        } else {
          console.log('No data found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}, [userId]);



 

 
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
