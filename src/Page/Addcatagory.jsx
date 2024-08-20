import React from 'react';
import './Addcatagory.css';
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import { useNavigate } from 'react-router-dom'; // Import the hook

function Addcatagory() {
  const navigate = useNavigate(); // Use the hook here
  const goback=()=>{
    navigate(-1);
  }
  return (
    <div className='AddcatagoryContainer'>

      <div className="Addcatagory-design">

      <div className="back-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <IoChevronBack onClick={goback} className="Gobck" style={{ paddingTop: '1.6rem', color: 'red', fontSize: '25px', paddingLeft: '15px', cursor: 'pointer' }} />
  <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100', position: 'absolute', left: '50%', transform: 'translateX(-50%)',marginTop:"3rem" }}>
    Product category
  </h4>
  <div style={{ width: '25px' }}></div> {/* Placeholder div to balance the flexbox */}
</div>

      
      <h3 style={{color:'red',fontWeight:'100',paddingLeft:'15px',fontSize:'20px'}}>Product</h3>
<div className="name-input">
    <p style={{paddingLeft:'15px',marginTop:"0px",marginBottom:"7px"}}>Name</p>
    <input style={{width:"98%",borderRadius:"20px",height:'30px',backgroundColor:'#F7F7F7',border:"none"}} type="text" placeholder='Oil Brand' />
</div>
<br /><br />

<div className="name-input2">
    <p style={{paddingLeft:'15px',marginTop:"0px",marginBottom:"7px"}}>Descreption</p>
    <textarea style={{width:"98%",borderRadius:"20px",backgroundColor:'#F7F7F7',outline:"none",border:"none",paddingBottom:"100px",paddingTop:"10px"}}
       
        placeholder="Type your message here..."
        className="custom-textarea"
      />
 
</div>

<br /><br />

<div className="AddCatagory-img">
<img style={{ display: "flex", justifyContent: 'center', alignItems: 'center', margin: "20px auto", paddingTop: "3rem", width: "70px",cursor:'pointer' }} src={edit} alt="lady" />
</div>
<br />
<button style={{width:"90%",color:"white",fontSize:"17px",height:'50px'}} className='save'>Create</button>

      </div>
    </div>
  );
}

export default Addcatagory;
