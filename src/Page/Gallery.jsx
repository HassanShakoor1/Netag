import React, { useState, useEffect } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

function Gallery() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state with images from location or empty array
  const [images, setImages] = useState(location.state?.images || []);

  useEffect(() => {
    // Update images state if location state changes
    setImages(location.state?.images || []);
  }, [location.state?.images]);

  const goback = () => {
    // Navigate back without passing complex objects
    navigate(-1, { state: { images } });
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Save updated images to localStorage or pass them back to the previous page
    localStorage.setItem('images', JSON.stringify(updatedImages));
  
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '430px', width: '100%' }}>
        <div className="back-head" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <IoChevronBack
            onClick={goback}
            className="Gobck"
            style={{ paddingTop: '1.6rem', color: 'red', fontSize: '25px', paddingLeft: '15px', cursor: 'pointer', position: 'absolute', left: '0' }}
          />
          <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100', margin: '0 auto', marginTop: '1rem' }}>
            Product Gallery
          </h4>
        </div>
        <br /><br /><br /><br /><br />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '20px',
            alignItems: 'center',
          }}
        >
          {images.map((imgUrl, index) => (
            <div key={index} style={{ width: '100%', height: 'auto', position: 'relative' }}>
              <img
                src={imgUrl}
                alt={`gallery-img-${index}`}
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              {/* Remove Button */}
              <button
                style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  background: 'transparent',
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
                className="removeButton"
                onClick={() => handleImageRemove(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
