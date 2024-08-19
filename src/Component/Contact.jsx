import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import '../App.css';
import ipic from '../images/i-pic.jpeg';
import i2 from '../images/i-2.jpeg';
import i3 from '../images/i-3.jpeg';
import i4 from '../images/i-4.jpeg';

function Contact() {
  const navigate = useNavigate(); // Use the hook here

  const handleEditContact = () => {
    navigate('/edit-contact'); // Navigate to the edit-contact page
  };

  return (
    <div className='profile-design'>
      <div className="p-vContainer">
        <div className="data" style={{ display: 'flex', justifyContent: 'space-between',margin:'1rem' }}>
          <h2 className='head' style={{ fontSize: '22px', fontWeight: '100', color: 'rgb(238, 2, 0)' }}>Contact:</h2>
          <button style={{cursor:"pointer",fontSize:'12px',height:"30px",width:'70px',fontWeight:'100'}} className='seeAll' onClick={handleEditContact}>see all</button> {/* Attach the navigation function */}
        </div>
      </div>

      <div className="fields">
        <div className="inpt">
          <h1 style={{ textAlign: 'center', fontSize: '17px', height: '33px', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>+ADD</h1>
        </div>

        <div className="inpt2">
          <img className='i-pic' src={ipic} alt="i-pic" />
          <div className="handp" style={{ lineHeight: '0', marginLeft: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '17px', lineHeight: '1' }}>Michles</h1>
            <p style={{ color: 'rgb(207, 207, 207)' }}>mitchlor@gmail.com</p>
          </div>
        </div>

        <div className="inpt2">
          <img className='i-pic' src={i2} alt="i-2" />
          <div className="handp" style={{ lineHeight: '0', marginLeft: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '17px', lineHeight: '1' }}>Michles</h1>
            <p style={{ color: 'rgb(207, 207, 207)' }}>mitchlor@gmail.com</p>
          </div>
        </div>

        <div className="inpt2">
          <img className='i-pic' src={i3} alt="i-3" />
          <div className="handp" style={{ lineHeight: '0', marginLeft: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '17px', lineHeight: '1' }}>Michles</h1>
            <p style={{ color: 'rgb(207, 207, 207)' }}>mitchlor@gmail.com</p>
          </div>
        </div>

        <div className="inpt2">
          <img className='i-pic' src={i4} alt="i-4" />
          <div className="handp" style={{ lineHeight: '0', marginLeft: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '17px', lineHeight: '1' }}>Michles</h1>
            <p style={{ color: 'rgb(207, 207, 207)' }}>mitchlor@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
