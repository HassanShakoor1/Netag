import "./categories.css"
import search from "../images/search.png"
import vector from "../images/vector.png"
import doctor from "../images/doctor.png"
import lung from "../images/lungs.png"
import dot from "../images/dot.png"
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom"

const options = [
    { text: 'Edit Category', color: '#7C7C7C' }, // Change color as needed
    { text: 'Delete Category', color: '#EE0000' } // Change color as needed
];

const ITEM_HEIGHT = 48;
function Categories() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handlemanage=()=>{
        navigate("/home/services/catagory");
      }
    const goback=()=>{
        navigate(-1);
      }
  
    // array 

    const arr = [
        {
            pic: doctor,
            title: "Mental Health Services",
            service: "(9 Services)",
            explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque!",
            btn: "Explore Service"
        },
        {
            pic: lung,
            title: "Lungs Releted Services",
            service: "(12 Services)",
            explain: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint ab libero, necessitatibus molestiae non ducimus enim veritatis sunt neque!",
            btn: "Explore Service"
        }

    ]

    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* Services Categories */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <img onClick={goback} style={{cursor:'pointer'}} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontSize: "16px", fontWeight: "400", marginLeft: "2rem" }}>
                                Services Categories
                            </div>
                            <div >
                                <button style={{ border: "2px solid #EE0000", borderRadius: "14px", paddingLeft: "18px", paddingRight: "18px", color: '#EE0000' }}>Add</button>
                            </div>

                        </div>
                        {/* input  */}
                        <div className="categories-input">
                            <div style={{ width: "23%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <img src={search} alt="" />
                                </div>
                                <div style={{ color: "#929292" }}>
                                    search
                                </div>
                            </div>

                        </div>

                        {/* health cards */}


                        {
                            arr.map((x, id) => {
                                return (
                                    <div key={id}>
                                        <div className="cardwidth">
                                            <div className="cardcenter">
                                                <div className="cardcenter-width">
                                                    <img style={{ height: "100%", width: "100%", marginTop: "7px" }} src={x.pic} alt="" />
                                                    {/* title  */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "97%" }}>
                                                        <div style={{ color: "#EE0000", fontWeight: "500", width: "100%", marginLeft: "5px", display: "flex", flexDirection: "column", justifyContent: "start", }}>
                                                            <div style={{ width: "100%", display: "flex", alignItems: "center", marginTop: "5px" }}>
                                                                <div style={{ fontSize: "18px" }}>{x.title}</div>
                                                                <div style={{ color: "#959595", fontSize: "9px", marginLeft: "4px" }}>{x.service}</div>
                                                            </div>
                                                            {/* para  */}
                                                            <div style={{ marginTop: "5px", color: "#777777", fontSize: "8px", width: "95%" }}>

                                                                {x.explain}

                                                            </div>
                                                        </div>
                                                        {/* <div >
                                                            <img src={dot} alt="" />
                                                        </div> */}
                                                        <div>
                                                            <IconButton
                                                                aria-label="more"
                                                                id="long-button"
                                                                aria-controls={open ? 'long-menu' : undefined}
                                                                aria-expanded={open ? 'true' : undefined}
                                                                aria-haspopup="true"
                                                                onClick={handleClick}
                                                                style={{
                                                                    color: '#EE0000', // Change this to your desired color or theme color
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
                                                                open={open}
                                                                onClose={handleClose}
                                                                PaperProps={{
                                                                    style: {
                                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                                        width: '15ch',
                                                                    },
                                                                }}
                                                            >
                                                                {options.map((option, index) => (
                                                                    <MenuItem
                                                                        key={option.text}
                                                                        style={{

                                                                            color: option.color, // Set the color of each item
                                                                            borderBottom: index < options.length - 1 ? '1px solid #ddd' : 'none', // Line between items
                                                                            fontSize:"12px"
                                                                        }}
                                                                        onClick={handleClose}
                                                                    >
                                                                        {option.text}
                                                                    </MenuItem>
                                                                ))}
                                                            </Menu>
                                                        </div>


                                                    </div>

                                                    {/* button  */}
                                                    <div onClick={handlemanage}>
                                                        <button style={{ marginTop: "1rem", marginBottom: "10px", width: "100%", border: "2px solid #EE0000", borderRadius: "12px", backgroundColor: "#FFDEDE", height: "5vh", color: "#EE0000" }}>{x.btn}</button>
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