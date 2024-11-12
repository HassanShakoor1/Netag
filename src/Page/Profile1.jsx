import search from "../images/search.png";
import vector from "../images/Vector.svg";
import pic from "../images/Ellipse.png";
import { Modal, Box, Button } from "@mui/material";
import { ref, get, query, orderByChild, equalTo,remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { database } from "../firebase";
import { Margin } from "@mui/icons-material";
import { FaRegCopy } from "react-icons/fa";  // Import the copy icon
import { FaBuilding } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CiCircleInfo } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile1() {
  const [ContactData, setContactData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryRefs = useRef([]);
  const [openedData ,setOpenedData]=useState(null);



// Reference array for each item
const handleCopy = (name) => {
    const textToCopy = name;
  
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            toast.success("Text copied to clipboard!");  // Toast message on success
          })
          .catch(err => {
            console.error("Clipboard copy failed:", err);
            fallbackCopyTextToClipboard(textToCopy);  // Fallback if clipboard API fails
          });
    } else {
      fallbackCopyTextToClipboard(textToCopy); // Use fallback method
    }
  };

  // Fallback method for copying text
  const fallbackCopyTextToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Text copied to clipboard!");
  };


  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      
      if (!userId) {
        console.log("User ID not found");
        return;
      }

      const userRef = query(
        ref(database, "Contacts"),
        orderByChild("userid"),
        equalTo(userId)
      );

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setContactData(Object.values(data));
        console.log("Fetched data:", snapshot.val());
      } else {
        console.log("No data available for user:", userId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const deleteData = async (contactId) => {
    try {
      await remove(ref(database, `Contacts/${contactId}`));
      console.log("Data deleted successfully.");
      
      
      setContactData(prevData => prevData.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };
  

  const downloadVCard = (ContactData) => {
    const vCardContent = `
  BEGIN:VCARD
  VERSION:2.0
  FN:${ContactData.name || "Unknown Name"}
  TEL:${ContactData.phonenumber || ""}
  EMAIL:${ContactData.email || ""}
  ORG:${ContactData.companyname || ""}
  TITLE:${ContactData.imageview || ""}
  ADR;TYPE=WORK:${ContactData.designation || ""}
  NOTE:${ContactData.message || ""}
  END:VCARD
    `.trim();
    
    // Encode the content in base64 for Safari compatibility
    const vCardData = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardContent)}`;
    
    // Create an anchor element
    const a = document.createElement("a");
    a.href = vCardData;
    a.download = `${ContactData.name || "Contact"}.vcf`;
    
    // Append, click, and clean up
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  
  
  





  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const foundCategoryIndex = ContactData.findIndex(
      (category) => category.name && category.name.trim().toLowerCase() === trimmedSearchTerm
    );
  
    if (foundCategoryIndex !== -1) {
      // Assuming categoryRefs is an array of refs pointing to each contact category's DOM element
      if (categoryRefs.current[foundCategoryIndex]) {
        categoryRefs.current[foundCategoryIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      console.log("Category not found");
    }
  };
  
 

  return (
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div>
                <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
              </div>
              <div style={{ color: "#EE0000", fontWeight: "100", fontSize: "20px" }}>Leads</div>
              <div></div>
            </div>

            {/* Search Input */}
            <div className="categories-input">
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", width: "100%",cursor:'pointer' }}>
                <img
                 onClick={handleSearchSubmit}
                 src={search} alt="Search" style={{ marginRight: "8px" }} />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  style={{ color: "#929292", width: "100%", border: "none", outline: "none" }}
                />
              </form>
            </div>

            {/* Contact Cards */}
            {ContactData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (categoryRefs.current[index] = el)} // Set reference for each item
                style={{ marginTop: "2rem", height: "20vh" }}
                className="profile-position"
              >
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 27px 0px 22px" }}>
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <img
                            style={{ width: "100px", height: "100px", borderRadius: "50%", border: "2px solid red" }}
                            src={item.imageview}
                            alt={item.name}
                          />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <div style={{ fontSize: "20px", fontWeight: "600", color: "#EE0000" }}>{item.name}</div>
                          <div style={{ fontSize: "14px", color: "#929292" }}>
                            {item.designation && `(${item.designation})`}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
                        <Button
                       onClick={() => {
  setIsModalOpen(true);
  setOpenedData(item);
}}

                          style={{
                            backgroundColor: "red",
                            fontSize: "12px",
                            borderRadius: "18px",
                            padding: "9px 10px",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Open
                        </Button>

                        <Modal
                          open={isModalOpen}
                          
                          onClose={handleCloseModal}
                          aria-labelledby="slide-modal-title"
                          aria-describedby="slide-modal-description"
                          closeAfterTransition
                          sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center", outline: "none" }}
                        >
                          <Box
                            sx={{
                              width: 300,
                              bgcolor: "background.paper",
                              borderRadius: "8px",
                              p: 4,
                              boxShadow: 24,
                              outline: "none",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                       <div
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }}
>
  {/* Close Button */}
  <Button
    onClick={handleCloseModal}
    style={{
      position: "absolute",
      left: 0,
      padding: 0,
      minWidth: "auto", // Remove extra button padding
      margin: 0,
      color: "black",
      fontSize: "20px",
      backgroundColor:"rgb(232, 224, 222)",
      width:'20px ',
      height:"20px",
      borderRadius:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      paddingBottom:'4px'
    }}
  >
    &times; {/* Cross icon, or replace with an actual icon if preferred */}
  </Button>

  {/* Centered Heading */}
  <h2 id="slide-modal-title" style={{ margin: "0px",fontSize:"20px",color:"red" }}>
    Contact Details
  </h2>

  {/* Empty Div (optional for future elements) */}
  <div></div>
</div>


<div
  style={{
    marginTop: '20px',  // Reduce top margin
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: '4px',  // Add a small gap between elements to control spacing
  }}
>
  {/* Image */}
  <img
    style={{
      width: "80px",  // Adjust image size if needed
      height: "80px",
      borderRadius: "50%",
      margin: 0,  // Remove default margin
    }}
    src={openedData?.imageview}
    alt=""
  />

  {/* Name */}
  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <h5
          style={{
            color: "red",
            fontSize: "16px",
            fontWeight: "100",
            margin: "4px 0",
          }}
        >
          {openedData?.name}
        </h5>
        
        {/* Copy Icon */}
      <FaRegCopy
  style={{
    cursor: "pointer",
    color: "#929292",
    fontSize: "14px",
  }}
  onClick={() => handleCopy(openedData?.name)} // Pass the name here
  title="Copy Name"
/>
      </div>





  {/* Date */}
  <p
    style={{
      fontSize: "14px",
      color: "#666",
      lineHeight: "1.2",  // Adjust line height for less spacing
      margin: 0,  // Remove extra margin
    }}
  >
    {openedData?.createdDate}
  </p>
</div>


<div style={{width:"100%",marginTop:"20px"}}>
    <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:'center'}}>

<div style={{width:'48%',background:"rgb(232, 224, 222)",height:"auto",borderRadius:"10px"}}>

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:"0px 15px"}}>

<IoBriefcaseOutline />
<p style={{
      paddingLeft:'10px',
      flex: 1, // Allow email text to take up remaining space
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis' // Truncate with ellipsis if overflow
    }}>{openedData?.designation}</p>
<FaRegCopy
  style={{
    cursor: "pointer",
    color: "#929292",
    fontSize: "14px",
  }}
  onClick={() => handleCopy(openedData?.designation)} // Pass the name here
  title="Copy Name"
/>
</div>

</div>

<div style={{width:'48%',background:"rgb(232, 224, 222)",height:"auto",borderRadius:"10px"}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:"0px 15px"}}>

<HiOutlineBuildingOffice />
<p style={{
      paddingLeft:'10px',
      flex: 1, // Allow email text to take up remaining space
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis' // Truncate with ellipsis if overflow
    }}>{openedData?.companyname}</p>
<FaRegCopy
  style={{
    cursor: "pointer",
    color: "#929292",
    fontSize: "14px",
  }}
  onClick={() => handleCopy(openedData?.companyname)} // Pass the name here
  title="Copy Name"
/>
</div>

</div>
    </div>
</div>


<div style={{width:"100%",marginTop:"20px"}}>
    <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:'center'}}>

<div style={{width:'48%',background:"rgb(232, 224, 222)",height:"auto",borderRadius:"10px"}}>

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:"0px 15px"}}>

<IoCallOutline />
<p style={{
      paddingLeft:'10px',
      flex: 1, // Allow email text to take up remaining space
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis' // Truncate with ellipsis if overflow
    }}>{openedData?.phonenumber}</p>
<FaRegCopy
  style={{
    cursor: "pointer",
    color: "#929292",
    fontSize: "14px",
  }}
  onClick={() => handleCopy(openedData?.phonenumber)} // Pass the name here
  title="Copy Name"
/>
</div>

</div>

<div style={{width:'48%',background:"rgb(232, 224, 222)",height:"auto",borderRadius:"10px"}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:"0px 15px"}}>

<CiMail />
<p style={{
      paddingLeft:'10px',
      flex: 1, // Allow email text to take up remaining space
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis' // Truncate with ellipsis if overflow
    }}>
      {openedData?.email}
    </p>
<FaRegCopy
  style={{
    cursor: "pointer",
    color: "#929292",
    fontSize: "14px",
  }}
  onClick={() => handleCopy(openedData?.email)} // Pass the name here
  title="Copy Name"
/>
</div>

</div>
    </div>

    <div style={{marginTop:"20px", backgroundColor:"#E8E0DF",borderRadius:"10px",display:'flex',justifyContent:'space-between',alignItems:"center"}} >
    <div  style={{display:'flex',width:'80%',margin:'0px auto',alignItems:"center",margin:"0",padding:'15px',gap:"10px"}}>
    <CiCircleInfo />
        <p style={{
      paddingLeft:'10px',
      flex: 1, // Allow email text to take up remaining space
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis' // Truncate with ellipsis if overflow
    }} >{openedData?.message} 
        </p>

    </div>
    <FaRegCopy
  style={{
    cursor: "pointer",
    color: "#929293",
    fontSize: "14px",
  }}
  onClick={() => handleCopy(openedData?.message)} // Pass the name here
  title="Copy Name"
/>
    <div>

    </div>
</div>
</div>

<div style={{width:"100%",padding:'15px 15px'}}>
    <button   onClick={() => downloadVCard(ContactData)} style={{width:'100%',height:"50px",cursor:"pointer",borderRadius:"10px",border:"none",outline:'none',backgroundColor:"red",color:"white",fontSize:'17px'}}> Download Vcf</button>
</div>






                         
                            
                          </Box>
                        </Modal>
                        <button
                        onClick={()=>{deleteData(item.id)}}
                          style={{
                            backgroundColor: "white",
                            marginTop: "5px",
                            border: "2px solid red",
                            color: "red",
                            fontSize: "12px",
                            borderRadius: "18px",
                            padding: "8px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile1;
