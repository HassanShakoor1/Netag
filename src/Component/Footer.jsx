import React from 'react'
import { IoIosHome } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoIosQrScanner } from "react-icons/io";
import { IoNavigateOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import '../App.css'
import { useNavigate} from 'react-router-dom';
function Footer() {
  const navigate = useNavigate();


    
  const handleActivecard = () => {
    navigate('/active-card');
  };
  const handleHome = () => {
    navigate('/');
  };
  return (
    <div className='profile-design'>


         <div className="footer-Container">
           <div className="Footer">
              <div className="f-icons">
                <div className="h-icon">
                  <IoIosHome onClick={handleHome} style={{ color: 'red', fontSize: "30px",cursor:'pointer' }} />
                </div>
                <IoIosQrScanner onClick={handleActivecard} style={{ fontSize: '30px', marginTop: '20px',marginRight:'50px',cursor:'pointer' }} />
                <IoNavigateOutline style={{ fontSize: '30px', marginTop: '20px',marginRight:'40px' }} />
                <IoMdSettings style={{ fontSize: '30px', marginTop: '20px' }} />
                <div className="extra">
                   <div className='scn'>
<MdOutlineQrCodeScanner style={{fontSize:'40px',color:'wh'}}/>
                </div>
                </div>
               

              </div>
            </div>
        </div>
    </div>
  )
}

export default Footer