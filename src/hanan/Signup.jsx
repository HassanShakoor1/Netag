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
                <div style={{width:'100%',maxWidth:"430px",display:'flex',justifyContent:'center',margin:'2px auto',alignItems:'center',flexDirection:'column',gap:'10px'}}>
                    <div style={{width:"90%"}}>
                        
                        <input style={{width:"90%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Full Name" />
                    </div>
                    {/* 2nd */}
                    <div style={{width:"90%"}}>
                        <input style={{width:"90%",padding:"15px",border:"1px solid gray",borderRadius:"12px",display:'flex',justifyContent:'center',margin:'20px auto',alignItems:'center'}} type="text" placeholder="UserName"/>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",width:"80%"}}>
                        <Link to="/forget" style={{textDecoration:'none'}} >
                        <span style={{color:"#F24040",borderBottom:"1px solid red",fontWeight:"600"}}>
                            Forget Password 
                            </span> 
                        </Link>
                        
                    </div>
                    <div style={{display:"flex",width:"92%",alignItems:"center",flexDirection:"column",justifyContent:"space-between",height:"180px"}}>
                        <div>
                       <Link to="/home" style={{textDecoration:'none'}}> 
                        <button   style={{
    backgroundColor: "red",
    width: "380px",
    padding: "10px",
    height:'50px',
    fontSize: "15px",
    border: "transparent",
    borderRadius: "15px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    margin: "2px auto",
    alignItems: "center",
    cursor: "pointer",
  }}>Login</button>
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