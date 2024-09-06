import vector from '../images/Vector.svg'
import pic from "../images/Ellipse.png"
import addcontact from "../images/addcontact.png"
import dotgray from "../images/dotgray.png"
import { useNavigate,Link } from "react-router-dom"
import {useEffect,useState } from 'react'
import { ref, get } from 'firebase/database'
import {database as db} from '../firebase.jsx'

function Myprofile() {

const[multiprofile,setMultiProfile]=useState([])

    const navigate = useNavigate();
    const goback = () => {
        navigate(-1)
    }

const parentId=localStorage.getItem('parentId')
console.log("parentId",parentId)
    // fetching data of login user from firebase 
    const getAllUser=async ()=>{
       const userData=ref(db,"User")
       const snap= await get(userData)
       const data= await snap.val()
       console.log(data)

       try {
        const filteredData=Object.keys(data).filter(key=>data[key].parentID===parentId)
        .map(key=>({
            id:key,
            ...data[key]
        }))
        console.log(filteredData)
        setMultiProfile(filteredData)
       } 
       catch (error) {
        
        console.log("error in getAllUser function",error)
        
       }

    }
     
    
    const handleProfile_Id=(id)=>{
        localStorage.setItem("userId",id)
    }
  


    useEffect(()=>{
        getAllUser() 
    },[])


    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* top */}
                        {/* <div style={{ display: "flex", justifyContent: "start" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <div>
                                    <img style={{cursor:"pointer"}} onClick={goback} src={vector} alt="" />
                                </div>
                                <div style={{ color: "#EE0000", fontWeight: "600", width: "68%" }}>
                                    Choose a Profile
                                </div>

                            </div>
                        </div> */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontWeight: "600",}}>
                            Choose a Profile
                            </div>
                            <div></div>
                        </div>

                        <div style={{ marginTop: "3rem" }}></div>

                        {/* card  */}

                       {multiprofile.map((x,index)=>(
                             <div className="profile-positionn" key={index} style={{marginTop:"1rem"}}>

                             <div className="aboulte" style={{ position: "absolute",bottom:"100%", backgroundColor: "red", right: "58%", padding: "5px", fontSize: "10px",color:"white" }}>
                                 {x.profileUrl}
                             </div>
 
                             <div className="profile-position">
                                 <div style={{ display: "flex", justifyContent: "center" }}>
                                     <div style={{ width: "90%" }}>
 
 
                                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                             <div style={{ display: "flex", alignItems: "center" }}>
                                                 <div>
                                                     <img src={pic} alt="" />
                                                 </div>
                                                 <div style={{ marginLeft: "10px", }}>
                                                     <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Mister Bruden</div>
                                                     <div style={{ fontSize: "10px", color: "#929292" }}>(Burden)</div>
                                                 </div>
                                             </div>
                                             <div>
                                                 <img onClick={()=>handleProfile_Id(x.id)} src={addcontact} alt="" />
                                             </div>
 
                                         </div>
 
                                     </div>
                                 </div>
                             </div>
 
 
 
 
 
 
                         </div>
                       ))}
                        {/* <div className="profile-positionn">

                            <div className="aboulte" style={{ position: "absolute",bottom:"100%", backgroundColor: "red", right: "58%", padding: "5px", fontSize: "10px",color:"white" }}>
                                Main Profile
                            </div>

                            <div className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Mister Bruden</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Burden)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={addcontact} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>






                        </div> */}

                        {/* <div className="profile-positionn" style={{ marginTop: "3rem" }}>

                            <div className="aboulte" style={{ position: "absolute", bottom:"100%", backgroundColor: "red", right: "58%", padding: "5px", fontSize: "10px",color:"white" }}>
                                Main Profile
                            </div>

                            <div className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Rakesha Porwanana</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Romskaha lanhdaea)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={dotgray} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>






                        </div>

                        <div className="profile-positionn" style={{ marginTop: "3rem" }}>

                            <div className="aboulte" style={{ position: "absolute", bottom:"100%", backgroundColor: "red", right: "58%", padding: "5px", fontSize: "10px",color:"white" }}>
                                Main Profile
                            </div>

                            <div className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Rakesha Porwanana</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Romskaha lanhdaea)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={dotgray} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>






                        </div> */}

                        <div style={{ marginTop: "2rem" }}>
                           <Link to={"/home/create-new-profile"}>
                           <button style={{ border:"none",width: "100%", backgroundColor: "#EE0000", height: "7vh", borderRadius: "12px", color: "white" }}>Create New Profile</button>
                           </Link>
                            
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Myprofile