import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref as dbRef, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL, deleteObject } from 'firebase/storage';
import { database, storage } from '../firebase'; // Adjust the import path as needed
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoChevronBack } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './product.css'; // Assuming you have a CSS file for custom styles

const ITEM_HEIGHT = 48;
const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  boxShadow: 24,
  outline: 'none',
  marginRight: '30px',
  p: 4,
  borderRadius: '20px',
  height: "400px"
};

function EditProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams(); // Get the ID from the URL parameters
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { brandName } = location.state || {}; // Safely extract brandName

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const handleEditDetails = (productId) => {
    navigate(`/edit-product-detail/${productId}`);
    console.log(productId)
  };

  

  const handleDeleteProduct = async (product) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Invalid user ID');
      return;
    }

    try {
      // Delete associated images from Firebase Storage
      if (product.images && product.images.length > 0) {
        const deletePromises = product.images.map(async (imagePath) => {
          const storageReference = storageRef(storage, imagePath);
          await deleteObject(storageReference);
        });

        await Promise.all(deletePromises);
      }

      // Delete product data from Firebase Realtime Database
      const dbPath = `users/${userId}/Brands/${id}/product/${product.id}`;
      await remove(dbRef(database, dbPath));

      // Update local state to remove the deleted product
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
      handleClose();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get the UID from localStorage
    console.log('userId:', userId); // Debugging line

    const fetchProducts = async () => {
      try {
        if (!userId) {
          throw new Error('Invalid user ID');
        }

        const dbPath = `users/${userId}/Brands/${id}/product`;
        console.log('Database path:', dbPath); // Debugging line

        const dbReference = dbRef(database, dbPath);
        const snapshot = await get(dbReference);

        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productList = await Promise.all(
            Object.keys(productsData).map(async (key) => {
              const product = productsData[key];

              // Ensure images array is being used correctly
              const imageUrls = await Promise.all(
                (product.images || []).map(async (imagePath) => {
                  try {
                    const storageReference = storageRef(storage, imagePath);
                    return await getDownloadURL(storageReference);
                  } catch (imageError) {
                    console.error('Error fetching image URL:', imageError);
                    return ''; // Return an empty string if there's an error
                  }
                })
              );

              return {
                ...product,
                id: key,
                imageUrls, // Store and use the correct URLs
              };
            })
          );
          setProducts(productList);
        } else {
          setProducts([]); // Handle case where no products exist
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack onClick={goBack} className="bck" style={{ paddingTop: '1.5rem', paddingRight: '2rem' }} />
          <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100' }}>{brandName}</h4>
          <button onClick={() => handleEditDetails(id)} style={{ marginTop: '1.5rem' }} className='add-btn'>Add</button>
        </div>

        <div className="search-field">
          <input style={{ textAlign: 'center', fontSize: '20px', fontWeight: '100', outline: 'none', border: '1px solid grey' }} type="text" placeholder="Search" />
        </div>
        <br /><br />

        <div style={{ width: '95%' }} className="Edit-product-Design">
          {products.map((product) => (
            <div style={{ marginTop: '20px' }} className="items" key={product.id}>
              <img className='item-img' src={product.imageUrls[0]} alt={product.productName} onClick={() => handleOpen(product)} />
              <div className="item-data">
                <h1 style={{ color: 'red', margin: 0, fontSize: 20 }}>
                  {product.productName}
                  <span style={{ color: 'grey', fontSize: '12px' }}> ( {product.size})</span>
                </h1>
                <p style={{ lineHeight: 2, paddingTop: 0, paddingBottom: 0, margin: 0, color: "#545454", fontSize: "22px" }}>
                  {product.price}
                </p>
                <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0 }}>{product.color}</p>
                <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0, marginTop: 10 }}>{product.description}</p>
              </div>

              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={anchorEl ? 'long-menu' : undefined}
                  aria-expanded={anchorEl ? 'true' : undefined}
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
                  open={Boolean(anchorEl)}
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
                  <MenuItem style={{ fontSize: '15px' }} onClick={handleClose}>
                    <div onClick={() => handleEditDetails(product.id)}>
                      <DoneAllIcon style={{ marginRight: '8px' }} />
                      Edit Product
                    </div>
                  </MenuItem>
                  <div style={{ height: '1px', backgroundColor: 'grey', width: '100%' }}></div>
                  <MenuItem style={{ fontSize: '15px' }} onClick={() => handleDeleteProduct(product)}>
                    <DeleteIcon style={{ marginRight: '8px' }} />
                    Delete Product
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>

        <Modal
          open={open}
          onClose={handleClosee}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* Render modal content based on the selected product */}
            {selectedProduct && (
              <>
                <h3>{selectedProduct.productName}</h3>
                <p>Size: {selectedProduct.size}</p>
                <p>Color: {selectedProduct.color}</p>
                <p>Description: {selectedProduct.description}</p>
                {/* Additional details as needed */}
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default EditProduct;
