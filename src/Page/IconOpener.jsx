import React, { useState, useEffect } from 'react';
import './IconOpener.css';
import { useNavigate } from 'react-router-dom';
import crox from '../images/crox.png';
<<<<<<< HEAD
import { getDatabase, ref, set, update, get, child, push, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '../firebase'; // Ensure this path is correct

import Modal from 'react-modal';
Modal.setAppElement('#root'); // This is required for accessibility

function IconOpener({ handleSlide, linkdata, ReturnIcon, setRecordStatus }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [existingData, setExistingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showdata, setShowdata] = useState(null);

  const navigate = useNavigate();

  const ToggleData = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && linkdata?.id) {
        try {
          const dbRef = ref(database, `SocialLinks`);
          const snapshot = await get(dbRef);
          let dataFound = false;

          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const data = childSnapshot.val();
              if (data.id === linkdata.id && data.uid === user.uid) {
                setExistingData(data);
                setInputValue(data.baseUrl);
                setRecordStatus[data.id, data.isShared];
                dataFound = true;
              }
            });

            if (!dataFound) {
              console.log('No data found for the provided ID and user.');
              setExistingData(null);
              setInputValue('');
            }
          } else {
            console.log('No data available.');
            setExistingData(null);
            setInputValue('');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setExistingData(null);
        setInputValue('');
      }
    };

    fetchData();
    setShowdata(false);
  }, [linkdata?.id, setRecordStatus]);

  const go = () => {
    setShowdata(false);
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    if (!userId) {
      alert('User is not authenticated');
      return;
    }

    const id = linkdata?.id || 'defaultLinkId';
    const baseUrl = inputValue;
    const imageUrl = ReturnIcon(id);

    if (!imageUrl) {
      alert('Image URL not found!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (linkdata?.place.toLowerCase().includes('email') && !emailRegex.test(inputValue)) {
      setError('Invalid email address');
      return;
    }

    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*)$/i;
    if (linkdata?.place.toLowerCase().includes('url') && !urlRegex.test(inputValue)) {
      setError('Invalid URL');
      return;
    }

    try {
      const dbRef = ref(database);
      const existingDataRef = ref(database, `SocialLinks`);
      const snapshot = await get(child(dbRef, `SocialLinks`));

      let dataExists = false;
      let existingKey = '';

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.id === id && data.uid === userId) {
            dataExists = true;
            existingKey = childSnapshot.key;
          }
        });
      }

      const dataa = {
        name: linkdata?.linkName || 'Unnamed Link',
        image: imageUrl,
        uid: userId,
        id: id,
        baseUrl: baseUrl,
        value: '',
        socialIcon: '',
        isShared: true,
        packageName: '',
      };

      if (dataExists) {
        await update(ref(database, `SocialLinks/${existingKey}`), dataa);
        alert('Data updated successfully!');
        setRecordStatus[dataa.isShared];
        handleSlide();
      } else {
        const newLinkRef = push(existingDataRef);
        const keyy = newLinkRef.key;
        dataa.sociallinkid = keyy;

        await set(newLinkRef, dataa);
        alert('Data saved successfully!');
        setRecordStatus[dataa.isShared];
        handleSlide();
      }

      setInputValue('');
    } catch (error) {
      console.error('Error saving or updating data:', error);
      alert('Failed to save or update data');
    }
  };

  const handleDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    const id = linkdata?.id;
    if (!id || !userId) {
      alert('No ID found to delete or user is not authenticated.');
      return;
    }

    try {
      const dbRef = ref(database, `SocialLinks`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.id === id && data.uid === userId) {
            const key = childSnapshot.key;
            remove(ref(database, `SocialLinks/${key}`));
            alert('Data deleted successfully!');
            setRecordStatus[data.isShared];
            handleSlide();
          }
        });
      } else {
        console.log('No data available to delete.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Failed to delete data');
    }
  };

  const id = linkdata?.id || 'defaultLinkId';
  const imageUrl = ReturnIcon(id);
=======
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




>>>>>>> d3ff043 (new commit)

  return (

    <>
<<<<<<< HEAD
    <div className="all" style={{ height: "460px" }}>
      <div className="Icon-nav">
        <div className="crox-dlt">
          <div className="x-space" >
            <img style={{ width: '13px',position:'absolute',right:'0',paddingRight:"30px",paddingTop:'20px' }} src={crox} alt="X" onClick={handleSlide} />
          </div>
          
        </div>
      </div>

      <br /><br />

      <div className="image-section">
        <img style={{ width: '100px' }} src={imageUrl} alt="icon" />
      </div>
      <h3 style={{ textAlign: 'center', fontWeight: '200', fontSize: '22px', lineHeight: '0' }}>
        {linkdata?.linkName}
      </h3>
      <br /><br />

      <div className="input-q">
        <input
          className="quest"
          type="text"
          placeholder={linkdata?.place}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(''); // Clear error on input change
          }}
        />
        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
        <div onClick={ToggleData} className="x-space2" style={{ color: 'red', fontSize: '25px', fontWeight: '600', border: '1px solid #DADADA', cursor: 'pointer' }}>
          ?
        </div>
      </div>
      <br /><br />

      <div className="two-btns">
        <button onClick={handleDelete} className="cancel">Delete</button>
        <button onClick={handleSave} className="save" style={{ color: 'white' }}>
          {existingData ? "Update" : "Save"}
        </button>
      </div>
    </div>

    <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '100',
    },
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth:"380px",
      height: 'auto',
      padding: '20px',
      borderRadius: '11px',
      border: '1px solid #ccc',
    },
  }}
>
            <img style={{ width: '13px',position:'absolute',right:'0',paddingRight:"30px",paddingTop:'20px' ,cursor:'pointer'}} src={crox} alt="X" onClick={closeModal} />

  <h1 style={{ color: 'red', margin: '20px', fontSize: '20px' }}>Instructions:</h1>
  <div style={{ margin: '20px' }}>
    <div style={{
      whiteSpace: 'pre-line',
      lineHeight: '1.5',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '10px'
    }}>
      {linkdata?.instruction ? linkdata.instruction : 'No instructions available.'}
    </div>
  </div>
</Modal>
  </>
   
=======
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
>>>>>>> d3ff043 (new commit)
  );
}

export default IconOpener;
