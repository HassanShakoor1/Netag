import React from 'react'
import { IoIosHome } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoIosQrScanner } from "react-icons/io";
import { IoNavigateOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import '../App.css'
function Footer() {
  return (
    <div className='profile-design'>


         <div className="footer-Container">
           <div className="Footer">
              <div className="f-icons">
                <div className="h-icon">
                  <IoIosHome style={{ color: 'red', fontSize: "30px" }} />
                </div>
                <IoIosQrScanner style={{ fontSize: '30px', marginTop: '20px',marginRight:'50px' }} />
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