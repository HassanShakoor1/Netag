import "./categories.css"
import search from "../images/search.svg"
import vector from "../images/Vector.svg"
import doctor from "../images/doctor.png"
import lung from "../images/lungs.png"
import dot from "../images/dot.png"
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { database as db } from "../firebase.jsx"
import { get, ref, remove } from "firebase/database"

import { useTranslation } from 'react-i18next';

// const options = [
//     { text: 'Edit Category', color: '#7C7C7C', pathkey: useNavigate('/home/services/edit') }, // Change color as needed
//     { text: 'Delete Category', color: '#EE0000' } // Change color as needed
// ];

const ITEM_HEIGHT = 48;
function Categories() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    //  get data from firebase 
    const [Firebasedata, setFirebasedata] = useState([])
    const [currentItemId, setCurrentItemId] = useState(null);
    
    const userId = localStorage.getItem('userId');


    const{t}=useTranslation()

    // getting data from firebase 
    function getData() {
        const dbref = ref(db, `ServiceCategory`)

        const initialdata = async () => {
            const snap = await get(dbref)
            const data = await snap.val()
            console.log("data",data)
            try {
            //     const arr = Object.keys(data).map((x) => ({
            //         id: x,
            //         ...data[x]
            //     }))
            //     console.log(arr)
            //     setFirebasedata(arr)


            
            const filteredData = Object.keys(data)
                .filter(key => data[key].uid=== userId) // Filter based on userId
                .map(key => ({
                    id: key,
                    ...data[key]
                }));

            console.log("filtered data",filteredData);

            // Update the state or handle the filtered data
            setFirebasedata(filteredData);
            } 
            
            
            
            
            
            catch (error) {
                console.log(error)
            }
        }
        initialdata()

    }



    useEffect(() => {

        getData()

    }, [])

    console.log(Firebasedata)




    const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setCurrentItemId(id);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();


    // explore button navigation
    const handlemanage = (id) => {
        navigate(`/home/services/catagory/${id}`);
    }
    const goback = () => {
        navigate("/home");
    }


  



    const handleMenuItemClick = (path) => {
        console.log(path)
        if (path) {
            navigate(path);
        }
        handleClose(); // Close the menu after an action is taken
    };


    const handleDelete = async (id) => {
        // Reference to the item in Firebase
        console.log(id)
        try{
        const itemRef = ref(db, `ServiceCategory/${id}`);
        const categories=ref(db,`Services`)
        
        console.log(itemRef)
         const categoriesSnapshot=await get(categories)
        //  it will return objects of products 
         const categoriesData=categoriesSnapshot.val()
         console.log("categoriesData",categoriesData)
        //   it will create array of products 
         const categoriesData_arr=Object.values(categoriesData)
         console.log("categoriesData_arr",categoriesData_arr)
          
      const categoriesToDelete=  categoriesData_arr.filter((x)=>x.categoryid===id)
      console.log("categoriesToDelete",categoriesToDelete)
      
    //   it will delete very product which has Service_id init  
      for(const category_index of categoriesToDelete)
      {
        const deleting=ref(db,`servicesProducts/${category_index.productId}`)
       
        console.log("category_index",category_index.productId)
        await remove(deleting)
      }
      


       
            // Delete the item from Firebase
            await remove(itemRef);

            // Update local state
            setFirebasedata((previous) => previous.filter((item) => item.id !== id));

        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    




    // array 

    // const arr = [
    //     {
    //         pic: doctor,
    //         title: "Mental Health Services",
    //         service: "(9 Services)",
    //         explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque!",
    //         btn: "Explore Service"
    //     },
    //     {
    //         pic: lung,
    //         title: "Lungs Releted Services",
    //         service: "(12 Services)",
    //         explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque!",
    //         btn: "Explore Service"
    //     }

    // ]

    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* Services Categories */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <img onClick={goback} style={{ cursor: 'pointer' }} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontSize: "16px", fontWeight: "600", marginLeft: "2rem" }}>
                               {t( "Services Categories")}
                            </div>
                            <div style={{ backgroundColor: "none" }}>
                                <Link to={"/home/services/serviceaddcategory"}>
                                    <button style={{ border: "1.5px solid #EE0000", borderRadius: "14px", paddingLeft: "18px", paddingRight: "18px",paddingTop:"5px", paddingBottom:"5px",color: '#EE0000', backgroundColor: "white",fontSize:"12px" }}>{t("Add")}</button>
                                </Link>
                            </div>

                        </div>
                        {/* input  */}
                        <div className="categories-input">
                            <div style={{ width: "23%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <img src={search} alt="" />
                                </div>
                                <div style={{ color: "#929292",width:"70%" }}>
                                    Search
                                </div>
                            </div>

                        </div>

                        {/* health cards */}


                        {
                            Firebasedata.map((x, index) => {
                                return (
                                    <div key={index}>
                                        <div className="cardwidth">
                                            <div className="cardcenter">
                                                <div className="cardcenter-width">
                                                    <div style={{ width: '100%' }}>
                                                        {/* image  */}

                                                        <img style={{ maxHeight: "200px", width: "100%", marginTop: "7px", objectFit: "contain" }} src={x.imageurl} alt="" />
                                                    </div>
                                                    {/* title  */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                                        <div style={{ color: "#EE0000", fontWeight: "500", width: "100%", marginLeft: "5px", display: "flex", flexDirection: "column", justifyContent: "start", }}>
                                                            <div style={{ width: "100%", display: "flex", alignItems: "center", marginTop: "5px" }}>
                                                                <div style={{ fontSize: "18px" }}>{x.name}</div>
                                                                <div style={{ color: "#959595", fontSize: "9px", marginLeft: "4px" }}></div>
                                                            </div>
                                                            {/* para  */}
                                                            <div style={{ marginTop: "5px", color: "#777777", fontSize: "8px", width: "95%" }}>

                                                                {x.description}

                                                            </div>
                                                        </div>

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
                                                                    padding:"0",
                                                                    margin:"0"
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
                                                                    onClick={() => handleMenuItemClick(`/home/services/serviceeditcategory/${x.id}`)}
                                                                >
                                                                    <p>{t("Edit Profile")}</p>
                                                                </MenuItem>
                                                                <MenuItem
                                                                    style={{
                                                                        color: '#7C7C7C',
                                                                        borderBottom: '1px solid #ddd',
                                                                        fontSize: '12px'
                                                                    }}
                                                                    onClick={() => handleDelete(`${x.categoryid}`)} >
                                                                    <p>{t("Delete")}</p>
                                                                </MenuItem>
                                                                {/* Additional MenuItems can be added here */}
                                                            </Menu>
                                                        </div>


                                                    </div>

                                                    {/* button  */}
                                                    <div onClick={() => handlemanage(x.id)}>
                                                        <button style={{ marginTop: "1rem", marginBottom: "10px", width: "100%", border: "2px solid #EE0000", borderRadius: "10px", backgroundColor: "#FFDEDE", height: "6vh", color: "#EE0000" }}>{t("Explore")} </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





                                )
                            })
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}
export default Categories