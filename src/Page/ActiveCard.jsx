import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import './Activecard.css';
import { ref, query, get, orderByChild, equalTo, update } from "firebase/database";
import { database } from '../firebase.jsx';
import { useTranslation } from 'react-i18next';
import QrScanner from 'react-qr-scanner'; // Import the correct QR Scanner

function ActiveCard() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [tagData, setTagData] = useState(null);
  const [showQRReader, setShowQRReader] = useState(false);
  const [qrResult, setQrResult] = useState('');
  const [qrError, setQrError] = useState(null); // State to capture QR reader errors
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, `User/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log('No user data available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const tagIdToSearch = "454545"; // Replace with the actual TagId you want to search

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const tagRef = ref(database, "Tag");
        const tagQuery = query(tagRef, orderByChild("tagId"), equalTo(tagIdToSearch));
        const snapshot = await get(tagQuery);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setTagData(data);
          const tagKey = Object.keys(data)[0];
          const tagInfo = data[tagKey];

          console.log("Fetched Tag Data:", tagInfo); // Log tagInfo to verify the structure

          // Check if status is false and username is null
          if (tagInfo.status === false && (tagInfo.username === null || tagInfo.username === "")) {
            // Update the Tag table with the username
            const tagRefToUpdate = ref(database, `Tag/${tagKey}`);
            await update(tagRefToUpdate, {
              username: userData?.username,
              status: true
            });

            // Update the User table with the tagId
            const userRefToUpdate = ref(database, `User/${userId}`);
            await update(userRefToUpdate, {
              TagUid: tagIdToSearch,
            });

            console.log("Tag and User tables updated with new data.");
          }
        } else {
          console.log("No data found for the specified tagId");
        }
      } catch (error) {
        console.error("Error fetching tag data:", error);
      }
    };

    if (userData) {
      fetchTag();
    }
  }, [tagIdToSearch, userData, userId]);

  const handleActivateClick = () => {
    // Show the QR reader when the button is clicked
    setShowQRReader(true);

    // Check if camera permission is granted before showing the QR reader
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const hasCamera = devices.some(device => device.kind === 'videoinput');
          if (!hasCamera) {
            alert('No camera detected on this device.');
          }
        })
        .catch((error) => {
          console.error('Error accessing devices:', error);
          alert('Error accessing camera.');
        });
    }
  };

  const handleQrScan = (data) => {
    if (data) {
      // Extract the tagID from the QR code result URL (after the last "/")
      const tagIdFromUrl = data.split('/').pop();
      setQrResult(tagIdFromUrl); // Store the extracted tagID
      setShowQRReader(false); // Hide the QR reader after scanning
    }
  };

  const handleQrError = (err) => {
    console.error('QR Reader Error:', err);
    // Handle the error by saving its message to state and displaying it in the UI
    setQrError(err?.message || 'An unknown error occurred');
  };

  useEffect(() => {
    if (qrResult) {
      console.log('QR Code Result:', qrResult);
    }
  }, [qrResult]);

  return (
    <div className="Active-container">
      <div className="Active-design">
        <div className="active-head">
          <p>{t('Activate Tag')}</p>
        </div>

        <div
          className="Active-img"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}
        >
          <img
            style={{ width: '200px', height: '200px', borderRadius: '100%' }}
            src={userData?.profileUrl}
            alt="active"
          />
        </div>
        <p
          style={{
            fontSize: '16px',
            margin: '5px',
            width: '100%',
            textAlign: 'center',
            paddingTop: '30px',
          }}
        >
          {t('Your')}{' '}
          <span
            style={{
              color: 'red',
              fontSize: '17px',
              fontWeight: '800',
            }}
          >
            NeTag
          </span>{' '}
          {t('product will be Activated with name')}:
        </p>

        <h2 style={{ textAlign: 'center', color: 'red', lineHeight: '2px' }}>
          {userData?.name}
        </h2>

        {showQRReader && (
          <div style={{ margin: '20px auto', width: '90%' }}>
            <QrScanner
              delay={300} // Increase delay between scans to avoid overloading the scanner
              onScan={handleQrScan} // Use onScan to handle the scanned data
              onError={handleQrError} // Use onError to handle the error
              facingMode="environment"
              style={{ width: '100%' }}
            />
          </div>
        )}

        {qrError && (
          <p style={{ color: 'red', marginTop: '20px' }}>
            {t('QR Reader Error')}: {qrError.message || qrError}
          </p>
        )}

        {qrResult && (
          <p style={{ color: 'black', marginTop: '20px', width: "80%" }}>
            {t('Scanned QR Code')}: {qrResult}
          </p>
        )}

        <button
          className="save"
          style={{
            color: 'white',
            width: '90%',
            height: '50px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5rem',
            fontSize: '18px',
            marginBottom: '10rem',
          }}
          onClick={handleActivateClick}
        >
          {t('Activate Ne Tag Card')}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ActiveCard;
