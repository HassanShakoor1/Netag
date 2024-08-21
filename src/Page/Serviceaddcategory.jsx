

import "./serviceaddcategory.css"
import vector from "../images/Vector.svg"
import { useNavigate } from 'react-router-dom';
import {ref,set} from "firebase/database"
import {database as db} from "../firebase.jsx"

import { useState } from "react"
import { async } from "@firebase/util";
function Serviceaddcategory() {
    const navigate=useNavigate()

    const [image, setImage] = useState(null);
    
    // firebase states for fetching data 
    const[name1,setname1]=useState("")
    const[description,setdescription]=useState("")
     
    const id=Date.now()
    const createnew=async()=>{
        const useref=ref(db,"categories/"+id)
        set(useref,{
            name1:name1,
            description:description
        })

        setname1("")
        setdescription("")
    }

    // Function to handle file selection
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const handlegoBack = () => {
        navigate('/home/services');
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={handlegoBack} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontSize: "16px", fontWeight: "500"}}>
                            Add Category
                            </div>
                            <div></div>
                        </div>
                        {/* service  */}
                        <div style={{ marginLeft: "18px", color: "#EE0000", fontSize: "16px", fontWeight: "500", marginTop: "3rem" }}>
                            Service
                        </div>

                        {/* input  */}
                        <div style={{ marginTop: "2rem" }}>
                            <div style={{ marginLeft: "18px", fontWeight: "500" }}>Name</div>
                            <div style={{ width: "100%"}}>
                                <input type="text"
                                 placeholder="Mental Health Service" 
                                 style={{ width: "100%", padding: "8px", paddingLeft: "16px", height: "", borderRadius: "18px", border: "none", backgroundColor: "#F7F7F7", outline: "none" ,boxSizing:"border-box"}} 
                                 onChange={(e)=>setname1(e.target.value)}
                                 />
                            </div>
                        </div>
                        {/* description */}
                        <div style={{ marginTop: "5px" }}>
                            <div style={{ marginLeft: "18px", fontWeight: "500" }}>
                                Description
                            </div>
                            <div>
                                <textarea 
                                placeholder="lorem ipsum" 
                                style={{ resize: "none", width: "98%", height: "20vh", backgroundColor: "#F7F7F7", borderRadius: "16px", padding: "8px" ,boxSizing:"border-box"}}
                                onChange={(e)=>setdescription(e.target.value)}
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
                                <div
                                    style={{
                                        width: '100%',
                                        height: '25vh',
                                        backgroundColor: '#F7F7F7',
                                        borderRadius: '16px',
                                        // padding: '8px',
                                        position: 'relative', // Ensure container is positioned relative for absolute positioning of image
                                        overflow: 'hidden', // Ensure image doesn't overflow the container
                                    }}
                                >
                                    {image && (
                                        <img
                                            src={image}
                                            alt="Uploaded Preview"
                                            style={{

                                                width: '50%',
                                                height: '80%',
                                                objectFit: 'fill', // Ensure image covers the container
                                                position: 'absolute',
                                                top: '10%',
                                                left: '23%',
                                            }}
                                        />
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className='input-file'
                                                id="upload-photos"
                                                onChange={handleUpload}
                                                style={{ display: 'none' }}
                                            />
                                            <label
                                                htmlFor="upload-photos"
                                                className='label'
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    border: '1px solid #3498db', // Replace with your border-main color
                                                    width: '110px',
                                                    fontSize: '11px',
                                                    marginTop: '8px',
                                                    color: '#3498db', // Replace with your text-main color
                                                    height: '27px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Upload Photos
                                            </label>
                                            {/* <div style={{ color: '#726F6F', textAlign: 'center', fontSize: '10px' }}>Upload Image</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* button  */}
                            <div style={{ marginTop: "10px" }}>
                                <button onClick={createnew} style={{border:"none", width: "100%", height: "7vh", borderRadius: "16px", backgroundColor: "#EE0000", color: "white" }}>Create</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}
export default Serviceaddcategory