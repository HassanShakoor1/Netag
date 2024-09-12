import React, { useState, useEffect } from 'react';
import './IconOpener.css';
import { IoChevronBack } from "react-icons/io5";
import crox from '../images/crox.png';
import { database as db } from '../firebase';
import { ref as sRef, push, set, get, update, remove } from 'firebase/database';

function IconOpener({ handleSlide, linkdata, ReturnIcon }) {
 console.log("linkdata",linkdata)
  const [value1, setInputValue] = useState('');
  const [hideDAta, setHideData] = useState(false);
  const [existingSocialLinkId, setExistingSocialLinkId] = useState(null);
  const[isShared,setIsShared]=useState(false)

  // Check if the icon already exists in Firebase
//   useEffect(() => {
//     const checkIconExists = async () => {
//       const dbRef = sRef(db, `SocialLinks`);
      
//       const snapshot = await get(dbRef);
//      const data= snapshot.val()
//      console.log("data",data)
//      console.log("linkdata.id",linkdata.id)
//       const arr = Object.keys(data).filter(key => data[key].id === linkdata.id)
//       .map(key => ({
//         id: key,
//         ...data[key]
//       }
//       )
//       )
//       console.log("arr",arr)
//       console.log("arr",arr[0].baseUrl)

//       if (arr.length>0) {
//         setExistingSocialLinkId(arr.sociallinkid);
//         setInputValue(arr[0].baseUrl); // Pre-fill the input if data exists
//       }
//     };
//     checkIconExists();
//   }, [linkdata]);
// // console.log("value",value)

// // useEffect(() => {
// //   const checkIconExists = async () => {
// //     try {
// //       const dbRef = sRef(db, `SocialLinks`);
// //       const snapshot = await get(dbRef);
// //       const data = snapshot.val();

// //       if (data) {
// //         const arr = Object.keys(data)
// //           .filter(key => data[key].id === linkdata.id)
// //           .map(key => ({
// //             id: key,
// //             ...data[key]
// //           }));

// //         if (arr.length > 0) {
// //           setExistingSocialLinkId(arr[0].sociallinkid);
// //           setInputValue(arr[0].baseUrl); // Pre-fill the input if data exists
// //         }
// //       } else {
// //         console.log("No data found in Firebase");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching data from Firebase", error);
// //     }
// //   };

// //   if (linkdata) {
// //     checkIconExists();
// //   }
// // }, [linkdata]);

//   const showhide = () => {
//     setHideData(prev => !prev);
//   };

//    function handlechange(e){
//     setInputValue(e.target.value)
//     setIsShared(true)
//    }
//   {/* -------------------------------------------sending or updating data to firebase-------------------------------------------*/ }

//   const sendDataToFireBase = async () => {
//     try {
      
//       // const dbRef = sRef(db, `SocialLinks`);
//       // const key_social = push(dbRef);
//       // const key =  key_social.key;
//       const dbRef = existingSocialLinkId
//         ? sRef(db, `SocialLinks/${existingSocialLinkId}`)  // Reference to existing entry
//         : sRef(db, `SocialLinks`);  // Reference to create new entry

//       const key_social = existingSocialLinkId ? null : push(dbRef);
//       const key = key_social ? key_social.key : existingSocialLinkId;

//       const obj = {
//         baseUrl: value1,
//         id: linkdata.id,
//         image: linkdata.url,
//         isShared:isShared,
//         name: linkdata.text,
//         packageName: "",
//         socialIcon: "",
//         sociallinkid: key,
//         uid: localStorage.getItem("userId"),
//         value: ""
//       };

//       // Update if the icon exists, otherwise set new data
//       if (existingSocialLinkId) {
//         await update(key_social, {
//           baseUrl: value1,
//         });  // Update existing entry
//         alert("Data updated successfully");
//       } else {
//         await set(key_social, obj);  // Create new entry
//         alert("Data sent successfully");
//       }


//       setInputValue("")
//     } catch (error) {
//       console.log("Error sending data of social icons to Firebase", error);
//       alert("Error sending data of social icons to Firebase");
//     }
//   };


useEffect(() => {
  if (!linkdata || !linkdata.id) {
    // console.warn("linkdata or linkdata.id is not available");
    return;  // Don't proceed if linkdata or linkdata.id is invalid
  }

  const checkIconExists = async () => {
    const dbRef = sRef(db, `SocialLinks`);
    const snapshot = await get(dbRef);
    const data = snapshot.val();
    
    if (data) {
      const arr = Object.keys(data)
        .filter(key => String(data[key].id) === String(linkdata.id))  // Convert to string for comparison
        .map(key => ({
          id: key,
          ...data[key]
        }));

      console.log("Filtered array:", arr);
      if (arr.length > 0) {
        setExistingSocialLinkId(arr[0].sociallinkid);  // Store the existing social link id
        setInputValue(arr[0].baseUrl);  // Pre-fill the input if data exists
      }
    }
  };

  checkIconExists();
  setInputValue("")
}, [linkdata]);

const showhide = () => {
  setHideData(prev => !prev);
};

function handlechange(e) {
  setInputValue(e.target.value);
  setIsShared(true);
}
 {/* --------------------------------sending or updating data to firebase-------------------------------*/ }
const sendDataToFireBase = async () => {
  try {
    const dbRef = existingSocialLinkId
      ? sRef(db, `SocialLinks/${existingSocialLinkId}`)  // Reference to existing entry
      : sRef(db, `SocialLinks`);  // Reference to create new entry

    const key_social = existingSocialLinkId ? null : push(dbRef);
    const key = key_social ? key_social.key : existingSocialLinkId;

    const obj = {
      baseUrl: value1,
      id: linkdata.id,
      image: linkdata.url,
      isShared: isShared,
      name: linkdata.text,
      packageName: "",
      socialIcon: "",
      sociallinkid: key,
      uid: localStorage.getItem("userId"),
      value: ""
    };

    // Update if the icon exists, otherwise set new data
    if (existingSocialLinkId) {
      await update(dbRef, obj);
      alert("Data updated successfully");
    } else {
      await set(key_social, obj);
      alert("Data sent successfully");
    }

    setInputValue("");  // Clear the input after sending/updating data
  } catch (error) {
    console.log("Error sending data of social icons to Firebase", error);
    alert("Error sending data of social icons to Firebase");
  }
};

const handleDelete=async(id)=>{
const dataRef=sRef(db,`SocialLinks`)
const snap=await get(dataRef)
const data=snap.val()

const arr=Object.keys(data).filter(key=>data[key].id===id)
        .map(key=>(
           { id:key,
            ...data[key]}
        ))
        console.log(arr[0].sociallinkid)

        const datToRemove=sRef(db,`SocialLinks/${arr[0].sociallinkid}`)

        await remove(datToRemove)
}





  return (
    <>
      {!hideDAta ? (
        <div className="all">
          <div className="Icon-nav">
            <div className="crox-dlt">
              <div className="x-space">
                <img style={{ width: "13px" }} src={crox} alt="X" onClick={handleSlide} />
              </div>
              <p onClick={()=>{handleDelete(linkdata?.id)}} style={{ fontSize: '16px', color: "#EE0000", marginRight: "20px" }}>Delete</p>
            </div>
          </div>

          <br /><br />

          <div className='image-section'>
            <img style={{ width: '100px' }} src={ReturnIcon(linkdata?.id)} alt="icon" />
          </div>
          <h3 style={{ textAlign: "center", fontWeight: '200', fontSize: '22px', lineHeight: '0' }}>
            {linkdata?.text}
          </h3>
          <br /><br />

          <div className="input-q">
            <input className='quest' type="text" placeholder={linkdata?.place} value={value1} onChange={handlechange} />
            <div onClick={showhide} className="x-space2" style={{ color: "red", fontSize: "25px", fontWeight: "600", border: '1px solid #DADADA', cursor: 'pointer' }}>
              ?
            </div>
          </div>
          <br /><br />

          <div className="two-btns">
            <button onClick={handleSlide} className='cancel'>Cancel</button>
            <button className='save' onClick={() => sendDataToFireBase()}>Save</button>
            <br /><br /><br />
            <br /><br /><br />
          </div>
        </div>
      ) : (
        <div className="new-data" style={{ marginBottom: "20rem" }}>

          <div onClick={showhide} className="x-space22" style={{ color: "red", fontSize: "25px", fontWeight: "600", cursor: 'pointer' }}>
            <IoChevronBack />
          </div>
          <h1 style={{ color: "#DE3227", paddingLeft: "20px" }}>Instructions:</h1>

          <h3 style={{ textAlign: "center", fontWeight: '100' }}> <li> {linkdata?.instruction}  </li></h3>

          <input style={{ display: 'flex', justifyContent: "center", margin: '20px auto', width: "60%", height: '30px', borderRadius: '10px', outline: 'none', border: '1px solid grey' }} type="text" placeholder={linkdata?.instruction} />

        </div>
      )}
    </>
  );
}

export default IconOpener;
