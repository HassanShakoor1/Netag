import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import editcontact from '../images/editcontact.png';
import './Edit.css';
import '../App.css';
import nav from '../images/nav-img.png';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { ref, set } from "firebase/database";
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '1rem',
    width: "100%",
    paddingLeft: "20px",
  },
});

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    designation: '',
    status: '',
    company: '',
    nickname: '',
    ladyImgUrl: '',
    mainImgUrl: ''
  });

  const [files, setFiles] = useState({
    ladyImg: null,
    mainImg: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const removeImage = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${type}ImgUrl`]: ''
    }));
    setFiles((prevFiles) => ({
      ...prevFiles,
      [`${type}Img`]: null
    }));
  };

  const handleFileChange = async (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    if (file) {
      if (id === 'lady-img-upload') {
        setFiles((prevFiles) => ({ ...prevFiles, ladyImg: file }));
        const ladyImgUrl = await uploadImage(file);
        setFormData((prevData) => ({ ...prevData, ladyImgUrl }));
      } else if (id === 'main-img-upload') {
        setFiles((prevFiles) => ({ ...prevFiles, mainImg: file }));
        const mainImgUrl = await uploadImage(file);
        setFormData((prevData) => ({ ...prevData, mainImgUrl }));
      }
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageReference = storageRef(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageReference, file);
    return getDownloadURL(storageReference);
  };

  // Saveing data to firebase 

  const handleSave = async () => {
    try {
      const userId = Date.now().toString();
      const userRef = ref(database, `User/${userId}`);

      const updatedData = {
        ...formData,
        ladyImgUrl: files.ladyImg ? formData.ladyImgUrl : formData.ladyImgUrl,
        mainImgUrl: files.mainImg ? formData.mainImgUrl : formData.mainImgUrl
      };

      await set(userRef, updatedData);
      alert("Data saved successfully!");

      localStorage.setItem('userId', userId);
      localStorage.setItem('profileData', JSON.stringify(updatedData));

      navigate('/home'); // Redirect to profile page after saving
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="edit-profile">
        <nav className='nav'>
          <div className="bck" onClick={handleBack}>
            <IoChevronBack />
          </div>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
        </nav>

        <div className="rel-div" style={{ flexDirection: "column" }}>
          <div className='lady' style={ladyStyle}>
            {formData.ladyImgUrl ? (


              <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', objectFit: 'cover' }} >

                <img style={
                  { width: '100px', height: '100px', borderRadius: "100%", objectFit: 'cover' }
                }
                  className="main-img"

                  src={formData.ladyImgUrl}
                  alt="Uploaded Lady Image"
                />


                <button
                  style={crossButtonStyle}
                  onClick={() => removeImage('lady')}
                >
                  &times;
                </button>
              </div>



            ) : (
              <img style={imgStyle} src={editcontact} alt="Upload Icon" />

            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="lady-img-upload"
              onChange={handleFileChange}
            />
            {!formData.ladyImgUrl && (
              <label
                htmlFor="lady-img-upload"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '60px',
                  fontSize: '8px',
                  marginTop: '8px',
                  color: '#4A5568',
                
                  height: '27px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '0px',
                  margin: '2px auto'
                }}
              >
                Upload Photos
              </label>
            )}


          </div>

          <div >

            <div className='main-img' style={mainImgStyle}>
              {formData.mainImgUrl ? (


                <div style={{ width: '100%', height: '-webkit-fill-available', }}>
                  <img style={{

                    objectFit: 'cover',
                    width: '100%',
                    height: '-webkit-fill-available',

                  }} src={formData.mainImgUrl} alt="Uploaded Main Image" />
                  <button
                    style={crossButtonStyle}
                    onClick={() => removeImage('main')}
                  >
                    &times;
                  </button>
                </div>


              ) : (
          
                <img style={{
                  display: "flex",
                  justifyContent: 'center',
                  flexDirection:'column',
                  alignItems: 'center',
                  margin: "0px auto",
                  width: "70px",
                
                }} src={editcontact} alt="Upload Icon" />
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="main-img-upload"
                onChange={handleFileChange}
              />
              {!formData.mainImgUrl && (
                <label
                  htmlFor="main-img-upload"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #e2e8f0',
                    width: '90px',
                    fontSize: '10px',
                    color: '#4A5568',
                    height: '27px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    margin: '0px auto'
                  
                  }}
                >
                  Upload Photos
                </label>
              )}
            </div>




          </div>
        </div>

        <br /><br /><br />

        <div className="input-data">
          <div className="edit-field">
            <CustomTextField
              label="UserName"
              name="username"
              value={formData.username}
              onChange={handleChange}
              size="small"
            />

            <CustomTextField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              size="small"
            />
          </div>

          <div className="edit-field">
            <CustomTextField
              label="Material Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              size="small"
            />

            <CustomTextField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              size="small"
            />
          </div>
          <div className="edit-field">
            <CustomTextField
              label="Nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              size="small"
            />
          </div>

          <br /><br /><br /><br />
          <div className="btn-s">
            <button style={saveButtonStyle} className='save2' onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ladyStyle = {
  top: "131px",
  backgroundColor: "#D9D9D9",
  border: '1px solid grey'
};

const imgStyle = {
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  margin: "2px auto",
  width: "30px",
  marginTop:'1rem'
};

const mainImgStyle = {
  width: "100%",
  height: '300px',
  backgroundColor: "#D9D9D9",
  marginTop: '3rem'
};

const saveButtonStyle = {
  color: 'white',
  fontSize: "20px",
  width: "92%"
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
  cursor: 'pointer'
};

export default EditProfile;