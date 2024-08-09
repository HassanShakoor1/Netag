import React, { useState } from 'react';
import './product.css';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import hairimg from '../images/hairimg.jpeg';
import dots from '../images/dots.png';
import Slide from '@mui/material/Slide';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductCatagory() {
  const navigate = useNavigate();
  const [hairOilMenuAnchor, setHairOilMenuAnchor] = useState(null);
  const [shoesMenuAnchor, setShoesMenuAnchor] = useState(null);

  const handleBackscreen = () => {
    navigate('/');
  };

  const handleAddClick = () => {
    navigate('/product-catagory');
  };

  const handleEditProductCategory = () => {
    navigate('/edit-product-catagory');
  };

  const handleOpenHairOilMenu = (event) => {
    setHairOilMenuAnchor(event.currentTarget);
  };

  const handleOpenShoesMenu = (event) => {
    setShoesMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setHairOilMenuAnchor(null);
    setShoesMenuAnchor(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack onClick={handleBackscreen} className="bck" style={{ paddingTop: "1.5rem", paddingRight: "2rem" }} />
          <h4 style={{ color: "red", fontSize: '20px', fontWeight: '100' }}>Product Category</h4>
          <button onClick={handleAddClick} style={{ marginTop: '1.5rem' }} className='add-btn'>Add</button>
        </div>

        <div className="search-field">
          <input style={{ textAlign: 'center', fontSize: '20px', fontWeight: '100' }} type="text" placeholder="Search" />
        </div>
        <br />
        <div className="HairoilContainer">
          <div className="hair-img">
            <img style={{ width: "100%", height: "170px", objectFit: 'cover', borderRadius: "20px" }} src={hairimg} alt="Hair Oil" />
          </div>
          <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
            <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
              Hair Oil <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>(299 products)</span>
            </h3>
            <div className="p-dots">
              <p style={{ fontSize: '12px', textAlign: "left", paddingLeft: "1rem", width: '70%', paddingTop: '0px', paddingBottom: "0px" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quibusdam nobis sapiente dolorem aspernatur iste neque quos vero aperiam corrupti.
              </p>
              <img onClick={handleOpenHairOilMenu} style={{ height: '15px', paddingTop: '16px', marginRight: '13px', cursor: "pointer" }} src={dots} alt="Menu" />
              <Menu
                id="hair-oil-menu"
                MenuListProps={{
                  'aria-labelledby': 'hair-oil-button',
                }}
                anchorEl={hairOilMenuAnchor}
                open={Boolean(hairOilMenuAnchor)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem style={{ fontSize: "15px" }} onClick={() => { handleEditProductCategory(); handleCloseMenu(); }}>
                  <DoneAllIcon style={{ marginRight: '8px' }} />
                  Edit Product
                </MenuItem>
                <div style={{ height: '1px', backgroundColor: 'grey', width: '100%' }}></div> {/* Separator Line */}
                <MenuItem style={{ fontSize: "15px", color: 'red' }} onClick={handleCloseMenu}>
                  <DeleteIcon style={{ marginRight: '8px', color: 'red' }} />
                  Delete Product
                </MenuItem>
              </Menu>
            </div>
            <button style={{ border: '1px solid #EE0000', color: "red" }} className='product-btn'> Explore Products</button>
            <br /><br />
          </div>
        </div>
        <br />
        <div className="HairoilContainer">
          <div className="hair-img">
            <div style={{ width: "100%", height: "170px", objectFit: 'cover', backgroundColor: "#D9D9D9", borderRadius: "20px" }}></div>
          </div>
          <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
            <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
              Shoes <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>(299 products)</span>
            </h3>
            <div className="p-dots">
              <p style={{ fontSize: '12px', textAlign: "left", paddingLeft: "1rem", width: '70%' }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quibusdam nobis sapiente dolorem aspernatur iste neque quos vero aperiam corrupti.
              </p>
              <img onClick={handleOpenShoesMenu} style={{ height: '15px', paddingTop: '16px', marginRight: '13px', cursor: "pointer" }} src={dots} alt="Menu" />
              <Menu
                id="shoes-menu"
                MenuListProps={{
                  'aria-labelledby': 'shoes-button',
                }}
                anchorEl={shoesMenuAnchor}
                open={Boolean(shoesMenuAnchor)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem style={{ fontSize: "15px" }} onClick={() => { handleEditProductCategory(); handleCloseMenu(); }}>
                  <DoneAllIcon style={{ marginRight: '8px' }} />
                  Edit Product
                </MenuItem>
                <div style={{ height: '1px', backgroundColor: 'grey', width: '100%' }}></div> {/* Separator Line */}
                <MenuItem style={{ fontSize: "15px", color: 'red' }} onClick={handleCloseMenu}>
                  <DeleteIcon style={{ marginRight: '8px', color: 'red' }} />
                  Delete Product
                </MenuItem>
              </Menu>
            </div>
            <button style={{ border: '1px solid #EE0000', color: 'red' }} className='product-btn'> Explore Products</button>
            <br /><br />
          </div>
        </div>
        <br /><br /><br /><br /><br />
      </div>
    </div>
  );
}

export default ProductCatagory;
