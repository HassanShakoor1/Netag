import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import editcontact from '../images/editcontact.png';
import './Edit.css';
import '../App.css';
import nav from '../images/nav.png';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { getDatabase, ref, update,get } from "firebase/database";
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL ,} from "firebase/storage";

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '1rem',
    width: "100%",
    paddingLeft: "20px",
  },
});

function EditProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [nickname, setNickname] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [imageFile1, setImageFile1] = useState("");
  const [imgurl1, setImgurl1] = useState("");
  const [isSaving, setIsSaving] = useState(false); 

  const userId = localStorage.getItem("userId");
  const parentId = localStorage.getItem("parentId"); // Retrieve parentId

  const handleSave = async () => {
    setIsSaving(true); 
    try {
      if (!userId || !parentId) {
        console.error("No userId or parentId found in localStorage");
        alert("User ID or Parent ID not found. Please log in again.");
        return;
      }
  
      const storage = getStorage(); // Initialize storage
      const userRef = ref(database, `User/${parentId}`); // Reference path includes parentId and userId
  
      // Retrieve existing user data
      const userSnapshot = await get(userRef);
      const existingData = userSnapshot.val() || {};
  
      let ImageUrl = [...(existingData.profilePicture ? [existingData.profilePicture] : [])];
      let BackgroundImageUrl = [...(existingData.backgroundPicture ? [existingData.backgroundPicture] : [])];
  
      try {
        // Handle profile image upload
        if (imageFile) {
          const imageRef = storageRef(storage, `images/${userId}/${imageFile.name}`); // Store images under user-specific folder
          await uploadBytes(imageRef, imageFile);
          console.log("Profile image uploaded successfully");
  
          const url = await getDownloadURL(imageRef);
          ImageUrl[0] = url; // Update profile image URL
        }
  
        // Handle cover image upload
        if (imageFile1) {
          const imageRef1 = storageRef(storage, `images/${userId}/${imageFile1.name}`); // Store images under user-specific folder
          await uploadBytes(imageRef1, imageFile1);
          console.log("Cover image uploaded successfully");
  
          const url1 = await getDownloadURL(imageRef1);
          BackgroundImageUrl[0] = url1; // Update cover image URL
        }
  
        // Save or update user data with the parentId and userId as references
        await update(userRef, {
          username: username || existingData.username,
          designation: designation || existingData.designation,
          materialStatus: status || existingData.materialStatus,
          companyname: company || existingData.companyname,
          nickname: nickname || existingData.nickname,
          profilePicture: ImageUrl[0] || existingData.profilePicture, // Profile image URL
          backgroundPicture: BackgroundImageUrl[0] || existingData.backgroundPicture, // Cover image URL
          id: userId // Save the userId for reference
        });
  
        alert("Data saved successfully!");
        navigate('/home');
  
      } catch (error) {
        console.error("Error uploading images or saving data:", error);
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred:", error);
    } finally {
      setIsSaving(false);
    }
  };
  

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile1(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgurl1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImgurl("");  // Clear the image URL to remove the displayed image
    setImageFile(null);  // Clear the file state if needed
  };
  
  const handleRemoveImagemain = () => {
    setImgurl1("");  // Clear the image URL to remove the displayed image
    setImageFile1(null);  // Clear the file state if needed
  };

  return (
    <div className="container">
      <div className="edit-profile">
        <nav className='nav'>
          <div className="bck" onClick={() => navigate(-1)}>
            <IoChevronBack />
          </div>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
        </nav>

        <div className="rel-div" style={{ flexDirection: "column" }}>
          <div className='lady' style={ladyStyle}>
            {imgurl ? (
              <div style={{ position: 'relative' }}>
                <img
                  style={{ width: '100px', height: '100px', borderRadius: "100%", objectFit: 'cover' }}
                  src={imgurl}
                  alt="Uploaded Lady Image"
                />
                <button onClick={handleRemoveImage}  style={crossButtonStyle}>&times;</button>
              </div>
            ) : (
              <img style={imgStyle} src={editcontact} alt="Upload Icon" />
            )}
            <input
              type="file"
              accept="image/*"
              id="lady-img-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange1}
            />
            {!imgurl && (
              <label htmlFor="lady-img-upload" style={uploadLabelStyle}>Upload Photos</label>
            )}
          </div>

          <div>
            <div className='main-img' style={mainImgStyle}>
              {imgurl1 ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={imgurl1}  // Fixed: use cover state here
                    alt="Uploaded Main Image"
                  />
                  <button onClick={handleRemoveImagemain} style={crossButtonStyle}>&times;</button>
                </div>
              ) : (
                <img style={uploadIconStyle} src={editcontact} alt="Upload Icon" />
              )}
              <input
                type="file"
                accept="image/*"
                id="main-img-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                 
              
              />
              {!imgurl1 && (
                <label htmlFor="main-img-upload" style={uploadLabelStyle}>Upload Photos</label>
              )}
            </div>
          </div>
        </div>

        <br /><br /><br />

        <div className="input-data">
          <div className="edit-field">
            <CustomTextField label="UserName" name="username" size="small" onChange={(e) => setUsername(e.target.value)} />
            <CustomTextField label="Designation" name="designation" size="small" onChange={(e) => setDesignation(e.target.value)} />
          </div>

          <div className="edit-field">
            <CustomTextField label="Material Status" name="status" size="small" onChange={(e) => setStatus(e.target.value)} />
            <CustomTextField label="Company" name="company" size="small" onChange={(e) => setCompany(e.target.value)} />
          </div>

          <div className="edit-field">
            <CustomTextField label="Nickname" name="nickname" size="small" onChange={(e) => setNickname(e.target.value)} />
          </div>

          <br /><br /><br /><br />
          
          <div className="btn-s">
          <button onClick={handleSave} style={saveButtonStyle} className='save2'>
      {isSaving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
  

const ladyStyle = {
  top: "131px",
  backgroundColor: "#D9D9D9",
  border: '1px solid grey',
  zIndex: "100",
  objectFit:'cover'
};

const imgStyle = {
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  margin: "2px auto",
  width: "30px",
  marginTop: '1rem'
};

const mainImgStyle = {
  width: "100%",
  height: '300px',
  backgroundColor: "#D9D9D9",
  marginTop: "1rem",
  display: 'flex',
  justifyContent: 'center',
  objectFit:"cover",
  alignItems: "center",
  flexDirection: 'column',
};

const uploadIconStyle = {
  width: '55px',
  height: '55px',
};

const crossButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  background: '#FFEEEE',
  color: 'red',
  border: 'none',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize:'17px'
};

const uploadLabelStyle = {
  marginTop: "1.1rem",
  cursor: 'pointer',
  color: "grey",
  display: 'flex',
  fontSize:"11px",
  justifyContent:"center",
  alignItems:'center',
  margin:' 1px auto'



};

const saveButtonStyle = {
  marginTop: "20px",
  width:'90%',
  color:"white",
  fontSize:'20px'
};

export default EditProfile;
