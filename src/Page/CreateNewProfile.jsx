import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import edit from "../images/edit.png";
import editcontact from "../images/editcontact.png";
import "./Edit.css";
import "../App.css";
import nav from "../images/nav.png";
import { TextField, useForkRef } from "@mui/material";
import { styled } from "@mui/system";
import Cropper from "./Cropper"; // Import Cropper component
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useEffect } from "react";
import { database as db, storage } from "../firebase.jsx";
import {
  get,
  ref as sRef,
  push,
  onValue,
  set,
  update,
} from "firebase/database";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "1rem",
    width: "100%",
    paddingLeft: "20px",
  },
});

function CreateNewProfile() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [designation, setdesignation] = useState("");
  const [aboutUs, setAbout] = useState("");
  const [company, setcompany] = useState("");
  const [phone, setPhone] = useState("");
  const [businesslocatioon, setBusinessLocation] = useState("");
  const [saving, setSaving] = useState("");

  const [profileName, setprofileName] = useState("");
  const [selected, setSelected] = useState(false);

  const [profileImage, setprofileImage] = useState(null);

  const [dpImage, setdpImage] = useState(null);

  const [cropModal, setCropModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageType, setImageType] = useState("");
  const [DisplayProfileImageUrl, setDisplayProfileImageUrl] = useState(null);
  const [DisplayDpImageUrl, setDisplayDpImageUrl] = useState(null);

  const handleclosecropper = () => {
    setCropModal(false);
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
      setprofileImage(file); // This will be used for uploading
      setDisplayProfileImageUrl(URL.createObjectURL(file)); // Show the cropped image
    } else if (imageType === "cover") {
      setdpImage(file); // This will be used for uploading
      setDisplayDpImageUrl(URL.createObjectURL(file)); // Show the cropped image
    }

    setCropModal(false); // Close the cropping modal
  };

  // const handleFileChange = (event, type) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setCurrentImage(reader.result);
  //             setImageType(type);
  //             setCropModal(true);
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

  const handleProfileImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result); // Set the image preview
        setImageType(type); // Assuming you want to specify this is for the profile
        setCropModal(true); // Open the crop modal
      };
      reader.readAsDataURL(file); // Read file to a data URL

      // // Set display image URL for immediate feedback (before cropping)
      // const imageUrl = URL.createObjectURL(file);
      // setDisplayProfileImageUrl(imageUrl);
    }
  };

  const handleDpImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result); // Set the image preview
        setImageType(type); // Assuming you want to specify this is for the DP
        setCropModal(true); // Open the crop modal
      };
      reader.readAsDataURL(file); // Read file to a data URL

      // // Set display image URL for immediate feedback (before cropping)
      // const imageUrl = URL.createObjectURL(file);
      // setDisplayDpImageUrl(imageUrl);
    }
  };

  {
    /*   --------------checking if record is present in firebase for updating*--------------*/
  }
  console.log(id);
  useEffect(() => {
    if (!id) return;
    const checkForUpdate = async () => {
      const dataRef = sRef(db, `User/${id}`);
      const snapshot = await get(dataRef);
      const data = await snapshot.val();
      console.log(data);

      setusername(data.username);
      setdesignation(data.designation);
      setAbout(data.aboutUs);
      setPhone(data.phone);
      setcompany(data.companyname);
      setprofileName(data.profileUrl);
      setBusinessLocation(data.businesslocatioon);
      setDisplayProfileImageUrl(data.coverUrl);
      setDisplayDpImageUrl(data.profileUrl);
      setName(data.name);
    };
    checkForUpdate();
  }, [id]);

  {
    /*   --------------saving data to firebase if not already present in firebase otherwise updating-------------- */
  }
  const handleSave = async () => {
    // Validation to ensure all required fields are present

    try {
      console.log("id", id);

      // Common variables for image URLs
      let coverUrl= DisplayProfileImageUrl;
      let profileUrl = DisplayDpImageUrl;

      // Upload profile image if selected
      if (profileImage) {
        const profileImageRef = storageRef(
          storage,
          `profiles/${profileImage.name}`
        );
        const uploadResult = await uploadBytes(profileImageRef, profileImage);
        profileUrl = await getDownloadURL(uploadResult.ref);
      }

      // Upload cover (dp) image if selected
      if (dpImage) {
        const coverImageRef = storageRef(storage, `covers/${dpImage.name}`);
        const uploadResult = await uploadBytes(coverImageRef, dpImage);
        coverUrl = await getDownloadURL(uploadResult.ref);
      }

      // If updating an existing profile
      if (id) {
        setSaving(true);
        const dataRef = sRef(db, `User/${id}`);
        await update(dataRef, {
          ProfileUrl: name,
          profileOn: selected,
          id: id,
          username: username,
          userName1: "",
          coverUrl: profileUrl,
          ProfileUrl: coverUrl,
          designation: designation,
          phone: phone,
          companyname: company,
          language: "",
          businesslocatioon: businesslocatioon,
          name: name,
          aboutUs: aboutUs,
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
          parentID: localStorage.getItem("parentId"), // Ensure parentId is set
          phone: phone,
          platorform: "",
          proVersion: "",
          proVersionExpiryDate: "",
          proVersionPurchaseDate: "",
          reqByMe: "",
          reqByOther: "",
          subscribed: "",
          subscription: "",
        });

        alert("Profile updated successfully");
        navigate(-1);
      } else {
        const newProfileRef = sRef(db, "User");
        const newProfileKey = push(newProfileRef).key;
        setSaving(true);
        const newProfileData = {
          id: newProfileKey,
          ProfileUrl: name,
          profileOn: selected,
          username: username,
          userName1: "",
          coverUrl: profileUrl,
          profileUrl: coverUrl,
          designation: designation,
          phone: phone,
          companyname: company,
          language: "",
          businesslocatioon: businesslocatioon,
          name: name,
          aboutUs: aboutUs,
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
          parentID: localStorage.getItem("parentId"), // Ensure parentId is set
          phone: phone,
          platorform: "",
          proVersion: "",
          proVersionExpiryDate: "",
          proVersionPurchaseDate: "",
          reqByMe: "",
          reqByOther: "",
          subscribed: "",
          subscription: "",
        };

        await set(sRef(db, `User/${newProfileKey}`), newProfileData);
        alert("Profile created successfully");
        navigate(-1);
        setSaving(false);
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
        <nav className="nav">
          <div className="bck" onClick={handleBack}>
            <IoChevronBack />
          </div>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
        </nav>

        <div className="rel-div" style={{ flexDirection: "column" }}>
          <div className="lady" style={ladyStyle}>
            {DisplayDpImageUrl ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  objectFit: "cover",
                }}
              >
                <img
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                  className="main-img"
                  src={DisplayDpImageUrl}
                  alt="Uploaded Lady Image"
                />

                <button
                  style={crossButtonStyle}
                  onClick={() => setDisplayDpImageUrl(null)}
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
              style={{ display: "none" }}
              id="lady-img-upload"
              onChange={(e) => {
                handleDpImageUpload(e, "cover");
              }}
            />
            {!DisplayDpImageUrl && (
              <label
                htmlFor="lady-img-upload"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "60px",
                  fontSize: "8px",
                  marginTop: "8px",
                  color: "#4A5568",

                  height: "27px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "0px",
                  margin: "2px auto",
                }}
              >
                Upload Photos
              </label>
            )}
          </div>

          <div>
            <div className="main-img" style={mainImgStyle}>
              {DisplayProfileImageUrl ? (
                <div
                  style={{ width: "100%", height: "-webkit-fill-available" }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "-webkit-fill-available",
                      borderRadius: "25px",
                    }}
                    src={DisplayProfileImageUrl}
                  ></img>
                  <button
                    style={crossButtonStyle}
                    onClick={() => setDisplayProfileImageUrl("")}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <img
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0px auto",
                    width: "70px",
                  }}
                  src={editcontact}
                  alt="Upload Icon"
                />
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="main-img-upload"
                onChange={(e) => {
                  handleProfileImageUpload(e, "profile");
                }}
              />
              {!DisplayProfileImageUrl && (
                <label
                  htmlFor="main-img-upload"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #e2e8f0",
                    width: "90px",
                    fontSize: "10px",
                    color: "#4A5568",
                    height: "27px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textAlign: "center",
                    margin: "0px auto",
                  }}
                >
                  Upload Photos
                </label>
              )}
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />

        <div className="input-data">
          <div className="edit-field">
            <CustomTextField
              label="name"
              name="name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomTextField
              label="username"
              name="username"
              size="small"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          <div className="edit-field">
            <CustomTextField
              label="designation"
              name="designation"
              size="small"
              value={designation}
              onChange={(e) => setdesignation(e.target.value)}
            />
            <CustomTextField
              label="company"
              name="company"
              size="small"
              value={company}
              onChange={(e) => setcompany(e.target.value)}
            />
          </div>

          <div className="edit-field">
            <CustomTextField
              label="phone"
              name="phone"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <CustomTextField
              label="businesslocatioon"
              name="businesslocatioon"
              size="small"
              value={businesslocatioon}
              onChange={(e) => setBusinessLocation(e.target.value)}
            />
          </div>
          <div
            className="edit-field"
            style={{ justifyContent: "start", width: "100%" }}
          >
            <CustomTextField
              style={{ width: "100%" }}
              label="About"
              name="aboutUs"
              size="small"
              value={aboutUs}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <br />
          <br />
          <br />
          <br />
          <div className="btn-s">
            <button
              style={saveButtonStyle}
              className="save2"
              onClick={handleSave}
            >
              {!saving
                ? id
                  ? "Update Profile"
                  : "Create New Profile"
                : id
                ? "updating..."
                : "creating..."}
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
};

const imgStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2px auto",
  width: "30px",
  marginTop: "1rem",
};

const mainImgStyle = {
  width: "100%",
  height: "200px",
  backgroundColor: "#D9D9D9",
  marginTop: "3rem",
};

const saveButtonStyle = {
  color: "white",
  fontSize: "20px",
  width: "100%",
};
const crossButtonStyle = {
  width: "20px",
  height: "20px",
  borderRadius: "100%",
  display: "flex",
  color: "red",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  background: "#FFB9B9",
  position: "absolute",
  top: "5px",
  right: "9px",
  cursor: "pointer",
  zIndex: 1,
  fontSize: "20px",
};

export default CreateNewProfile;
