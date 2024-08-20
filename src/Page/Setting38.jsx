import pic from "../images/Ellipse.png"
import "./Setting.css"
import { useState } from "react"
import person from "../images/personrounded.png"
import lead from "../images/lead.png"
import member from "../images/membership.png"

import shop from "../images/shop.png"
import languages from "../images/Languages.png"
import privacy from "../images/privacy.png"
 
import Delete from "../images/Delete.png"
import Footer from "../Components/Footer"
import Logout from "../images/Logout.png"
import vectorrr from "../images/vectorrr.png"
import { useNavigate } from "react-router-dom"

function Setting() {

    const [activeTab, setActiveTab] = useState('newOrders'); // State to track the active tab

    // Define styles for active and inactive tabs
    const activeStyle = {
        backgroundColor: '#EE0000',
        color: '#FFFFFF',
        fontWeight: 'bold'
    };

    const inactiveStyle = {
        backgroundColor: '#FFFFFF',
        color: '#A6A6A6',
        fontWeight: 'normal'
    };
    const navigate = useNavigate();
    const handlemyprofiles=()=>{
        navigate("/home/setting/myprofile");
      }
    const handlelead=()=>{
        navigate("/home/setting/lead");
      }
    const handlesubs=()=>{
        navigate("/home/setting/subscript");
      }

    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* red div  */}

                        <div className="reddiv">

                            <div className="reddiv-flex">
                                <div >
                                    <img src={pic} alt="" />
                                </div>
                                <div style={{ marginLeft: "10px", color: "white" }}>
                                    <div style={{ fontSize: "16px", fontWeight: "600" }}>Mister Bruden</div>
                                    <div style={{ fontSize: "10px", color: "#FFFFFF" }}>(Burden)</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', cursor: "pointer" }}>
                                <div style={{ padding: "1px", width: '60%', backgroundColor: '#FFFFFF', borderRadius: '48px', display: 'flex', justifyContent: 'space-between', height: '6vh' }}>
                                    <div
                                        style={{
                                            ...inactiveStyle,
                                            ...(activeTab === 'newOrders' ? activeStyle : {}),
                                            borderRadius: '48px',
                                            fontSize: '12px',
                                            width: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            height: '100%',
                                            alignItems: 'center'
                                        }}
                                        onClick={() => setActiveTab('newOrders')}
                                    >
                                        Profile Off
                                    </div>
                                    <div
                                        style={{
                                            ...inactiveStyle,
                                            ...(activeTab === 'ordersHistory' ? activeStyle : {}),
                                            borderRadius: '48px',
                                            fontSize: '12px',
                                            width: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            height: '100%',
                                            alignItems: 'center'
                                        }}
                                        onClick={() => setActiveTab('ordersHistory')}
                                    >
                                        Profile On
                                    </div>
                                </div>
                            </div>




                        </div>

                        {/* profile cards */}

                        <div style={{ marginTop: "2rem" }}></div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div  onClick={handlemyprofiles} style={{cursor:'pointer', width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div >
                                                <img src={person} alt="" />
                                                </div>
                                                <div  style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Your Profiles</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div onClick={handlelead} style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={lead} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Leads</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div onClick={handlesubs} style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={member} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px",cursor:'pointer'}}>Membership</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={shop} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Shop</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={languages} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Languages</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={privacy} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Privacy Policy & Terms & Conditions</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={Delete} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Delete Account</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop:"20px",display: "flex", justifyContent: "center" }}>
                            <div style={{width:"90%"}}>
                                <div className="settingcard">
                                    <div style={{ display: "flex", justifyContent: "center",alignItems:"center" , height:"10vh"}}>
                                        <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div>
                                                <img src={Logout} alt="" />
                                                </div>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>Logout</div>
                                            </div>
                                            <div>
                                                <img src={vectorrr} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        

                    </div>
                </div>
                <Footer/>
            </div>
           
        </div>
    )
}
export default Setting