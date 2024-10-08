import pic from "../images/Ellipse.png"
import "./setting.css"
import { useState,useContext,useEffect } from "react"
import person from "../images/personrounded.svg"
import lead from "../images/lead.png"
import member from "../images/membership.png"

import { getDatabase, ref, update,get } from "firebase/database";

import shop from "../images/shop.png"
import languages from "../images/Languages.png"
import privacy from "../images/privacy.png"
 
import Delete from "../images/Delete.png"
import Footer from "../Components/Footer"
import Logout from "../images/Logout.png"
import vectorrr from "../images/vectorrr.svg"
import { useNavigate,Link } from "react-router-dom"

import {AppContext} from './LanguageContextProvider'

import { useTranslation } from 'react-i18next';
import { database } from "../firebase"
function Setting() {
     
    // for translation 
    const { t } = useTranslation()

    const{language}=useContext(AppContext)
const [record, setRecord]=useState([])
    console.log(language)
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


    {/*--------------------------logout--------------------------*/}  
    function logout() {
        localStorage.removeItem("userId")
        localStorage.removeItem("parentId")
        navigate('/signup')
    } 
const userId=localStorage.getItem("userId")
useEffect(() => {
    const fetch = async () => {
        try {
            // Reference to the 'User' node in your Firebase Realtime Database
            const dataRef = ref(database, `User`);
            const snap = await get(dataRef);
            const data = snap.val();
    
            if (data) {
                // Filter and map the data to match the userId
                let arr = Object.keys(data)
                    .filter(key => data[key].id === userId) // Check if the id matches the userId
                    .map(key => ({
                        id: key,       // Key from the Firebase data
                        ...data[key]   // Spread operator to get the rest of the data for each user
                    }));
                
                console.log("User data is", arr);
                setRecord(arr); // Set the filtered data in the state
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    // Call the function
    fetch();
    
}, [])










    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* red div  */}

                        <div className="reddiv">

                        <div className="reddiv-flex">
    {record.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <img style={{width:'100px',height:'100px',borderRadius:"100%",objectFit:'cover'}} src={item.profilePicture} alt="" />
            </div>
            <div style={{ marginLeft: "10px", color: "white" }}>
                <div style={{ fontSize: "20px", fontWeight:'100' }}>{item.name}</div>
                <div style={{ fontSize: "10px", color: "#FFFFFF" }}>({item.nickname})</div>
            </div>
        </div>
    ))}
</div>


                            <div style={{ display: 'flex', justifyContent: 'center', cursor: "pointer" }}>
                                <div style={{ padding: "1px", width: '60%', backgroundColor: '#FFFFFF', borderRadius: '48px', display: 'flex', justifyContent: 'space-between', height: '6vh' }}>
                                    <div
                                        style={{
                                            ...inactiveStyle,
                                            ...(activeTab === 'newOrders' ? activeStyle : {}),
                                            borderRadius: '48px',
                                            fontSize: '10px',
                                            width: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            height: '100%',
                                            alignItems: 'center'
                                        }}
                                        onClick={() => setActiveTab('newOrders')}
                                    >
                                      {t("Profile Off")}  
                                    </div>
                                    <div
                                        style={{
                                            ...inactiveStyle,
                                            ...(activeTab === 'ordersHistory' ? activeStyle : {}),
                                            borderRadius: '48px',
                                            fontSize: '10px',
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
                                                <Link to="/home/setting/language" style={{textDecoration:"none"}}>
                                                <div style={{color:"#868686",marginLeft:"6px",fontSize:"16px"}}>
                                                    Languages
                                                    </div>
                                                </Link>
                                               
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
                                                <div onClick={logout}>
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
                <br /><br /><br /><br /><br />
                <Footer/>
            </div>
           
        </div>
    )
}
export default Setting