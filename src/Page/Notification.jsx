import "./notification.css"
import vector from "../images/vector.png"
import { useNavigate } from "react-router-dom"
function Notification(){
    const navigate = useNavigate();

    const goback=()=>{
      navigate(-1);
    }
    return(
        <div className="notification-maibdiv">
            <div className="notification-width">
                <div className="notification-centerdiv">
                    <div className="secondwidth">
                        
                        {/* notification */}

                        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",width:"65%"}}>
                            <div>
                                <img onClick={goback}src={vector} alt="" style={{cursor:'pointer'}} />
                            </div>
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            Notifications
                            </div>
                        </div>

                        {/* All Notifications */}

                        <div style={{display:"flex",padding:"16px",marginTop:"2rem",fontSize:"14px",fontWeight:"500"}}>
                        All Notifications
                        </div>

                        {/* box1 */}

                        <div className="notification-boxwidth">
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            You have new order
                            </div>
                            <div style={{fontSize:"13px",fontWeight:"500"}}>
                            12:30 - 12/12/2023
                            </div>
                            <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
                                Lorem ipsum, dolor sit amet consectetur  elit.   rerum quaerat vel suscipit adipisci voluptate repellat aut officia maxime!
                            </div>

                        </div>
                        {/* box2 */}
                        <div style={{marginTop:"1rem"}} className="notification-boxwidth">
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            Somebody visit your profile
                            </div>
                            <div style={{fontSize:"13px",fontWeight:"500"}}>
                            12:30 - 12/12/2023
                            </div>
                            <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
                                Lorem ipsum, dolor sit amet consectetur  elit.   rerum quaerat vel suscipit adipisci voluptate repellat aut officia maxime!
                            </div>

                        </div>
                        {/* box3 */}
                        <div style={{marginTop:"1rem",backgroundColor:"#FCFCFC"}} className="notification-boxwidth">
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            You have new order
                            </div>
                            <div style={{fontSize:"13px",fontWeight:"500"}}>
                            12:30 - 12/12/2023
                            </div>
                            <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
                                Lorem ipsum, dolor sit amet consectetur  elit.   rerum quaerat vel suscipit adipisci voluptate repellat aut officia maxime!
                            </div>

                        </div>
                        {/* box4 */}
                        <div style={{marginTop:"1rem",backgroundColor:"#FCFCFC"}} className="notification-boxwidth">
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            Somebody visit your profile
                            </div>
                            <div style={{fontSize:"13px",fontWeight:"500"}}>
                            12:30 - 12/12/2023
                            </div>
                            <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
                                Lorem ipsum, dolor sit amet consectetur  elit.   rerum quaerat vel suscipit adipisci voluptate repellat aut officia maxime!
                            </div>

                        </div>
                        {/* box5 */}
                        <div style={{marginTop:"1rem",backgroundColor:"#FCFCFC"}} className="notification-boxwidth">
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            You have new order
                            </div>
                            <div style={{fontSize:"13px",fontWeight:"500"}}>
                            12:30 - 12/12/2023
                            </div>
                            <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
                                Lorem ipsum, dolor sit amet consectetur  elit.   rerum quaerat vel suscipit adipisci voluptate repellat aut officia maxime!
                            </div>

                        </div>
                        {/* box6 */}
                        <div style={{marginTop:"1rem",backgroundColor:"#FCFCFC"}} className="notification-boxwidth">
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            Somebody visit your profile
                            </div>
                            <div style={{fontSize:"13px",fontWeight:"500"}}>
                            12:30 - 12/12/2023
                            </div>
                            <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
                                Lorem ipsum, dolor sit amet consectetur  elit.   rerum quaerat vel suscipit adipisci voluptate repellat aut officia maxime!
                            </div>

                        </div>



                    </div>

                </div>

            </div>
            
        </div>
    )
}
export default Notification