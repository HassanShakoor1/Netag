import React from 'react';
import Footer from '../Component/Footer';
import { IoChevronBack } from "react-icons/io5";
import { IoCopy } from "react-icons/io5"; // Import the copy icon
import './Setting.css';
import { useNavigate} from 'react-router-dom';
function Scanner() {
  const navigate = useNavigate();

const GoBack=()=>{
  navigate(-1);
}

  return (
    <div className="setting-container">
      <div className="setting-design" >
        <div className="bak-hed">
          <IoChevronBack onClick={GoBack} style={{ fontSize: '22px', color: 'red',cursor:'pointer' }} />
          <p style={{ marginLeft: '7rem', color: 'red', fontSize: '22px' }}>QR Code</p>
        </div>

        <br /><br />

        <div className="saver">
          <span style={{ color: 'red' }}>Switch to the Offline mode</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>

<div className="fun" style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:"2px auto",alignItems:"center"}}>
            <h3 style={{ textAlign: 'center', color: 'red',width:'90%' }}>Scan QR Code</h3>
        <p style={{ textAlign: 'center', margin: '-13px', color: "rgb(119, 119, 119)" ,width:"90%"}}>Scan the QR Code to Share your Profile</p>
</div>

        <br /><br />
        <div className="qr-code-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://example.com" alt="QR Code" />
        </div>
        <br /><br />

        <div style={{
          width: "80%",
          height: '35px',
          alignItems: "center",
          backgroundColor: "rgb(239, 239, 239)",
          color: "rgb(119, 119, 119)",
          borderRadius: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          margin: "2px auto",
        }} className="http">
          <p style={{ margin: '0', padding: '0px 10px' }}>http//netag.co/hash/Odherb6t/1</p>
          <button style={{
            width: '100px',
            borderRadius: '20px',
            height: '100%',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgb(233, 52, 40)',
            color: 'white',
            border:"none",
            cursor:'pointer',
            fontSize: '16px' // Ensure the icon and text are appropriately sized
          }} className='copy-btn'>
            <IoCopy style={{ marginRight: '5px' }} /> {/* Icon before text */}
            copy
          </button>
        </div>
<br /><br /><br /><br />
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'2px auto',color:'white',fontSize:'20px',width:'80%',height:'60px',borderRadius:'23px',boxShadow:'none'}} className="save">Share Qr Code</div>
      </div>
<br /><br /><br />
      <Footer />
    </div>
  );
}

export default Scanner;
