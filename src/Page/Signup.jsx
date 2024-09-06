import logo from "../images/logo.svg";
import pana from "../images/pana.svg";
import { Link } from "react-router-dom";
import apple from "../images/apple.svg";
import fb from "../images/fb.svg";
import google from "../images/google.svg";
import { useNavigate } from 'react-router-dom';
import vector from "../images/Vector.svg";
import eye from "../images/eye.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { get, ref } from "firebase/database"
import { database as db } from "../firebase.jsx"
import { app } from "../firebase.jsx"
import { useState, useEffect } from "react";
// <<<<<<< HEAD

import { useTranslation } from 'react-i18next';

function Signup() {
  const navigate = useNavigate(); // Use the hook here

  const { t } = useTranslation()

  // =======
  // import { Navigate } from "react-router-dom";
  // function Signup() {
    // const navigate = useNavigate(); // Use the hook here
    // >>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503
    const auth = getAuth(app)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const signin = async () => {
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password)
        const user = credential.user
        localStorage.setItem("userId", user?.uid)
        // <<<<<<< HEAD
        localStorage.setItem("parentId", user?.uid)

        // =======
        // >>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503
        navigate("/home")
      } catch (error) {
        console.log(error)
      }
      finally {
        setemail("")
        setpassword("")
      }
    }
    const handlegoBack = () => {
      navigate('/create');
    };
    return (
      <div className="welcome-center">
        <div className="welcome-widt">
          {/* top  */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
            <div>
              <img style={{ cursor: "pointer" }} onClick={handlegoBack} src={vector} alt="" />
            </div>
            <div>
              <img src={logo} alt="Logo" style={{ width: "100px" }} />
            </div>
            <div></div>
          </div>
          {/* logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* <<<<<<< HEAD */}

            <div style={{ color: "red", fontSize: "15px" }}>
              {t("Let's get Connected")}
            </div>
            <div style={{ color: "red", fontSize: "30px" }}>{t("Welcome Back")}</div>
            {/* ======= */}
            {/* <div style={{ color: "red", fontSize: "15px" }}>Let's get Connected</div>
            <div style={{ color: "red", fontSize: "30px" }}>Welcome Back</div> */}
            {/* >>>>>>> 3cf830f32c46925aa6ced489a114c01ef1b53503 */}
          </div>
          {/* para */}
          <div style={{ display: "flex", justifyContent: "center", padding: "0 15px", width: "90%" }}>
            <p style={{ textAlign: "center", color: "#C3C7BF" }}>
              {t("Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet")}.
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
              placeholder="Email"
              required
              onChange={(e) => setemail(e.target.value)}
            />
            {/* <input
            style={inputStyle}
            type="text"
            placeholder="Password"
          /> */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              width: "90%", borderRadius: "12px", boxShadow: "0px 0px 4.5px 0px #00000040"
            }}>
              <div style={{ width: "82%" }}>
                <input
                  style={{
                    width: "100%",
                    padding: "15px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    border: "none",
                    outline: "none"
                    // borderRadius: "12px",
                    // boxSizing: "border-box",
                    // marginBottom: "10px",
                    // boxShadow: "0px 0px 4.5px 0px #00000040"
                  }}
                  type="text"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div style={{ width: "10%" }}>
                <img src={eye} alt="" />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", width: "90%" }}>
              <Link to="/forget" style={{ textDecoration: 'none' }}>
                <span style={forgetPasswordStyle}>
                  {t("Forget Password")}
                </span>
              </Link>
            </div>
            <button onClick={() => {
              signin();
              // getData();
            }} style={buttonStyle}>Login</button>
            <div style={{ textAlign: 'center', color: "#C3C1C1", marginTop: "10px" }}>
              {t("Don't have an account?")}
              <Link to="/create" style={{ color: "#EE0000", fontWeight: "bold", marginLeft: "3px" }}>Sign up</Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: "10px", color: "#BCBCBC" }}>
              {t("Continue via Social Networks")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", width: "100%" }}>
              <div style={{ width: "10%" }}>
                <div style={{ display: "flex", justifyContent: "center", }}>
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
        </div>
      </div>
    );
  }
  const inputStyle = {
    width: "90%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    boxSizing: "border-box",
    marginBottom: "10px",
    boxShadow: "0px 0px 4.5px 0px #00000040"
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
    // padding: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 5px",
  };
  export default Signup;
