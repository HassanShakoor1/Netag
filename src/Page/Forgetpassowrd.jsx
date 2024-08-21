import logo from "../images/logo.png"
import rafik from "../images/rafik.png"
import { useNavigate } from 'react-router-dom';
import vector from "../images/Vector.svg";
function Forgetpassword() {
    const navigate = useNavigate(); // Use the hook here

    const handlegoBack = () => {
        navigate('/signup');
    };

    return (
        <div className="welcome-center">


            <div className="welcome-widt">
                   {/* top  */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div>
                        <img style={{ cursor: "pointer" }} onClick={handlegoBack} src={vector} alt="" />
                    </div>
                    <div>
                        <img src={logo} alt="Logo" style={{ width: "100px" }} />
                    </div>
                    <div></div>
                </div>

                {/* logo */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>

                    <div style={{ color: "red", fontSize: "15px",fontWeight:"600" }}>
                        Lets get Connected
                    </div>
                    

                </div>

                {/* lastdiv */}

                <div style={{marginTop:"25%", display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>

                    <div style={{ color: "red", fontSize: "30px" }}>
                        Forget Passowrd
                    </div>
                    <div style={{ width: "100%" }}>
                        <p style={{ textAlign: "center", color: "#BDC1B8" }}>
                            Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet
                        </p>

                    </div>
                </div>
             


                
                <div style={{marginTop:"8%", width:"100%", display: "flex", justifyContent: "space-between",  flexDirection: "column", height: "110px" }}>
                    <div style={{ width: "100%" }}>
                        <input style={{boxShadow: "0px 0px 4.5px 0px #00000040", outline: "none", width: "99%", height: "50px",border:"none", borderRadius: "12px" }} type="text" placeholder="Email" />
                    </div>

                    <div style={{width:"100%" }}>

                        <button style={{ borderRadius: "12px", width: "100%", height: "50px", color: "white",}} className="btn-colr">Reset Password</button>
                    </div>
                </div>


            </div>
        </div>

    )
}
export default Forgetpassword