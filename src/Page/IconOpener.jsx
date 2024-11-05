import React, { useState, useEffect } from 'react';
import './IconOpener.css';
import { useNavigate } from 'react-router-dom';
import crox from '../images/crox.png';
import { getDatabase, ref, set, update, get, child, push, remove } from 'firebase/database';
import Modal from 'react-modal';
import { database } from '../firebase'; // Ensure this path is correct

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
      const userId = localStorage.getItem('userId'); // Fetch userId from localStorage

      if (userId && linkdata?.id) {
        try {
          const dbRef = ref(database, `User/${userId}/links`);
          const snapshot = await get(dbRef);
          let dataFound = false;

          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const data = childSnapshot.val();
              if (data.id === linkdata.id && data.uid === userId) {
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
    const userId = localStorage.getItem('userId');
  
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
      const linksRef = ref(database, `User/${userId}/links`);
      const snapshot = await get(linksRef);
  
      let nextIndex = 0;
      let existingKey = null;
  
      // Check if the link already exists and find the next available index
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.id === id && data.uid === userId) {
            existingKey = childSnapshot.key;
          }
          const currentIndex = parseInt(childSnapshot.key, 10);
          if (!isNaN(currentIndex) && currentIndex >= nextIndex) {
            nextIndex = currentIndex + 1;
          }
        });
      }
  
      const linkData = {
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
  
      if (existingKey) {
        // Update existing link
        await update(ref(database, `User/${userId}/links/${existingKey}`), linkData);
        alert('Data updated successfully!');
      } else {
        // Save new link at the next available index
        await set(ref(database, `User/${userId}/links/${nextIndex}`), linkData);
        alert('Data saved successfully!');
      }
  
      setRecordStatus(linkData.isShared);
      handleSlide();
      setInputValue('');
    } catch (error) {
      console.error('Error saving or updating data:', error);
      alert('Failed to save or update data');
    }
  };
  
  
  
  

  const handleDelete = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    const id = linkdata?.id;
    if (!id || !userId) {
      alert('No ID found to delete or user is not authenticated.');
      return;
    }

    try {
      const dbRef = ref(database, `User/${userId}/links`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.id === id && data.uid === userId) {
            const key = childSnapshot.key;
            remove(ref(database, `User/${userId}/links/${key}`));
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

  return (

    <>
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
   
  );
}

export default IconOpener;
