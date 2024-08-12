import React from 'react';
import { IoIosHome } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoIosQrScanner } from "react-icons/io";

import { IoMdSettings } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleActivecard = () => {
    navigate('/active-card');
  };
  const handleAnalytics = () => {
    navigate('/Analytics-page');
  };
  const handleSetting = () => {
    navigate('/setting-page');
  };

  const handleHome = () => {
    navigate('/');
  };

  // Define styles for each icon based on the current path
  const iconStyle = {
    fontSize: "30px",
    cursor: 'pointer',
    backgroundColor: 'transparent',
    padding: '5px', // Optional: to make the background color more noticeable
    borderRadius: '50%', // Optional: to make the background color circular
  };

  const scnnerStyle = {
    backgroundColor :"white",
  }
  const activeStyle = {
    ...iconStyle,
    backgroundColor:'rgb(226, 226, 226)',
    color:'red'
  };


  
  return (
    <div className='profile-design'>
      <div className="footer-Container">
        <div className="Footer">
          <div className="f-icons">
            <div className="h-icon">
              <IoIosHome
                onClick={handleHome}
                style={location.pathname === '/' ? activeStyle : iconStyle}
              />
            </div>
            <IoIosQrScanner
              onClick={handleActivecard}
              style={location.pathname === '/active-card' ? activeStyle : iconStyle}
            />
            <IoAnalyticsOutline 
            onClick={handleAnalytics}
              style={location.pathname === '/Analytics-page' ? activeStyle : iconStyle}
            />
            <IoMdSettings
            onClick={handleSetting}
              style={location.pathname === '/setting-page' ? activeStyle : iconStyle}
            />
            <div className="extra">
              <div className='scn'>
                <MdOutlineQrCodeScanner style={{ fontSize: '40px', color: 'white' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
