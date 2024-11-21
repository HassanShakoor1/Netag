import React, { useState, useEffect,useRef } from "react";
import "./product.css"; // Adjust the path if needed
import { IoChevronBack } from "react-icons/io5";
import search from "../images/search.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import dots from "../images/dots.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";


import {
  ref,
  get,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { database } from "../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import CircularProgress from "@mui/material/CircularProgress"; 
function ProductCatagory() {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryRefs = useRef([]);
  const location = useLocation();
  const { productCount } = location.state || {};
  console.log("top", productCount);
  const { t } = useTranslation(); // useTranslation inside the function
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchBrands(userId);
    } else {
      console.error("User ID not found in localStorage");
      setError("User ID not found in localStorage");
    }

    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false,
    });
  }, []); // Empty dependency array ensures it runs only once
  const fetchBrands = async (userId) => {
    toast.dismiss();
    try {
      setLoading(true)
      toast.error("no data available")
      const brandsRef = ref(database, `ProductCategory`);
      const snapshot = await get(brandsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Fetched ProductCategory data:", data);

        const brandKeys = Object.keys(data).filter(
          (key) => data[key].uid === userId
        );
        console.log("Filtered brand keys:", brandKeys);

        const brandsArray = await Promise.all(
          brandKeys.map(async (key) => {
            try {
              console.log(`Fetching products for brand ID: ${key}`);
              const productsQuery = query(
                ref(database, "Products"),
                orderByChild("categoryid"), // Make sure 'id' is the correct property name
                equalTo(key) // Ensure this matches the product's ID field
              );
              const productsSnapshot = await get(productsQuery);
              // console.log(
              //   `Products snapshot for brand ID ${key}:`,
              //   productsSnapshot
              // );

              const productsData = productsSnapshot.val();
              // console.log(`Products data for brand ID ${key}:`, productsData);

              const productCount = productsSnapshot.exists()
                ? Object.keys(productsData).length
                : 0;

              // console.log(`Product count for brand ID ${key}:`, productCount);

              return {
                id: key,
                productCount,
                createdAt: data[key].createdAt || 0,
                ...data[key],
              };
            } catch (productError) {
              return { id: key, productCount: 0, ...data[key] };
             
            }
        
          })
        );

        // console.log("Brands data before sorting:", brandsArray);
        brandsArray.sort((a, b) => b.createdAt - a.createdAt);
        // console.log("Brands data after sorting:", brandsArray);

        setBrands(brandsArray);
        setLoading(false)
      } else {
        // console.log("No data found in ProductCategory.");
        setBrands([]);
      }
    } catch (error) {
      console.error("Error fetching brand data:", error.message);
      setLoading(false)
    }
  };

  const handleBackscreen = () => {
    navigate("/home");
  };

  const handleAddClick = () => {
    navigate("/product-catagory");
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
        orderByChild("id"),
        equalTo(activeBrandId)
      );

      // Fetch the products associated with the brand
      const snapshot = await get(productsQuery);

      if (snapshot.exists()) {
        const productsToRemove = snapshot.val();

        // Remove each product associated with the brand
        const removalPromises = Object.keys(productsToRemove).map(
          async (productid) => {
            const productRef = ref(database, `Products/${productid}`);
            await remove(productRef);
          }
        );

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
      toast.success("Brand and related products deleted successfully!");
    } catch (error) {
      console.error("Error deleting brand and related products:", error);
      alert("Error deleting brand and related products. Please try again.");
    }
  };

  const HandleUpdate = (id) => {
    navigate(`/product-catagory/${id}`);
    console.log(id);
  };



  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const foundCategoryIndex = brands.findIndex(
      (category) => category.name && category.name.trim().toLowerCase() === trimmedSearchTerm
    );
  
    if (foundCategoryIndex !== -1) {
      // Assuming categoryRefs is an array of refs pointing to each contact category's DOM element
      if (categoryRefs.current[foundCategoryIndex]) {
        categoryRefs.current[foundCategoryIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      console.log("Category not found");
    }
  };




  const ITEM_HEIGHT = 48;

  if (loading) {
    return (
      <div
        className="loader-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack
            onClick={handleBackscreen}
            className="bck"
            style={{ paddingTop: "1.5rem",paddingLeft:"10px" }}
          />
          <h4 style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>
           {t("Product Category")}
          </h4>
          <button
            onClick={handleAddClick}
            style={{ marginTop: "1.5rem" ,width:"0px" }}
            className="add-btn"
          >
            {t("Add")}
          </button>
        </div>

        <div className="categories-input">
  <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", width: "100%" }}>
    <img 
      onClick={handleSearchSubmit} // Directly reference the function here
      src={search} 
      alt="Search" 
      style={{ marginRight: "8px", cursor: "pointer" }} // Add cursor style for better UX
    />
    <input
      type="search"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search..."
      style={{ color: "#929292", width: "100%", border: "none", outline: "none" }}
    />
  </form>
</div>

        <br />

        {brands.map((brand, index) => (
          <div
            data-aos="zoom-in"
            ref={(el) => (categoryRefs.current[index] = el)} 
            key={`${brand.id}-${index}`}
            className="HairoilContainer"
            style={{ margin: "inherit" }}
          >
            <div className="hair-img">
              <img
                style={{
                  width: "100%",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
                src={brand.imageURL}
                alt={brand.name}
              />
            </div>
            <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
              <h3
                style={{
                  marginTop: "2rem",
                  paddingLeft: "1rem",
                  color: "red",
                  fontWeight: "500",
                  fontSize: "26px",
                }}
              >
                {brand.name}{" "}
                <span style={{ fontSize: "13px", color: "rgb(197, 197, 197)" ,fontWeight:"500" }}>
                  ({brand.productCount} {t("Products")})
                </span>
              </h3>
              <div className="p-dots">
                <p
                  style={{
                    fontSize: "15px",
                    textAlign: "left",
                    padding: "0px 1rem",
                    width: "90%",
                    boxSizing: "border-box",
                    wordWrap: "break-word",

                    color: "grey",
                  }}
                >
                  {brand.description}
                </p>

                <img
                  onClick={(event) => handleOpenMenu(event, brand.id)}
                  style={{
                    height: "15px",
                    paddingTop: "16px",
                    marginRight: "13px",
                    cursor: "pointer",
                  }}
                  src={dots}
                  alt="Menu"
                />
                <br />
                <br />
                <Menu
                  id={`${brand.id}-menu`}
                  MenuListProps={{
                    "aria-labelledby": `${brand.id}-button`,
                  }}
                  anchorEl={menuAnchor}
                  open={activeBrandId === brand.id && Boolean(menuAnchor)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem
                    style={{ fontSize: "15px" }}
                    onClick={() => {
                      HandleUpdate(brand.id), handleCloseMenu();
                    }}
                  >
                    <DoneAllIcon style={{ marginRight: "8px" }} />
                   {t("Edit Product")}
                  </MenuItem>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "grey",
                      width: "100%",
                    }}
                  ></div>{" "}
                  {/* Separator Line */}
                  <MenuItem
                    style={{ fontSize: "15px", color: "red" }}
                    onClick={handleDeleteProduct}
                  >
                    <DeleteIcon style={{ marginRight: "8px" }} />
                  {t("Delete Product")}
                  </MenuItem>
                </Menu>
              </div>

              <button
                style={{
                  color: "red",
                  background: "rgb(255, 222, 222)",
                  width: "95%",
                  height: "5.5vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0px auto",
                  border: "1px solid red",
                }}
                onClick={() => handleEditProdu(brand.id, brand.name)}
                className="save"
              >
               {t("Explore more")}
              </button>
              <br />
            </div>
          </div>
        ))}

        {error && <div className="error">{error}</div>}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ProductCatagory;
