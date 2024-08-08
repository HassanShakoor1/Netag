import React from 'react';
import e1 from '../images/e1.jpeg';
import e2 from '../images/e2.jpeg';
import e3 from '../images/e3.jpeg';
import e4 from '../images/e4.jpeg';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './product.css'; // Assuming you have a CSS file for custom styles

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ITEM_HEIGHT = 48;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: "300px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  marginRight: '2rem',
};

const products = [
  {
    id: 1,
    imageUrl: e1,
    heading: 'Hair oil (medium)',
    price: '$200.99',
    description: 'Lorem ipsum, asperiores ea enim veritatis at unde mollitia voluptas reiciendis. Cupiditate.',
  },
  {
    id: 2,
    imageUrl: e2,
    heading: 'Olive oil (small)',
    price: '$59.99',
    description: 'Lorem ipsum, asperiores ea enim veritatis at unde mollitia voluptas reiciendis. Cupiditate.',
  },
  {
    id: 3,
    imageUrl: e3,
    heading: 'Special oil (large)',
    price: '$89.99',
    description: 'Lorem ipsum, asperiores ea enim veritatis at unde mollitia voluptas reiciendis. Cupiditate.',
  },
  {
    id: 4,
    imageUrl: e4,
    heading: 'Coco oil (large)',
    price: '$89.99',
    description: 'Lorem ipsum, asperiores ea enim veritatis at unde mollitia voluptas reiciendis. Cupiditate.',
  },
];

function EditProduct() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openn, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const navigate = useNavigate();

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClosee = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const goBack = () => {
    navigate(-1);
  };
  const handleeditdetails = () => {
    console.log("heloo")
    navigate('/edit-product-detail');
  };

  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack onClick={goBack} className="bck" style={{ paddingTop: "1.5rem", paddingRight: "2rem" }} />
          <h4 style={{ color: "red", fontSize: '20px', fontWeight: '100' }}>Hair Oil</h4>
          <button style={{ marginTop: '1.5rem' }} className='add-btn'>Add</button>
        </div>

        <div className="search-field">
          <input style={{ textAlign: 'center', fontSize: '20px', fontWeight: '100', outline: "none", border: '1px solid grey' }} type="text" placeholder="Search" />
        </div>
        <br /><br />

        <div className="Edit-product-Design">
          {products.map(product => (
            <div className="items" key={product.id}>
              <img className='item-img' src={product.imageUrl} alt={product.heading} onClick={() => handleOpen(product)} />
              <div className="item-data">
                <h1 style={{ color: 'red', margin: 0, fontSize: 20 }}>
                  {product.heading} <span style={{ color: 'grey', fontSize: '12px' }}></span>
                </h1>
                <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                  Mental Health Clinic
                </p>
                <h4 style={{ lineHeight: 2, paddingTop: 0, paddingBottom: 0, margin: 0 }}>{product.price}</h4>
                <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0 }}>{product.description}</p>
              </div>

              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
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
                  <MenuItem style={{ fontSize: "15px" }} onClick={handleClose}>
                  <div onClick={handleeditdetails}>
                  <DoneAllIcon  style={{ marginRight: '8px' }} />
                    Edit Product
                  </div>
                   
                  </MenuItem>
                  <MenuItem style={{ fontSize: "15px", color: 'red' }} onClick={handleClose}>
                    <DeleteIcon style={{ marginRight: '8px', color: 'red' }} />
                    Delete Product
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
          <br />
        </div>

        <Modal
          open={openn}
          onClose={handleClosee}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedProduct && (
              <div className="items" style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                <img style={{ width: "100%", height: "200px", objectFit: 'center' }} className='item-img' src={selectedProduct.imageUrl} alt={selectedProduct.heading} />
                <br />
                <div className="item-data">
                  <h1 style={{ color: 'red', margin: 0, fontSize: 20 }}>
                    {selectedProduct.heading}
                  </h1>
                  <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                    Mental Health Clinic
                  </p>
                  <h4 style={{ lineHeight: 2, paddingTop: 0, paddingBottom: 0, margin: 0 }}>{selectedProduct.price}</h4>
                  <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0, width: '100%' }}>{selectedProduct.description}</p>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default EditProduct;
