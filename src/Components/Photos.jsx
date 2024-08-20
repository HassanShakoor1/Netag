import React, { useState } from 'react';
import '../App.css';

function Photos() {
  const [images, setImages] = useState([]); // State to hold the uploaded images

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]); // Add new images without limiting
  };

  return (
    <div className='profile-design'>
      <div className="p-vContainer">
        <div className="data" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='head' style={{ fontSize: '22px', fontWeight: '100', color: 'rgb(238, 2, 0)',padding:'10px', margin: '0px' }}>
            Photos:
          </h2>
        </div>
        <br /><br />

        <div className="rows" style={{ display: 'flex', flexWrap: 'wrap',padding:'10px' }}>
          {images.slice(0, 3).map((image, index) => (
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
                marginRight: index < 3 ? '5px' : '0px', // Apply margin only to the first two columns
              }}
            >
              <img
                src={image}
                alt={`Uploaded ${index}`}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        {images.slice(3).map((image, index) => (
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
            <img
              src={image}
              alt={`Uploaded ${index + 3}`}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}


        <label htmlFor="file-upload" style={{
          display: images.length >= 9 ? 'none' : 'block', // Hide label if 9 images are uploaded
          width: '95%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin:'0px auto',
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
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }} // Hide the actual file input
        />
      </div>

    </div>
  );
}

export default Photos;
