import React, { useState, useEffect } from 'react';
import './product.css'; // Adjust the path if needed
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import dots from '../images/dots.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, get, remove } from "firebase/database"; // Import remove for deletion
import { database } from '../firebase';

function ProductCatagory() {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch brand data from Firebase
    const fetchBrands = async () => {
      const brandsRef = ref(database, 'Brands');
      const snapshot = await get(brandsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const brandsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setBrands(brandsArray);
      }
    };

    fetchBrands();
  }, []);

  const handleBackscreen = () => {
    navigate(-1);
  };

  const handleAddClick = () => {
    navigate('/product-catagory');
  };

  const handleEditProdu = () => {
    navigate('/edit-product-catagory');
  };

  const handleOpenMenu = (event, brandId) => {
    setMenuAnchor(event.currentTarget);
    setActiveBrandId(brandId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setActiveBrandId(null);
  };

  // Function to handle deletion of the brand
  const handleDeleteProduct = async () => {
    if (activeBrandId) {
      try {
        // Remove the brand from Firebase
        const brandRef = ref(database, `Brands/${activeBrandId}`);
        await remove(brandRef);

        // Update the state to remove the brand from the UI
        setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== activeBrandId));

        // Close the menu
        handleCloseMenu();
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
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

        {brands.map((brand) => (
          <div key={brand.id} className="HairoilContainer" style={{ margin: 'inherit' }}>
            <div className="hair-img">
              <img
                style={{ width: "100%", height: "170px", objectFit: 'cover', borderRadius: "20px" }}
                src={brand.brandImageUrl || dots} // Replace dots with a default image if brandImageUrl is unavailable
                alt={brand.brandName}
              />
            </div>
            <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
              <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
                {brand.brandName} <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>({brand.productsCount || 0} products)</span>
              </h3>
              <div className="p-dots">
              <p 
  style={{ 
    fontSize: '12px', 
    textAlign: "left", 
    padding: "0px 1rem", 
    width: "90%", 
    boxSizing: "border-box",
    wordWrap: "break-word",
    lineHeight:'1.5',
  
  }}
>
  {brand.brandDescription}
</p>

                <img
                  onClick={(event) => handleOpenMenu(event, brand.id)}
                  style={{ height: '15px', paddingTop: '16px', marginRight: '13px', cursor: "pointer" }}
                  src={dots}
                  alt="Menu"
                />
                <br /><br />
                <Menu
                  id={`${brand.id}-menu`}
                  MenuListProps={{
                    'aria-labelledby': `${brand.id}-button`,
                  }}
                  anchorEl={menuAnchor}
                  open={activeBrandId === brand.id && Boolean(menuAnchor)} // Only open for the active brand
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
                  <MenuItem style={{ fontSize: "15px", color: 'red' }} onClick={handleDeleteProduct}>
                    <DeleteIcon style={{ marginRight: '8px', color: 'red' }} />
                    Delete Product
                  </MenuItem>
                </Menu>
              </div>
              <button onClick={handleEditProdu} style={{ border: '1px solid #EE0000', color: "red" }} className='product-btn'> Explore Products</button>
              <br /><br />
            </div>
          </div>
        ))}

        <br /><br /><br /><br /><br />
      </div>
    </div>
  );
}

export default ProductCatagory;
