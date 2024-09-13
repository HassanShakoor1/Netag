import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import '../App.css';
import './Slide.css';
import { AiFillEdit } from "react-icons/ai";
import Photos from '../Components/Photos';
import Footer from '../Components/Footer';
import circle from '../images/circle.png';
import main from '../images/main.jpeg';
import nav from '../images/nav.png';
import Card from '../Components/Card';
import { ref, get } from 'firebase/database'; // Import 'ref' and 'get' directly from 'firebase/database'
import { database } from '../firebase.jsx'; // Import the initialized database
import CircularProgress from '@mui/material/CircularProgress'; // Import the loader component
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'

// <<<<<<< HEAD
>>>>>>> d3ff043 (new commit)
import { useTranslation } from 'react-i18next';

function Profile() {
  const navigate = useNavigate();

<<<<<<< HEAD
  
 
=======
  const [socialLinks, setSocialLink] = useState([])
  const { t } = useTranslation()


  // Array of link objects to display
  // const links = [
  //   { id: 1, imageUrl: whatsapp, linkName: "Call", place: "Enter phone number", instruction: "Enter your Phone Number" },
  //   { id: 2, imageUrl: call, linkName: "Whatsapp", place: "Enter whatsapp number", instruction: "Enter your Whatsapp Number" },
  //   { id: 3, imageUrl: fb, linkName: "Facebook", place: "Enter Facebook URL", instruction: "Enter your Facebook URL" },
  //   { id: 4, imageUrl: mail, linkName: "Mail", place: "Enter your Email", instruction: "Enter your Email" },
  //   { id: 5, imageUrl: instas, linkName: "Instagram", place: "Enter Username", instruction: "Enter your Username" },
  //   { id: 6, imageUrl: website, linkName: "Website", place: "Enter Website URL", instruction: "Enter your Website URL" },
  //   { id: 7, imageUrl: snap, linkName: "Snapchat", place: "Enter Username", instruction: "Enter your Username" },
  //   { id: 8, imageUrl: add, linkName: "", place: "", instruction: "Add new Links" },
  // ];

>>>>>>> d3ff043 (new commit)
  const [loading, setLoading] = useState(true); // State for loading
  const [links, setLinks] = useState([]); // State to store fetched links

  const [activeToggle, setActiveToggle] = useState(null); // State to manage active toggle
  const [profileData, setProfileData] = useState({
<<<<<<< HEAD
  
  })
  // Fetch profile data from localStorage\
  const userId = localStorage.getItem('userId'); // Get the UID from localStorage
=======
    // <<<<<<< HEAD
    username: '',
    nickname: '',
    status: '',
    company: '',
    designation: '',
    ladyImgUrl: '',
    mainImgUrl: ''
  })
  // Fetch profile data from localStorage\
  // const [loading, setLoading] = useState(true); // State for loading


  // Get the UID from localStorage

  const userId = localStorage.getItem('userId');

  // useEffect(() => {
  // getting user data from firebase to home page 
  // const fetchData = async () => {

  // if (!userId) {
  //   console.log('No UID found in localStorage');
  //   return;
  // }

  // const dbRef = ref(database, `Users/${userId}`); // Fetch user-specific data
  // try {
  //   const snapshot = await get(dbRef);
  //   if (snapshot.exists()) {
  //     setProfileData(snapshot.val()); // Set fetched data
  //   } else {
  //     console.log('No data available');
  //   }
  // }
  // =======
  //   username: '@username',
  //   nickname: 'Burden',
  //   status: 'Married...',
  //   company: 'your company',
  //   designation: 'copmany',
  //   profile: '',
  //   cover: ''
  // })
  // Fetch profile data from localStorage\
  // const userId = localStorage.getItem('userId'); // Get the UID from localStorage
>>>>>>> d3ff043 (new commit)

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
=======
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

>>>>>>> d3ff043 (new commit)
        if (!userId) {
          console.error("No userId found in localStorage");
          setLoading(false);
          return;
        }

        const userRef = ref(database, `User/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setProfileData(snapshot.val());
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
<<<<<<< HEAD
        setLoading(false);
=======
        setLoading(false); // End loading state after data fetch (success or failure)
        // >>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503
>>>>>>> d3ff043 (new commit)
      }
    };

    {/* ----------------------------reading/getting data from firebase---------------------------- */ }
    const fetchedData = async () => {

      const dataRef = ref(database, 'SocialLinks')
      const snapshot = await get(dataRef)
      const data = snapshot.val()
      console.log(data)

      const arr = Object.keys(data).filter(key => data[key].uid === userId)
        .map(key => ({
          id: key,
          ...data[key]
        }
        )
        )

      console.log("social links data",arr)
      setSocialLink(arr)
    }

    fetchData();
<<<<<<< HEAD
  }, [userId]);



  const handleImageClick = (url) => {
    if (url) {
      // Check if the URL contains an '@' to handle email links
      if (url.includes('@')) {
        const mailtoLink = url.startsWith('mailto:') ? url : `mailto:${url}`;
        window.location.href = mailtoLink; // Opens the default mail client
      } 
      // Check if the URL is a number to handle phone numbers
      else if (/^\d+$/.test(url)) {
        const telLink = `tel:${url}`;
        window.location.href = telLink; // Opens the dial pad
      } 
      // Check if the URL is a Snapchat link
      else if (url.includes('snapchat.com/add/')) {
        window.open(url, '_blank', 'noopener,noreferrer'); // Opens Snapchat link
      } 
      // Handle regular URLs
      else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else {
      console.error('URL is not defined');
    }
  };
  
  
  
=======
    fetchedData()
  }, []);




  // // <<<<<<< HEAD
  //   fetchData();
  // }, []);
  console.log(profileData)
  // =======
>>>>>>> d3ff043 (new commit)


  
  


const handlMoveLink=()=>{
navigate(`/home/Link`)
}


<<<<<<< HEAD
const [imageLoading, setImageLoading] = useState(true);
=======



  // >>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503
  const [imageLoading, setImageLoading] = useState(true);
>>>>>>> d3ff043 (new commit)

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Toggle handler to switch between lead and direct modes
  const handleToggle = (toggleId) => {
    setActiveToggle(prevId => (prevId === toggleId ? null : toggleId));
  };

  // Handler to toggle slide visibility and set link data
 

  // Navigate to the Edit Profile page
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
<<<<<<< HEAD
  className='lady'
 style={{display: imageLoading ? 'none' : 'block',objectFit:"cover"}}
  src={profileData.profilePicture || circle}  // Default profile image
  alt="lady"
 
/>
<div>
  
</div>
<div style={{width:'100%',height:'200px',background:'transparent'}}>
  <div style={{  width: '100%' }}>
            <img
              className='main-img'
              src={profileData.backgroundPicture || main}  // Default cover image
              alt="main-img"
              onLoad={handleImageLoad}
              style={{ display: imageLoading ? 'none' : 'block', width: '100%',objectFit:"cover" }}
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
=======
            className='lady'

            src={profileData.profile || circle}  // Default profile image
            alt="lady"

          />
          <div>

          </div>
          <div style={{ width: '100%', height: '200px', background: 'transparent' }}>
            <div style={{ width: '100%' }}>
              <img
                className='main-img'
                src={profileData.cover || main}  // Default cover image
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
>>>>>>> d3ff043 (new commit)
          </div>


          <div style={{ paddingLeft: "10px", position: 'relative' }}>
            {/* Edit profile icon */}
            <div style={{ position: "absolute", right: '0', paddingRight: "40px", top: '45px' }}>
              <AiFillEdit style={{ color: 'red', fontSize: "25px", cursor: "pointer" }}
                onClick={handleEditProfile} />
            </div>
            {/* Profile details */}
            <h2 style={{ color: 'red', margin: '5px' }}>
              {profileData?.username} <br />
              <span style={{ color: 'rgb(146, 146, 146)', fontWeight: '100', fontSize: '16px' }}> ({profileData.nickname})</span>
            </h2>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head' style={{ marginBottom: '0px' }}>{t("Username")}: <span style={{ fontWeight: '100', }} className='para'>{profileData.name}</span></h2>
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
                {t("Company")}:
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
            <div style={{ width: "99%" }}>
              <Card />
            </div>
          </div>

          <Photos />
          {/* <Contact /> */}



          <div className="ip-btn" style={{ width: '100%' }}>
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



<<<<<<< HEAD
{/* Fetching Links from Links FIle */}
  
=======

          <br /><br /><br />
          {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
                <div style={{ width: "90%", display: "flex", flexWrap: "wrap", gap: "1rem", }}>
                  {
                    socialLinks.map((x, index) => {
                      return (
                        <div style={{ width: "20%", marginBottom: "1rem" }} key={index}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div>
                              <img src={x.image} alt=""  />
                            </div>
                            <div style={{ fontSize: "10px", marginTop: "5px" }}>
                              {x.name}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div> */}
          <div className="i-menu" >
            <div className="menus">
              {/* <Slide style={{ width: "96%" }} in={setting} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }}>
                <div className="slide_main_div relative">
                  <IconOpener handleSlide={handleSlide} ReturnIcon={ReturnIcon} linkdata={linkdata} />
                </div>
              </Slide> */}

              {/* {links.map(link => (
                <div key={link.id} className="fon" style={{ margin: 0, padding: 0 }}>
                  <img src={link.imageUrl} alt={link.linkName} onClick={() => handleSlide(link)} />
                  <p style={{ fontSize: '12px' }}>{link.linkName}</p>
                </div>
              ))} */}

              
     <div>

          
              </div>
            </div>
          </div>
>>>>>>> d3ff043 (new commit)


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
  <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
    <img onClick={() => handleImageClick(link?.baseUrl)} src={link?.image} alt={link?.name || 'Link'} style={{ width: '50px', height: '50px' }} />
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