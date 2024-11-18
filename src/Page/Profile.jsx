import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "../App.css";
import "./Slide.css";
import { AiFillEdit } from "react-icons/ai";
import Photos from "../Components/Photos";
import Footer from "../Components/Footer";
import bitc from "../images/bitc.png";
import bitcc from "../images/bitcc.png";
import nav from "../images/nav.png";
import Card from "../Components/Card";
import notifi from "../images/noti.png"
import { ref, get,update } from "firebase/database"; // Import 'ref' and 'get' directly from 'firebase/database'
import { database } from "../firebase.jsx"; // Import the initialized database
import CircularProgress from "@mui/material/CircularProgress"; // Import the loader component
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import telegram from "../images/telegram.png";
import linkedin from "../images/linkedin.png";
import whatsapp from "../images/whatsapp.png";
import call from "../images/call.png";
import facebook from "../images/facebook.png";
import mail from "../images/mail.png";
import website from "../images/website.png";
import snapchat from "../images/snapchat.png";
import tiktok from "../images/tiktok.png";
import youtube from "../images/youtube.png";
import vimeo from "../images/vimeo.png";
import twitter from "../images/twitter.png";
import raddit from "../images/radit.png";
import pinterest from "../images/pintrest.png";
import custom from "../images/custom.png";
import spotify from "../images/spotify.png";
import instagram from "../images/instagram.png";
import paypal from "../images/paypal.png";
import Links from "./Links";

function Profile() {
  const navigate = useNavigate();


  const { t } = useTranslation();
 

  const [loading, setLoading] = useState(true); // State for loading
  const [links, setLinks] = useState([]); // State to store fetched links

  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    phone: "",
    company: "",
    designation: "",
    businesslocatioon: "",
    about: "",
    ladyImgUrl: "",
    mainImgUrl: "",
  });

  const userId = localStorage.getItem("userId");
  // console.log("now user ", userId);

  const ReturnIcon = (id) => {
    switch (id) {
      case 1:
        return vimeo;
      case 2:
        return call;
      case 3:
        return facebook;
      case 4:
        return linkedin;
      case 5:
        return instagram;
      case 6:
        return telegram;
      case 7:
        return snapchat;
      case 8:
        return tiktok;
      case 9:
        return youtube;
      case 10:
        return raddit;
      case 11:
        return twitter;
      case 12:
        return pinterest;
      case 13:
        return whatsapp;
      case 14:
        return website;
      case 15:
        return custom;
      case 16:
        return mail;
      case 17:
        return spotify;
      case 18:
        return paypal;
      default:
        return null;
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);

  const handleImageClick = (baseUrl, linkName) => {
    if(direct){
      return;
    }
    if (!baseUrl || !linkName) {
      console.error("Invalid input:", baseUrl, linkName);
      return;
    }

    // Trim whitespace and remove spaces, dashes, or parentheses for phone numbers
    const cleanedBaseUrl = baseUrl.trim();
    const normalizedPhoneNumber = cleanedBaseUrl.replace(/[()\s-]/g, "");

    // Convert linkName to lowercase for comparison
    const lowerLinkName = linkName.toLowerCase();

    // Check if the cleanedBaseUrl is a phone number (digits only with optional +)
    const isPhoneNumber = /^\+?\d+$/.test(normalizedPhoneNumber);

    if (lowerLinkName === "whatsapp") {
      if (isPhoneNumber) {
        const formattedWhatsAppUrl = `https://wa.me/${normalizedPhoneNumber}`;
        window.open(formattedWhatsAppUrl, "_blank");
      } else {
        console.error("Invalid phone number for WhatsApp:", cleanedBaseUrl);
      }
    } else if (
      lowerLinkName === "facebook" ||
      cleanedBaseUrl.includes("facebook.com")
    ) {
      // Handle Facebook link
      const formattedFacebookUrl = cleanedBaseUrl.startsWith("https://")
        ? cleanedBaseUrl
        : `https://www.facebook.com/${cleanedBaseUrl.replace("@", "")}`;
      window.open(formattedFacebookUrl, "_blank");
    } else if (lowerLinkName === "telegram") {
      if (isPhoneNumber) {
        const formattedTelegramUrl = `https://t.me/${normalizedPhoneNumber}`;
        window.open(formattedTelegramUrl, "_blank");
      } else {
        console.error("Invalid phone number for Telegram:", cleanedBaseUrl);
      }
    } else if (lowerLinkName === "call") {
      if (isPhoneNumber) {
        window.location.href = `tel:${normalizedPhoneNumber}`;
      } else {
        console.error("Invalid phone number for call:", cleanedBaseUrl);
      }
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedBaseUrl)) {
      const mailtoLink = cleanedBaseUrl.startsWith("mailto:")
        ? cleanedBaseUrl
        : `mailto:${cleanedBaseUrl}`;
      window.location.href = mailtoLink;
    } else if (
      /^https?:\/\//i.test(cleanedBaseUrl) ||
      /^www\./i.test(cleanedBaseUrl)
    ) {
      const formattedUrl = cleanedBaseUrl.startsWith("http")
        ? cleanedBaseUrl
        : `https://${cleanedBaseUrl}`;
      window.open(formattedUrl, "_blank");
    } else if (
      lowerLinkName === "snapchat" ||
      cleanedBaseUrl.includes("snapchat.com")
    ) {
      const formattedSnapchatUrl = `https://www.snapchat.com/add/${cleanedBaseUrl}`;
      window.open(formattedSnapchatUrl, "_blank");
    } else if (
      lowerLinkName === "tiktok" ||
      cleanedBaseUrl.includes("tiktok.com")
    ) {
      const formattedTikTokUrl = cleanedBaseUrl.startsWith("https://")
        ? cleanedBaseUrl
        : `https://www.tiktok.com/@${cleanedBaseUrl.replace("@", "")}`;
      window.open(formattedTikTokUrl, "_blank");
    } else if (
      lowerLinkName === "instagram" ||
      cleanedBaseUrl.includes("instagram.com")
    ) {
      const formattedInstagramUrl = cleanedBaseUrl.startsWith("https://")
        ? cleanedBaseUrl
        : `https://www.instagram.com/${cleanedBaseUrl.replace("@", "")}/`;
      window.open(formattedInstagramUrl, "_blank");
    } else if (lowerLinkName === "x" || cleanedBaseUrl.includes("x.com")) {
      const formattedTwitterUrl = cleanedBaseUrl.startsWith("https://")
        ? cleanedBaseUrl
        : `https://x.com/${cleanedBaseUrl.replace("@", "")}`;
      window.open(formattedTwitterUrl, "_blank");
    } else if (lowerLinkName === "reddit" || cleanedBaseUrl.startsWith("u/")) {
      const formattedRedditUrl = `https://www.reddit.com/user/${cleanedBaseUrl.replace(
        "u/",
        ""
      )}`;
      window.open(formattedRedditUrl, "_blank");
    } else if (
      lowerLinkName === "pinterest" ||
      cleanedBaseUrl.includes("pinterest.com")
    ) {
      const formattedPinterestUrl = cleanedBaseUrl.startsWith("https://")
        ? cleanedBaseUrl
        : `https://www.pinterest.com/${cleanedBaseUrl.replace("@", "")}/`;
      window.open(formattedPinterestUrl, "_blank");
    } else if (
      lowerLinkName === "youtube" ||
      cleanedBaseUrl.includes("youtube.com")
    ) {
      const formattedYouTubeUrl = cleanedBaseUrl.startsWith("https://")
        ? cleanedBaseUrl
        : `https://www.youtube.com/${
            cleanedBaseUrl.startsWith("channel")
              ? cleanedBaseUrl
              : `user/${cleanedBaseUrl}`
          }`;
      window.open(formattedYouTubeUrl, "_blank");
    } else {
      console.error("Invalid input:", cleanedBaseUrl);
    }
  };

  const [leadMode, setLeadMode] = useState(false); // State for leadMode
  // console.log(profileData?.directMode)
  const [direct, setDirect] = useState(false); // State for leadMode

  useEffect(() => {
      const fetchData = async () => {
          try {
              const userId = localStorage.getItem("userId");

              if (!userId) {
                  console.error("No userId found in localStorage");
                  setLoading(false);
                  return;
              }

              const userRef = ref(database, `User/${userId}`);
              const snapshot = await get(userRef);

              if (snapshot.exists()) {
                  setProfileData(snapshot.val());
                  // console.log("Fetched profileData:", snapshot.val());
              } else {
                  console.log("No data available for this userId:", userId);
              }

              // Fetch links data
              const linksRef = ref(database, `User/${userId}/links`);
              const linksSnapshot = await get(linksRef);

              if (linksSnapshot.exists()) {
                  const allLinks = linksSnapshot.val();
                  const userLinks = Object.values(allLinks).filter(
                      (link) => link.uid === userId
                  );
                  setLinks(userLinks);
              } else {
                  console.log("No links data available");
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, []);
  const updateData = async (leadMode, action) => {
    console.log(action);
      const userId = localStorage.getItem("userId");
      if (!userId) {
          console.error("No userId found in localStorage");
          return;
      }

      const userRef = ref(database, `User/${userId}`); // Adjust the path if needed
      try {
          // await userRef.update({ ...profileData, leadMode }); // Include leadMode in the update

          action == "lead" ? 
          await update(userRef, {
            leadMode: leadMode,
          }) : 
          await update(userRef, {
            directMode:direct === false ? true :false
          });

          console.log('User data updated successfully');
      } catch (error) {
          console.error('Error updating user data: ', error);
      }
  };

  const handleToggle = (action) => {
    console.log(action);
  
    if (action === "lead") {
      if (direct) {
        alert("Please turn off Direct Mode before enabling Lead Mode.");
        return;
      }
  
      // Toggle Lead Mode
      setLeadMode((prevLeadMode) => {
        const newLeadMode = !prevLeadMode;
        updateData(newLeadMode, "lead");
        localStorage.setItem("leadMode", newLeadMode);
  
   
        if (newLeadMode) {
          setDirect(false);
        }
  
        return newLeadMode;
      });
    } else if (action === "direct") {
      if (leadMode) {
        alert("Please turn off Lead Mode before enabling Direct Mode.");
        return;
      }
  
      // Toggle Direct Mode
      setDirect((prevDirect) => {
        const newDirect = !prevDirect;
        updateData(newDirect, "direct");
        localStorage.setItem("directMode", newDirect);
  
        // Ensure Lead Mode is turned off when Direct Mode is enabled
        if (newDirect) {
          setLeadMode(false);
  
          // If Direct Mode is enabled, select and store the first link
          if (links.length > 0) {
            const firstLinkId = links[0].id;
            setSelectedLink(firstLinkId);
            updateDirectLink(newDirect, links[0]);
            localStorage.setItem("selectedLink", firstLinkId);
          }
        } else {
          // Reset selected link if Direct Mode is off
          setSelectedLink(null);
          updateDirectLink(newDirect, null);
          localStorage.removeItem("selectedLink");
        }
  
        return newDirect;
      });
    }
  };
  

  
  

  useEffect(() => {
   
    const savedDirectMode = localStorage.getItem("directMode");
    const savedLeadMode = localStorage.getItem("leadMode");
  
    if (savedDirectMode !== null) {
      setDirect(JSON.parse(savedDirectMode)); // Parse and set Direct mode state
    }
  
    if (savedLeadMode !== null) {
      setLeadMode(JSON.parse(savedLeadMode)); // Parse and set Lead mode state
    }
  
  

    const savedSelectedLink = localStorage.getItem("selectedLink");
    if (savedSelectedLink !== null) {
      setSelectedLink(savedSelectedLink);  // Set the selected link from localStorage
    }

  }, []);
  
  

  
  
  
  

  // console.log(profileData);

  const handlMoveLink = () => {
    navigate(`/home/Link`);
  };

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };


  
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  // Navigate to notifications page
  const handlenotifi = () => {
    navigate("/home/notifi");
  };
  const handleAppoint = () => {
    navigate("/home/appoint");
  };
  
  const [selectedLink, setSelectedLink] = useState(links.length > 0 ? links[0].id : null); 
  
 

  if (loading) {
    return (
      <div
        className="loader-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }


  const updateDirectLink = async (status, link) => {
    try {
        const userRef = ref(database, `User/${userId}`); // Adjust the path if needed
        await update(userRef, {
          ...profileData,
          direct: status ? link :null ,
          directMode:status
        });
        console.log('Direct mode updated successfully');
    } catch (error) {
        console.error('Error updating user data: ', error);
    }
    


  };

 


 


  console.log("i am cover",profileData.coverUrl)
  return (
    <div className="ProfileContainer">
      <div className="profile-design" style={{ paddingBottom: "0px" }}>
       
        <nav className="nav" style={{ marginBottom: "10px" }}>
          <div className="nav-logo">
         
            <img src={nav} alt="nav-img" />
          </div>
          
          <div style={{display:'flex', position:"relative",top:"5px"}} className="nav-icon">
          <img style={{widthL:"25px",height:'22px',paddingRight:"22px",cursor:"pointer"}} onClick={handleAppoint}k src={notifi} alt="nav-img" />
            <FaBell
              onClick={handlenotifi}
              style={{ fontSize: "25px", cursor: "pointer" }}
            />
          </div>
        </nav>

        <div className="rel-div">
          {/* Profile images */}
          <img
            className="lady"
            style={{ objectFit: "cover" }}
            src={profileData.profileUrl || bitcc} // Default profile image
          />
          <div></div>
          <div style={{ width: "100%", height: "200px" }}>
            <div style={{ width: "100%" }}>
              <img
                className="main-img"
                src={profileData?.coverUrl || bitc} // Default cover image
                onLoad={handleImageLoad}
                style={{
                  display: imageLoading ? "none" : "block",
                  width: "100%",
                }}
              />
              {imageLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>

          <div style={{ paddingLeft: "10px", position: "relative" }}>
            {/* Edit profile icon */}
            <div
              style={{
                position: "absolute",
                right: "0",
                paddingRight: "40px",
                top: "45px",
              }}
            >
              <AiFillEdit
                style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
                onClick={handleEditProfile}
              />
            </div>
            {/* Profile details */}
            <h2 style={{ color: "red", margin: "5px" }}>
              {profileData?.name} <br />
              <span
                style={{
                  color: "rgb(146, 146, 146)",
                  fontWeight: "100",
                  fontSize: "16px",
                }}
              >
                {" "}
                ({profileData.username})
              </span>
            </h2>
            
            <div className="data-container">
  <div className="data">
    <h2 className="head">
      {t("Designation")}:
    </h2>
    <span className="para">{profileData.designation}</span>
  </div>

  <div className="data">
    <h2 className="head">
      {t("Phone")}:
    </h2>
    <span className="para">{profileData.phone}</span>
  </div>

  <div className="data">
    <h2 className="head">
      {t("Company")}:
    </h2>
    <span className="para">{profileData.companyname}</span>
  </div>
</div>

          
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "2px auto",
            }}
          >
            <Card />
          </div>

          <Photos />
          {/* <Contact /> */}

          <div className="ip-btn" data-aos="zoom-in" style={{ width: "100%" }}>
            <div className="n-head" style={{ fontSize: "18px" }}>
              <h3 style={{ cursor: "pointer" }} className="link-heading">
              {t("Links")}
              </h3>
            </div>
            <div className="ii-btn">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
               gap:"5px"
                }}
              >
                <h2
                  className="mode-heading"
                  style={{
                    marginLeft: "rem",
                    marginRight: "2px",
                    fontSize: "15px",
                  }}
                >
                  {t("Lead Mode")}:
                </h2>
                <div className="toggle-container">
                  <input
                    type="checkbox"
                    id="toggle-lead"
                    className="toggle-input"
                    checked={leadMode}
                    onChange={() => handleToggle("lead")}
                    
                   
                  />
                  <label htmlFor="toggle-lead" className="toggle-label"></label>
                </div>
              </div>
              <div className="ii-btn">
                <h2
                  className="mode-heading"
                  style={{ marginRight: "2px", fontSize: "15px" }}
                >
                 {t("Direct Mode")}:
                </h2>
                <div className="toggle-container">
                  <input
                    type="checkbox"
                    id="toggle-direct"
                    className="toggle-input"
                    checked={direct}
                    onChange={() => handleToggle("direct")}
                  />
                  <label
                    htmlFor="toggle-direct"
                    className="toggle-label"
                  ></label>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)", // 4 columns in the grid
              gap: "10px", // Space between grid items
              padding: "10px", // Space around the container
            }}
          >
            {/* Add Button Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column", // Center the button and text
                marginBottom: "10px", // Space between button section and links
                gridColumn: "span 1", // Takes up the first column
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#E2E2E2",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  // Space between button and text
                }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={handlMoveLink}
                >
                  +
                </p>
              </div>
              <p
                style={{
                  color: "#898787",
                  fontSize: "12px",
                }}
              >
          {t( "Add")}
              </p>
            </div>

            {/* Render links */}
            {links.map((link, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "10px",
      cursor: "pointer",
    }}
  >
    <img
      key={link.id}
      onClick={
        direct
          ? () => {
              setSelectedLink(link.id);  // Set the selected link when clicked
              localStorage.setItem("selectedLink", link.id);  // Save the selected link ID to localStorage
              updateDirectLink(direct, link);  // Update the link in Direct mode
            }
          : () => handleImageClick(link?.baseUrl, link?.name)
      }
      src={ReturnIcon(link.id)}
      alt={link?.name || "Link"}
      style={{
        width: "50px",
        height: "50px",
        opacity: link.id === selectedLink
          ? "1"  // Full opacity for the selected link
          : direct
          ? "40%"  // Reduced opacity for unselected links in Direct mode
          : "1",  // Default opacity for all images
        transition: "opacity 0.3s ease",  // Smooth transition effect
      }}
      onError={(e) => {
        e.target.src = "path/to/default/image.png";  // Fallback on error
      }}
    />

    <span style={{ color: "#898787", fontSize: "12px" }}>
      {t(link?.name)}  {/* Translated text based on link.name */}
    </span>
  </div>
))}

          </div>
          <br />
          <br />
          <br />

          <Footer Links={Links} />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Profile;
