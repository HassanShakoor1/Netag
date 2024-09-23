import React, { useState, } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import editcontact from '../images/editcontact.png';
import './Edit.css';
import '../App.css';
import nav from '../images/nav.png';
import { TextField, useForkRef } from '@mui/material';
import { styled } from '@mui/system';
import Cropper from './Cropper'; // Import Cropper component
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import { database as db,storage } from "../firebase.jsx"
import { get, ref as sRef, push, onValue, set, update } from "firebase/database"


const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '1rem',
        width: "100%",
        paddingLeft: "20px",
    },
});

function CreateNewProfile() {
   

    const navigate = useNavigate();

    const {id}=useParams()

    const [username, setusername] = useState('')
    const [designation, setdesignation] = useState('')
    const [status, setstatus] = useState('')
    const [company, setcompany] = useState('')
    const [name, setName] = useState('')

   
    const [profileName, setprofileName] = useState('')
    const [selected, setSelected] = useState(false)

    const [profileImage, setprofileImage] = useState(null)
    const [DisplayProfileImageUrl,setDisplayProfileImageUrl] = useState("")
const [nickname,setNickname]=useState("")
    const [dpImage, setdpImage] = useState(null)
    const [DisplayDpImageUrl,setDisplayDpImageUrl] = useState("")
    const [cropModal, setCropModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [imageType, setImageType] = useState("");
  


    const handleclosecropper = () => {
        setCropModal(false);
      }
      const handleCropImage = (croppedImageBlob) => {
        const file = new File([croppedImageBlob], imageType === "profile" ? "cropped-profile-image.jpg" : "cropped-cover-image.jpg", { type: croppedImageBlob.type });
    
        if (imageType === "profile") {
            setprofileImage(file); // This will be used for uploading
            setDisplayProfileImageUrl(URL.createObjectURL(file)); // Show the cropped image
        } else if (imageType === "cover") {
            setdpImage(file); // This will be used for uploading
            setDisplayDpImageUrl(URL.createObjectURL(file)); // Show the cropped image
        }
    
        setCropModal(false); // Close the cropping modal
    };
    

     {/* -----------for displaying dpimage---------------  */} 
    // function handlefileChangeForProfile(event,type) {
    //     const file = event.target.files[0]
    //     if (file) {
    //         setprofileImage(file)
    //          // Create a local URL for immediate display
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setDisplayProfileImageUrl(reader.result);
    //             setCurrentImage(reader.result);
    //             setImageType(type);
    //             setCropModal(true);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }
      {/* -----------for removing dp image ---------------  */}
    // const removeProfileImage = () => {
    //     setprofileImage(null)
    //     setDisplayProfileImageUrl(""); // Clear image URL
    // };



    {/* -----------for displaying Profile image---------------  */} 
    // function handlefileChangeForDp(event,type) {
    //     const file = event.target.files[0]
    //     if (file) {
    //         setdpImage(file) 
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setDisplayDpImageUrl(reader.result);
    //             setCurrentImage(reader.result);
    //             setImageType(type);
    //             setCropModal(true);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    //     }
 {/* -----------for removing profile image ---------------  */}
    // function removeDpImage() {
    //     setdpImage(null)
    //     setDisplayDpImageUrl("")
    // }


    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentImage(reader.result);
                setImageType(type);
                setCropModal(true);
            };
            reader.readAsDataURL(file);
        }
    };
    const removeImage = (type) => {
        if (type === "profile") {
            setprofileImage(null);
            setDisplayProfileImageUrl('');
        } else {
            setdpImage(null);
            setDisplayDpImageUrl('');
        }
    };





    {/*   --------------checking if record is present in firebase for updating*--------------*/ }
  console.log(id)
    useEffect(()=>{
        if(!id) return
        const checkForUpdate=async()=>{

        const dataRef=sRef(db,`User/${id}`)
        const snapshot=await get(dataRef)
        const data=await snapshot.val()
        console.log(data)
        
        setusername(data.username)
        setdesignation(data.designation)
        setstatus(data.materialStatus)
        setcompany(data.companyname)
        setprofileName(data.profileUrl)
        setNickname(data.nickname)
        setDisplayProfileImageUrl(data.backgroundPicture)
        setDisplayDpImageUrl(data.profilePicture)
        setName(data.name)

        }
        checkForUpdate()
    },[id])
    

    {/*   --------------saving data to firebase if not already present in firebase otherwise updating-------------- */ }
    const handleSave = async () => {
        // Validation to ensure all required fields are present
       
    
        try {
            console.log("id", id);
    
            // Common variables for image URLs
            let newProfileImageUrl = DisplayProfileImageUrl;
            let newDisplayDpImageUrl = DisplayDpImageUrl;
    
            // Upload profile image if selected
            if (profileImage) {
                const profileImageRef = storageRef(storage, `profiles/${profileImage.name}`);
                const uploadResult = await uploadBytes(profileImageRef, profileImage);
                newProfileImageUrl = await getDownloadURL(uploadResult.ref);
            }
    
            // Upload cover (dp) image if selected
            if (dpImage) {
                const coverImageRef = storageRef(storage, `covers/${dpImage.name}`);
                const uploadResult = await uploadBytes(coverImageRef, dpImage);
                newDisplayDpImageUrl = await getDownloadURL(uploadResult.ref);
            }
    
            // If updating an existing profile
            if (id) {
                const dataRef = sRef(db, `User/${id}`);
                await update(dataRef, {
                    profileUrl: name,
                    profileOn: selected,
                    id: id,
                    username: username,
                    userName1: "",
                    backgroundPicture: newDisplayDpImageUrl,
                    profilePicture: newProfileImageUrl,
                    designation: designation,
                    materialStatus: status,
                    companyname: company,
                    language: "",
                    nickname: nickname,
                    name: name,
                    address: "",
                    bgButtonColor: "",
                    bgColor: "",
                    bgTextColor: "",
                    bio: "",
                    createdOn: "",
                    currentuser: "",
                    deleted: "",
                    directMode: "",
                    dob: "",
                    email: "",
                    enterpriseMonthlyAllowed: "",
                    enterpriseMonthlyRequested: "",
                    enterpriseYearlyAllowed: "",
                    enterpriseYearlyRequested: "",
                    fcmToken: "",
                    gender: "",
                    ismain: "",
                    parentID: localStorage.getItem('parentId'), // Ensure parentId is set
                    phone: "",
                    platorform: "",
                    proVersion: "",
                    proVersionExpiryDate: "",
                    proVersionPurchaseDate: "",
                    reqByMe: "",
                    reqByOther: "",
                    subscribed: "",
                    subscription: ""
                });
                alert("Profile updated successfully");
            } 
            // If creating a new profile
            else {
                const newProfileRef = sRef(db, "User");
                const newProfileKey = push(newProfileRef).key;
    
                const newProfileData = {
                    id: newProfileKey,
                    profileUrl: name,
                    profileOn: selected,
                    username: username,
                    userName1: "",
                    backgroundPicture: newDisplayDpImageUrl,
                    profilePicture: newProfileImageUrl,
                    designation: designation,
                    materialStatus: status,
                    companyname: company,
                    language: "",
                    nickname: nickname,
                    name: name,
                    address: "",
                    bgButtonColor: "",
                    bgColor: "",
                    bgTextColor: "",
                    bio: "",
                    createdOn: "",
                    currentuser: "",
                    deleted: "",
                    directMode: "",
                    dob: "",
                    email: "",
                    enterpriseMonthlyAllowed: "",
                    enterpriseMonthlyRequested: "",
                    enterpriseYearlyAllowed: "",
                    enterpriseYearlyRequested: "",
                    fcmToken: "",
                    gender: "",
                    ismain: "",
                    parentID: localStorage.getItem('parentId'), // Ensure parentId is set
                    phone: "",
                    platorform: "",
                    proVersion: "",
                    proVersionExpiryDate: "",
                    proVersionPurchaseDate: "",
                    reqByMe: "",
                    reqByOther: "",
                    subscribed: "",
                    subscription: ""
                };
    
                await set(sRef(db, `User/${newProfileKey}`), newProfileData);
                alert("Profile created successfully");
            }
        } catch (error) {
            console.log("Error creating or updating profile", error);
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
                        {DisplayDpImageUrl ? (


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', objectFit: 'cover' }} >

                                <img style={
                                    { width: '120px', height: '120px', borderRadius: "100%", objectFit: 'cover' }
                                }
                                    className="main-img"

                                    src={ DisplayDpImageUrl}
                                    alt="Uploaded Lady Image"
                                />


                                <button
                                    style={crossButtonStyle}
                                    onClick={() => removeImage("profile")}
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
                            onChange={(e)=>handleFileChange(e,"profile")}
                        />
                        {!DisplayDpImageUrl && (
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
                            {DisplayProfileImageUrl ? (


                                <div style={{ width: '100%', height: '-webkit-fill-available', }}>
                                    <img style={{

                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '-webkit-fill-available',

                                    }}   src={ DisplayProfileImageUrl }>

                                    </img>
                                    <button
                                        style={crossButtonStyle}
                                        onClick={() => removeImage("cover")}
                                    >
                                        &times;
                                    </button>
                                </div>


                            ) : (

                                <img style={{
                                    display: "flex",
                                    justifyContent: 'center',
                                    flexDirection: 'column',
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
                                onChange={(e)=>handleFileChange(e,"cover")}
                            />
                            {!DisplayProfileImageUrl && (
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
            <CustomTextField label="name" name="name" size="small" value={name} onChange={(e) => setName(e.target.value)} />
            <CustomTextField label="Nickname" name="nickname" size="small" value={nickname} onChange={(e) => setNickname(e.target.value)} />
         
          </div>

          <div className="edit-field">
          <CustomTextField label="username" name="username" size="small" value={username} onChange={(e) => setusername(e.target.value)} />
            <CustomTextField label="designation" name="designation" size="small" value={designation} onChange={(e) => setdesignation(e.target.value)} />


          </div>

          <div className="edit-field">
          <CustomTextField label="status" name="status" size="small" value={status} onChange={(e) => setstatus(e.target.value)} />
            <CustomTextField label="company" name="company" size="small" value={company} onChange={(e) => setcompany(e.target.value)} />
          </div>

                    <br /><br /><br /><br />
                    <div className="btn-s">
                        <button style={saveButtonStyle} className='save2' onClick={handleSave}>
                            {
                                id? "Update Profile" :"Create New Profile" 
                            }
                            
                            
                            </button>
                    </div>
                </div>
            </div>
            {cropModal && (
            <Cropper
              image={currentImage}
              onClose={handleclosecropper}
              onCrop={handleCropImage}
            />
         )}
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
    marginTop: '1rem'
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

export default CreateNewProfile;