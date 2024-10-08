import React, { useState, useEffect } from 'react';
import './product.css'; // Adjust the path if needed
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import dots from '../images/dots.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, get, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from '../firebase';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
function ProductCatagory() {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);
const {productid}=useParams();



  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchBrands(userId);
    } else {
      console.error("User ID not found in localStorage");
      setError("User ID not found in localStorage");
    }
    
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false,
    })
  }, []); // Empty dependency array ensures it runs only once
  

const fetchBrands = async (userId) => {
  try {
    const brandsRef = ref(database, `ProductCategory`);
    const snapshot = await get(brandsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const brandsArray = await Promise.all(
        Object.keys(data)
          .filter(key => data[key].uid === userId)
          .map(async (key) => {
            const productsQuery = query(
              ref(database, "Products"),
              orderByChild("categoryid"),
              equalTo(key)
            );
            const productsSnapshot = await get(productsQuery);
            const productCount = productsSnapshot.exists() ? Object.keys(productsSnapshot.val()).length : 0;

            return {
              id: key,
              productCount,
              createdAt: data[key].createdAt, // Ensure this is a valid timestamp
              ...data[key]
            };
          })
      );

      // Log data before and after sorting
      console.log('Brands data before sorting:', brandsArray);
      
      // Sort brands by createdAt in ascending order

      brandsArray.reverse(); // Reverse to make newest on top
      

      
      console.log('Brands data after sorting:', brandsArray);

      // Update state with new data
      setBrands(brandsArray);
    } else {
      setBrands([]);
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

  const handleEditProdu = (id, name) => {
    navigate(`/edit-product-catagory/${id}`, { state: { name } });
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
    if (!activeBrandId) {
      alert("No active brand selected.");
      return;
    }
    try {
      // Reference to the brand to be deleted
      const brandRef = ref(database, `ProductCategory/${activeBrandId}`);
      
      // Query to find products associated with the brand
      const productsQuery = query(
        ref(database, "Products"),
        orderByChild("categoryid"),
        equalTo(activeBrandId)
      );
  
      // Fetch the products associated with the brand
      const snapshot = await get(productsQuery);
  
      if (snapshot.exists()) {
        const productsToRemove = snapshot.val();
        
        // Remove each product associated with the brand
        const removalPromises = Object.keys(productsToRemove).map(async (productid) => {
          const productRef = ref(database, `Products/${productid}`);
          await remove(productRef);
        });
  
        // Await the removal of all products
        await Promise.all(removalPromises);
      } else {
        console.log("No products found for this brand.");
      }
  
      // Remove the brand itself
      await remove(brandRef);
  
      // Update the state to remove the deleted brand from the list
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand.id !== activeBrandId)
      );
  
      // Close the menu and notify the user
      handleCloseMenu();
      alert("Brand and related products deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting brand and related products:", error);
      alert("Error deleting brand and related products. Please try again.");
    }
  };
  



  const HandleUpdate = (id) => {
    navigate(`/product-catagory/${id}`);
    console.log(id)
  };

  const ITEM_HEIGHT = 48;

  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack onClick={handleBackscreen} className="bck" style={{ paddingTop: "1.5rem" }} />
          <h4 style={{ color: "red", fontSize: '20px', fontWeight: '100' }}>Product Category</h4>
          <button onClick={handleAddClick} style={{ marginTop: '1.5rem' }} className='add-btn'>Add</button>
        </div>

        <div className="search-field">
          <input style={{ textAlign: 'center', fontSize: '20px', fontWeight: '100' }} type="text" placeholder="Search" />
        </div>
        <br />

        {brands.map((brand,index) => (
          <div data-aos="zoom-in" key={`${brand.id}-${index}`} className="HairoilContainer" style={{ margin: 'inherit' }}>
            <div className="hair-img">
              <img
                style={{ width: "100%", height: "170px", objectFit: 'cover', borderRadius: "20px" }}
                src={brand.imageurl }
                alt={brand.name}
              />
            </div>
            <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
              <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
                {brand.name} <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>({brand.productCount} Products)</span>
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
                    lineHeight: '1.5',
                  }}
                >
                  {brand.description}
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

              <button style={{ color: "red", background: 'rgb(255, 222, 222)', width: '80%', display: 'flex', justifyContent: "center", alignItems: 'center', margin: '0px auto', border: '1px solid red' }} onClick={() => handleEditProdu(brand.id, brand.name)} className='save'>Explore more</button>
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
