import vector from '../images/Vector.svg'
import pic from "../images/Ellipse.png"
import addcontact from "../images/addcontact.svg"
import dotgray from "../images/dotgray.png"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { ref, get, update,remove, query, orderByChild, equalTo } from 'firebase/database'
import { database as db } from '../firebase.jsx'
import { useTranslation } from 'react-i18next';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ITEM_HEIGHT = 48;
function Myprofile() {
   
    const [multiprofile, setMultiProfile] = useState([])
    const [currentItemId, setCurrentItemId] = useState(null);
    
    const [activeProfiles, setActiveProfiles] = useState(null)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setCurrentItemId(id);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path) => {
        console.log(path)
        if (path) {
            navigate(path);
        }
        handleClose(); // Close the menu after an action is taken
    };

    const { t } = useTranslation()

    const navigate = useNavigate();
    const goback = () => {
        navigate(-1)
    }

    const parentId = localStorage.getItem('parentId')
    console.log("parentId", parentId)
    
    // fetching data of login user from firebase 
    const getAllUser = async () => {
        const userData = ref(db, "User")
        const snap = await get(userData)
        const data = await snap.val()
        console.log(data)

        try {
            const filteredData = Object.keys(data).filter(key => data[key].parentID === parentId)
                .map(key => ({
                    id: key,
                    ...data[key]
                }))
            console.log(filteredData)
            setMultiProfile(filteredData)
        }
        catch (error) {

            console.log("error in getAllUser function", error)

        }

    }

    // updating activeProfile in main user profile base on the selected id from profiles so that 
    // user when login again, that selected profile shows up 
    const handleProfile_Id = async (id) => {

        localStorage.setItem("userId", id);
       

        const starCountRef = ref(db, `User/${parentId}`);

        await update(starCountRef, {
            activeProfile: id,
        });
        setActiveProfiles(id);
    }
      {/* ----------------delete child profile-----------------*/}

// async function handleDelete(id) {
//     try {
//         console.log("id to delete", id);

//         // ----------------User table-----------------
//         const ChildUserDB = ref(db, `User/${id}`);

//         // ----------------Service----------------
//         const Service =query
//         ( ref(db, `/Services`),
//         orderByChild('uid'),
//         equalTo(id)
//         );

        
//         const serviceSnap = await get(Service);
//         const serviceData = serviceSnap.val();
//         console.log(serviceData)

//         // ----------------ServiceCategory----------------
//         const ServiceCategory =query( 
//         ref(db, `/ServiceCategory`),
//         orderByChild('uid'),
//         equalTo(id)
//         )
//         ;
      
//         const ServiceCategorySnap = await get(ServiceCategory);
//         const ServiceCategoryData = ServiceCategorySnap.val();
//         console.log(ServiceCategoryData)
//             {/*---------------deleting ServiceCategory of child user-------------------*/}
//          if(ServiceCategoryData)
//          {
//             for(const key in ServiceCategoryData)
//             {
//                 const ServiceCategoryDataRef=ref(db,`ServiceCategory/${key}`)
//                 await remove(ServiceCategoryDataRef)
//                 console.log('ServiceCategoryDataRef',ServiceCategoryDataRef)
//                 console.log(" key of ServiceCategoryDataRef ",key)
//             }
//          }

//                  {/*---------------deleting Services of child user -------------------*/}
//                  if(serviceData)
//                  {
//                     for(const key in serviceData){
//                         const serviceDataRef=ref(db,`Services/${key}`)

//                         await remove(serviceDataRef)

//                     }
//                  }
//                  {/*---------------child user Profile -------------------*/}
//                  await remove(ChildUserDB)
//                  setMultiProfile((previous)=>previous.filter((item)=>item.id!=id))

        

//     } catch (error) {
//         console.error("Error deleting user and related data:", error);
//     }
// }

async function handleDelete(id) {
    try {
      console.log("id to delete", id);
  
      // ----------------User table-----------------
      const ChildUserDB = ref(db, `User/${id}`);
  
      // Array of tables to delete related data
      const tables = [
        { name: 'Services', path: `/Services`, uid:"uid" },
        { name: 'ServiceCategory', path: `/ServiceCategory`, uid:"uid" },
        { name: 'Products', path: `/Products`, uid:"uid" },
        { name: 'ProductCategory', path: `/ProductCategory`, uid:"uid" },
        { name: 'Orders', path: `/Orders`, uid:"uid" },
        { name: 'Analytics', path: `/Analytic`, uid:"userid" },
        { name: 'Contacts', path: `/Contacts`, uid:"userid" }
        
      ];
  
      // Loop through each table to delete related data
      for (let table of tables) {
        const tableRef = query(
          ref(db, table.path),
          orderByChild(table.uid),
          equalTo(id)
        );
  
        const snap = await get(tableRef);
        const data = snap.val();
        if (data) {
          for (const key in data) {
            const dataRef = ref(db, `${table.path}/${key}`);
            await remove(dataRef);
            console.log(`${table.name} data deleted:`, dataRef);
          }
        }
      }
  
      // ---------------deleting child user Profile -------------------
      await remove(ChildUserDB);
      console.log("Child user profile deleted.");
  
      // Optionally remove the user from the frontend state (assuming `setMultiProfile` is used to manage the state)
      setMultiProfile((previous) => previous.filter((item) => item.id !== id));
  
      console.log("Child user and related data deleted successfully.");
    } catch (error) {
      console.error("Error deleting user and related data:", error);
    }
  }
  



    useEffect(() => {
        const storedActiveProfile = localStorage.getItem("userId"); // Get active profile from localStorage
        if (storedActiveProfile) {
            setActiveProfiles(storedActiveProfile); // Set it in the state
        }
        getAllUser()
    }, [])




    const [users, setUsers] = useState([]);
const userId=localStorage.getItem("userId")
useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dbRef = ref(db, `User/${userId}`);
        const snapshot = await get(dbRef);
  
        if (snapshot.exists()) {
          setUsers(snapshot.val()); // Directly set the object
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  console.log(users); // Should log the object
  console.log("user data is", users?.isProVersion); // Should work now
  


    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontWeight: "600", }}>
                                {t("Choose a Profile")}
                            </div>
                            <div></div>
                        </div>

                        <div style={{ marginTop: "3rem" }}></div>

                        {/* card  */}

                        {multiprofile.map((x, index) => (
                            <div className="profile-positionn" key={index} style={{ marginTop: "2rem" }}>

                                <div className="aboulte" style={{ position: "absolute", bottom: "100%", backgroundColor: "red", right: "58%", padding: "5px", fontSize: "10px", color: "white" }}>
                                    {x.name || "Main"}
                                </div>

                                <div className="profile-position">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div style={{ width: "90%" }}>


                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                                <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>
                                                    <div>
                                                        <img onClick={()=>handleProfile_Id(x.id)} style={{ objectFit: "cover", width: "70px", height: "70px", borderRadius: "50px" }} src={x.profileUrl} alt="" />
                                                    </div>
                                                    <div style={{ marginLeft: "10px", }}>
                                                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>{x.name}</div>
                                                        <div style={{ fontSize: "10px", color: "#929292" }}>({x.username})</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        
                                                            
                                                       activeProfiles==x.id?
                                                    <img  src={addcontact} alt="" />
                                              
                                                   :
                                                    <div >
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
                                                                margin: "0"
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
                                                            // Set the anchorOrigin to open to the left side
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left', // Open menu from the left of the button
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right', // Align the right side of the menu to the left side of the button
                                                            }}
                                                        >
                                                            <MenuItem
                                                                style={{
                                                                    color: '#7C7C7C',
                                                                    borderBottom: '1px solid #ddd',
                                                                    fontSize: '12px'
                                                                }}
                                                                onClick={() => handleMenuItemClick(`/home/create-new-profile/${x.id}`)}
                                                            >
                                                                <p>{t("Edit Profile")}</p>
                                                            </MenuItem>
                                                            <MenuItem
                                                                style={{
                                                                    color: '#7C7C7C',
                                                                    borderBottom: '1px solid #ddd',
                                                                    fontSize: '12px'
                                                                }}
                                                                onClick={() => handleDelete(`${x.id}`)} >
                                                                <p>{t("Delete")}</p>
                                                            </MenuItem>
                                                            {/* Additional MenuItems can be added here */}
                                                        </Menu>
                                                    </div>
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>






                            </div>
                        ))}


                        <div style={{ marginTop: "2rem" }}>
                        {users?.isProVersion === false ? (
  <Link to={"/home/setting/subscript"}>
    <button
      style={{
        border: "none",
        width: "100%",
        backgroundColor: "#EE0000",
        height: "7vh",
        borderRadius: "12px",
        color: "white",
        cursor:"pointer"
      }}
    >
      {t("Create New Profile")}
    </button>
  </Link>
) : (
  <Link to={"/home/create-new-profile"}>
    <button
      style={{
        border: "none",
        width: "100%",
        backgroundColor: "#EE0000",
        height: "7vh",
        borderRadius: "12px",
        color: "white",
        cursor:"pointer"
      }}
    >
      {t("Create New Profile")}
    </button>
  </Link>
)}


                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Myprofile

