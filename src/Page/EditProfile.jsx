import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import editcontact from "../images/editcontact.png";
import "./Edit.css";
import "../App.css";
import { useTranslation } from "react-i18next";
import nav from "../images/nav.png";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import { get, update, ref } from "firebase/database";
import { database } from "../firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Cropper from "./Cropper"; // Import Cropper component

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "1rem",
    width: "100%",
    paddingLeft: "20px",
  },
});

function EditProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // useTranslation inside the function
  
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setAbout] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [businesslocatioon, setBusinessLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for cropped profile image
  const [coverImage, setCoverImage] = useState(null); // State for cropped cover image

  const [currentProfile, setCurrentProfile] = useState(null); // State for cropped profile image
  const [currentCover, setCurrentCover] = useState(null); // State for cropped cover image


  const [cropModal, setCropModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageType, setImageType] = useState("");

  const userId = localStorage.getItem("userId");
  const parentId = localStorage.getItem("parentId");

  const [crop, setCrop] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  const handleclosecropper = () => {
    setCropModal(false);
  };

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    const userRef = ref(database, `User/${userId}`); // Use userId here

    const fetchUserData = async () => {
      try {
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();

          // Log user data to confirm
          console.log("Fetched User Data:", userData);

          // Populate state with user data
          setUsername(userData.username || "");
          setName(userData.name || "");
          setDesignation(userData.designation || "");
          setAbout(userData.bio || "");
          setCompany(userData.companyname || "");
          setPhone(userData.phone || "");
          setBusinessLocation(userData.businesslocatioon || "");

          // Set existing images (if available) in the component's state
          if (userData.profileUrl) {
            setCurrentProfile(userData.profileUrl);
          }

          if (userData.coverUrl) {
            setCurrentCover(userData.coverUrl);
          }
        } else {
          console.log("No user data found for this userId");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);
console.log(currentProfile)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (!userId) {
        console.error("No userId found in localStorage");
        alert("User ID not found. Please log in again.");
        return;
      }

      const storage = getStorage(); // Initialize storage
      const userRef = ref(database, `User/${userId}`);

      // Retrieve existing user data
      const userSnapshot = await get(userRef);
      const existingData = userSnapshot.val() || {};

      let ImageUrl = [
        ...(existingData.profileUrl ? [existingData.profileUrl] : []),
      ];
      let BackgroundImageUrl = [
        ...(existingData.coverUrl
          ? [existingData.coverUrl]
          : []),
      ];
      console.log("cover img",BackgroundImageUrl)
      console.log("profile img",ImageUrl)
      try {
        // Handle profile image upload
        if (profileImage) {
          const imageRef = storageRef(
            storage,
            `images/${userId}/cropped-profile-image.jpg`
          );
          await uploadBytes(imageRef, profileImage);
          const url = await getDownloadURL(imageRef);
          ImageUrl[0] = url;
        }

        // Handle cover image upload
        if (coverImage) {
          const imageRef1 = storageRef(
            storage,
            `images/${userId}/cropped-cover-image.jpg`
          );
          await uploadBytes(imageRef1, coverImage);
          const url1 = await getDownloadURL(imageRef1);
          BackgroundImageUrl[0] = url1;
        }
        console.log("cover img",BackgroundImageUrl[0])
        console.log("profile img",ImageUrl[0])

        // Save or update user data
        await update(userRef, {
          username: username || existingData.username,
          name: name || existingData.name,
          designation: designation || existingData.designation,
          bio: bio || existingData.bio,
          companyname: company || existingData.companyname,
          phone: phone || existingData.phone,
          businesslocatioon:
            businesslocatioon || existingData.businesslocatioon,
          profileUrl: ImageUrl[0] || existingData.profileUrl,
          coverUrl:
            BackgroundImageUrl[0] || existingData.coverUrl,
          id: userId,
        });

        alert("Data saved successfully!");
        navigate(-1);
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

  const handleCropImage = (croppedImageBlob) => {
    const file = new File(
      [croppedImageBlob],
      imageType === "profile"
        ? "cropped-profile-image.jpg"
        : "cropped-cover-image.jpg",
      { type: croppedImageBlob.type }
    );

    if (imageType === "profile") {
      setProfileImage(file);
      setCurrentProfile(file);
    } else if (imageType === "cover") {
      setCoverImage(file);
      setCurrentCover(file);
    }
    setCropModal(false);
  };

  return (
    <div className="container">
      <div className="edit-profile">
        <nav className="nav">
          <div className="bck" onClick={() => navigate(-1)}>
            <IoChevronBack />
          </div>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
        </nav>

        <div className="rel-div" style={{ flexDirection: "column" }}>
  {/* Profile Image Section */}
  <label
    htmlFor="lady-img-upload"
    className="lady"
    style={{ ...ladyStyle, cursor: "pointer" }}
  >
    {currentProfile ? (
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
          src={
            typeof currentProfile === "string"
              ? currentProfile
              : URL.createObjectURL(currentProfile)
          }
          alt="Uploaded Lady Image"
        />
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent triggering the file input
            setCurrentProfile(null);
          }}
          style={crossButtonStyle}
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
      id="lady-img-upload"
      style={{ display: "none" }}
      onChange={(e) => handleFileChange(e, "profile")}
    />
    {!currentProfile && <span style={uploadLabelStyle}>Upload Photos</span>}
  </label>

  {/* Cover Image Section */}
  <label
    htmlFor="main-img-upload"
    className="main-img"
    style={{ ...mainImgStyle, cursor: "pointer" }}
  >
    {currentCover ? (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "2rem",
          }}
          src={
            typeof currentCover === "string"
              ? currentCover
              : URL.createObjectURL(currentCover)
          }
          alt="Uploaded Main Image"
        />
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent triggering the file input
            setCurrentCover(null);
          }}
          style={crossButtonStyle}
        >
          &times;
        </button>
      </div>
    ) : (
      <img style={uploadIconStyle} src={editcontact} alt="Upload Icon" />
    )}
    <input
      type="file"
      accept="image/*"
      id="main-img-upload"
      style={{ display: "none" }}
      onChange={(e) => handleFileChange(e, "cover")}
    />
    {!currentCover && <span style={uploadLabelStyle}>Upload Photos</span>}
  </label>
</div>


        <br />
        <br />
        <br />

        <div className="input-data">
          <div className="edit-field">
          <CustomTextField
          style={{width:'100%', outline:'none'}}
  label={t("Name")}
  name="name"
  size="small"
  value={name}
  onChange={(e) => setName(e.target.value)}
  InputProps={{
    style: { paddingLeft: 0 },
  }}
/>

            <CustomTextField
            style={{width:'100%', outline:'none'}}
              label={t("Username")}
              name="username"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
    style: { paddingLeft: 0 },
  }}
            />
          </div>

          <div className="edit-field">
            <CustomTextField
            style={{width:'100%', outline:'none'}}
              label={t("Designation")}
              name="designation"
              size="small"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              InputProps={{
    style: { paddingLeft: 0 },
  }}
            />
            <CustomTextField
            style={{width:'100%', outline:'none'}}
              label={t("Company")}
              name="company"
              size="small"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              InputProps={{
    style: { paddingLeft: 0 },
  }}
            />
          </div>

          <div className="edit-field">
          <CustomTextField
  style={{ width: "100%", outline: "none" }}
  label={t("Phone No")}
  name="phone"
  size="small"
  value={phone}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  }}
  InputProps={{
    style: { paddingLeft: 0 },
  }}
  error={phone && phone.length < 11} // Show error if length is less than 11
  helperText={
    phone && phone.length < 11 ? t("Phone number must be at least 11 digits") : ""
  }
/>



            <CustomTextField
            style={{width:'100%', outline:'none'}}
              label={t("Business Location")}
              name="businesslocatioon"
              size="small"
              value={businesslocatioon}
              onChange={(e) => setBusinessLocation(e.target.value)}
              InputProps={{
    style: { paddingLeft: 0 },
  }}
            />
          </div>
          <div
            className="edit-field"
            style={{ justifyContent: "start", width: "100%" }}
          >
            <CustomTextField
              style={{ width: "100%",margin:"0px auto", outline:'none' }}
              label={t("Bio")}
              name="bio"
              size="small"
              value={bio}
              onChange={(e) => setAbout(e.target.value)}
              InputProps={{
    style: { paddingLeft: 0 },
  }}
            />
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="btn-s">
            <button
              onClick={handleSave}
              style={saveButtonStyle}
              className="save2"
            >
              {isSaving ? t("Saving...") : t("Save")}
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
  border: "1px solid grey",
  zIndex: "100",
  objectFit: "cover",
};

const imgStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2px auto",
  width: "30px",
  marginTop: "1.5rem",
};

const mainImgStyle = {
  width: "100%",
  height: "200px",

  backgroundColor: "#D9D9D9",
  marginTop: "1rem",
  display: "flex",
  justifyContent: "center",
  objectFit: "cover",
  alignItems: "center",
  flexDirection: "column",
};

const uploadIconStyle = {
  width: "55px",
  height: "55px",
};

const crossButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "#FFEEEE",
  color: "red",
  border: "none",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "17px", // Reduce font size to fit well inside the button
  fontWeight:"700",
  padding:'0px 0px 2px 0px' // Ensure the cross is visible and prominent
};

const uploadLabelStyle = {
  marginTop: "1.1rem",
  cursor: "pointer",
  color: "grey",
  display: "flex",
  fontSize: "11px",
  justifyContent: "center",
  alignItems: "center",
  margin: " 1px auto",
};

const saveButtonStyle = {
  marginTop: "20px",
  width: "100%",
  color: "white",
  fontSize: "20px",
};

export default EditProfile;
