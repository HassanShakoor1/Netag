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
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// <<<<<<< HEAD

import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import the icons
function Signup() {
  const navigate = useNavigate(); // Use the hook here

  const { t } = useTranslation()


    const auth = getAuth(app)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [showPassword, setShowPassword] = useState(false); 


    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };
    // const signin = async () => {
    //   toast.dismiss()

    //   if (!email) {
    //     toast.error("Email is required");
    //     return;
    //   }
    //   if (!password) {
    //     toast.error("Password is required");
    //     return;
    //   }
    //   try {
    //     const credential = await signInWithEmailAndPassword(auth, email, password)
    //     const user = credential.user
       
    //     // getting data from user table to check if activeProfile is is present or empty 
    //     const userDb=ref(db,`User/${user?.uid}`)

    //     const snap=await get(userDb)
    //     const data=await snap.val()
    //     console.log("activeProfile key is ",data.activeProfile)
         
    //     let activeProfileKey=data.activeProfile

     



    //     if(activeProfileKey)
    //     {
    //       localStorage.setItem("userId", activeProfileKey)
    //     }
    //     else{
    //       localStorage.setItem("userId", user?.uid)
    //     }

        
    //     // <<<<<<< HEAD
    //     localStorage.setItem("parentId", user?.uid)

      
    //     navigate("/home")
    //   } catch (error) {
    //     console.log(error)
    //     if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
    //       toast.error("Invalid Email/Password");
    //     } else if (error.code === 'auth/invalid-email') {
    //       toast.error("Invalid email format");
    //     } else {
    //       toast.error("An error occurred. Please try again.");
    //     }
    //   }
    //   // finally {
    //   //   setemail("")
    //   //   setpassword("")
    //   // }
    // }

    const signin = async () => {


      // Dismiss all previous toasts before starting the process
      toast.dismiss();
  

      // Validation for email and password fields
      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (!password) {
        toast.error("Password is required");
        return;
      }
  
      try {
        // Attempting to sign in
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const user = credential.user;
  
        // Get data from the user table to check for activeProfile
        const userDb = ref(db, `User/${user?.uid}`);
        const snap = await get(userDb);
        const data = await snap.val();
        const activeProfileKey = data?.activeProfile;
  
        // Setting user data to localStorage
        if (activeProfileKey) {
          localStorage.setItem("userId", activeProfileKey);
        } else {
          localStorage.setItem("userId", user?.uid);
        }
        localStorage.setItem("parentId", user?.uid);
  
        // Navigate to home after successful login
        navigate("/home");
      } catch (error) {
        // Handling errors based on Firebase error codes
        console.log(error);
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          toast.error("Invalid Email/Password");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        // Optionally clear fields after login
        setemail("");
        setpassword("");
      }
    };
  
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
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
            {/* <input
            style={inputStyle}
            type="text"
            placeholder="Password"
          /> */}
          <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        borderRadius: "12px",
        boxShadow: "0px 0px 4.5px 0px #00000040",
        marginBottom: "10px",
        height: "45px",
      }}
    >
      <div style={{ width: "87%" }}>
        <input
          required
          style={{
            width: "90%",
            height: "40px",
            paddingLeft: "0px",
            paddingRight: "0px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
          type={showPassword ? "text" : "password"} // Toggle between text and password type
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div
        style={{
          width: "5%",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={togglePasswordVisibility}
      >
        {/* Display icon based on the showPassword state */}
        {showPassword ? (
          <AiOutlineEye size={20} />
        ) : (
          <AiOutlineEyeInvisible size={20} />
        )}
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
        <ToastContainer 
          position="top-center"
        />
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
    boxShadow: "0px 0px 4.5px 0px #00000040",
    outline:"none"
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
