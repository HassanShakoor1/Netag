import vector from "../images/Vector.svg"
import search from "../images/search.png"
import doctor1 from "../images/doctor1.svg"
import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pic4 from "../images/pic4.svg"
import { useNavigate } from "react-router-dom";
// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "300",
  bgcolor: '#F5F5F5',
  // border: '2px solid #000',
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,

};




const options = [
  { text: 'Edit Category', color: '#7C7C7C' }, // Change color as needed
  { text: 'Delete Category', color: '#EE0000' } // Change color as needed
];

const ITEM_HEIGHT = 48;

function Managecategories() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ pic: '', title: '', explain: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);



  const handleOpen = (pic, title, explain) => {
    setModalContent({ pic, title, explain });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
const goback=()=>{
  navigate(-1);
}


  const arr = [
    {
      pic: doctor1,
      title: "Mental Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
    },
    {
      pic: pic4,
      title: "Lungs Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
    },
    {
      pic: doctor1,
      title: "Mental Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
    },
    {
      pic: pic4,
      title: "Lungs Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
    },
    {
      pic: doctor1,
      title: "Mental Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
    },
    {
      pic: pic4,
      title: "Lungs Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
    },
    {
      pic: doctor1,
      title: "Mental Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
    },
    {
      pic: pic4,
      title: "Lungs Health",
      explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
    }
  ]

  return (
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">

            {/* top */}
            {/* <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div>
                  <img onClick={goback} style={{cursor:'pointer'}} src={vector} alt="" />
                </div>
                <div style={{ color: "#EE0000", fontWeight: "500", width: "80%" }}>
                  Manage Service Categories
                </div>

              </div>
            </div> */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div>
                        <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
                    </div>
                    <div style={{ color: "#EE0000", fontWeight: "500",  }}>
                    Manage Service Categories
                    </div>
                    <div></div>
                </div>
            {/* input  */}
            <div className="categories-input">
              <div style={{ width: "23%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <img src={search} alt="" />
                </div>
                <div style={{ color: "#929292" }}>
                  search
                </div>
              </div>

            </div>

            {arr.map((x, id) => (
              <div className="managecategories-card" key={id}>
                <div className="cardcenter">
                  <div className="cardcenter-width" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '80%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '100%' }}>
                          {/* Image */}
                          <div>
                            <img
                              src={x.pic}
                              alt=""
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleOpen(x.pic, x.title, x.explain)}
                            />
                          </div>

                          {/* Title */}
                          <div style={{ width: '70%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '18px', color: '#EE0000' }}>{x.title}</div>
                              <div style={{ fontSize: '8px', color: '#777777' }}>{x.explain}</div>
                            </div>
                          </div>

                        </div>
                      </div>
                      {/* Menu Button */}
                      <div>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={openMenu ? 'long-menu' : undefined}
                          aria-expanded={openMenu ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleMenuClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={openMenu}
                          onClose={handleMenuClose}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: '15ch',
                              boxShadow: '-2px 3px 8.6px rgba(0, 0, 0, 0.25)', // Custom shadow
                            },
                          }}
                        >
                          {options.map((option, index) => (
                            <MenuItem
                              key={option.text}
                              style={{
                                color: option.color, // Set the color of each item
                                borderBottom: index < options.length - 1 ? '1px solid #ddd' : 'none', // Line between items
                                fontSize: '12px',
                              }}
                              onClick={handleMenuClose}
                            >
                              {option.text}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={modalContent.pic} alt="" style={{ width: '100%', height: 'auto' }} />
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '1rem', fontSize: '18px', color: '#EE0000', fontWeight: "600" }}>
                  {modalContent.title}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '10px', fontSize: '8px', color: '#777777' }}>
                  {modalContent.explain}
                </Typography>
              </Box>
            </Modal>
          </div>

        </div>
      </div>
    </div>

  )
}
export default Managecategories