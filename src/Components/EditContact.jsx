import React from 'react'
import './EditContact.css'
import { IoChevronBack } from "react-icons/io5";
import video from '../images/video.png';
import { useNavigate } from 'react-router-dom'; // Import the hook
import editcontact from '../images/editcontact.png';
function EditContact() {
    const navigate = useNavigate(); // Use the hook here

    const handlegoBack = () => {
        navigate('/home');
      };
  return (
    <div className="Editcontainer">
    
        <div className="edit-Contact">

        <nav className='nav2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
  <IoChevronBack 
    onClick={handlegoBack} 
    style={{ color: "red", fontSize: "25px", cursor: 'pointer', position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
  />
  <p style={{ fontSize: '20px', color: 'red', margin: '0' }}>
    Photos and Videos
  </p>
</nav>


<br />
<div className="Upload-p" >
    <h2 >Upload Photo</h2>

<div className="upload-1">
   
   <div className="img-btn">

   <img style={{width:"40px",display:"flex",justifyContent:"center",margin:"20px auto"}} src={editcontact} alt="nav-img" />
   <button style={{display:"flex",justifyContent:"center",margin:"20px auto",alignItems:"center"}} className='save22'>Upload</button>

   </div>
</div>
 <div class="grid-container">
        <div class="grid-item">
        <img style={{width:"40px",display:"flex",justifyContent:"center",margin:"20px auto",marginBottom:"2rem"}} src={editcontact} alt="nav-img" />
        </div>
        <div class="grid-item">
        <img style={{width:"40px",display:"flex",justifyContent:"center",margin:"20px auto"}} src={editcontact} alt="nav-img" />
        </div>
        <div class="grid-item">
        <img style={{width:"40px",display:"flex",justifyContent:"center",margin:"20px auto"}} src={editcontact} alt="nav-img" />
        </div>
    </div>
</div>




<div style={{marginTop:"20px"}} className="Upload-p" >
    <h2 >Upload Videos</h2>

<div className="upload-1">
   
   <div className="img-btn">

   <img style={{width:"40px",display:"flex",justifyContent:"center",margin:"20px auto",paddingTop:"5px"}} src={video} alt="nav-img" />
   <button style={{display:"flex",justifyContent:"center",margin:"20px auto",alignItems:"center"}} className='save22'>Upload</button>

   </div>
</div>
</div>
<br /><br />
        </div>

        
    </div>
  )
}

export default EditContact