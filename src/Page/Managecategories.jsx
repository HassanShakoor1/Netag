import vector from "../images/Vector.svg"
import search from "../images/search.svg"
import doctor1 from "../images/doctor1.svg"
import React, { useState, useEffect ,useRef} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, Link, useParams,useLocation } from "react-router-dom";
import { database as db } from "../firebase.jsx"
import { get, ref, remove } from "firebase/database"
import { useTranslation } from "react-i18next";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "270px",
  // maxWidth:"50%",
  bgcolor: '#F5F5F5',
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
};

const options = [
  { text: 'Edit Category', color: '#7C7C7C', path: "/home/services/catagory/:id/serviceaddcategory" }, // Change color as needed
  { text: 'Delete Category', color: '#EE0000' } // Change color as needed
];

const ITEM_HEIGHT = 48;

function Managecategories() {
  const { t } = useTranslation();
  const [productOfCategory, setProductOfCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState({ pic: '', title: '', explain: '',price:'' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();
  const { state } = location; // Access the state from location
  const { FireBasedata } = state || {}; // Access Firebasedata
  const [count, setCount] = useState(0); 
  const name=FireBasedata?.name
  const categoryRefs = useRef([]);

  console.log( "name is",name);

  // id from header 
  const { id } = useParams();
  console.log("id", id);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentItemId(id);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const goback = (count) => {
    navigate(`/home/services`, { state: { count } }); // Pass count as part of the state object
};

  const handleMenuItemClick = (path) => {
    console.log(path);
    if (path) {
      navigate(path);
    }
    handleClose();
  };

  // function to get data of all products of specific category from firebase 
  useEffect(() => {
    getProductsData();
  }, []);
  
  const getProductsData = async () => {
    setLoading(true)
    const dbRef = ref(db, 'Services');
    const snapshot = await get(dbRef);
    const data = snapshot.val();

    // Filter the data based on categoryId
    const filterData = Object.keys(data)
        .filter(key => data[key].categoryId === id)
        .map(key => {
            return {
                id: key,
                ...data[key],
            };
        });

    console.log(filterData); // Check the data here
    setProductOfCategory(filterData);
    setLoading(false)

    // Count the total products in the filtered data
    const count = filterData.length; // This gives the number of products for the specific category
     // Update the count state

    categoryRefs.current = new Array(count).fill(null); // Update categoryRefs
    // Log the count
}



  // delete function 
  const handleDelete = async (id) => {
    const dataToDelete = ref(db, `Services/${id}`);
    try {
      await remove(dataToDelete);
      setProductOfCategory((previous) => previous.filter(x => x.id !== id));
      setLoading(false)
      toast.success("Item Deleted Successfully")
    } catch (error) {
      console.log("error while deleting", error);
      setLoading(false)
    }
  }

  // Open modal with product details
  const handleOpen = (pic, title, explain,price) => {
    setModalContent({ pic, title, explain,price });
    setOpen(true);
  }
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm); // Log the search term
    console.log("Categories:", productOfCategory); // Log categories being searched
  
    const foundCategoryIndex = productOfCategory.findIndex(
      (category) => category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (foundCategoryIndex !== -1 && categoryRefs.current[foundCategoryIndex]) {
      categoryRefs.current[foundCategoryIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      toast.error("Category not found!");
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
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div>
                <img style={{ cursor: "pointer" }} onClick={() => goback(count)} src={vector} alt="" />
              </div>
              <div style={{ color: "#EE0000", fontWeight: "100",fontSize:"20px" }}>
               <p>{name}</p>
              </div>
              <div style={{ backgroundColor: "none" }}>
                <Link to={`/home/services/catagory-products/${id}/serviceaddcategory-product`}>
                  <button style={{ border: "1.5px solid #EE0000", borderRadius: "14px", paddingLeft: "18px", paddingRight: "18px", paddingTop: "5px", paddingBottom: "5px", color: '#EE0000', backgroundColor: "white" ,cursor:"pointer"}}>
                    {t("Add")}
                  </button>
                </Link>
              </div>
            </div>
            {/* input  */}
            <div className="categories-input">
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <img src={search} alt="Search" style={{ marginRight: "8px" }} />
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{
            color: "#929292",
            width: "100%",
            border: "none",
            outline: "none",
          }}
        />
      </form>
    </div>
            {productOfCategory.map((x, index) => (
              <div className="managecategories-card" style={{height:'150px'}}  key={x.id}  ref={(el) => (categoryRefs.current[index] = el)}>
                {console.log(index)}
                <div className="cardcenter" style={{height:'auto'}}>
                  <div className="cardcenter-width" style={{ paddingTop: '10px', paddingBottom: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '110px' }}>
                          {/* Image */}
                          <div style={{ width: "35%", display: "flex", justifyContent: "center",height:"auto" }}>
                            <img
                              src={x.imageURL}
                              alt=""
                              style={{ cursor: 'pointer', width: "100%", objectFit: "cover",borderRadius:"10px",height:"130px" }}
                              onClick={() => handleOpen(x.imageURL, x.name, x.description,x.price)}
                            />
                          </div>
                          {/* Title */}
                          <div style={{ width: '60%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: "20px", color: '#EE0000' }}>{x.name}  </div>
                              <div style={{ fontSize: "27px", color: 'grey' }}>{x.price}  </div>
                            
                              <div style={{ fontSize: '14px', color: 'black' }}>{x.description}</div>
                            </div>
                          </div>
                        </div>
                      </div>
               
                      <div>
                      

                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, x.id)} // Pass the item id
                            style={{
                              color: '#EE0000',
                              padding: "0",
                              margin: "0",
                              zIndex: "1",
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl && currentItemId === x.id)} // Check if the menu should be open for the current item
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5, // Set a max height to control overflow
                                width: '20ch',                // Updated width to match first block
                              },
                            }}
                            anchorOrigin={{
                              vertical: 'bottom',             // Menu will open below the button
                              horizontal: 'right',            // Menu will align to the right of the button
                            }}
                            transformOrigin={{
                              vertical: 'top',                // Menu starts from the top
                              horizontal: 'right',            // Menu aligns its right side to the right of the button
                            }}
                          >
                            {/* "Edit Profile" Menu Item with custom styles and icon */}
                            <MenuItem
                              style={{
                                fontSize: "15px",            // Matching font size for consistency
                                color: '#7C7C7C',
                                borderBottom: '1px solid #ddd',
                              }}
                              onClick={() => handleMenuItemClick(`/home/services/catagory/ManageCategories-products-Edit/${x.id}`)}
                            >
                              <DoneAllIcon style={{ marginRight: '8px' }} />  {/* Added Icon */}
                              {t("Edit Profile")}
                            </MenuItem>

                            {/* Separator Line */}
                            <div style={{ height: '1px', backgroundColor: 'grey', width: '100%' }}></div>

                            {/* "Delete" Menu Item with red color and custom icon */}
                            <MenuItem
                              style={{
                                fontSize: "15px",             // Larger font size for consistency
                                color: 'red',                 // Red color for "Delete"
                              }}
                              onClick={() => handleDelete(`${x.id}`)}
                            >
                              <DeleteIcon style={{ marginRight: '8px' }} />   {/* Added Delete Icon */}
                              {t("Delete")}
                            </MenuItem>

                            {/* Additional MenuItems can be added here */}
                          </Menu>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Modal */}
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={
                style

              }>
                <  div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', // Center items horizontally
                  justifyContent: 'center' // Center items vertically
                }}>
                  <img src={modalContent.pic} alt="" style={{ width: '100%', height: '200px', borderRadius: "12px" }} />
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '1px', fontSize: '18px', color: '#EE0000', fontWeight: "600" }}>
                  {modalContent.title}
                </Typography>

                <Typography >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>{modalContent.price}</span>
                </Typography>

                <Typography >
                  <span style={{ fontSize: "14px",paddingTop:"0px" ,paddingBottom:"20px"}}>{modalContent.explain}</span>
                </Typography>
                
                {/* <Typography id="modal-modal-description" variant="h6" component="p" style={{ marginTop: '1px', fontSize: '8px', color: '#777777' }}>
                  {modalContent.explain}

                </Typography> */}
              </Box>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
      />
    </div>
  )
}
export default Managecategories;





  
