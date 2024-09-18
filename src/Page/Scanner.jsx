import React, { useEffect } from 'react';
import Footer from '../Components/Footer';
import { IoChevronBack } from "react-icons/io5";
import { IoCopy } from "react-icons/io5"; // Import the copy icon
import './setting.css';
import { useNavigate,useLocation  } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { useState } from "react";
function Scanner() {

  const location = useLocation();
  const currentURL = `${window.location.origin}${location.pathname}`;

  console.log(currentURL)
     
  const [value, setValue] = useState("");
  const userid = localStorage.getItem("userId")
  const valueQrcode = () => {
    setValue(`${currentURL}/${userid}`)
  }
  useEffect(() => {
    valueQrcode()
  }, [])
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  }

  return (
    <div className="setting-container">
      <div className="setting-design" >
        <div className="bak-hed" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: "20px", marginLeft: "30px" }}>
          <IoChevronBack
            onClick={GoBack}
            style={{ fontSize: '22px', color: 'red', cursor: 'pointer', position: 'absolute', left: '0' }}
          />
          <p style={{ color: 'red', fontSize: '22px', margin: '0 auto' }}>
            QR Code
          </p>
        </div>


        <br /><br />

        <div className="saver">
          <span style={{ color: 'red' }}>Switch to the Offline mode</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="fun" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: "2px auto", alignItems: "center" }}>
          <h3 style={{ textAlign: 'center', color: 'red', width: '90%' }}>Scan QR Code</h3>
          <p style={{ textAlign: 'center', margin: '-13px', color: "rgb(119, 119, 119)", width: "90%" }}>Scan the QR Code to Share your Profile</p>
        </div>

        <br /><br />
        {/* <div className="qr-code-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://example.com" alt="QR Code" />
        </div> */}

        {/* <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div> */}
        
        <div style={{
  position: "relative",
  margin: "0 auto",
  maxWidth: 200,  // Adjust size of the container
  width: "100%",
  padding: 20,  // Space between the QR code and the container
}}>
  {/* Border corners */}
  <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none"
  }}>
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: 40,  // Adjust corner size
      height: 40,
      borderTopWidth: "1.5px",
      borderTopStyle: "solid",
      borderTopColor: "black",
      borderLeftWidth: "1.5px",
      borderLeftStyle: "solid",
      borderLeftColor: "black"
    }}></div>
    <div style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: 40,
      height: 40,
      borderTopWidth: "1.5px",
      borderTopStyle: "solid",
      borderTopColor: "black",
      borderRightWidth: "1.5px",
      borderRightStyle: "solid",
      borderRightColor: "black"
    }}></div>
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 40,
      height: 40,
      borderBottomWidth: "1.5px",
      borderBottomStyle: "solid",
      borderBottomColor: "black",
      borderLeftWidth: "1.5px",
      borderLeftStyle: "solid",
      borderLeftColor: "black"
    }}></div>
    <div style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      borderBottomWidth: "1.5px",
      borderBottomStyle: "solid",
      borderBottomColor: "black",
      borderRightWidth: "1.5px",
      borderRightStyle: "solid",
      borderRightColor: "black"
    }}></div>
  </div>

  {/* QR Code without border */}
  <QRCode
    size={256}  // Size of the QR code
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={value}
    viewBox={`0 0 256 256`}
  />
</div>






        <br /><br />


        <div style={{
          width: "80%",
          maxWidth: "100%", // Ensure the width doesn't exceed the screen size
          height: '35px', // Keep the height fixed
          alignItems: "center",
          backgroundColor: "rgb(239, 239, 239)",
          color: "rgb(119, 119, 119)",
          borderRadius: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          margin: "2px auto",
          boxSizing: 'border-box', // Include padding in width and height calculations
          overflow: 'hidden' // Prevent overflow issues
        }} className="http">
          <p style={{
            margin: '0',
            padding: '0px 10px',
            overflow: 'hidden', // Hide any overflowing text
            textOverflow: 'ellipsis', // Add ellipsis to long text
            whiteSpace: 'nowrap', // Prevent text wrapping
            flex: '1' // Allow text to take up available space
          }}>
            {value}
          </p>
          <button style={{
            width: '100px',
            borderRadius: '20px',
            height: '100%',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgb(233, 52, 40)',
            color: 'white',
            border: "none",
            cursor: 'pointer',
            fontSize: '16px',
            flexShrink: '0' // Prevent the button from shrinking
          }} className='copy-btn'  onClick={()=>{navigator.clipboard.writeText(value)}}>
            <IoCopy style={{ marginRight: '5px' }} />
            copy
          </button>
        </div>







        <br /><br /><br /><br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2px auto', color: 'white', fontSize: '20px', width: '80%', height: '60px', borderRadius: '23px', boxShadow: 'none' }} className="save">Share Qr Code</div>
      </div>
      <br /><br /><br />
      <Footer />
    </div>
  );
}

export default Scanner;
