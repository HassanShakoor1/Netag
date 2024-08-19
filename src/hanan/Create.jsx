import vector from "../images/vector.png"
import "./imges.css";



import logo from "../images/logo.png"
import {Link} from 'react-router-dom'


function Create() {

    return (
        <div className="welcome-center">
           
            <div className="welcome-widt">
                {/* <div style={{display:"flex",justifyContent:"flex-start"}}>
             <img src={vector} alt="" />
            </div> */}

                {/* logo */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <div style={{ color: "red", fontSize: "15px" }}>
                        Lets get Connected
                    </div>
                    <div style={{ color: "red", fontSize: "30px" }}>
                        Create Account
                    </div>

                </div>

                {/* para */}

                <div style={{width:"92%"}}>
                    <p style={{textAlign:"center",color:"#C9CCC5"}}>
                    Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet
                    </p>
                    
                </div>

                {/* INPUT  */}

                <div style={{width:"92%",height:"470px",display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
                    <div style={{width:"100%"}}>
                        
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Full Name" />
                    </div>
                    {/* 2nd */}
                    <div style={{width:"100%"}}>
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="UserName"/>
                    </div>
                    {/* 3rd */}
                    <div style={{width:"100%"}}>
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Email"/>
                    </div>
                    {/* 4th */}
                    <div style={{width:"100%"}}>
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Password"/>
                    </div>
                    {/* 5th */}
                     <div style={{width:"100%"}}>
                        <input style={{width:"100%",padding:"15px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Confirm Password"/>
                    </div>
                    
                    {/* para  */}
                    
                    <div>
                        <p style={{fontSize:"12px",color:"#C3C1C1"}}>
                         <span style={{fontSize:"15px",fontWeight:"bold"}}> Lorem</span>    ipsum dolor sit amet, consectetur  elit. Neque sunt enim incidunt inventore consequatur possimus blanditiis provident debitis atque beatae.
                        </p>
                    </div>
                    {/* tick */}
                    <div style={{display:"flex",alignItems:"center",width:"100%"}}>
                    <input style={{border:"1px solid red",backgroundColor:"red",marginRight:"4px"}} type="checkbox" id="" name="" value="Bike"/>
                        <p style={{fontSize:"9px",color:"#C3C1C1",width:"100%"}}>
                            By Signing up you agree to our <span style={{color:"#EE0000",fontWeight:"bold"}}>Privacy Policy </span> and <span style={{color:"#EE0000",fontWeight:"bold"}}>Terms of Use</span> 
                        </p>
                    </div>
                    {/* buttonn */}
                    <div style={{display:"flex",width:"98%",alignItems:"center",flexDirection:"column",justifyContent:"space-between",height:"65px"}}>
                        <div style={{width:"100%"}}>
                        <button style={{borderRadius:"12px",color:"white",width:"100%"}} className="btn-colr">Sign Up</button>
                        </div>
                        <div style={{marginTop:"8px"}}>
                           <span style={{color:"#C3C1C1"}}>
                           Already have an account?
                            </span>  
                            <span style={{marginLeft:"3px"}}>
                                <Link to="/signup" style={{color:"#EE0000",fontWeight:"bold"}}>
                                Sign In
                                </Link>
                                </span>
                        </div>
                    </div>
                </div>
                </div>

            </div>
           
            

      
    )
}
export default Create 