import React, { useState, useEffect } from 'react';
import './product.css'; // Adjust the path if needed
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import dots from '../images/dots.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, get, remove } from "firebase/database";
import { database } from '../firebase';

function ProductCatagory() {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get the UID from localStorage
const bid =localStorage.getItem('bid')
    if (userId) {
      fetchBrands(userId);
    } else {
      setError("User ID not found in localStorage");
    }
  }, []);

  const fetchBrands = async (userId) => {
    try {
      const brandsRef = ref(database, `users/${userId}/Brands`);
      const snapshot = await get(brandsRef);
  
      if (snapshot.exists()) {
        const data = snapshot.val();
        const brandsArray = await Promise.all(Object.keys(data).map(async (key) => {
          const brand = data[key];

          // Fetch product count for each brand
          const productsRef = ref(database, `users/${userId}/Brands/${key}/product`);
          const productsSnapshot = await get(productsRef);
          const productCount = productsSnapshot.exists() ? Object.keys(productsSnapshot.val()).length : 0;

          return {
            id: key,
            ...brand,
            productCount // Add product count to each brand object
          };
        }));
        setBrands(brandsArray);
      } else {
        setBrands([]); // Set empty array if no data
        setError("No brand data found for this user.");
      }
    } catch (error) {
      console.error("Error fetching brand data:", error);
      setError("Error fetching brand data. Please try again.");
    }
  };
  
  const handleBackscreen = () => {
    navigate('/home');
  };

  const handleAddClick = () => {
    navigate('/product-catagory');
  };


  const handleEditProdu = (bid, brandName) => {
    navigate(`/edit-product-catagory/${bid}`, { state: { brandName } });
  };


  const handleOpenMenu = (event, brandId) => {
    setMenuAnchor(event.currentTarget);
    setActiveBrandId(brandId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setActiveBrandId(null);
  };

  const handleDeleteProduct = async () => {
    if (activeBrandId) {
      try {
        const brandRef = ref(database, `users/${localStorage.getItem('userId')}/Brands/${activeBrandId}`);
        await remove(brandRef);
        setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== activeBrandId));
        handleCloseMenu();
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const HandleUpdate = (id) => {
    navigate(`/product-catagory/${id}`);
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
                src={brand.brandImageUrl || dots}
                alt={brand.brandName}
              />
            </div>
            <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
              <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
                {brand.brandName}  <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>({brand.productCount}Products)</span>
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
                  open={activeBrandId === brand.id && Boolean(menuAnchor)}
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
                  <MenuItem style={{ fontSize: "15px" }} onClick={() => { HandleUpdate(brand.id), handleCloseMenu(); }}>
                    <DoneAllIcon style={{ marginRight: '8px' }} />
                    Edit Product
                  </MenuItem>
                  <div style={{ height: '1px', backgroundColor: 'grey', width: '100%' }}></div> {/* Separator Line */}
                  <MenuItem style={{ fontSize: "15px", color: 'red' }} onClick={handleDeleteProduct}>
                    <DeleteIcon style={{ marginRight: '8px' }} />
                    Delete Product
                  </MenuItem>
                </Menu>
              </div>

    <button style={{color:"red",background:'rgb(255, 222, 222)',width:'80%',display:'flow',justifyContent:"center",alignItems:'center',margin:'0px auto'}}  onClick={() => handleEditProdu(brand.id, brand.brandName)}   className='save'>Explore more</button>
         <br />
            </div>
          
          </div>
        ))}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default ProductCatagory;
