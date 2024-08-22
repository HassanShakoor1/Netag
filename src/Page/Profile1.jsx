import search from "../images/search.png"
import vector from "../images/Vector.svg"
import pic from "../images/Ellipse.png"

import { useNavigate } from "react-router-dom"

function Profile1() {
    const navigate = useNavigate();
    const goback=()=>{
        navigate(-1)
    }
    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* top */}
                        {/* <div style={{ display: "flex", justifyContent: "start" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <div>
                                    <img style={{cursor:'pointer'}} onClick={goback} src={vector} alt="" />
                                </div>
                                <div style={{ color: "#EE0000", fontWeight: "600", width: "58%" }}>
                                    Leads
                                </div>

                            </div>
                        </div> */}
                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontWeight: "600",}}>
                            Leads
                            </div>
                            <div></div>
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

                        {/* card  */}
                        <div style={{marginTop:"2rem",height:"20vh"}} className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Mister Bruden</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Mister Bruden)</div>
                                                </div>
                                            </div>
                                            <div style={{display:"flex",flexDirection:"column",color:"white"}}>
                                                <button style={{backgroundColor:"red",fontSize: "10px",borderRadius:"18px",paddingTop:"6px",paddingBottom:"6px",paddingLeft:"8px",paddingRight:"8px",outline:'none',border:"none",color:"white"}}>Open</button>
                                                <button style={{backgroundColor:"white",marginTop:"5px",border:"2px solid red",color:"red",fontSize: "10px",borderRadius:"18px",paddingTop:"6px",paddingBottom:"6px",paddingLeft:"8px",paddingRight:"8px"}}>Remove</button>
                                              
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:"2rem",height:"20vh"}} className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Mister Bruden</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Mister Bruden)</div>
                                                </div>
                                            </div>
                                            <div style={{display:"flex",flexDirection:"column",color:"white"}}>
                                                <button style={{color:"white",backgroundColor:"red",fontSize: "10px",borderRadius:"18px",paddingTop:"6px",paddingBottom:"6px",paddingLeft:"8px",paddingRight:"8px",outline:'none',border:"none"}}>Open</button>
                                                <button style={{backgroundColor:"white",marginTop:"5px",border:"2px solid red",color:"red",fontSize: "10px",borderRadius:"18px",paddingTop:"6px",paddingBottom:"6px",paddingLeft:"8px",paddingRight:"8px"}}>Remove</button>
                                              
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile1