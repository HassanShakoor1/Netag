import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref as dbRef, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
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
  p: 1,
  borderRadius: '20px',
  height: 'auto'
};



function EditProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams(); // Category ID
  const { productid } = useParams();
  console.log( "id at editproduct",productid); // Should log the value of productid if available



  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brandName } = location.state || {};

  const handleClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
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
    navigate(`/edit-product`, { state: { productCount } });
  };

  const handleEditDetails = (productid) => {
    let categoryid=id;
    navigate(`/edit-product-detail/${categoryid}/${productid}`);
    handleClose();
  };

  const ADD = () => {
    navigate(`/edit-product-detail/${id}`);
  };


  const handleDeleteProduct = async (productid) => {
    if (!selectedProduct) return;
  
    if (!productid) {
      console.error('Invalid product ID');
      return;
    }
  
    try {
      console.log('Deleting product:', selectedProduct);
  
      // Delete images from Firebase Storage if they exist
      if (selectedProduct.imageUrls && selectedProduct.imageUrls.length > 0) {
        const deletePromises = selectedProduct.imageUrls.map(async (imagePath) => {
          const storageReference = storageRef(storage, imagePath);
          await deleteObject(storageReference);
        });
  
        await Promise.all(deletePromises);
      }
  
      // Remove the product from Firebase Database
      const dbPath = `/Products/${selectedProduct.productid}`;
      await remove(dbRef(database, dbPath));
  
      // Update the state to remove the deleted product from the list
      setProducts((prevProducts) => {
        // Ensure we are comparing the correct field for the product ID
        const updatedProducts = prevProducts.filter((p) => p.productid !== selectedProduct.productid);
        setProductCount(updatedProducts.length);  // Update product count if necessary
        return updatedProducts;  // Return the updated product list
      });
  
      handleClose(); // Close any open dialogs or modals if needed
  
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const brandsRef = dbRef(database, `/Products`);
        const snapshot = await get(brandsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.values(data);
          const brandsArray = dataArray
            .filter(value => value?.categoryid === id)
            .map(value => ({
              id: value?.id,
              ...value
            }));

          setProducts(brandsArray);
          setProductCount(brandsArray.length);
          brandsArray.reverse();
        } else {
          console.log("No data found for category:", id);
        }
        
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
console.log( "products are ",products)
  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack onClick={goBack} className="bck" style={{ paddingTop: '1.5rem', paddingRight: '2rem' }} />
          <h4 style={{ color: 'red', fontSize: '20px', fontWeight: '100' }}>{brandName}</h4>
          <button onClick={ADD} style={{ marginTop: '1.5rem' }} className='add-btn'>Add</button>
        </div>

        <div className="search-field">
          <input style={{ textAlign: 'center', fontSize: '20px', fontWeight: '100', outline: 'none', border: '1px solid grey' }} type="text" placeholder="Search" />
        </div>
        <br /><br />

        <div style={{ width: '95%' }} className="Edit-product-Design">
          {products.map((product,index) => (
            <div   key={product.productid || `product-${index}`}  style={{ marginTop: '20px' }} className="items">
              <img className='item-img' style={{height:'auto',objectFit:'cover'}} src={product?.imgurl} alt={product?.productname} onClick={() => handleOpen(product)} />
              <div className="item-data">
                <h1 style={{ color: 'red', margin: 0, fontSize: 20 }}>
                  {product?.productname}
                  <span style={{ color: 'grey', fontSize: '12px' }}> ( {product?.size})</span>
                </h1>
                <p style={{ lineHeight: 2, paddingTop: 0, paddingBottom: 0, margin: 0, color: "#545454", fontSize: "22px" }}>
                  {product?.price}
                </p>
                <p style={{ lineHeight: 1, paddingTop: 0, paddingBottom: 0, margin: 0 }}>{product?.color}</p>
                <p style={{
                  lineHeight: 1.5,
                  padding: '0.5rem 0',
                  margin: '0.5rem 0',
                  fontSize: '1rem',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {product?.description}
                </p>
              </div>

              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={anchorEl ? 'long-menu' : undefined}
                  aria-expanded={anchorEl ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, product)}
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
                  <MenuItem style={{ fontSize: '15px' }} onClick={() => handleEditDetails(product?.productid)}>
                    <DoneAllIcon style={{ marginRight: '8px' }} />
                    Edit Product
                  </MenuItem>
                  <MenuItem style={{ fontSize: '15px' }} onClick={()=>handleDeleteProduct(product.productid)}>
                    <DeleteIcon style={{ marginRight: '8px' }} />
                    Delete Product
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <Modal
          open={open}
          onClose={handleClosee}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            {selectedProduct && (
              <>
                <div style={{
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  <img
                    src={selectedProduct.imgurl}
                    alt={selectedProduct.productname}
                    style={{ width: '100%', height: '230px' }}
                  />
                </div>
                <div style={{marginLeft:'10px'}}>
                <h2 id="modal-title" style={{ fontSize: '1.5rem', marginTop: '1rem',color:"red" }}>
                  {selectedProduct.productname} <span style={{color:'grey',fontSize:'10px'}}> ({selectedProduct.size})</span>
                </h2>
               
                <p id="modal-description" style={{ fontSize: '1rem',  }}>
              {selectedProduct.categoryname}
                </p>
                <p id="modal-description" style={{ fontSize: '2rem',fontWeight:600 , margin:"2px" }}>
              {selectedProduct.price}
                </p>
                
             
                <p id="modal-description" style={{ fontSize: '1rem',  margin:"5px" }}>
                {selectedProduct.description}
                </p>
                </div>
              
              </>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default EditProduct;
