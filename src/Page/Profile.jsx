import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import '../App.css';
import './Slide.css';
import { AiFillEdit } from "react-icons/ai";
import Photos from '../Components/Photos';
import Footer from '../Components/Footer';
import bitc from '../images/bitc.png'
import bitcc from '../images/bitcc.png'
import nav from '../images/nav.png';
import Card from '../Components/Card';
import { ref, get } from 'firebase/database'; // Import 'ref' and 'get' directly from 'firebase/database'
import { database } from '../firebase.jsx'; // Import the initialized database
import CircularProgress from '@mui/material/CircularProgress'; // Import the loader component
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useTranslation } from 'react-i18next';


import whatsapp from '../images/whatsapp.png';
import call from '../images/call.png';
import fb from '../images/facebook.png';
import mail from '../images/mail.png';
import website from '../images/website.png';
import snap from '../images/snapchat.png';
import tiktok from '../images/tiktok.png';
import youtube from '../images/youtube.png';
import vimeo from '../images/vimeo.png';
import x from '../images/twitter.png';
import radit from '../images/radit.png';
import pintrst from '../images/pintrest.png';
import custom from '../images/custom.png';
import spotify from '../images/spotify.png';
import instas from '../images/instagram.png';

import paypal from '../images/paypal.png';
import telegram from '../images/telegram.png';
import linkedin from '../images/linkedin.png';


function Profile() {
  const navigate = useNavigate();

  const [socialLinks, setSocialLink] = useState([])
  const { t } = useTranslation()


  const [loading, setLoading] = useState(true); // State for loading
  const [links, setLinks] = useState([]); // State to store fetched links

  const [activeToggle, setActiveToggle] = useState(null); // State to manage active toggle
  const [profileData, setProfileData] = useState({
    
    username: '',
    nickname: '',
    status: '',
    company: '',
    designation: '',
    ladyImgUrl: '',
    mainImgUrl: ''
  })
  
  const userId = localStorage.getItem('userId');
  console.log ("now user ",userId)



  const ReturnIcon = (id) => {
    switch (id) {
      case 1: return vimeo;
      case 2: return call;
      case 3: return fb;
      case 4: return linkedin
      case 5: return instas;
      case 6: return telegram;
      case 7: return snap;
      case 8: return tiktok;
      case 9: return youtube;
      case 10: return radit;
      case 11: return x;
      case 12: return pintrst;
      case 13: return whatsapp;
      case 14: return website;
      case 15: return custom;
      case 16: return mail;
      case 17: return spotify;
      case 18: return paypal;
      default: return null;
    }

  };


  useEffect(() => {
    AOS.init({
        duration: 1000, // Duration of animations in milliseconds
        once: false, // Whether animation should happen only once
    });
}, []);




 
const handleImageClick = (baseUrl, linkName) => {
  if (!baseUrl || !linkName) {
    console.error('Invalid input:', baseUrl, linkName);
    return;
  }

  // Trim whitespace and remove spaces, dashes, or parentheses for phone numbers
  const cleanedBaseUrl = baseUrl.trim();
  const normalizedPhoneNumber = cleanedBaseUrl.replace(/[()\s-]/g, '');

  // Convert linkName to lowercase for comparison
  const lowerLinkName = linkName.toLowerCase();

  // Check if the cleanedBaseUrl is a phone number (digits only with optional +)
  const isPhoneNumber = /^\+?\d+$/.test(normalizedPhoneNumber);

  if (lowerLinkName === 'whatsapp') {
    if (isPhoneNumber) {
      const formattedWhatsAppUrl = `https://wa.me/${normalizedPhoneNumber}`;
      window.open(formattedWhatsAppUrl, '_blank');
    } else {
      console.error('Invalid phone number for WhatsApp:', cleanedBaseUrl);
    }
  } else if (lowerLinkName === 'facebook' || cleanedBaseUrl.includes('facebook.com')) {
    // Handle Facebook link
    const formattedFacebookUrl = cleanedBaseUrl.startsWith('https://') 
      ? cleanedBaseUrl 
      : `https://www.facebook.com/${cleanedBaseUrl.replace('@', '')}`;
    window.open(formattedFacebookUrl, '_blank');
  } else if (lowerLinkName === 'telegram') {
    if (isPhoneNumber) {
      const formattedTelegramUrl = `https://t.me/${normalizedPhoneNumber}`;
      window.open(formattedTelegramUrl, '_blank');
    } else {
      console.error('Invalid phone number for Telegram:', cleanedBaseUrl);
    }
  } else if (lowerLinkName === 'call') {
    if (isPhoneNumber) {
      window.location.href = `tel:${normalizedPhoneNumber}`;
    } else {
      console.error('Invalid phone number for call:', cleanedBaseUrl);
    }
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedBaseUrl)) {
    const mailtoLink = cleanedBaseUrl.startsWith('mailto:') ? cleanedBaseUrl : `mailto:${cleanedBaseUrl}`;
    window.location.href = mailtoLink;
  } else if (/^https?:\/\//i.test(cleanedBaseUrl) || /^www\./i.test(cleanedBaseUrl)) {
    const formattedUrl = cleanedBaseUrl.startsWith('http') ? cleanedBaseUrl : `https://${cleanedBaseUrl}`;
    window.open(formattedUrl, '_blank');
  } else if (lowerLinkName === 'snapchat' || cleanedBaseUrl.includes('snapchat.com')) {
    const formattedSnapchatUrl = `https://www.snapchat.com/add/${cleanedBaseUrl}`;
    window.open(formattedSnapchatUrl, '_blank');
  } else if (lowerLinkName === 'tiktok' || cleanedBaseUrl.includes('tiktok.com')) {
    const formattedTikTokUrl = cleanedBaseUrl.startsWith('https://') 
      ? cleanedBaseUrl 
      : `https://www.tiktok.com/@${cleanedBaseUrl.replace('@', '')}`;
    window.open(formattedTikTokUrl, '_blank');
  } else if (lowerLinkName === 'instagram' || cleanedBaseUrl.includes('instagram.com')) {
    const formattedInstagramUrl = cleanedBaseUrl.startsWith('https://') 
      ? cleanedBaseUrl 
      : `https://www.instagram.com/${cleanedBaseUrl.replace('@', '')}/`;
    window.open(formattedInstagramUrl, '_blank');
  } else if (lowerLinkName === 'x' || cleanedBaseUrl.includes('x.com')) {
    const formattedTwitterUrl = cleanedBaseUrl.startsWith('https://') 
      ? cleanedBaseUrl 
      : `https://x.com/${cleanedBaseUrl.replace('@', '')}`;
    window.open(formattedTwitterUrl, '_blank');
  } else if (lowerLinkName === 'reddit' || cleanedBaseUrl.startsWith('u/')) {
    const formattedRedditUrl = `https://www.reddit.com/user/${cleanedBaseUrl.replace('u/', '')}`;
    window.open(formattedRedditUrl, '_blank');
  } else if (lowerLinkName === 'pinterest' || cleanedBaseUrl.includes('pinterest.com')) {
    const formattedPinterestUrl = cleanedBaseUrl.startsWith('https://') 
      ? cleanedBaseUrl 
      : `https://www.pinterest.com/${cleanedBaseUrl.replace('@', '')}/`;
    window.open(formattedPinterestUrl, '_blank');
  } else if (lowerLinkName === 'youtube' || cleanedBaseUrl.includes('youtube.com')) {
    const formattedYouTubeUrl = cleanedBaseUrl.startsWith('https://') 
      ? cleanedBaseUrl 
      : `https://www.youtube.com/${cleanedBaseUrl.startsWith('channel') ? cleanedBaseUrl : `user/${cleanedBaseUrl}`}`;
    window.open(formattedYouTubeUrl, '_blank');
  } else {
    console.error('Invalid input:', cleanedBaseUrl);
  }
};











  
  
  
  
  
  

  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
  
        if (!userId) {
          console.error("No userId found in localStorage");
          setLoading(false);
          return;
        }
  
        const userRef = ref(database, `User/${userId}`);
        const snapshot = await get(userRef);
  
        if (snapshot.exists()) {
          setProfileData(snapshot.val());
          console.log("Fetched profileData:", snapshot.val()); // Log the fetched data
        } else {
          console.log("No data available for this userId:", userId);
        }
  
        // Fetch links data
        const linksRef = ref(database, 'SocialLinks');
        const linksSnapshot = await get(linksRef);
  
        if (linksSnapshot.exists()) {
          const allLinks = linksSnapshot.val();
          const userLinks = Object.values(allLinks).filter(link => link.uid === userId);
          setLinks(userLinks);
        } else {
          console.log("No links data available");
        }
  
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading state after data fetch (success or failure)
      }
    };
  
    fetchData();
  }, []);
 
  console.log(profileData)


const handlMoveLink=()=>{
navigate(`/home/Link`)
}

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Toggle handler to switch between lead and direct modes
  const handleToggle = (toggleId) => {
    setActiveToggle(prevId => (prevId === toggleId ? null : toggleId));
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  // Navigate to notifications page
  const handlenotifi = () => {
    navigate('/home/notifi');
  };

  // Function to return the appropriate icon based on id

  if (loading) {
    return (
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }




  return (

    <div className="ProfileContainer" >
      <div className="profile-design" style={{ paddingBottom: '0px' }}>
        {/* Navigation bar with logo and notification icon */}
        <nav className='nav' style={{ marginBottom: '10px' }}>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
          <div className="nav-icon">
            <FaBell onClick={handlenotifi} style={{ fontSize: '25px',cursor:'pointer' }} />
          </div>
        </nav>

        <div className="rel-div">

          {/* Profile images */}
          <img
            className='lady'
style={{objectFit:'cover'}}
            src={profileData.profilePicture || bitcc}  // Default profile image

          />
          <div>

          </div>
          <div style={{ width: '100%', height: '200px' }}>
            <div style={{ width: '100%' }}>
              <img
                className='main-img'
                src={profileData.backgroundPicture || bitc }  // Default cover image
            
                onLoad={handleImageLoad}
                style={{ display: imageLoading ? 'none' : 'block', width: '100%' }}
              />
              {imageLoading && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }}>
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>


          <div style={{ paddingLeft: "10px", position: 'relative' }}>
            {/* Edit profile icon */}
            <div style={{ position: "absolute", right: '0', paddingRight: "40px", top: '45px' }}>
              <AiFillEdit style={{ color: 'red', fontSize: "25px", cursor: "pointer" }}
                onClick={handleEditProfile} />
            </div>
            {/* Profile details */}
            <h2 style={{ color: 'red', margin: '5px' }}>
              {profileData?.name} <br />
              <span style={{ color: 'rgb(146, 146, 146)', fontWeight: '100', fontSize: '16px' }}> ({profileData.nickname})</span>
            </h2>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head' style={{ marginBottom: '0px' }}>{t("Username")}: <span style={{ fontWeight: '100', }} className='para'>{profileData.username}</span></h2>
            </div>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head'>{t("Designation")}:<span style={{ fontWeight: '100', margin: '53px' }} className='para'>{profileData.designation}</span></h2>
            </div>
            <div className="data" style={{ lineHeight: '0' }}>
              <h2 className='head'>Marital Status:
                <br /> <span style={{ marginLeft: '145px', fontWeight: '100' }} className='para'>{profileData.materialStatus}</span></h2>
            </div>
            <div className="data"
              style={{
                lineHeight: '1.5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'nowrap',
                gap: '10px'
              }}
            >
              <h2
                className="head"
                style={{
                  margin: '0px',
                  flex: '1 1 auto',
                  minWidth: '0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {("Company")}:
                <span
                  className="para"
                  style={{
                    fontWeight: '400',
                    paddingLeft: '8px',
                  }}
                >
                  {profileData.companyname}
                </span>
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2px auto' }}>
      
           
              <Card  />
            
          </div>

          <Photos />
          {/* <Contact /> */}



          <div className="ip-btn" data-aos="zoom-in" style={{ width: '100%' }}>
            <div className="n-head" style={{ fontSize: "18px" }}>
              <h3 style={{ cursor: "pointer" }} className="link-heading">Links</h3>
            </div>
            <div className="ii-btn">
              <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>



                <h2 className="mode-heading" style={{ marginLeft: 'rem', marginRight: '2px', fontSize: '15px' }}>Lead Mode</h2>
                <div className="toggle-container">
                  <input
                    type="checkbox"
                    id="toggle-lead"
                    className="toggle-input"
                    checked={activeToggle === 'lead'}
                    onChange={() => handleToggle('lead')}
                  />
                  <label htmlFor="toggle-lead" className="toggle-label"></label>
                </div>
              </div>
              <div className="ii-btn">
                <h2 className="mode-heading" style={{ marginRight: '2px', fontSize: '15px' }}>Direct Mode</h2>
                <div className="toggle-container">
                  <input
                    type="checkbox"
                    id="toggle-direct"
                    className="toggle-input"
                    checked={activeToggle === 'direct'}
                    onChange={() => handleToggle('direct')}
                  />
                  <label htmlFor="toggle-direct" className="toggle-label"></label>
                </div>

              </div>

            </div>
          </div>
       
 <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',  // 4 columns in the grid
  gap: '10px',  // Space between grid items
  padding: '10px',  // Space around the container
}}>

  {/* Add Button Section */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    flexDirection:"column",  // Center the button and text
    marginBottom: '10px',  // Space between button section and links
    gridColumn: 'span 1',  // Takes up the first column
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#E2E2E2',
      display: 'flex',
      alignItems: 'center',
      flexDirection:'column',
      justifyContent: 'center',
      // Space between button and text
    }}>
      <p style={{
        margin: '0',
        fontSize: '20px',
        cursor: 'pointer',
      }} onClick={handlMoveLink}>+</p>
    </div>
    <p style={{
   color:'#898787',
   fontSize:'12px'
      
    }}>
      Add
    </p>
  </div>

  {/* Render links */}
{links.map((link, index) => (
  <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px',cursor:"pointer" }}>
  <img 
  onClick={() => handleImageClick(link?.baseUrl, link?.name)} 
  src={ReturnIcon(link.id)} 
  alt={link?.name || 'Link'} 
  style={{ width: '50px', height: '50px' }} 
  onError={(e) => { e.target.src = 'path/to/default/image.png'; }} // Fallback on error
/>

    <span style={{ color: '#898787', fontSize: '12px' }}>{link?.name}</span>
  </div>
))}

 
  
</div>
<br /><br /><br />



          <Footer />
          <br /><br /><br />

        </div>
      </div>
    </div>
  );
}

export default Profile;