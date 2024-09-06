


import "./serviceaddcategory.css"
import vector from "../images/Vector.svg"
import { useNavigate, useParams } from 'react-router-dom';

import { database as db, storage } from "../firebase.jsx"
import camera from "../images/camera.svg"

import { useState } from "react"
import { ref as sRef, push, set } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import redcross from "../images/redcross.svg"
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from 'react-i18next'


function ServiceaddcategoryAddnewProduct() {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const { id } = useParams()

    const [image, setImage] = useState(null);


    // firebase states for fetching data 
    const [name1, setname1] = useState("")
    const [description, setdescription] = useState("")

    // const id = Date.now()
    // function to send data to firebase

    // const createnew=async()=>{

    //     if(!name1 || !description || !image) return

    //     const image_instorage=ref(storage,`${image.name}`)

    //     try {
    //         // upload image to storage 
    //         const snapshot=await uploadBytes(image_instorage,image)
    //         // get url of image 
    //         const url=await getDownloadURL(snapshot.ref)

    //         const categorypath=sRef(db,`categories/${localStorage.getItem("userId")}/brands`)

    //         const categorydata={
    //             name1:name1,
    //             description:description,
    //             image:url
    //         }

    //         const newcategories=push(categorypath,categorydata).key

    //         console.log(newcategories)
    //         // await set(newcategories,categorydata)

    //         localStorage.setItem("imageurl",newcategories.key)




    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const createnew = async () => {

        if (!image || !name1 || !description) return

        const image_instorage = ref(storage, `${image.name}`)

        // upload image to storage 
        const snapshot = await uploadBytes(image_instorage, image)
        // get downloadurl of image
        const url = await getDownloadURL(snapshot.ref)

        const productdata_base = sRef(db, "Services")

        const newProductId = push(productdata_base)
        const productId = newProductId.key

        const productData = {
            // productId: productId,
            // name1: name1,
            // description: description,
            imageUrl: url,
            // serviceId: id,


            businesscontactno: "",
            categoryid: id,
            categoryname: "",
            description: description,
            email: "",
            isavailable: "",
            serviceid: productId,
            servicename: name1,
            serviceprice: "",
            uid: "",
            websiteurl: ""
        }
        await set(newProductId, productData)
        alert("Product created successfully")

    }




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
                        {/* add category  */}
                        {/* <div style={{ marginLeft: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "60%" }}>
                            <div><img src={vector} alt="" /> </div>
                            <div style={{ color: "#EE0000", fontSize: "16px", fontWeight: "500" }}>Add Category</div>
                        </div> */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={handlegoBack} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontSize: "16px", fontWeight: "500" }}>
                                {t("Add Category Products")}
                            </div>
                            <div></div>
                        </div>
                        {/* service  */}
                        <div style={{ marginLeft: "18px", color: "#EE0000", fontSize: "16px", fontWeight: "500", marginTop: "3rem" }}>
                            {t("Service")}
                        </div>

                        {/* input  */}
                        <div style={{ marginTop: "2rem" }}>
                            <div style={{ marginLeft: "18px", fontWeight: "500" }}>{t("Name")}</div>
                            <div style={{ width: "100%" }}>
                                <input type="text"
                                    placeholder="Mental Health Service"
                                    style={{ width: "100%", padding: "8px", paddingLeft: "16px", height: "", borderRadius: "18px", border: "none", backgroundColor: "#F7F7F7", outline: "none", boxSizing: "border-box" }}
                                    onChange={(e) => setname1(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* description */}
                        <div style={{ marginTop: "5px" }}>
                            <div style={{ marginLeft: "18px", fontWeight: "500" }}>
                                {t("Description")}
                            </div>
                            <div>
                                <textarea
                                    placeholder="lorem ipsum"
                                    style={{ resize: "none", width: "100%", height: "20vh", backgroundColor: "#F7F7F7", borderRadius: "16px", padding: "8px", boxSizing: "border-box" }}
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                            </div>
                            {/* <div style={{ marginTop: "6px" }}>
                                <div style={{ width: "100%", height: "20vh", backgroundColor: "#F7F7F7", borderRadius: "16px", padding: "8px" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <img src={camera} alt="" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className='input-file'
                                                id="upload-photos"
                                                
                                            />
                                            <label
                                                htmlFor="upload-photos"
                                                className='label'
                                            >
                                                Upload Photos
                                            </label>
                                            <div style={{ color: "#726F6F", textAlign: "center", fontSize: "10px" }}>Upload Image</div>
                                        </div>
                                    </div>

                                </div>
                            </div> */}
                            <div style={{ marginTop: '6px' }}>
                                {image ? (
                                    <div style={{ width: "100%", height: "25vh", position: "relative" }}>
                                        <div onClick={handleRemoveImage} style={{ position: "absolute", right: "1px" }}>
                                            <img src={redcross} alt="" />
                                        </div>
                                        <div style={{ width: "100%", height: "25vh" }}>
                                            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "fill", borderRadius: "12px" }} />
                                        </div>
                                    </div>

                                ) : (
                                    <div style={{ width: "100%", height: "25vh", position: "relative" }}>
                                        <div style={{ position: "absolute", right: "38%", top: "28%" }}>
                                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                <img src={camera} alt="Default" style={{ width: "50%", height: "50%", objectFit: "cover", borderRadius: "12px" }} />

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
                                                        // backgroundColor: "#F1F1F1", // Optional: Add a background color to make it more visible
                                                    }}
                                                >
                                                    Click to Upload
                                                </label>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", height: "25vh", backgroundColor: "#F1F1F1", border: "none", borderRadius: "12px" }} />
                                    </div>
                                )}

                                {/* <div style={{ width: "100%", height: "20vh", position: "relative" }}>
                                    {!isImageUploaded && (
                                        <div style={{ width: "100%", height: "20vh", position: "absolute" }}>
                                            <img src={imageSrc} alt="Camera" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        style={{
                                            width: "100%",
                                            height: "20vh",
                                            backgroundColor: "#F1F1F1",
                                            border: "none",
                                            borderRadius: "12px",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            cursor: "pointer",
                                            opacity: 0 // Hide the input but keep it clickable
                                        }}
                                        accept="image/*"
                                    />
                                    {isImageUploaded && (
                                        <img
                                            src={imageSrc}
                                            alt="Uploaded"
                                            style={{ width: "100%", height: "20vh", objectFit: "cover", borderRadius: "12px" }}
                                        />
                                    )}
                                </div> */}



                            </div>
                            {/* button  */}
                            <div style={{ marginTop: "30px" }}>
                                <button onClick={createnew} style={{ border: "none", width: "100%", height: "7vh", borderRadius: "16px", backgroundColor: "#EE0000", color: "white" }}>{t("Create")}</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}
export default ServiceaddcategoryAddnewProduct