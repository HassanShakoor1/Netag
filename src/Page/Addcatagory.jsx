import React, { useState } from 'react';
import './Addcatagory.css';
import { IoChevronBack } from "react-icons/io5";
import editcontact from '../images/editcontact.png';
import { useNavigate } from 'react-router-dom';
import { ref, set, push } from "firebase/database";
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

function Addcatagory() {
  const navigate = useNavigate();
  const storage = getStorage();
  const [imge, setImage] = useState(null);
  const [formData, setFormData] = useState({
    brandName: '',
    brandDescription: '',
    brandImage: null,
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        brandImage: file
      }));
      const imgurl = URL.createObjectURL(file);
      setImage(imgurl);
    }
  }

  const removeImage = () => {
    setImage(null);
    setFormData((prevData) => ({
      ...prevData,
      brandImage: null
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (formData.brandName && formData.brandDescription && formData.brandImage) {
      const newBrandRef = push(ref(database, 'Brands'));
      const brandId = newBrandRef.key;
  
      const imageRef = storageRef(storage, `Brands/${brandId}/${formData.brandImage.name}`);
  
      try {
        // Upload the image to Firebase Storage
        await uploadBytes(imageRef, formData.brandImage);
        const imageUrl = await getDownloadURL(imageRef);
  
        // Save the brand data to Firebase Realtime Database
        await set(newBrandRef, {
          brandName: formData.brandName,
          brandDescription: formData.brandDescription,
          brandImageUrl: imageUrl
        });
  
        // Show success alert
        alert("Brand data saved successfully!");
  
        // Navigate back after successful upload
        navigate(-1); 
      } catch (error) {
        console.error("Error uploading brand data: ", error);
        alert("Error saving data. Please try again."); // Show error alert
      }
    } else {
      alert("Please fill in all fields and upload an image."); // Alert if fields are missing
    }
  };
  
  const goback=()=>{
    navigate(-1)

  }

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
    display: imge ? 'block' : 'none',
  };

  return (
    <div className='AddcatagoryContainer'>
      <div className="Addcatagory-design"> 
        <div className="back-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IoChevronBack  onClick={goback} className="Gobck" style={{ paddingTop: '1.6rem', color: 'red', fontSize: '25px', cursor: 'pointer' }} />
          <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100', position: 'absolute', left: '50%', transform: 'translateX(-50%)', marginTop: "3rem" }}>
            Product category
          </h4>
          <div style={{ width: '25px' }}></div>
        </div>

        <h3 style={{ color: 'red', fontWeight: '100', paddingLeft: '15px', fontSize: '20px' }}>Product</h3>
        <div className="name-input">
          <p style={{ paddingLeft: '15px', marginTop: "0px", marginBottom: "7px" }}>Name</p>
          <input
            style={{ width: "92%", borderRadius: "20px", height: '30px', backgroundColor: '#F7F7F7', border: "none",paddingLeft:'20px' }}
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

        {imge ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img style={{ width: '100%', borderRadius: '5%',maxHeight:'200px' }} src={imge} alt="Uploaded" />
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
        )}

        <br />
        <button
          style={{ width: "100%", color: "white", fontSize: "17px", height: '50px', margin: '0', marginTop: "30px" }}
          className='save'
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Addcatagory;
