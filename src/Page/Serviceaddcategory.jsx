import "./serviceaddcategory.css";
import vector from "../images/Vector.svg";
import { useNavigate } from "react-router-dom";

import { database as db, storage } from "../firebase.jsx";
import camera from "../images/camera.svg";

import { useState } from "react";
import { ref as sRef, push, set } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import redcross from "../images/redcross.svg";

import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Serviceaddcategory() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [image, setImage] = useState(null);

  // firebase states for fetching data
  const [name1, setname1] = useState("");
  const [description, setdescription] = useState("");

  console.log(localStorage.getItem("userId"));

  {
    /* ------------------------creating new service in firebase------------------- */
  }
  const createnew = async () => {
    toast.dismiss();
    if (!name1 || !description || !image) return;

    const image_instorage = ref(storage, `${image.name}`);

    try {
      // upload image to storage
      const snapshot = await uploadBytes(image_instorage, image);
      // get url of image
      const url = await getDownloadURL(snapshot.ref);

      const categorypath = sRef(db, `ServiceCategory`);

      const newcategories = push(categorypath);
      const newcategories_id = newcategories.key;
      const categorydata = {
        id: newcategories_id,
        name: name1,
        description: description,
        imageURL: url,
        uid: localStorage.getItem("userId"),
      };
      
      console.log(newcategories);

      await set(newcategories, categorydata);

      // localStorage.setItem("imageurl",newcategories.key)
      toast.success("Data added successfully");
      navigate(-1)
      // alert('Data added successfully');
    } catch (error) {
      console.log(error);
    }
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
    navigate("/home/services");
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
                {t("Add Category")}
              </div>
              <div></div>
            </div>
            {/* service  */}
            <div
              style={{
                marginLeft: "18px",
                color: "#EE0000",
                fontSize: "16px",
                fontWeight: "600",
                marginTop: "3rem",
              }}
            >
              {t("Service")}
            </div>

            {/* input  */}
            <div style={{ marginTop: "2rem" }}>
              <div
                style={{
                  marginLeft: "18px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                {t("Name")}
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder="Mental Health Service"
                  style={{
                    width: "100%",
                    padding: "18px",
                    paddingLeft: "18px",
                    height: "6vh",
                    borderRadius: "18px",
                    border: "none",
                    backgroundColor: "#F7F7F7",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => setname1(e.target.value)}
                />
              </div>
            </div>
            {/* description */}
            <div style={{ marginTop: "8px", marginBottom: "8px" }}>
              <div
                style={{
                  marginLeft: "18px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                {t("Description")}
              </div>
              <div>
              <textarea
  placeholder="Enter the description"
  style={{
    outline: "none",
    resize: "none",
    width: "100%",
    height: "20vh",
    backgroundColor: "#F7F7F7",
    borderRadius: "16px",
    padding: "18px",
    boxSizing: "border-box",
    border: "none",
    fontStyle: "normal", // Set font style to normal
    fontFamily: "inherit", // Optionally inherit font from parent
    fontSize: "16px", // Optional: adjust font size
    color: "#000", // Optional: set default text color
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
        cursor: "pointer", // Makes the entire div clickable
      }}
      onClick={() => document.getElementById("upload-photos").click()} // Trigger file input click on div click
    >
      <div
        onClick={handleRemoveImage}
        style={{ position: "absolute", right: "1px", cursor: "pointer" }}
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
            objectFit: "cover",
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
        cursor: "pointer", // Makes the entire div clickable
      }}
      onClick={() => document.getElementById("upload-photos").click()} // Trigger file input click on div click
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
              borderRadius: "6px",
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
                    height: "6vh",
                    borderRadius: "16px",
                    backgroundColor: "#EE0000",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "500",
                    cursor: "pointer",
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
export default Serviceaddcategory;
