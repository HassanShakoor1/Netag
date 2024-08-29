import React, { useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { ref, set, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase'; // Import your firebase configuration
import './Editproductdetail.css';
import edit from '../images/edit.png';

function Editproductdetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    BusinessName:'',
    productName: '',
    price: '',
    size: '',
    color: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId'); // Get the UID from localStorage

  const handleFileChange = (e) => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    imageFiles.forEach((file) => {
      const storageReference = storageRef(storage, `users/${userId}/Brands/${id}/product/${file.name}`);
      uploadBytes(storageReference, file)
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then(url => {
          setImages(prevImages => [...prevImages, url]); // Store the URL
        })
        .catch(error => {
          console.error("Error uploading file:", error);
        });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    setLoading(true);
    const productRef = push(ref(database, `users/${userId}/Brands/${id}/product`)); // Save data under the Brand ID

    console.log('Saving data to:', `users/${userId}/Brands/${id}/product`);
    console.log('Data to save:', {
      ...formData,
      images: images,
    });

    set(productRef, {
      ...formData,
      images: images,
    }).then(() => {
      setLoading(false);
      navigate(-1, { state: { images: images } });
    }).catch(error => {
      setLoading(false);
      console.error("Error saving data:", error);
    });
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
            name="businessName"
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
                width: '100%',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: '#F4F4F4',
              }}
            >
              <img src={edit} style={{ width: "50px",margin:'0px auto' }} alt="Upload" />
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                id="upload-photos"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-photos" style={{ cursor: 'pointer', textAlign: 'center', fontSize: '14px', color: '#a0aec0' }}>
                Upload photo
              </label>
            </div>

            {/* Display first uploaded image */}
            {displayedImages[0] && (
              <div
                style={{
                  flex: '1 1 50%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '1px solid #e2e8f0',
                  width: '100%',
                  height: '150px',
                  borderRadius: '20px',
                  backgroundColor: '#F4F4F4',
                }}
              >
                <img
                  src={displayedImages[0]}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }}
                />
              </div>
            )}
          </div>

          {/* Second Row */}
          <div style={{ display: 'flex', padding: '20px', gap: '10px' }}>
            {/* Display second uploaded image */}
            {displayedImages[1] && (
              <div
                style={{
                  flex: '1 1 50%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '1px solid #e2e8f0',
                  width: '100%',
                  height: '150px',
                  borderRadius: '20px',
                  backgroundColor: '#F4F4F4',
                }}
              >
                <img
                  src={displayedImages[1]}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }}
                />
              </div>
            )}

            {/* Display third uploaded image and 'more' button */}
            {displayedImages[2] && (
              <div
                style={{
                  flex: '1 1 50%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '1px solid #e2e8f0',
                  width: '100%',
                  height: '150px',
                  borderRadius: '20px',
                  backgroundColor: '#F4F4F4',
                }}
              >
                <img
                  src={displayedImages[2]}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }}
                />
                {remainingImagesCount > 0 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    style={{ marginTop: '10px', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: 'red', color: '#fff', cursor: 'pointer' }}
                  >
                    {showAll ? `Show Less (${remainingImagesCount})` : `Show More (${remainingImagesCount})`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:"center",
            width:'80%',
            height:"50px",
            marginTop: '20px',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: 'red',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            margin:'0px auto'
          }}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Editproductdetail;
