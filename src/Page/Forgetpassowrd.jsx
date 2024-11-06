import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../Page/ForgotPassword.module.css";
import vector from "../images/Vector.svg";
import logo from "../images/logo.svg"
const ForgotPassword = () => {

    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset email has been sent to your email address.");
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.message); // Set error message
      setMessage(""); // Clear any previous success message
    }
    navigate(-1)
  };

  const handlegoBack=()=>{
    navigate(-1)
  }
  return (
    <div className={styles.main}>
      <div className={styles.section}>
       
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



        <div style={{ marginTop: "200px" }}>
          <h1 style={{ textAlign: "center", padding: "10px" }}>Forgot Password!</h1>
          <p style={{ textAlign: "center", fontSize: "13px" }}>
            Please enter your email address. We will send you a link to reset your password.
          </p>
        </div>
        <div className="form">
          <input
            type="email"
            placeholder="Email"
            className={styles.inputtext}
            value={email}
            onChange={handleChange}
          />
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
        <button className={styles.button} onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};
export default ForgotPassword;