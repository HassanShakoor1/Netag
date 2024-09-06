import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import editcontact from '../images/editcontact.png';
import './Edit.css';
import '../App.css';
<<<<<<< HEAD
import nav from '../images/nav-img.png';
import { TextField, useForkRef } from '@mui/material';
import { styled } from '@mui/system';
import { ref, set,push, onValue } from "firebase/database";
=======
import nav from '../images/nav.png';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { getDatabase, ref, set,push, update } from "firebase/database";
>>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Cropper from './Cropper'; // Import your Cropper component

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
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [imageFile1, setImageFile1] = useState("");
  const [imgurl1, setImgurl1] = useState("");
  const [isSaving, setIsSaving] = useState(false); 

const userId=localStorage.getItem("userId")
console.log(userId)

const handleSave = async () => {
  setIsSaving(true); 
  try {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("No userId found in localStorage");
      alert("User ID not found. Please log in again.");
      return;
    }

<<<<<<< HEAD
  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageReference = storageRef(storage, `${file.name}/${Date.now()}`);
    await uploadBytes(storageReference, file);
    return getDownloadURL(storageReference);
  };


  const userId = localStorage.getItem('userId');
  console.log(userId)
  // Saveing data to firebase 
  const handleSave = async () => {
    try {
      
  
      if (!userId) {
        // If no userId is in localStorage, create a new record
        const userRef = ref(database, `Users/${userId}`);
        const newUserRef = push(userRef);
        
        const updatedData = {
          ...formData,
          ladyImgUrl: files.ladyImg ? await uploadImage(files.ladyImg) : formData.ladyImgUrl,
          mainImgUrl: files.mainImg ? await uploadImage(files.mainImg) : formData.mainImgUrl,
        };
  
        await set(newUserRef, updatedData);
        localStorage.setItem('userId', newUserRef.key); // Save new userId to localStorage
  
      } else {
        // If userId exists, update the existing record
        const userRef = ref(database, `usersdata/${userId}`);
        
        const updatedData = {
          ...formData,
          ladyImgUrl: files.ladyImg ? await uploadImage(files.ladyImg) : formData.ladyImgUrl,
          mainImgUrl: files.mainImg ? await uploadImage(files.mainImg) : formData.mainImgUrl,
        };
  
        await set(userRef, updatedData);
=======
    const storage = getStorage(); // Initialize storage
    const userRef = ref(database, `User/${userId}`); // Reference path includes userId

    let ImageUrl = [];
    try {
      // Handle profile image upload
      if (imageFile) {
        const imageRef = storageRef(storage, `images/${userId}/${imageFile.name}`); // Store images under user-specific folder
        await uploadBytes(imageRef, imageFile);
        console.log("Profile image uploaded successfully");

        const url = await getDownloadURL(imageRef);
        ImageUrl.push(url);
>>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503
      }

      // Handle cover image upload
      if (imageFile1) {
        const imageRef1 = storageRef(storage, `images/${userId}/${imageFile1.name}`); // Store images under user-specific folder
        await uploadBytes(imageRef1, imageFile1);
        console.log("Cover image uploaded successfully");

        const url1 = await getDownloadURL(imageRef1);
        ImageUrl.push(url1);
      }

      // Save or update user data with the userId as a reference
      await update(userRef, {
        username: username,
        designation: designation,
        status: status,
        company: company,
        nickname: nickname,
        profile: ImageUrl[0] || "", // Profile image URL
        cover: ImageUrl[1] || "",   // Cover image URL
        uid: userId                 // Save the userId for reference
      });

      alert("Data saved successfully!");
<<<<<<< HEAD
      navigate('/home');
  
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // getting data from firebase 

  const getData=async()=>{
    const data=uRef(db,`Users/${userId}`)
    onValue(data,async (snapShot)=>{
      let fetchedData= await snapShot.val()
      console.log(fetchedData)
    


    })
  }

  // update data to firebase 

  const updateData=async()=>{
     
    
  }
  

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(()=>{
    getData()
  },[])

  // useEffect(()=>{
  //   const signin=async()=>{
         
  //     try {
  //       // const credential=await signInWithEmailAndPassword(auth,email,password)
  //       // const user=credential.user
  
  //       // localStorage.setItem("userId",user?.uid)
  
  //       const dbref=ref(db,`users/${localStorage.getItem("userId")}`)
       
        
      
  //        const snap=await get(dbref)
  //        const data= await snap.val()
  //        console.log(data)
  //        const data2=data.isCompany 
  //        setnavigatedata(data2)
        
     
  //       // setcompany(data.isCompany)
  //       // localStorage.setItem("iscompany",data?.isCompany)
      
     
    
  
  //       // navigate("/home")
        
  //       // const userid=localStorage.getItem("iscompany")
        
  //   // userid? <Navigate to="/edit-profile"/> : <Navigate to="/create" />
  //   if (navigatedata === false) {
  //     navigate('/home')
  //   } 
  
  // // else {
  // //   navigate('/home')
  // // }
        
  //   // console.log(userid)
 
  //     } catch (error) {
  //       console.log(error)
  //     }
    
  //   }
  //   signin()
  // },[navigatedata])

console.log(formData)
=======
      navigate('/home')

    } catch (error) {
      console.error("Error uploading images or saving data:", error);
      alert("Error: " + error.message);
    }
  } catch (error) {
    console.log("An unexpected error occurred:", error);
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

>>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503

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
  zIndex: "100"
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
  alignItems: "center",
  flexDirection: 'column',
};

const uploadIconStyle = {
  width: '55px',
  height: '55px',
};

const crossButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'rgba(255, 255, 255, 0.7)',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '24px',
  color: 'red',
  width: '25px',
  height: "25px",
};

const uploadLabelStyle = {
  marginTop: "1rem",
  cursor: 'pointer',
  color: "grey",
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
};

const saveButtonStyle = {
  marginTop: "20px",
  width:'90%',
  color:"white",
  fontSize:'20px'
};

export default EditProfile;
