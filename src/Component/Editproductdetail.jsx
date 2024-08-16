import React, { useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { set, ref as dbRef, push } from 'firebase/database';
import { storage, database } from '../firebase'; // import Firebase Realtime Database
import './Editproductdetail.css';
import edit from '../images/edit.png';

function Editproductdetail() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    size: '',
    color: '',
    description: ''
  });
  const [showAll, setShowAll] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    // Upload images to Firebase Storage
    const uploadPromises = imageFiles.map(async (file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    // Update local state with Firebase Storage URLs
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const saveData = async () => {
    // Extract URLs without the 'images/' prefix
    const sanitizedImageUrls = images.map(url => {
      return url.split('/').pop(); // Keeps only the file name from the URL
    });

    const productData = {
      ...formData,
      images: sanitizedImageUrls, // Include sanitized image URLs in the product data
      timestamp: new Date().toISOString()
    };

    // Save to Firebase Realtime Database
    const newProductRef = push(dbRef(database, 'products'));
    await set(newProductRef, productData);

    alert("Data saved");
    console.log("Data saved to Realtime Database with key:", newProductRef.key);
    setFormData({
      productName: '',
      price: '',
      size: '',
      color: '',
      description: ''
    });
    setImages([]);
  };

  const goToGallery = () => {
    navigate('/gallery', { state: { images: images } });
  };

  const displayedImages = showAll ? images : images.slice(0, 3);
  const remainingImagesCount = images.length - 3;


  return (
    <div className='newContainer'>
      <div className="new-details-design">
        <div style={{ paddingLeft: '1rem' }} className="back-head">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="Gobck"
            style={{ paddingTop: "1.6rem", color: "red", fontSize: '25px', paddingLeft: '15px', cursor: "pointer" }}
          />
          <h4 style={{ color: "red", fontSize: '20px', fontWeight: '100', marginRight: "132px" }}>
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
                value={formData.productName}
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
                value={formData.price}
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
                value={formData.size}
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
                value={formData.color}
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
          value={formData.description}
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
                  <img
                    src={displayedImages[1]}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              )}
            </div>

            {/* Third Uploaded Image + 'More' Button */}
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
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={displayedImages[2]}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                  {remainingImagesCount > 0 && (
                    <button
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={goToGallery}
                    >
                      +{remainingImagesCount} more
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          onClick={saveData}
        >
          Save Details
        </button>
      </div>
    </div>
  );
}

export default Editproductdetail;
