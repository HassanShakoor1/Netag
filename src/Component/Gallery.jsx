import React from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';

function Gallery() {
  const navigate = useNavigate();
  const location = useLocation();
  const images = location.state?.images || []; // Retrieve images from location state

  const goback = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '430px', width: '100%' }}>
        <div style={{ paddingLeft: '1rem' }} className="back-head">
          <IoChevronBack 
            onClick={goback} 
            className="Gobck" 
            style={{ paddingTop: "1.6rem", color: "red", fontSize: '25px', paddingLeft: '15px', cursor: "pointer" }} 
          />
          <h4 style={{ color: "red", fontSize: '20px', fontWeight: '100', marginRight: "132px" }}>
            Product category
          </h4>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '20px',
            alignItems: 'center',
          }}
        >
          {images.map((img, index) => (
            <div key={index} style={{ width: '100%', height: 'auto' }}>
              <img 
                src={URL.createObjectURL(img)} 
                alt={`gallery-img-${index}`} 
                style={{ 
                  width: '100%', 
                  height: '100px', 
                  objectFit: 'cover',
                  borderRadius: '10px' 
                }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
