import "./serviceaddcategory.css";
import vector from "../images/Vector.svg";
import camera from "../images/camera.svg";
import redcross from "../images/redcross.svg";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ref as sRef, onValue, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { database as db, storage } from "../firebase.jsx";
import { useTranslation } from 'react-i18next'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageCategoriesEdit() {
    const { t } = useTranslation()

    const { id } = useParams();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [name1, setName1] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("")
    const [price, setprice] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [site, setSite] = useState("");
    const [avaliable, setIsavaliable] = useState(false)

    // Fetch data from Firebase
    const gettingdata = async () => {
        const starCountRef = sRef(db, `Services/${id}`);
        onValue(starCountRef, async (snapshot) => {
            let fetchData = await snapshot.val();
            console.log(fetchData)
            setName1(fetchData.name1);
            setprice(fetchData.price);
            setMail(fetchData.email);
            setPhone(fetchData.businessContact)
            setSite(fetchData.website)
            setIsavaliable(fetchData.isAvailableForAppointment)
            setDescription(fetchData.description);
            setImageURL(fetchData.imageURL); // Set the URL of the existing image
            setCategory(fetchData.categoryId)

        });
    };

    useEffect(() => {
        gettingdata();
    }, [id]);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            // Create a local URL for immediate display
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImageFile(null);
        setImageURL(""); // Clear image URL
    };
    console.log(id)
    // Update data in Firebase
    const updatingdata = async () => {
        try {
            const starCountRef = sRef(db, `Services/${id}`);
            let imageUrl = imageURL;

            if (imageFile) {
                const imageRef = ref(storage, `${imageFile.name}_${uuidv4()}`);
                const uploadResult = await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(uploadResult.ref);
            }

            await update(starCountRef, {
                name: name1,
                description: description,
                imageURL: imageURL,
                 price:price,
                businessContact:phone,
                website:site,
                email:mail,
                isAvailableForAppointment:avaliable,
                categoryId: category,



               

            });
           toast.success("Updated successfuly")
           navigate(-1)

        } catch (error) {
            toast.error("Error updating data")
            console.error("Error updating data:", error);
        }
    };

    // Go back to the previous page
    const handleGoBack = () => {
        navigate(`/home/services/catagory/${id}`);
    };

    return (
        <div className="addcategory-main" style={{marginTop:"30px"}}>
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <Link to={`/home/services/catagory/${category}`}>
                                    <img style={{ cursor: "pointer" }} onClick={handleGoBack} src={vector} alt="" />
                                </Link>
                                
                            </div>
                            <div style={{ color: "#EE0000", fontSize: "20px", fontWeight: "500" }}>
                                {t("Edit Category")}
                            </div>
                            <div></div>
                        </div>
                        <div style={{ marginLeft: "18px", color: "#EE0000", fontSize: "20px", fontWeight: "500", marginTop: "3rem" }}>
                            {t("Service")}
                        </div>
                      



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
               name="name1"
               value={name1}
            

               onChange={(e) => setName1(e.target.value)}
             
              
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
               value={price}
             
               onChange={(e) => setprice(e.target.value)}
             />
           </div>
         </div>


            
         <div className="formRow" style={{marginTop:"30px"}}>
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
               name="phone"
               value={phone}
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
               name="site"
               value={site}
             
               onChange={(e) => setSite(e.target.value)}
             />
           </div>

         </div>


         <div className="formColumn" style={{marginTop:"20px"}}>
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
               value={mail}
             
               onChange={(e) => setMail(e.target.value)}
             />
           </div>

           </div>


           <div style={{ display: 'flex', alignItems: 'center', marginTop: "10px" ,marginLeft:"10px"}}>
           <input
  type="checkbox"
  style={{
    borderRadius: "20px",
    backgroundColor: "#F7F7F7",
    width: "20px", // Checkbox width
    height: "20px", // Checkbox height
    marginRight: "10px", // Space between checkbox and text
  }}
  className="formInput"
  name="available" // Make sure this matches your form data
  checked={avaliable} // Set checked state based on the avaliable value
  onChange={(e) => setIsavaliable(e.target.checked)} // Use e.target.checked for checkboxes
/>

  <p>Avaliable for Appointment</p>
</div>









                        <div style={{ marginTop: "15px" }}>
                            <div style={{ marginLeft: "13px", fontWeight: "500" }}>
                                {t("Description")}
                            </div>
                            <div>
                                <textarea
                                    placeholder="lorem ipsum"
                                    style={{ resize: "none", width: "100%", height: "20vh", backgroundColor: "#F7F7F7", borderRadius: "16px", padding: "8px 8px 8px 19px", boxSizing: "border-box",border:"none",outline:'none',fontStyle:'normal',marginTop:"10px" }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                {imageURL ? (
                                    <div style={{ width: "100%", height: "25vh", position: "relative" }}>
                                        <div onClick={handleRemoveImage} style={{ position: "absolute", right: "1px" }}>
                                            <img src={redcross} alt="" />
                                        </div>
                                        <div style={{ width: "100%", height: "25vh" }}>
                                            <img src={imageURL} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "fill", borderRadius: "12px" }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ width: "100%", height: "25vh", position: "relative" }}>
                                        <div style={{ position: "absolute", right: "38%", top: "28%" }}>
                                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    id="upload-photos"
                                                    onChange={handleFileChange}
                                                />
                                                <label
                                                    htmlFor="upload-photos"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        border: 'none',
                                                        width: '110px',
                                                        fontSize: '10px',
                                                        marginTop: '8px',
                                                        height: '27px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                        color: "#726F6F",
                                                    }}
                                                >
                                                    Click to Upload
                                                </label>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", height: "25vh", backgroundColor: "#F1F1F1", border: "none", borderRadius: "12px" }} />
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <button onClick={updatingdata} style={{ border: "none", width: "100%", height: "7vh", borderRadius: "16px", backgroundColor: "#EE0000", color: "white",fontSize:'20px',cursor:'pointer' }}>{t("Edit")}</button>
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

export default ManageCategoriesEdit;
