import React, { useState } from 'react';
import '../App.css';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../firebase'; // Ensure app is correctly imported

function Photos() {
  const [mediaFiles, setMediaFiles] = useState([]); // State to hold the uploaded media files (images and videos)

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const mediaUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.includes('video') ? 'video' : 'image',
    }));
    setMediaFiles((prevMedia) => [...prevMedia, ...mediaUrls]); // Add new media without limiting
  };

  const handleSave = async () => {
    const database = getDatabase(app);
    const newDoc = ref(database, 'PhotosVideos');
    
    // Prepare the data to be saved
    const mediaData = {
      id: newDoc.key, // Use the key of the new document
      selectedImages: mediaFiles.filter((media) => media.type === 'image').map((media) => media.url),
      videosUri: mediaFiles.filter((media) => media.type === 'video').map((media) => media.url),
      uid: localStorage.getItem('userId'), // Ensure userId is correctly set in localStorage
    };

    try {
      await set(newDoc, mediaData);
      alert('Data saved successfully');
    } catch (error) {
      alert(`Error saving data: ${error.message}`);
    }
  };

  return (
    <div className='profile-design'>
      <div className="p-vContainer">
        <div className="data" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='head' style={{ fontSize: '22px', fontWeight: '100', color: 'rgb(238, 2, 0)', padding: '10px', margin: '0px' }}>
            Photos & Videos:
          </h2>
          <button onClick={handleSave} style={{ margin: '10px', padding: '5px 10px' }}>Save</button>
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
                marginRight: index < 2 ? '5px' : '0px', // Apply margin only to the first two columns
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
            key={index + 3} // Adjust key to avoid duplication
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
          display: mediaFiles.length >= 9 ? 'none' : 'block', // Hide label if 9 media files are uploaded
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
        }}>
          +Add
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*" // Allow both images and videos
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }} // Hide the actual file input
        />
      </div>
    </div>
  );
}

export default Photos;
