import "./welcome.css"
import logo from "../images/logo.svg"
import rafiki from "../images/rafiki.svg"
import {Link} from 'react-router-dom'

function Welcome(){

    return(
        <div className="welcome-center" style={{marginBottom:"4rem"}}>
            <div className="welcome-widt">

                <div>
                    <img src={logo} alt="" />
                </div> 
                {/* welcome */}
                <div className="welcome-para" style={{marginTop:"20%"}}>
                    <div style={{fontSize:"30px",fontWeight:"bold",color:"red"}}>welcome</div>
                    <div>
                        <p style={{textAlign:"center",color:"#C9CCC5"}}>
                            Lorem ipsum dolor sit amet   adipisicing amet elits tempore alias quisquam quas.
                        </p>
                    </div>
                    
                </div>
                {/* image  */}
                <div style={{marginTop:"10%",display:"flex",justifyContent:"center"}}>
                    <img style={{objectFit:"contain",width:"100%",height:"100%"}}  src={rafiki} alt="" />
                </div>
                
                {/* buttpn */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",width:"90%",marginTop:"20%"}}>
                    
                  

                    {/* button  */}
                    <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"space-between",}}>
                        <div  style={{width:"100%"}}>
                            <Link to="/create">
                        <button style={{height:"50px",color:"white"}} className="btn-colr">Sign Up With Email</button>
                        </Link>
                        </div>
                        
                    </div>
                    
                
                </div>

            </div>

        </div>
    )
}
export default Welcome