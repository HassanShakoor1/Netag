import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import '../App.css';
import './Slide.css';
import { AiFillEdit } from "react-icons/ai";
import Photos from '../Components/Photos';
import Contact from '../Components/Contact';
import Slide from '@mui/material/Slide';
import IconOpener from './IconOpener';
import Footer from '../Components/Footer';
import whatsapp from '../images/whatsapp.png';
import call from '../images/call.png';
import fb from '../images/fb.png';
import mail from '../images/mail.png';
import website from '../images/website.png';
import snap from '../images/snap.png';
import add from '../images/add.png';
import instas from '../images/instas.png';
import circle from '../images/circle.png';
import main from '../images/main.jpeg';
import nav from '../images/nav.png';
import Card from '../Components/Card';
import { ref, get } from 'firebase/database'; // Import 'ref' and 'get' directly from 'firebase/database'
import { database } from '../firebase.jsx'; // Import the initialized database
import CircularProgress from '@mui/material/CircularProgress'; // Import the loader component


function Profile() {
  const navigate = useNavigate();

  
  // Array of link objects to display
  const links = [
    { id: 1, imageUrl: whatsapp, linkName: "Call", place: "Enter phone number", instruction: "Enter your Phone Number" },
    { id: 2, imageUrl: call, linkName: "Whatsapp", place: "Enter whatsapp number", instruction: "Enter your Whatsapp Number" },
    { id: 3, imageUrl: fb, linkName: "Facebook", place: "Enter Facebook URL", instruction: "Enter your Facebook URL" },
    { id: 4, imageUrl: mail, linkName: "Mail", place: "Enter your Email", instruction: "Enter your Email" },
    { id: 5, imageUrl: instas, linkName: "Instagram", place: "Enter Username", instruction: "Enter your Username" },
    { id: 6, imageUrl: website, linkName: "Website", place: "Enter Website URL", instruction: "Enter your Website URL" },
    { id: 7, imageUrl: snap, linkName: "Snapchat", place: "Enter Username", instruction: "Enter your Username" },
    { id: 8, imageUrl: add, linkName: "", place: "", instruction: "Add new Links" },
  ];

  const [loading, setLoading] = useState(true); // State for loading
  const [setting, setSetting] = useState(false); // State to manage Slide component visibility
  const [linkdata, setLinkdata] = useState(null); // State to store currently selected link data
  const [activeToggle, setActiveToggle] = useState(null); // State to manage active toggle
  const [profileData, setProfileData] = useState({
    username: '@username',
    nickname: 'Burden',
    status: 'Married...',
    company: 'your company',
    designation: 'copmany',
    ladyImgUrl: '',
    mainImgUrl: ''
  })
  // Fetch profile data from localStorage\
  const userId = localStorage.getItem('userId'); // Get the UID from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        
        if (!userId) {
          console.error("No userId found in localStorage");
          setLoading(false); // End loading state if no userId is found
          return;
        }

        // Fetch data for the specific userId
        const userRef = ref(database, `User/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setProfileData(snapshot.val()); // Set the profile data
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading state after data fetch (success or failure)
      }
    };

    fetchData();
  }, []);




  
  
  




const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Toggle handler to switch between lead and direct modes
  const handleToggle = (toggleId) => {
    setActiveToggle(prevId => (prevId === toggleId ? null : toggleId));
  };

  // Handler to toggle slide visibility and set link data
  const handleSlide = (link) => {
    setLinkdata(link);
    setSetting(!setting);
  };

  // Navigate to the Edit Profile page
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  // Navigate to notifications page
  const handlenotifi = () => {
    navigate('/home/notifi');
  };

  // Function to return the appropriate icon based on id
  const ReturnIcon = (id) => {
    switch (id) {
      case 1: return whatsapp;
      case 2: return call;
      case 3: return fb;
      case 4: return mail;
      case 5: return instas;
      case 6: return website;
      case 7: return snap;
      case 8: return add;
      default: return null;
    }
  }
  if (loading) {
    return (
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    
    <div className="ProfileContainer">
      <div className="profile-design" style={{ paddingBottom: '0px' }}>
        {/* Navigation bar with logo and notification icon */}
        <nav className='nav' style={{ marginBottom: '10px' }}>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
          <div className="nav-icon">
            <FaBell onClick={handlenotifi} style={{ fontSize: '25px' }} />
          </div>
        </nav>

        <div className="rel-div">
        
          {/* Profile images */}
          <img
  className='lady'
 
  src={profileData.ladyImgUrl || circle}  // Default profile image
  alt="lady"
 
/>
<div>
  
</div>
<div style={{width:'100%',height:'200px',background:'transparent'}}>
  <div style={{  width: '100%' }}>
            <img
              className='main-img'
              src={profileData.mainImgUrl || main}  // Default cover image
              alt="main-img"
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
              {profileData.username} <br />
              <span style={{ color: 'rgb(146, 146, 146)', fontWeight: '100', fontSize: '16px' }}> ({profileData.nickname})</span>
            </h2>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head' style={{ marginBottom: '0px' }}>Username: <span style={{ fontWeight: '100', }} className='para'>{profileData.username}</span></h2>
            </div>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head'>Designation:<span style={{ fontWeight: '100', margin: '53px' }} className='para'>{profileData.designation}</span></h2>
            </div>
            <div className="data" style={{ lineHeight: '0' }}>
              <h2 className='head'>Marital Status:
                <br /> <span style={{ marginLeft: '145px', fontWeight: '100' }} className='para'>{profileData.status}</span></h2>
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
                Company:
                <span
                  className="para"
                  style={{
                    fontWeight: '400',
                    paddingLeft: '8px',
                  }}
                >
                  {profileData.company}
                </span>
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2px auto' }}>
            <div style={{ width: "99%" }}>
              <Card />
            </div>
          </div>

          <Photos />
          {/* <Contact /> */}



          <div className="ip-btn" style={{width:'100%'}}>
            <div className="n-head" style={{  fontSize: "18px" }}>
              <h3 style={{ cursor: "pointer" }} className="link-heading">Links</h3>
            </div>
            <div className="ii-btn">
            <div style={{display:"flex",justifyContent:'space-between',alignItems:'center',padding:'10px'}}>



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




          <br /><br /><br />

          <div className="i-menu" >
            <div className="menus">
              <Slide style={{ width: "96%" }} in={setting} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }}>
                <div className="slide_main_div relative">
                  <IconOpener handleSlide={handleSlide} ReturnIcon={ReturnIcon} linkdata={linkdata} />
                </div>
              </Slide>

              {links.map(link => (
                <div key={link.id} className="fon" style={{ margin: 0, padding: 0 }}>
                  <img src={link.imageUrl} alt={link.linkName} onClick={() => handleSlide(link)} />
                  <p style={{ fontSize: '12px' }}>{link.linkName}</p>
                </div>
              ))}
            </div>
          </div>




          <Footer />
          <br /><br /><br />

        </div>
      </div>
    </div>
  );
}

export default Profile;