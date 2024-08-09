// EditProfile.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import { IoChevronBack } from "react-icons/io5";
import edit from '../images/edit.png';
import editcircle from '../images/editcircle.png';
import './Edit.css';
import '../App.css';
import nav from '../images/nav-img.png';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

function EditProfile() {
  const navigate = useNavigate(); // Use the hook here

  const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      borderRadius: '1rem',
      width: "100%",
      paddinLeft: "20px",
    },
  });

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="edit-profile">
        <nav className='nav'>
          <div className="bck" onClick={handleBack}>
            <IoChevronBack />
          </div>
          <div className="nav-logo">
            <img src={nav} alt="nav-img" />
          </div>
        </nav>

        {/* navvv end... */}

        <div className="rel-div" style={{ flexDirection: "column" }}>
          <div className='lady' style={{ top: "131px", backgroundColor: "#D9D9D9", border: '1px solid grey' }}>
            <img style={{ display: "flex", justifyContent: 'center', alignItems: 'center', margin: "20px auto", width: "50px" }} src={editcircle} alt="lady" />
          </div>
          <div>
            <div className='main-img' style={{ width: "100%", height: '300px', backgroundColor: "#D9D9D9" }}>
              <img style={{ display: "flex", justifyContent: 'center', alignItems: 'center', margin: "20px auto", paddingTop: "3rem", width: "70px" }} src={edit} alt="lady" />
            </div>
          </div>
        </div>

        <br /><br /><br />

        <div className="input-data">
          <div className="edit-field">
            <CustomTextField
              label="UserName"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />

            <CustomTextField
              label="Nickname"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </div>

          <div className="edit-field">
            <CustomTextField
              label="UserName"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />

            <CustomTextField
              label="Designation"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </div>

          <div className="edit-field">
            <CustomTextField
              label="Material status"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />

            <CustomTextField
              label="Company"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </div>
          <br /><br /><br /><br />
          <div className="btn-s">
            <button style={{ color: 'white',fontSize:"20px" }} className='save2'>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
