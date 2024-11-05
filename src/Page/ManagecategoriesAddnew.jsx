import "./serviceaddcategory.css";
import vector from "../images/Vector.svg";
import { useNavigate, useParams } from "react-router-dom";

import { database as db, storage } from "../firebase.jsx";
import camera from "../images/camera.svg";

import { useState } from "react";
import { ref as sRef, push, set } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import redcross from "../images/redcross.svg";
// <<<<<<< HEAD
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// =======

function ServiceaddcategoryAddnewProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [image, setImage] = useState(null);

  // firebase states for fetching data
  const [name1, setname1] = useState("");
  const [price, setprice] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [site, setSite] = useState("");
  const [avaliable, setIsavaliable] = useState(false)
 
  const [description, setdescription] = useState("");

  const createnew = async () => {
    if (!image || !name1 || !description) {
      toast.error("Please fill all fields");
      return;
    }

    const image_instorage = ref(storage, `${image.name}`);

    // upload image to storage
    const snapshot = await uploadBytes(image_instorage, image);
    // get downloadurl of image
    const url = await getDownloadURL(snapshot.ref);

    const productdata_base = sRef(db, "Services");

    const newProductId = push(productdata_base);
    const productId = newProductId.key;

    const productData = {
      imageURL: url,
      businessContact: phone,
      categoryId:id ,
      categoryName:"",
      description: description,
      email: mail,
      id:productId,
      isAvailableForAppointment: avaliable,
      name: name1,
      price: price,
      uid: localStorage.getItem("userId"),
      website: site
    };
    await set(newProductId, productData);
    toast.success("Product created successfully");
    navigate(-1)
    // alert("Product created successfully")
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected image
      // const imageUrl = URL.createObjectURL(file);
      setImage(file);
    }
  };

  const handlegoBack = () => {
    navigate(`/home/services/catagory/${id}`);
  };

  return (
    <div className="addcategory-main">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">
          
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
              <div
                style={{
                  color: "#EE0000",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {t("Add Category Products")}
              </div>
              <div></div>
            </div>
            {/* service  */}
            <div
              style={{
                marginLeft: "18px",
                color: "#EE0000",
                fontSize: "16px",
                fontWeight: "500",
                marginTop: "3rem",
              }}
            >
              {t("Service Details")}
            </div>

            {/* input  */}
            <div style={{ marginTop: "2rem" }}>
             
             
              <div className="formRow">
            <div className="formColumn">
              <label
                style={{ paddingLeft: "10px", fontWeight: "100" }}
                className="formHeading"
              >
                Service name
              </label>
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#F7F7F7",
                  width: "95%",
                }}
                type="text"
                className="formInput"
                placeholder="Service Name"
                name="productname"
                onChange={(e) => setname1(e.target.value)}
              
               
              />
            </div>
            <div className="formColumn">
              <label
                style={{ paddingLeft: "10px", fontWeight: "100" }}
                className="formHeading"
              >
                Price
              </label>
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                }}
                type="text"
                className="formInput"
                placeholder="$44"
                name="price"
              
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
          </div>


             
          <div className="formRow" style={{marginTop:"40px"}}>
            <div className="formColumn">
              <label
                style={{ paddingLeft: "10px", fontWeight: "100" }}
                className="formHeading"
              >
                Business Contact
              </label>
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#F7F7F7",
                  width: "95%",
                }}
                type="text"
                className="formInput"
                placeholder="Your Business Contact"
                name="productname"
                onChange={(e) => setPhone(e.target.value)}
               
              />
            </div>
            <div className="formColumn">
              <label
                style={{ paddingLeft: "10px", fontWeight: "100" }}
                className="formHeading"
              >
                Website
              </label>
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                }}
                type="text"
                className="formInput"
                placeholder="Your Website"
                name="price"
              
                onChange={(e) => setSite(e.target.value)}
              />
            </div>

          </div>


          <div className="formColumn" style={{marginTop:"40px"}}>
              <label
                style={{ paddingLeft: "10px", fontWeight: "100" }}
                className="formHeading"
              >
                Email
              </label>
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                }}
                type="text"
                className="formInput"
                placeholder="Your Email id"
                name="mail"
              
                onChange={(e) => setMail(e.target.value)}
              />
            </div>

            </div>

       <div style={{ display: 'flex', alignItems: 'center', marginTop: "30px" ,marginLeft:"10px"}}>
  <input
    style={{
      borderRadius: "20px",
      backgroundColor: "#F7F7F7",
      width: "20px", // Adjust width to make it smaller, as it’s a checkbox
      height: "20px", // Optional: Adjust height for better visibility
      marginRight: "10px", // Space between checkbox and text
    }}
    type="checkbox"
    className="formInput"
    name="mail"
    onChange={(e) => setIsavaliable(e.target.checked)} // Use e.target.checked for checkboxes
  />
  <p>Avaliable for Appointment</p>
</div>


 


            {/* description */}
            <div style={{ marginTop: "28px", marginBottom: "8px" }}>
              <div
                style={{
                  marginLeft: "18px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                {t("Description")}
              </div>
              <div style={{ width: "100%" }}>
                <textarea
                  placeholder="lorem ipsum"
                  // style={{ padding:"10px",outline:"none",resize: "none", width: "100%", height: "20vh", backgroundColor: "#F7F7F7", borderRadius: "16px",  border:"none",boxSizing: "border-box" }}
                  style={{
                    padding: "10px 24px", // Adjust the horizontal padding
                    outline: "none",
                    resize: "none",
                    width: "100%",
                    height: "20vh",
                    backgroundColor: "#F7F7F7",
                    borderRadius: "16px",
                    border: "none",
                    boxSizing: "border-box",
                    lineHeight: "1.6", // Ensure consistent line-height
                  }}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
             
              <div style={{ marginTop: "6px" }}>
                {image ? (
                  <div
                    style={{
                      width: "100%",
                      height: "25vh",
                      position: "relative",
                    }}
                  >
                    <div
                      onClick={handleRemoveImage}
                      style={{ position: "absolute", right: "1px" }}
                    >
                      <img src={redcross} alt="" />
                    </div>
                    <div style={{ width: "100%", height: "25vh" }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          borderRadius: "12px",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "25vh",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{ position: "absolute", right: "38%", top: "28%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={camera}
                          alt="Default"
                          style={{
                            width: "50%",
                            height: "50%",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />

                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-photos"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="upload-photos"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "none",
                            width: "110px",
                            fontSize: "10px",
                            marginTop: "8px",
                            height: "27px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            textAlign: "center",
                            color: "#726F6F",
                            // backgroundColor: "#F1F1F1", // Optional: Add a background color to make it more visible
                          }}
                        >
                          Click to Upload
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "25vh",
                        backgroundColor: "#F1F1F1",
                        border: "none",
                        borderRadius: "12px",
                      }}
                    />
                  </div>
                )}

               
                   
              </div>
              {/* button  */}
              <div style={{ marginTop: "30px" }}>
                <button
                  onClick={createnew}
                  style={{
                    border: "none",
                    width: "100%",
                    height: "7vh",
                    borderRadius: "16px",
                    backgroundColor: "#EE0000",
                    color: "white",
                    cursor:'pointer',
                    fontSize:"20px"
                  }}
                >
                  {t("Create")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
export default ServiceaddcategoryAddnewProduct;
