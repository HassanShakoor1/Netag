import React, { useState } from 'react';
import './IconOpener.css';
import { IoChevronBack } from "react-icons/io5";
import crox from '../images/crox.png';

function IconOpener({ handleSlide, linkdata, ReturnIcon }) {
  const [hideDAta, setHideData] = useState(false);
console.log(linkdata)
  const showhide = () => {
  
 setHideData(prev => !prev);
  };

  return (
    <>
      {!hideDAta ? (
        <div className="all">
          <div className="Icon-nav">
            <div className="crox-dlt">
              <div className="x-space">
                <img style={{ width: "13px" }} src={crox} alt="X" onClick={handleSlide} />
              </div>
              <p style={{ fontSize: '16px', color: "#EE0000", marginRight: "20px" }}>Delete</p>
            </div>
          </div>
          
          <br /><br />

          <div className='image-section'>
            <img style={{ width: '100px' }} src={ReturnIcon(linkdata?.id)} alt="icon" />
          </div>
          <h3 style={{ textAlign: "center", fontWeight: '200', fontSize: '22px', lineHeight: '0' }}>
            {linkdata?.linkName}
          </h3>
          <br /><br />

          <div className="input-q">
            <input className='quest' type="text" placeholder={linkdata?.place} />
            <div onClick={showhide} className="x-space2" style={{ color: "red", fontSize: "25px", fontWeight: "600", border: '1px solid #DADADA', cursor: 'pointer' }}>
              ?
            </div>
          </div>
          <br /><br />
          
          <div className="two-btns">
            <button onClick={handleSlide} className='cancel'>Cancel</button>
            <button className='save'>Save</button>
            <br /><br /><br />
            <br /><br /><br />
          </div>
        </div>



      ) : (
        <div className="new-data" style={{marginBottom:"20rem"}}>
     
 <div onClick={showhide} className="x-space22" style={{ color: "red", fontSize: "25px", fontWeight: "600", cursor: 'pointer' }}>
 <IoChevronBack />
            </div>
            <h1 style={{color:"#DE3227",paddingLeft:"20px"}}>Instructions:</h1>

  <h3 style={{textAlign:"center",fontWeight:'100'} }> <li> {linkdata?.instruction}  </li></h3>

  <input style={{display:'flex',justifyContent:"center",margin:'20px auto',width:"60%",height:'30px',borderRadius:'10px',outline:'none',border:'1px solid grey'}} type="text" placeholder={linkdata?.instruction} />
 
            
            
    
       
          </div>


         
        
      )}
    </>
  );
}

export default IconOpener;
