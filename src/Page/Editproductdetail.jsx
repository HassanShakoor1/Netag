import React, { useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './Editproductdetail.css';
import edit from '../images/edit.png';

function Editproductdetail() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);


  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    // Update local state with image URLs
    const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const goToGallery = () => {
    navigate('/gallery', { state: { images: images } });
  };

  const displayedImages = showAll ? images : images.slice(0, 3);
  const remainingImagesCount = images.length - 3;

  return (
    <div className='newContainer'>
      <div className="new-details-design">
        <div className="back-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingLeft: '1rem' }}>
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="Gobck"
            style={{ paddingTop: '1.6rem', color: 'red', fontSize: '25px', paddingLeft: '15px', cursor: 'pointer', position: 'absolute', left: '0' }}
          />
          <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100', marginTop: "3rem" }}>
            Product category
          </h4>
        </div>

        <div style={{ margin: '20px' }} className="headings">
          <h4 style={{ paddingLeft: "1rem", color: 'red', fontWeight: '100', fontSize: "20px" }}>
            Business details
          </h4>
          <h5 style={{ margin: 'auto', paddingLeft: '1rem', fontWeight: '100', fontSize: "15px" }}>
            Business Name
          </h5>
          <input
            style={{ paddingTop: '0px', paddingBottom: '0px', width: '100%', height: "40px", border: 'none', borderRadius: "17px", backgroundColor: '#F7F7F7' }}
            type="text"
            placeholder='Enter business name'
           // Adding value to avoid uncontrolled input warning
            onChange={handleInputChange}
          />
        </div>

        <h3 style={{ paddingLeft: '1rem', margin: '20px', color: "red", fontWeight: '300', fontSize: '20px' }}>
          Product Details
        </h3>

        <div className="formContainer">
          <div className="formRow">
            <div className="formColumn">
              <label style={{ paddingLeft: "10px", fontWeight: '100' }} className="formHeading">
                Product name
              </label>
              <input
                style={{ borderRadius: '20px', backgroundColor: "#F7F7F7", width: "90%" }}
                type="text"
                className="formInput"
                placeholder='Hair oil'
                name="productName"
              
                onChange={handleInputChange}
              />
            </div>
            <div className="formColumn">
              <label style={{ paddingLeft: "10px", fontWeight: '100' }} className="formHeading">
                Price
              </label>
              <input
                style={{ borderRadius: '20px', backgroundColor: "#F7F7F7", width: "90%" }}
                type="text"
                className="formInput"
                placeholder='$44'
                name="price"
           
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div style={{ marginTop: '20px' }} className="formRow">
            <div className="formColumn">
              <label style={{ paddingLeft: "10px", fontWeight: '100' }} className="formHeading">
                Size
              </label>
              <input
                style={{ borderRadius: '20px', backgroundColor: "#F7F7F7", width: "90%" }}
                type="text"
                className="formInput"
                placeholder='Small'
                name="size"
               
                onChange={handleInputChange}
              />
            </div>
            <div className="formColumn">
              <label style={{ paddingLeft: "10px", fontWeight: '100' }} className="formHeading">
                Color
              </label>
              <input
                style={{ borderRadius: '20px', backgroundColor: "#F7F7F7", width: '90%' }}
                type="text"
                className="formInput"
                placeholder='Green'
                name="color"
               
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <br />
        <label style={{ paddingLeft: "10px", marginLeft: '1.7rem', fontWeight: '100', lineHeight: '2' }} className="formHeading">
          Description
        </label>
        <input
          style={{ borderRadius: '20px', marginLeft: '1.7rem', backgroundColor: "#F7F7F7", width: '90%', paddingBottom: '7rem', outline: "none" }}
          type="text"
          className="formInput"
          placeholder='Please enter your product details.......'
          name="description"
     
          onChange={handleInputChange}
        />

        <div>
          {/* First Row */}
          <div style={{ display: 'flex', padding: '20px', gap: '10px' }}>
            {/* File Input */}
            <div
              style={{
                flex: '1 1 50%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                border: '1px solid #e2e8f0',
                alignItems: 'center',
                width: '100%',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: '#F4F4F4',
              }}
            >
              <img src={edit} style={{ width: "50px" }} />
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                id="upload-photos"
                onChange={handleFileChange}
              />
              <label
                htmlFor="upload-photos"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #e2e8f0',
                  width: '110px',
                  fontSize: '10px',
                  marginTop: '8px',
                  color: '#4A5568',
                  height: '27px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Upload Photos
              </label>
            </div>
            {/* First Uploaded Image */}
            <div style={{ flex: '1 1 50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {displayedImages[0] && (
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '20px',
                    backgroundColor: '#F4F4F4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={displayedImages[0]}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div style={{ display: 'flex', padding: '20px', gap: '10px' }}>
            {/* Second Uploaded Image */}
            <div style={{ flex: '1 1 50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {displayedImages[1] && (
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '20px',
                    backgroundColor: '#F4F4F4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img                    src={displayedImages[1]}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              )}
            </div>
            {/* Third Uploaded Image */}
            <div style={{ flex: '1 1 50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {displayedImages[2] && (
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '20px',
                    backgroundColor: '#F4F4F4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={displayedImages[2]}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                  {remainingImagesCount > 0 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '5px',
                    }}>
                      +{remainingImagesCount}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
         
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
            margin: '20px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
  Save Data
        </button>
      </div>
    </div>
  );
}

export default Editproductdetail;

                   
