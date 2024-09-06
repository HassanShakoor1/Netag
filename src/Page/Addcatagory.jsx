import React, { useState, useEffect } from 'react';
import './Addcatagory.css';
import { IoChevronBack } from "react-icons/io5";
import editcontact from '../images/editcontact.png';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get, update, push, set } from "firebase/database";
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { useTranslation } from 'react-i18next';

function Addcatagory() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    brandName: '',
    brandDescription: '',
    brandImage: null,
    id: '',
    UserId: localStorage.getItem("userId"),
  });

  useEffect(() => {
    // Fetch existing data if `id` is provided
    const fetchData = async () => {
      if (id) {
        const brandRef = ref(database, `ProductCategory/${id}`);
        const snapshot = await get(brandRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setFormData({
            brandName: data.name || '', // Ensure this matches your database field
            brandDescription: data.description || '', // Ensure this matches your database field
            existingImageUrl: data.imageurl || '', // Ensure this matches your database field
            brandImage: null, // Ensure that new image is not set by default
          });
          // Set the image state to display the existing image
          setImage(data.imageurl || null);
        } else {
          console.log("No data found for the provided ID.");
        }
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    try {
      let brandImageUrl = formData.existingImageUrl; // Start with the existing image URL
  
      if (formData.brandImage) {
        // Upload the new image if selected
        const imageRef = storageRef(storage, `ProductCategory/${Date.now()}_${formData.brandImage.name}`);
        await uploadBytes(imageRef, formData.brandImage);
        brandImageUrl = await getDownloadURL(imageRef); // Fetch the new image URL
      }
  
      if (id) {
        // Update existing record
        const brandRef = ref(database, `ProductCategory/${id}`);
        const updatedData = {
          name: formData.brandName,
          description: formData.brandDescription,
          imageurl: brandImageUrl, // Use the correct image URL
        };
  
        await update(brandRef, updatedData);
        alert("Brand data updated successfully!");
      } else {
        // Create a new record
        const newBrandRef = ref(database, `ProductCategory`);
        const newBrandRefWithKey = push(newBrandRef);
        const recordKey = newBrandRefWithKey.key;

        const newRecord = {
          name: formData.brandName,
          description: formData.brandDescription,
          imageurl: brandImageUrl, // Correctly set the image URL
          categoryid: recordKey,
          uid: userId,
        };
  
        await set(newBrandRefWithKey, newRecord);
        alert("New brand data added successfully!");
      }
  
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Error handling brand data: ", error);
      alert("Error handling data. Please try again.");
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        brandImage: file,
        existingImageUrl: '', // Clear the existing URL when a new file is selected
      }));
      const imgurl = URL.createObjectURL(file);
      setImage(imgurl); // Set the preview for the selected image
    }
  };
  
  const removeImage = () => {
    setImage(null); // Clear the displayed image
    setFormData((prevData) => ({
      ...prevData,
      brandImage: null,
      existingImageUrl: '', // Clear the existing image URL
    }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goback = () => {
    navigate(-1);
  };

  const crossButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    display: image ? 'block' : 'none',
  };

  return (
    <div className='AddcatagoryContainer'>
      <div className="Addcatagory-design"> 
        <div className="back-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IoChevronBack onClick={goback} className="Gobck" style={{ paddingTop: '1.6rem', color: 'red', fontSize: '25px', cursor: 'pointer' }} />
          <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100', position: 'absolute', left: '50%', transform: 'translateX(-50%)', marginTop: "3rem" }}>
            Product category
          </h4>
          <div style={{ width: '25px' }}></div>
        </div>

        <h3 style={{ color: 'red', fontWeight: '100', paddingLeft: '15px', fontSize: '20px' }}>Product</h3>
        <div className="name-input">
          <p style={{ paddingLeft: '15px', marginTop: "0px", marginBottom: "7px" }}>Name</p>
          <input
            style={{ width: "92%", borderRadius: "20px", height: '30px', backgroundColor: '#F7F7F7', border: "none", paddingLeft: '20px' }}
            type="text"
            placeholder='Oil Brand'
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
          />
        </div>
        <br />

        <div className="name-input2">
          <p style={{ paddingLeft: '15px', marginTop: "0px", marginBottom: "7px" }}>Description</p>
          <textarea
            style={{ width: "98%", borderRadius: "20px", backgroundColor: '#F7F7F7', outline: "none", border: "none", paddingBottom: "100px", paddingTop: "10px" }}
            placeholder="Type your message here..."
            className="custom-textarea"
            name="brandDescription"
            value={formData.brandDescription}
            onChange={handleInputChange}
          />
        </div>
        <br />

        {image ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img style={{ width: '100%', borderRadius: '5%', maxHeight: '200px' }} src={image} alt="Uploaded" />
            <button
              style={crossButtonStyle}
              onClick={removeImage}
            >
              &times;
            </button>
          </div>
        ) : (
          <div className="AddCatagory-img" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={editcontact} style={{ width: "50px" }} alt="Edit contact"/>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-photos"
              onChange={handleFile}
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
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '8px 5px',
                fontWeight: '700',
                color: 'grey'
              }}
            >
              Add Photo
            </label>
          </div>
        )}
        
        <br />
        <div className="AddProduct">
          <button
            onClick={handleSubmit}
            style={{ width: "99%", marginTop: '30px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '20px', height: '50px',cursor:'pointer' }}
          >
            {id ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addcatagory;
