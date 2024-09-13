
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import editcontact from '../images/editcontact.png';
import './Edit.css';
import '../App.css';
import nav from '../images/nav.png';
import { TextField, useForkRef } from '@mui/material';
import { styled } from '@mui/system';

// import { ref as sRef, push, set } from "firebase/database";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { database as db, storage } from "../firebase.jsx"

import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import { database as db,storage } from "../firebase.jsx"
import { get, ref as sRef, push, onValue, set } from "firebase/database"


const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '1rem',
        width: "100%",
        paddingLeft: "20px",
    },
});

function CreateNewProfile() {
    const navigate = useNavigate();

    const [username, setusername] = useState('')
    const [designation, setdesignation] = useState('')
    const [status, setstatus] = useState('')
    const [company, setcompany] = useState('')

    const [profileImage, setprofileImage] = useState(null)
    const [dpImage, setdpImage] = useState(null)
    const [profileName, setprofileName] = useState('')
    const [selected, setSelected] = useState(false)



    function handlefileChangeForProfile(event) {
        const file = event.target.files[0]
        if (file) {
            // console.log(file)
            // console.log(URL.createObjectURL(file))
            setprofileImage(file)
        }
    }
    function handlefileChangeForDp(event) {
        const file = event.target.files[0]
        if (file) {
            setdpImage(file)
        }
    }

    function removeProfileImage() {
        setprofileImage(null)
    }

    function removeDpImage() {
        setdpImage(null)

    }

    // const userId = localStorage.getItem('userId');
    // console.log(userId)
    // Saveing data to firebase 

    const handleSave = async () => {

        // if (!profileImage || !dpImage || !username) {
        //     alert("please select every field ")
        //     return
        // }

        try {
            const storageref = storageRef(storage, `${profileImage.name}`)
            const storagerefDp = storageRef(storage, `${dpImage.name}`)

            // upload to storage 
            const profile_image=await uploadBytes(storageref,profileImage)
            const dp_image=await uploadBytes(storagerefDp,dpImage)

            // get download url 
            const profile_image_url=await getDownloadURL(profile_image.ref)
            const dp_image_url=await getDownloadURL(dp_image.ref)
    
            // refernce of new profile to Users table
            const newprofile=sRef(db,"User")
            const key_newprofile=push(newprofile)
            const key=key_newprofile.key

            const newprofile_data={
                // profileId:key,
                // parentId:localStorage.getItem('userId'),
                // userName:username,
                // Designation:designation,
                // martialStatus:status,
                // Company:company,
                profileImageUrl:profile_image_url,
                logoUrl:dp_image_url,
                profileUrl:profileName,
                profileOn:selected,

                    id: key,
                    
                    username: username,
                    userName1: "",
                    backgroundPicture: "",
                    profilePicuture: "",
                    designation: designation,
                    martialStatus: status,
                    companyname: company,
                    language: "",
            
            
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
                   
                    
                  
                    
                    parentID: localStorage.getItem('userId'),
                    phone: "",
                    platorform: "",
                    proVersion: "",
                    proVersionExpiryDate: "",
                    proVersionPurchaseDate: "",
                    
                    
                    reqByMe: "",
                    reqByOther: "",
                    subscribed: "",
                    subscription: "",
           }
            
            // setting data to firebase 
            await set(key_newprofile,newprofile_data)
            alert("profile create successfully")

        } catch (error) {

            console.log("error for creating new profile",error)
        }


    }




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
                        {profileImage ? (


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', objectFit: 'cover' }} >

                                <img style={
                                    { width: '100px', height: '100px', borderRadius: "100%", objectFit: 'cover' }
                                }
                                    className="main-img"

                                    src={URL.createObjectURL(profileImage)}
                                    alt="Uploaded Lady Image"
                                />


                                <button
                                    style={crossButtonStyle}
                                    onClick={() => removeProfileImage()}
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
                            onChange={handlefileChangeForProfile}
                        />
                        {!profileImage && (
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
                            {dpImage ? (


                                <div style={{ width: '100%', height: '-webkit-fill-available', }}>
                                    <img style={{

                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '-webkit-fill-available',

                                    }} src={URL.createObjectURL(dpImage)} alt="Uploaded Main Image" />
                                    <button
                                        style={crossButtonStyle}
                                        onClick={() => removeDpImage()}
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
                                onChange={handlefileChangeForDp}
                            />
                            {!dpImage && (
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
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            size="small"
                        />

                        <CustomTextField
                            label="Designation"
                            name="designation"
                            value={designation}
                            onChange={(e) => setdesignation(e.target.value)}
                            size="small"
                        />
                    </div>

                    <div className="edit-field">
                        <CustomTextField
                            label="Material Status"
                            name="status"
                            value={status}
                            onChange={(e) => setstatus(e.target.value)}
                            size="small"
                        />

                        <CustomTextField
                            label="Company"
                            name="company"
                            value={company}
                            onChange={(e) => setcompany(e.target.value)}
                            size="small"
                        />
                    </div>
                    <div className="edit-field">
                        <CustomTextField
                            label="ProfileName"
                            name="nickname"
                            value={profileName}
                            onChange={(e) => setprofileName(e.target.value)}
                            size="small"
                        />
                    </div>

                    <br /><br /><br /><br />
                    <div className="btn-s">
                        <button style={saveButtonStyle} className='save2' onClick={handleSave}>Create New Profile </button>
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