import "./serviceaddcategory.css";
import vector from "../images/Vector.svg";
import camera from "../images/camera.svg";
import redcross from "../images/redcross.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ref as sRef, onValue, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { database as db, storage } from "../firebase.jsx";
import { useTranslation } from "react-i18next"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Serviceeditcategory() {
    const { t } = useTranslation()


    const { id } = useParams();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [name1, setName1] = useState("");
    const [description, setDescription] = useState("");
    const [edit ,setEditing]=useState(false)

    // Fetch data from Firebase
    const gettingdata = async () => {
        const starCountRef = sRef(db, `ServiceCategory/${id}`);
        onValue(starCountRef, async (snapshot) => {
            let fetchData = await snapshot.val();
            setName1(fetchData.name);
            setDescription(fetchData.description);
            setImageURL(fetchData.imageURL); // Set the URL of the existing image
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

    // Update data in Firebase
    const updatingdata = async () => {
        try {
            const starCountRef = sRef(db, `ServiceCategory/${id}`);
            let imageUrl = imageURL;

            if (imageFile) {
                const imageRef = ref(storage, `${imageFile.name}_${uuidv4()}`);
                const uploadResult = await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(uploadResult.ref);
            }

            await update(starCountRef, {
                name: name1,
                description: description,
                imageurl: imageUrl,
            });
            setEditing(true)
            navigate(-1)
            toast.success('Data updated successfully')
            // alert('Data updated successfully');

        } catch (error) {
            toast.error("Error updating data")
            console.error("Error updating data:", error);
        }
    };

    // Go back to the previous page
    const handleGoBack = () => {
        navigate('/home/services');
    };

    return (
        <div className="addcategory-main" style={{paddingTop:"30px"}}>
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={handleGoBack} src={vector} alt="" />
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
                            <div style={{ marginLeft: "18px", fontWeight: "500" }}>
                                {t("Name")}

                            </div>
                            <div style={{ width: "100%" }}>
                                <input
                                    type="text"
                                    placeholder="Mental Health Service"
                                    style={{ width: "100%", padding: "12px 12px 12px 19px", height: "", borderRadius: "18px", border: "none", backgroundColor: "#F7F7F7", outline: "none", boxSizing: "border-box" ,marginTop:"10px"}}
                                    value={name1}
                                    onChange={(e) => setName1(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <div style={{ marginLeft: "17px", fontWeight: "500" }}>
                                {t("Description")}
                            </div>
                            <div>
                                <textarea
                                    placeholder="lorem ipsum"
                                    style={{ resize: "none", width: "100%", height: "20vh", backgroundColor: "#F7F7F7", borderRadius: "16px", padding: "8px 8px 8px 19px", boxSizing: "border-box",marginTop:"10px",border:"none",outline:"none" ,textDecoration:'normal',wordSpacing:"-1px",letterSpacing:'-1px'}}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {imageURL ? (
                                    <div style={{ width: "100%", height: "25vh", position: "relative",paddingTop:"20px" }}>
                                        <div onClick={handleRemoveImage} style={{ position: "absolute", right: "1px",cursor:"pointer" }}>
                                            <img src={redcross} alt="" />
                                        </div>
                                        <div style={{ width: "100%", height: "25vh" }}>
                                            <img src={imageURL} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
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
                                <button onClick={updatingdata} style={{ border: "none", width: "100%", height: "7vh", borderRadius: "16px", backgroundColor: "#EE0000", color: "white",fontSize:"20px",cursor:"pointer" }}> {edit ? t("Editing...") : t("Edit")}</button>
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

export default Serviceeditcategory;
