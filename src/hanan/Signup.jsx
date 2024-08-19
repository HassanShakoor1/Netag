import logo from "../images/logo.png"
import pana from "../images/pana.png"
import {Link} from "react-router-dom"
import apple from "../images/apple.png"
import fb from "../images/fb.png"
import google from "../images/google.png"

function Signup(){

    return(
        <div className="welcome-center">
           
           
        <div className="welcome-widt">
            
                {/* logo */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <div style={{ color: "red", fontSize: "15px" }}>
                        Lets get Connected
                    </div>
                    <div style={{ color: "red", fontSize: "30px" }}>
                       Welcome Back 
                    </div>

                </div>

                {/* para */}

                <div style={{width:"321px",display:"flex",justifyContent:"center"}}>
                    <p style={{textAlign:"center",color:"#C3C7BF"}}>
                    Lorem ipsum dolor sit amet.Lo ipsu dolor sit amet
                    </p>
                    
                </div>

                {/* img  */}
                <div style={{display:"flex",justifyContent:"center"}}>
                <div style={{marginBottom:"3rem",marginTop:"1rem",width:"70%"}}>
                    <img src={pana} alt="" />
                </div>

                </div>

                {/* inputt */}
                <div style={{width:"341px",height:"331px",display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
                    <div style={{width:"92%"}}>
                        
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Full Name" />
                    </div>
                    {/* 2nd */}
                    <div style={{width:"92%"}}>
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="UserName"/>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",width:"90%"}}>
                        <Link to="/forget" >
                        <span style={{color:"#F24040",borderBottom:"2px solid red",fontWeight:"600"}}>
                            Forget Password 
                            </span> 
                        </Link>
                        
                    </div>
                    <div style={{display:"flex",width:"92%",alignItems:"center",flexDirection:"column",justifyContent:"space-between",height:"180px"}}>
                        <div>
                       <Link to="/home"> 
                        <button style={{borderRadius:"12px",color:"white"}} className="btn-colr">Login</button>
                        </Link>
                        </div>
                        <div>
                            Don't have an account?
                             <span>
                            <Link to="/create" style={{color:"#EE0000",fontWeight:"bold"}}>
                                Sign up
                                </Link>
                            </span>
                        </div>
                        <div>
                            Continue via Social Networks 
                        </div>

                        <div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"120px"}}>
                        <div style={{padding:"4px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                             <img src={google} alt="" />
                         </div>
                       <div style={{padding:"4px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                             <img src={fb} alt="" />
                         </div>

                         <div style={{padding:"4px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                             <img src={apple} alt="" />
                         </div>   
                    </div>
                        </div>
                       
                    </div>
                    </div>

            </div>
            </div>
    )
}
export default Signup