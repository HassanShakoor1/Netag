
import React, { useState, useEffect } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { ref, set, push, get, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase'; // Import your firebase configuration
import './Editproductdetail.css';
import edit from '../images/edit.png';
import { FaTimes } from 'react-icons/fa';

function Editproductdetail() {
  const navigate = useNavigate();
  const { id, productid } = useParams();
  console.log("categoryid from params:", id);
  console.log("productid from params:", productid);

  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    categoryid: '',
    categoryname: '',
    color: [],
    description: '',
    imgurl: [],
    price: '',
    productid: '',
    productname: '',
    size: '',
    uid: localStorage.getItem('userId')
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productid) {
      const fetchProductData = async () => {
        try {
          const productRef = ref(database, `/Products/${productid}`);
          const snapshot = await get(productRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setFormData({
              ...data,
              productid,
              categoryid: data.categoryid, // Ensure this matches your form structure
            });
            setImages(data.imgurl || []);
          } else {
            console.log('No data found for product:', productid);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      fetchProductData();
    }
  }, [productid]);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('images'));
    if (savedImages) {
      setImages(savedImages);
      localStorage.removeItem('images');
    }
  }, []);

  const show = () => {
    setShowAll(prev => !prev);
    navigate('/gallery', { state: { images: images } });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const imageUrls = [];
    
    for (const file of imageFiles) {
      const storageReference = storageRef(storage, file.name);
      try {
        const snapshot = await uploadBytes(storageReference, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    
    setImages(prevImages => [...prevImages, ...imageUrls]);
    setFormData(prevData => ({ ...prevData, imgurl: [...prevData.imgurl, ...imageUrls] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleColorChange = (e) => {
    const color = e.target.value.split(',').map(color => color.trim()).filter(color => color.length > 0);
    setFormData(prevData => ({ ...prevData, color }));
  };

  const addColor = () => {
    setFormData(prevData => ({
      ...prevData,
      color: [...prevData.color, ''] // Add an empty string for the new color
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (productid) {
        console.log("Update called with product ID:", productid);
        console.log("Form data for update:", formData);

        const updatedFormData = {
          ...formData,
          productid: productid,  // Ensure productid is included
        };

        const productRef = ref(database, `/Products/${productid}`);
        await update(productRef, {
          ...updatedFormData,
          imgurl: images,
        });
      } else {
        console.log("Create called");
        const newProductRef = push(ref(database, `/Products`));
        const recordKey = newProductRef.key;

        const updatedFormData = {
          ...formData,
          productid: recordKey,   // Set the new product ID
          categoryid: id,         // Ensure categoryid is included
          imgurl: images,
        };

        console.log("Form data for create:", updatedFormData);

        await set(newProductRef, updatedFormData);
        
        setFormData(updatedFormData);
      }

      navigate(-1, { state: { images: formData.imgurl } });
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = (index) => {
    setImages(prevImages => {
      // Create a new array with the image at the specified index removed
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };


  const remainingImagesCount = images.length - 3;
  const displayedImages = showAll ? images : images.slice(0, 3);

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
            name="categoryname"
            value={formData?.categoryname}
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
                name="productname"
                value={formData?.productname}
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
                value={formData?.price}
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
                value={formData?.size}
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
                name="color"
                placeholder='Add colors, separated by commas'
                value={formData.color}
                onChange={handleColorChange}
              />
              <div style={{position:'relative',width:'100%'}}>
                 <button
                onClick={addColor}
                style={{ marginTop: '10px', borderRadius: '20px', border: 'none', backgroundColor: 'red', color: 'white',width:'50px',height:"20px",position:'absolute',right:30,}}
              >
              Add
              
              </button>
              </div>
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
    position: 'relative', // Added for button positioning
  }}
>
  <img
    src={displayedImages[0]}
    alt="Uploaded"
    style={{
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '10px',
    }}
  />
  
  {/* Remove button */}
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
      top: '5px', // Adjust positioning if needed
      right: '5px',
      cursor: 'pointer',
      zIndex: 1,
    }}
    className="removeButton"
    onClick={() => handleImageRemove(displayedImages)}
  >
    <FaTimes />
  </button>
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
    position: 'relative', // Added for button positioning
  }}
>
  <img
    src={displayedImages[1]}
    alt="Uploaded"
    style={{
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '10px',
    }}
  />

  {/* Remove button */}
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
      top: '5px', // Adjust positioning if needed
      right: '5px',
      cursor: 'pointer',
      zIndex: 1,
    }}
    className="removeButton"
    onClick={() => handleImageRemove(displayedImages)} // Add your image remove function here
  >
    <FaTimes />
  </button>
</div>


            )}

            {/* Display third uploaded image and 'more' button */}
            {displayedImages[2] && (
              <div
  style={{
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #e2e8f0',
    width: '100%',
    height: '150px',
    borderRadius: '20px',
    backgroundColor: '#F4F4F4',
    position: 'relative', // For positioning the remove button
  }}
>
  <div
    style={{
      width: '100%',
      height: '100%',
      background: remainingImagesCount >= 0 ? 'black' : 'black',
      opacity: remainingImagesCount >= 1 ? '0.4' : '1',
      borderRadius: '15px',
      position: 'relative',
    }}
  >
    <img
      src={displayedImages}
      alt="Uploaded"
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '10px',
        position: 'relative',
        right: '-20px',
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
      onClick={() => handleImageRemove(displayedImages[2])} // Remove the image
    >
      <FaTimes />
    </button>
  </div>

  {remainingImagesCount > 0 && (
    <button
      onClick={show}
      style={{
        marginTop: '10px',
        padding: '10px',
        borderRadius: '20px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        position: 'absolute',
        marginLeft: '40px',
        background: 'transparent',
        color: 'red',
        fontWeight: '700',
      }}
    >
      {showAll
        ? `Show Less (${remainingImagesCount})`
        : `Show More (${remainingImagesCount})`}
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