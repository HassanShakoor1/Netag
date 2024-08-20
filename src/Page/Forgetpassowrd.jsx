import logo from "../images/logo.png"
import rafik from "../images/rafik.png"

function Forgetpassword(){

    return(
        <div className="welcome-center">
           
           
        <div  className="welcome-widt">
            
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

                {/* lastdiv */}

                <div style={{display:"flex",alignItems:"center",flexDirection:"column",width:"391px"}}>
               
                    <div style={{ color: "red", fontSize: "30px" }}>
                       Forget Passowrd  
                    </div>
                    <div style={{width:"321px"}}>
                    <p style={{textAlign:"center",color:"#BDC1B8"}}>
                    Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet
                    </p>
                    
                </div>
                </div>
                <div style={{marginBottom:"3rem",marginTop:"1rem"}}>
                    <img src={rafik} alt="" />
                </div>



                <div style={{width:"341px",display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column",height:"110px"}}>
                        <div style={{width:"341px"}}>
                        <input style={{outline:"none",width:"341px",height:"35px",padding:"4px",border:"1px solid gray",borderRadius:"12px"}} type="text" placeholder="Email" />
                    </div>

                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"10px"}}>
                        
                        <button style={{borderRadius:"12px",width:"341px",height:"50px",color:"white"}} className="btn-colr">Reset Password</button>
                        </div>
                        </div>
                        
               
                </div>
                </div>
                
    )
}
export default Forgetpassword