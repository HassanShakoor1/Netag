import vector from '../images/Vector.svg'
import pic from "../images/Ellipse.png"
import addcontact from "../images/addcontact.svg"
import dotgray from "../images/dotgray.png"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { ref, get, update,remove } from 'firebase/database'
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
        localStorage.setItem("userId", id)

        const starCountRef = ref(db, `User/${parentId}`);

        await update(starCountRef, {
            activeProfile: id,
        });
        setActiveProfiles(id);
    }
      {/* ----------------delete child profile-----------------*/}
//   async  function handleDelete(id) {

//         console.log("id to delete",id)
//            {/* ----------------user table-----------------*/}
//         const userDB=ref(db,`User/${id}`)
        
//          {/* -----------------ServiceCategory----------------*/}
//         const ServiceCategory=ref(db,`ServiceCategory`)

//         {/* -----------------Service----------------*/}
         
//         const Service=ref(db,`Services`)

//         const snap=await get(Service)
//         const ServiceData=await snap.val()
//         {/* -----------------it will create array of products ----------------*/}
//         const ServiceData_Arr=Object.values(ServiceData)
//         {/* -----------------it will filter array of products ----------------*/}
        
//         const ServiceData_FilteredArr=ServiceData_Arr.filter((x)=>x)


//     }
async function handleDelete(id) {
    try {
        console.log("id to delete", id);

        // ----------------User table-----------------
        const userDB = ref(db, `User/${id}`);

        // ----------------ServiceCategory----------------
        const ServiceCategory = ref(db, `ServiceCategory`);

        // ----------------Service----------------
        const Service = ref(db, `Services`);

        // Fetch the Services data
        const serviceSnap = await get(Service);
        const serviceData = serviceSnap.val();

        if (serviceData) {
            // Convert the services data to an array
            const serviceDataArr = Object.entries(serviceData); // entries gives [key, value] pairs

            // Filter services by the user's id or category id (modify based on your data structure)
            const servicesToDelete = serviceDataArr.filter(([key, value]) => value.uid === id);

            // Delete all related services
            for (const [serviceKey, service] of servicesToDelete) {
                const serviceRef = ref(db, `Services/${serviceKey}`);
                await remove(serviceRef);
                console.log(`Deleted service with key: ${serviceKey}`);
            }
        } else {
            console.log("No services found for this user.");
        }

        // Fetch the ServiceCategory data
        const categorySnap = await get(ServiceCategory);
        const categoryData = categorySnap.val();

        if (categoryData) {
            // Convert the ServiceCategory data to an array
            const categoryDataArr = Object.entries(categoryData);

            // Filter service categories by the user's id (or other relevant criteria)
            const categoriesToDelete = categoryDataArr.filter(([key, value]) => value.uid === id);

            // Delete all related categories
            for (const [categoryKey, category] of categoriesToDelete) {
                const categoryRef = ref(db, `ServiceCategory/${categoryKey}`);
                await remove(categoryRef);
                console.log(`Deleted category with key: ${categoryKey}`);
            }
        } else {
            console.log("No service categories found for this user.");
        }

        // Finally, delete the user
        await remove(userDB);
        console.log(`Deleted user with id: ${id}`);
        setMultiProfile((previous)=> previous.filter((item) => item.id !== id))

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
                                Choose a Profile
                            </div>
                            <div></div>
                        </div>

                        <div style={{ marginTop: "3rem" }}></div>

                        {/* card  */}

                        {multiprofile.map((x, index) => (
                            <div className="profile-positionn" key={index} style={{ marginTop: "2rem" }}>

                                <div className="aboulte" style={{ position: "absolute", bottom: "100%", backgroundColor: "red", right: "58%", padding: "5px", fontSize: "10px", color: "white" }}>
                                    {x.profileUrl || "Main"}
                                </div>

                                <div className="profile-position">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div style={{ width: "90%" }}>


                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                                <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>
                                                    <div>
                                                        <img onClick={()=>handleProfile_Id(x.id)} style={{ objectFit: "contain", width: "70px", height: "70px", borderRadius: "50px" }} src={x.logoUrl} alt="" />
                                                    </div>
                                                    <div style={{ marginLeft: "10px", }}>
                                                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Mister Bruden</div>
                                                        <div style={{ fontSize: "10px", color: "#929292" }}>(Burden)</div>
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
                            <Link to={"/home/create-new-profile"}>
                                <button style={{ border: "none", width: "100%", backgroundColor: "#EE0000", height: "7vh", borderRadius: "12px", color: "white" }}>Create New Profile</button>
                            </Link>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Myprofile