
import vector from "../images/Vector.svg";
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';
import "./imges.css";
import { useNavigate } from 'react-router-dom';
import eye from "../images/eye.svg";
import { useState } from "react";
import { ref, set } from "firebase/database"
import { database as db } from "../firebase.jsx"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

import { app } from "../firebase.jsx"
import { useTranslation } from 'react-i18next';

function Create() {

  const navigate = useNavigate(); // Use the hook here
  const auth = getAuth(app)

  const [name, setname] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")

  //  for translation 
  const { t } = useTranslation()
  // localStorage.getItem("lng")

  const clicktosign = async () => {
    if (!name || !username || !email || !password || !confirmpassword) {
      console.log("Please fill out all fields");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Invalid email address");
      return;
    }

    // Validate password match
    if (password !== confirmpassword) {
      console.log("Passwords do not match");
      return;
    }





    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const user = credential.user
      console.log(user)

      localStorage.setItem("userId", user?.uid)


      const id = Date.now()



         const useref=ref(db,"User/"+user?.uid)

         set(useref,{
          id:user?.uid,
          name:name,
          username:username,
          email:email,
         })


      set(useref, {
        id: user?.uid,
        name: name,
        username: username,
        parentID: user?.uid,
        
        backgroundPicture: "",
        profilePicuture: "",
        designation: "",
        martialStatus: "",
        companyname: "",
        language: "",


        address: "",
        bgButtonColor: "",
        bgColor: "",
        bgTextColor: "",
        bio: "",
       
        createdOn: "",
        currentuser: "",
        deleted: "",
        
        directMode: "",
        dob: "",
        email: "",
        enterpriseMonthlyAllowed: "",
        enterpriseMonthlyRequested: "",
        enterpriseYearlyAllowed: "",
        enterpriseYearlyRequested: "",
        fcmToken: "",
        gender: "",
       
        ismain: "",
       
        logoUrl: "",
      
        
       
        phone: "",
        platorform: "",
        proVersion: "",
        proVersionExpiryDate: "",
        proVersionPurchaseDate: "",
        profileOn: "",
        profileUrl: "",
        reqByMe: "",
        reqByOther: "",
        subscribed: "",
        subscription: "",
        

      })



      setname("")
      setusername("")


      navigate('/home');


    } catch (error) {
      console.log(error)
    }
  }









  const handlegoBack = () => {
    navigate('/');
  };




  return (
    <div style={{ maxWidth: "430px", margin: "0 auto", width: "90%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90%" }}>

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
        <div style={{ textAlign: "center" }}>

          <div style={{ color: "red", fontSize: "17px" }}>
            {t("Let's get Connected")}
          </div>
          <div style={{ color: "red", fontSize: "35px" }}>
            {t("Create Account")}
          </div>
        </div>

        {/* para */}

        <div style={{ textAlign: "center", width: "80%", color: "#C9CCC5", marginTop: "10% ", marginBottom: "5%" }}>
          {t("Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet")}
        </div>

        {/* INPUT  */}
        <div style={{ width: "100%" }}>
          <input style={inputStyle} type="text" placeholder="Full Name"
            required
            onChange={(e) => setname(e.target.value)}
          />
          <input style={inputStyle} type="text" placeholder="Username"
            required
            onChange={(e) => setusername(e.target.value)}
          />
          <input style={inputStyle} type="text" placeholder="Email"
            required
            onChange={(e) => setemail(e.target.value)}
          />

          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            width: "100%", borderRadius: "12px", boxShadow: "0px 0px 4.5px 0px #00000040", marginBottom: "10px", height: "45px",
          }}>
            <div style={{ width: "87%" }}>
              <input
                style={{

                  width: "100%",
                  height: "40px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  border: "none",
                  outline: "none",
                  // borderRadius: "12px",
                  boxSizing: "border-box",
                  // marginBottom: "10px",
                  // boxShadow: "0px 0px 4.5px 0px #00000040"
                }}
                required
                type="text"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div style={{ width: "10%" }}>
              <img src={eye} alt="" />
            </div>
          </div>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            width: "100%", borderRadius: "12px", boxShadow: "0px 0px 4.5px 0px #00000040", marginBottom: "10px", height: "45px",
          }}>
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
                  // borderRadius: "12px",
                  boxSizing: "border-box",
                  // marginBottom: "10px",
                  // boxShadow: "0px 0px 4.5px 0px #00000040"
                }}
                type="text"
                placeholder="Confirm Password"
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </div>
            <div style={{ width: "10%" }}>
              <img src={eye} alt="" />
            </div>
          </div>



          {/* <input style={inputStyle} type="password" placeholder="Password" /> */}
          {/* <input style={inputStyle} type="password" placeholder="Confirm Password" /> */}

          {/* para */}
          <p style={{ fontSize: "12px", color: "#C3C1C1", width: "100%" }}>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>{t("Lorem")}</span> {t("ipsum dolor sit amet, consectetur elit. Neque sunt enim incidunt invent consequatur possimus blanditiis provident debitis atque beatae.")}
          </p>

          {/* tick */}
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <input style={{ marginRight: "4px", marginLeft: "0px" }} type="checkbox" id="" name="" value="Bike" />
            <p style={{ fontSize: "9px", color: "#C3C1C1", textAlign: "center" }}>
              {t("By Signing up you agree to our")} <span style={{ color: "#EE0000", fontWeight: "bold" }}>{t("Privacy Policy")}</span> and <span style={{ color: "#EE0000", fontWeight: "bold" }}>{t("Terms of Use")}</span>
            </p>
          </div>

          {/* button */}
          <div style={{ textAlign: "center", marginTop: "15px" }}>

            <button style={buttonStyle} onClick={clicktosign} className="btn-colr">
              Sign Up
            </button>


            <div style={{ marginTop: "13px", color: "#C3C1C1" }}>
              {t("Already have an account?")}
              <Link to="/signup" style={{ color: "#EE0000", fontWeight: "bold", marginLeft: "3px" }}>{t("Sign In")}</Link>
            </div>
          </div>
        </div>
      </div>
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
  boxShadow: "0px 0px 4.5px 0px #00000040"


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
