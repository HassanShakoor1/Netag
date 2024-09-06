import vector from "../images/Vector.svg"
import search from "../images/search.png"
import doctor1 from "../images/doctor1.svg"
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pic4 from "../images/pic4.svg"
import { useNavigate, Link, useParams } from "react-router-dom";
import { database as db } from "../firebase.jsx"
import { get, ref, remove } from "firebase/database"
import { useTranslation } from "react-i18next";
// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "300",
  bgcolor: '#F5F5F5',
  // border: '2px solid #000',
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

  const{t}=useTranslation()

  const [productOfCategory, setproductOfCategory] = useState([])

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ pic: '', title: '', explain: '' });
  // const [anchorEl, setAnchorEl] = useState(null);
// mui menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const openMenu = Boolean(anchorEl);

  // id from header 
  const { id } = useParams()
  console.log("id",id)
 
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentItemId(id);
}

const handleClose = () => {
    setAnchorEl(null);
};

  const navigate = useNavigate();
  const goback = () => {
    navigate(`/home/services`);
  }

  const handleMenuItemClick = (path) => {
    console.log(path)
    if (path) {
      navigate(path);
    }
    handleClose();
  };

  // function to get data of all products of specific category from firebase 
 
  const getProductsData = async () => {

    const dbRef = ref(db, 'Services')
    const snapshot = await get(dbRef)
    const data = snapshot.val()

    const filterData = Object.keys(data).filter(key => data[key].categoryid=== id)
      .map(key => ({
        id: key,
        ...data[key]
      }))
      console.log(filterData)
    setproductOfCategory(filterData)

  }
  
  // delete function 
  const handleDelete=async (id)=>{
      const dataToDelete=ref(db,`Services/${id}`)
      try {
        await remove(dataToDelete)

        setproductOfCategory((previous)=>previous.filter(x=>x.serviceid!==id))

      } catch (error) {
        console.log("error while deleting",error)
      }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  // const arr = [
  //   {
  //     pic: doctor1,
  //     title: "doctor Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
  //   },
  //   {
  //     pic: pic4,
  //     title: "Lungs Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
  //   },
  //   {
  //     pic: doctor1,
  //     title: "Mental Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
  //   },
  //   {
  //     pic: pic4,
  //     title: "Lungs Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
  //   },
  //   {
  //     pic: doctor1,
  //     title: "Mental Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
  //   },
  //   {
  //     pic: pic4,
  //     title: "Lungs Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
  //   },
  //   {
  //     pic: doctor1,
  //     title: "Mental Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero",
  //   },
  //   {
  //     pic: pic4,
  //     title: "Lungs Health",
  //     explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero"
  //   }
  // ]

  return (
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">

            {/* top */}
            {/* <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div>
                  <img onClick={goback} style={{cursor:'pointer'}} src={vector} alt="" />
                </div>
                <div style={{ color: "#EE0000", fontWeight: "500", width: "80%" }}>
                  Manage Service Categories
                </div>

              </div>
            </div> */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div>
                
                <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
               
              </div>
              <div style={{ color: "#EE0000", }}>
                {t("Manage Health Products")}
              </div>
              <div style={{ backgroundColor: "none" }}>
                <Link to={`/home/services/catagory-products/${id}/serviceaddcategory-product`}>
                  <button style={{ border: "2px solid #EE0000", borderRadius: "14px", paddingLeft: "18px", paddingRight: "18px", color: '#EE0000', backgroundColor: "white" }}>{t("Add")}</button>
                </Link>
              </div>
            </div>
            {/* input  */}
            <div className="categories-input">
              <div style={{ width: "23%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <img src={search} alt="" />
                </div>
                <div style={{ color: "#929292" }}>
                 {t(" search")}
                </div>
              </div>

            </div>

            {productOfCategory.map((x, index) => (
             
              <div className="managecategories-card" key={index}>
                 {console.log(index)}
                <div className="cardcenter">
                  <div className="cardcenter-width" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '80%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '110px', }}>
                          {/* Image */}
                          <div style={{ width: "25%", display: "flex", justifyContent: "center" }}>
                            <img
                              src={x.imageUrl}
                              alt=""
                              style={{ cursor: 'pointer', width: "100%",objectFit: "contain" }}
                            // onClick={() => handleOpen(x.pic, x.title, x.explain)}
                            />
                          </div>

                          {/* Title */}
                          <div style={{ width: '70%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '18px', color: '#EE0000' }}>{x.servicename}</div>
                              <div style={{ fontSize: '8px', color: '#777777' }}>{x.description}</div>
                            </div>
                          </div>

                        </div>
                      </div>
                      {/* Menu Button */}
                      <div>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={(event) => handleClick(event, x.id)} // Pass the item id
                          style={{
                            color: '#EE0000'
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
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: '15ch',
                            },
                          }}
                        >
                          <MenuItem
                            style={{
                              color: '#7C7C7C',
                              borderBottom: '1px solid #ddd',
                              fontSize: '12px'
                            }}
                            onClick={() => handleMenuItemClick(`/home/services/catagory/ManageCategories-products-Edit/${x.id}`)}
                          >
                            <p>{t("Edit Profile")}</p>
                          </MenuItem>
                          <MenuItem
                            style={{
                              color: '#7C7C7C',
                              borderBottom: '1px solid #ddd',
                              fontSize: '12px'
                            }}
                            onClick={() => handleDelete(`${x.serviceid}`)}
                          >
                            <p>{t("Delete")}</p>
                          </MenuItem>
                          {/* Additional MenuItems can be added here */}
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={modalContent.pic} alt="" style={{ width: '100%', height: 'auto' }} />
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '1rem', fontSize: '18px', color: '#EE0000', fontWeight: "600" }}>
                  {modalContent.title}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '10px', fontSize: '8px', color: '#777777' }}>
                  {modalContent.explain}
                </Typography>
              </Box>
            </Modal>
          </div>

        </div>
      </div>
    </div>

  )
}
export default Managecategories 