import vector from "../images/Vector.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import "../App.css";
import "./imges.css";
import { useNavigate } from "react-router-dom";
import eye from "../images/eye.svg";
import { useState } from "react";
import { equalTo, orderByChild, query, ref, set } from "firebase/database";
import { database as db } from "../firebase.jsx";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase.jsx";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import the icons

function Create() {
  const navigate = useNavigate(); // Use the ho here
  const auth = getAuth(app);
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State for checkbox


 
// state to toggle visibility for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state to toggle visibility for confirm password
  const [showPassword, setShowPassword] = useState(false); // state to toggle visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Toggle visibility for confirm password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
  //  for translation
  const { t } = useTranslation();
  // localStorage.getItem("lng")
  const clicktosign = async () => {
    toast.dismiss();
    if (!name || !username || !email || !password || !confirmpassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isChecked) {
      // Check if checkbox is checked
      toast.error("Please agree to our Privacy Policy and Terms of Use");
      return;
    }

    const checkUserName = query(
      ref(db, "/User"),
      orderByChild("username"),
      equalTo(username)
    );
    if (checkUserName == username) {
      toast.error("UserName is Taken");
      return;
    }
 
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      console.log(user);
      localStorage.setItem("userId", user?.uid);
      localStorage.setItem("parentId", user?.uid);
      const id = Date.now();
      const useref = ref(db, "User/" + user?.uid);
      set(useref, {
        id: user?.uid, 
        name: name, 
        username: username, 
        parentID: user?.uid, 
        nickname:"", 
        dob:"", 
       coverUrl:"", 
        profileUrl: "",
        designation: "", 
     
        companyname: "",
        language: "",
        company:"",
        address: "", 
        bgButtonColor: "", 
        bgColor: "",   
        bgTextColor: "", 
        bio: "", 
        currentuser: false,
        deleted: false,
        directMode: null,
        email: email, 
        enterpriseMonthlyAllowed:null, 
        enterpriseAllowed:null,  
        enterpriseMonthlyRequested:null, 
        enterpriseYearlyAllowed: null,  
        enterpriseYearlyRequested: null, 
        fcmToken: "",
        gender: null, 
        phone: "", 
        leadMode:false, 
        location:"", 
        platorform: "", 
        isProVersion: false,
        isRepeatSlots:false,
        profileOn: null, 
        logoUrl:"",  
        profileUrl: "",
        subscribed:false,
        subscription: "",
        availabilityEndTime:null,
        availabilityStartTime:null,
     

      });
      setname("");
      setusername("");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(" user Already exist");
    }
  };
  const handlegoBack = () => {
    navigate("/");
  };
  return (
    <div style={{ maxWidth: "430px", margin: "0 auto", width: "90%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* top  */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <img
              style={{ cursor: "pointer" }}
              onClick={handlegoBack}
              src={vector}
              alt=""
            />
          </div>
          <div>
            <img src={logo} alt="Logo" style={{ width: "100px" }} />
          </div>
          <div></div>
        </div>
        {/* logo */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "red", fontSize: "17px" }}>
            {t("Let's get Connected")}
          </div>
          <div style={{ color: "red", fontSize: "35px" }}>
            {t("Create Account")}
          </div>
        </div>
        {/* para */}
        <div
          style={{
            textAlign: "center",
            width: "80%",
            color: "#C9CCC5",
            marginTop: "10% ",
            marginBottom: "5%",
          }}
        >
          {t("Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet")}
        </div>
        {/* INPUT  */}
        <div style={{ width: "100%" }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setname(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Email"
            required
            onChange={(e) => setemail(e.target.value)}
          />
       

       <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
            width: "100%",
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





          <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
            width: "100%",
            height: "40px",
            paddingLeft: "0px",
            paddingRight: "0px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
          type={showConfirmPassword ? "text" : "password"} // Toggle between text and password type
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
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
        onClick={toggleConfirmPasswordVisibility}
      >
        {/* Display icon based on the showPassword state */}
        {showConfirmPassword ? (
          <AiOutlineEye size={20} /> 
        ) : (
          <AiOutlineEyeInvisible size={20} />
        )}
      </div>
    </div>
          {/* <input style={inputStyle} type="password" placeholder="Password" /> */}
          {/* <input style={inputStyle} type="password" placeholder="Confirm Password" /> */}
          {/* para */}
          <p style={{ fontSize: "12px", color: "#C3C1C1", width: "100%" }}>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              {t("Lorem")}
            </span>{" "}
            {t(
              "ipsum dolor sit amet, consectetur elit. Neque sunt enim incidunt invent consequatur possimus blanditiis provident debitis atque beatae."
            )}
          </p>
          {/* tick */}

          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <label
        htmlFor="privacy-policy-checkbox"
        style={{
          display: "inline-block",
          position: "relative",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          backgroundColor: isChecked ? "red" : "white", // Red when checked
          border: "1px solid red",
          borderRadius: "4px", // Optional for rounded corners
        }}
      >
        <input
          type="checkbox"
          id="privacy-policy-checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          style={{
            appearance: "none", // Hide default checkbox styles
            width: "100%",
            height: "100%",
            margin: 0,
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "pointer",
            opacity: 0, // Make the input element invisible
          }}
        />
        <span
          style={{
            content: '""',
            display: isChecked ? "block" : "none",
            position: "absolute",
            top: "3px",
            left: "6px",
            width: "4px",
            height: "10px",
            border: "solid white",
            borderWidth: "0 2px 2px 0",
            transform: "rotate(45deg)",
          }}
        ></span>
      </label>
              
              <p style={{ paddingLeft:"20px", fontSize: "12px", color: "#C3C1C1", width: "95%" }}>
                {t("By Signing up you agree to our")}{" "}
                <span style={{ color: "#EE0000", fontWeight: "bold" }}>
                  {t("Privacy Policy")}
                </span>{" "}
                and{" "}
                <span style={{ color: "#EE0000", fontWeight: "bold" }}>
                  {t("Terms of Use")}
                </span>
              </p>
            </div>
          </div>

          {/* button */}
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              style={buttonStyle}
              onClick={clicktosign}
              className="btn-colr"
            >
              Sign Up
            </button>
            <div style={{ marginTop: "13px", color: "#C3C1C1" }}>
              {t("Already have an account?")}
              <Link
                to="/signup"
                style={{
                  color: "#EE0000",
                  fontWeight: "bold",
                  marginLeft: "3px",
                }}
              >
                {t("Sign In")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "15px",
  // border: "0.5px solid gray",
  border: "none",
  borderRadius: "12px",
  marginBottom: "10px",
  boxSizing: "border-box", // Ensure padding doesn't affect the width,
  outline: "none",
  // boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
  boxShadow: "0px 0px 4.5px 0px #00000040",
};
const buttonStyle = {
  width: "100%",
  borderRadius: "12px",
  color: "white",
  backgroundColor: "#EE0000",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  boxSizing: "border-box", // Ensure padding doesn't affect the width
  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
};
export default Create;
