import logo from "../images/logo.png";
import pana from "../images/pana.png";
import { Link } from "react-router-dom";
import apple from "../images/apple.png";
import fb from "../images/fb.png";
import google from "../images/google.png";

function Signup() {
  return (
    <div className="welcome-center">
      <div className="welcome-widt">
        {/* logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>
            <img src={logo} alt="" />
          </div>
          <div style={{ color: "red", fontSize: "15px" }}>Let's get Connected</div>
          <div style={{ color: "red", fontSize: "30px" }}>Welcome Back</div>
        </div>

        {/* para */}
        <div style={{ display: "flex", justifyContent: "center", padding: "0 15px" }}>
          <p style={{ textAlign: "center", color: "#C3C7BF" }}>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
          </p>
        </div>

        {/* img */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginBottom: "3rem", marginTop: "1rem", width: "100%", maxWidth: "280px" }}>
            <img src={pana} alt="" style={{ width: "100%" }} />
          </div>
        </div>

        {/* inputs */}
        <div style={{ width: '100%', maxWidth: "430px", margin: '0 auto', alignItems: 'center', flexDirection: 'column', gap: '10px', display: 'flex' }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name"
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
          />

          <div style={{ display: "flex", justifyContent: "flex-end", width: "90%" }}>
            <Link to="/forget" style={{ textDecoration: 'none' }}>
              <span style={forgetPasswordStyle}>
                Forget Password
              </span>
            </Link>
          </div>

          <Link to="/home" style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}>
            <button style={buttonStyle}>Login</button>
          </Link>

          <div style={{ textAlign: 'center', color: "#C3C1C1", marginTop: "10px" }}>
            Don't have an account?
            <Link to="/create" style={{ color: "#EE0000", fontWeight: "bold", marginLeft: "3px" }}>Sign up</Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: "10px" }}>
            Continue via Social Networks
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
            <div style={socialIconStyle}>
              <img src={google} alt="" />
            </div>
            <div style={socialIconStyle}>
              <img src={fb} alt="" />
            </div>
            <div style={socialIconStyle}>
              <img src={apple} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "90%",
  padding: "15px",
  border: "1px solid gray",
  borderRadius: "12px",
  boxSizing: "border-box",
  marginBottom: "10px",
};

const buttonStyle = {
  backgroundColor: "red",
  width: "90%",
  padding: "10px",
  height: '50px',
  fontSize: "15px",
  border: "none",
  borderRadius: "15px",
  color: "white",
  cursor: "pointer",
  boxSizing: "border-box",
};

const forgetPasswordStyle = {
  color: "#F24040",
  borderBottom: "1px solid red",
  fontWeight: "600",
};

const socialIconStyle = {
  padding: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 5px",
};

export default Signup;
