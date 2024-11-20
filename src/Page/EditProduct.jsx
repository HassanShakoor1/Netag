import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref as dbRef, get, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { database, storage } from "../firebase"; // Adjust the import path as needed
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import { IoChevronBack } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "./product.css"; // Assuming you have a CSS file for custom styles
import Slider from "react-slick";
import search from "../images/search.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import { useTranslation } from "react-i18next";

import "aos/dist/aos.css";
import { MdNavigateNext } from "react-icons/md";
const ITEM_HEIGHT = 48;
const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  boxShadow: 24,
  outline: "none",
  marginRight: "30px",
  p: 1,
  borderRadius: "20px",
  height: "auto",
};

function EditProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams(); // Category ID
  const { productid } = useParams();
  console.log("id at editproduct", products); // Should log the value of productid if available
  const { t } = useTranslation(); // useTranslation inside the function
  
  const sliderRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [proid, setProid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};

  const handleClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
    setProid(product?.productid);
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
    console.log(productid, "fgsdfgsd");
    let categoryid = id;

    navigate(`/edit-product-detail/${categoryid}/${proid}`);
    handleClose();
  };

  const ADD = () => {
    navigate(`/edit-product-detail/${id}`,{state:{name}});
  };

  const handleDeleteProduct = async (productid) => {
    if (!selectedProduct) return;

    if (!productid) {
      console.error("Invalid product ID");
      return;
    }

    try {
      console.log("Deleting product:", selectedProduct);

      // Delete images from Firebase Storage if they exist
      if (selectedProduct.imageUrls && selectedProduct.imageUrls.length > 0) {
        const deletePromises = selectedProduct.imageUrls.map(
          async (imagePath) => {
            const storageReference = storageRef(storage, imagePath);
            await deleteObject(storageReference);
          }
        );

        await Promise.all(deletePromises);
      }

      // Remove the product from Firebase Database
      const dbPath = `/Products/${selectedProduct.productid}`;
      await remove(dbRef(database, dbPath));

      // Update the state to remove the deleted product from the list
      setProducts((prevProducts) => {
        // Ensure we are comparing the correct field for the product ID
        const updatedProducts = prevProducts.filter(
          (p) => p.productid !== selectedProduct.productid
        );
        setProductCount(updatedProducts.length); // Update product count if necessary
        return updatedProducts; // Return the updated product list
      });

      handleClose(); // Close any open dialogs or modals if needed
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const carouselSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
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
            .filter((value) => value?.categoryid === id)
            .map((value) => ({
              id: value?.id,
              ...value,
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
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false,
    });
  }, [id]);
  console.log("products are ", products);





  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const foundCategoryIndex = products.findIndex(
      (category) => category.productname && category.productname.trim().toLowerCase() === trimmedSearchTerm
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
            onClick={goBack}
            className="bck"
            style={{ paddingTop: "1.5rem" }}
          />
          <h4 style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>
            {name}
          </h4>
          <button
            onClick={ADD}
            style={{ marginTop: "1.5rem" }}
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
        <br />

      

      
      
        <div style={{ width: "95%" }} className="Edit-product-Design">
          {products.map((product, index) => (
            <div
             ref={(el) => (categoryRefs.current[index] = el)}
              data-aos="zoom-in"
              key={product.productid || `product-${index}`}
              style={{ marginTop: "20px",borderRadius:"20px" ,border:"1px solid #DDDDDD"}}
              className="items"
            >
          
              <img
                className="item-img"
                style={{ objectFit: "cover" }}
                src={product?.imgurl}
                alt={product?.productname}
                onClick={() => handleOpen(product)}
              />
              <div className="item-data">
                <h1 style={{ color: "red", margin: 0, fontSize: 20 }}>
                  {product?.productname}
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    {" "}
                    ( {product?.size})
                  </span>
                </h1>
                <p
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    margin: 0,
                    color: "#545454",
                    fontSize: "22px",
                  }}
                >
                  {product?.price}
                </p>
                <p style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                  {product?.color}
                </p>
                <p
                  style={{
                    padding: "0.5rem 0",
                    margin: "0.5rem 0",
                    fontSize: "1rem",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {product?.description}
                </p>
              </div>

              <div style={{ top: "50px", position: "relative" }}>
                <IconButton
                  style={{ color: "red" }}
                  aria-label="more"
                  id="long-button"
                  aria-controls={anchorEl ? "long-menu" : undefined}
                  aria-expanded={anchorEl ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, product)}
                >
                  <MoreVertIcon style={{ top: "100px" }} />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
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
                      handleEditDetails(product.productid);
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
            </div>
          ))}
        </div>

        {selectedProduct && (
          <Modal
            open={open}
            onClose={handleClosee}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "200px",
                  position: "relative",
                }}
              >
                {Array.isArray(selectedProduct.imgurl) &&
                selectedProduct.imgurl.length > 0 ? (
                  selectedProduct.imgurl.length > 1 ? (
                    <>
                      <Slider ref={sliderRef} {...carouselSettings}>
                        {selectedProduct.imgurl.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`${selectedProduct.productname} ${index + 1}`}
                            style={{ objectFit: "cover", height: "auto" }}
                          />
                        ))}
                      </Slider>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 1,
                          position: "absolute",
                          top: "150px",
                          right: "0",
                        }}
                      >
                        <button
                          style={{
                            outline: "none",
                            border: "none",
                            background: "transparent",
                            color: "red",
                          }}
                          onClick={handlePrevClick}
                        >
                          <IoChevronBack
                            style={{ width: "25px", height: "25px" }}
                          />
                        </button>
                        <button
                          style={{
                            outline: "none",
                            border: "none",
                            background: "transparent",
                            color: "red",
                          }}
                          onClick={handleNextClick}
                        >
                          <MdNavigateNext
                            style={{ width: "32px", height: "32px" }}
                          />
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={selectedProduct.imgurl[0]} // Access the first item if it's a single image
                      alt={`${selectedProduct.productname} 1`}
                      style={{
                        width: "100%",
                        height: "230px",
                        objectFit: "cover",
                      }}
                    />
                  )
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "230px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>No images available</p>
                  </div>
                )}
              </div>

              <h2 id="modal-title" style={{ color: "red", margin: "3px" }}>
                {selectedProduct.productname}{" "}
                <span style={{ fontSize: "10px", color: "grey" }}>
                  {" "}
                  ({selectedProduct.size})
                </span>
              </h2>
              <p style={{ margin: 0 }}>{selectedProduct.categoryname}</p>

              <p
                style={{
                  lineHeight: 2,
                  paddingTop: 0,
                  paddingBottom: 0,
                  margin: 0,
                  color: "#545454",
                  fontSize: "22px",
                }}
              >
                {selectedProduct?.price}
              </p>
              <p
                id="modal-description"
                style={{ textAlign: "center", margin: "0px" }}
              >
                {selectedProduct.description}
              </p>
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
              ></div>
            </Box>
          </Modal>
      
        )}
       
      </div>

    </div>
  );
}

export default EditProduct;
