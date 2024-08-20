import React from 'react'
import { useNavigate } from 'react-router-dom'

function Array({prp,text,path}) {
  const navigate = useNavigate(); // Correctly use the hook inside the component

  const handleNavigate = () => {
    navigate(path);
  }
  const handlManageorder = () => {
    navigate('/home/order');
  };
  return (
    <div style={{
        width:"100%"
    }}>


 <div className="row" >
     <div className="col"  style={{width:"120px",height:'120px'}}>
   <div className="div">
     <div onClick={handleNavigate} className="col-icon">
     
       <img style={{cursor:'pointer'}} src={prp} alt="set-icon"  />
     </div>
   </div>
   <p style={{ textAlign: 'center', color: '#E93428', fontWeight: 'bold',fontSize:"10px" }}>{text}</p>
 </div>
 </div>



    </div>
  )
}

export default Array;