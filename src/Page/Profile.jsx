// Profile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
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
import nav from '../images/nav-img.png';
import Card from '../Components/Card';


function Profile() {
  const navigate = useNavigate(); // Use the hook here
  const links = [
    { id: 1, imageUrl: whatsapp, linkName: "Call", place: "Enter fon number", instruction: "Enter your Fon Number" },
    { id: 2, imageUrl: call, linkName: "whatsapp", place: "Enter whatsapp number", instruction: "Enter your Whatsapp Number" },
    { id: 3, imageUrl: fb, linkName: "facebook", place: "Enter facebook Url", instruction: "Enter your Facebook Url" },
    { id: 4, imageUrl: mail, linkName: "Mail", place: "Enter your Email", instruction: "Enter your Email" },
    { id: 5, imageUrl: instas, linkName: "insta", place: "Enter Username", instruction: "Enter your Username" },
    { id: 6, imageUrl: website, linkName: "website", place: "Enter Website Url", instruction: "Enter your Website Url" },
    { id: 7, imageUrl: snap, linkName: "snapchat", place: "Enter Username", instruction: "Enter your Username" },
    { id: 8, imageUrl: add, linkName: "", place: "", instruction: "Add new Links" },
  ];




  const [setting, setSetting] = useState(false);
  const [linkdata, setLinkdata] = useState(null);
  const [activeToggle, setActiveToggle] = useState(null);


  const handleToggle = (toggleId) => {
    setActiveToggle(prevId => (prevId === toggleId ? null : toggleId));
  };

  const handleSlide = (link) => {
    setLinkdata(link);
    setSetting(!setting);
  };

  // const handleToggle = () => {
  //   setIsChecked(!isChecked);
  //   console.log(`Toggle is ${!isChecked ? 'ON' : 'OFF'}`);
  //   console.log("hello");
  // };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  // const handleEditproduct = () => {
  //   navigate('/edit-product');
  // };
  const handlenotifi = () => {
    navigate('/home/notifi');
  };



  let ReturnIcon = (id) => {
    if (id === 1) {
      return whatsapp;
    } else if (id === 2) {
      return call;
    } else if (id === 3) {
      return fb;
    } else if (id === 4) {
      return mail;
    } else if (id === 5) {
      return instas;
    } else if (id === 6) {
      return website;
    } else if (id === 7) {
      return snap;
    } else if (id === 8) {
      return add;
    }
  }

  return (
    <div className="ProfileContainer">
      <div className="profile-design" style={{ paddingBottom: '0px' }}>
        <nav className='nav' style={{marginBottom:'10px'}}>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>

          <div className="nav-icon" >

            <FaBell onClick={handlenotifi} style={{ fontSize: '25px' }} />

          </div>
        </nav>

        {/* nav-completed */}

        <div className="rel-div">
          <div>
            <img className='lady' src={circle} alt="lady" />
          </div>
          <div>
            <img className='main-img' src={main} alt="main-img" />
          </div>
          <div style={{ paddingLeft: "10px", position: 'relative' }}>

            <div style={{ position: "absolute", right: '0', paddingRight: "40px", top: '45px' }}>

              <AiFillEdit style={{ color: 'red', fontSize: "25px", cursor: "pointer" }}
                onClick={handleEditProfile} />



            </div>

            <h2 style={{ color: 'red', margin: '5px' }}>
              Master Burdener <br />
              <span style={{ color: 'rgb(146, 146, 146)', fontWeight: '100', fontSize: '16px' }}> (Burden)</span>
            </h2>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head' style={{ marginBottom: '0px' }}>Username: <span style={{ fontWeight: '100', }} className='para'>@Hassan</span></h2>
            </div>
            <div className="data" style={{ lineHeight: '1' }}>
              <h2 className='head' >Designation:<span style={{ fontWeight: '100', margin: '53px' }} className='para'>Software Developer</span></h2>
            </div>
            <div className="data" style={{ lineHeight: '0' }}>
              <h2 className='head'>Marital Status:
                <br /> <span style={{ marginLeft: '145px', fontWeight: '100' }} className='para'>Married</span></h2>
            </div>


            <div
              className="data"
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
                  Avicenna Enterprises Solution
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
          <Contact />

<br /><br /><br /><br /><br /><br /><br />

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




          <br /><br />

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