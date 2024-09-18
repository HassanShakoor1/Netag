import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function ImageCropper({ image, onClose, onCrop }) {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        onCrop(blob);
      }, 'image/jpeg');
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.cropperContainer}>
        <Cropper
          src={image}
          style={styles.cropper}
          guides={false}
          ref={cropperRef}
          background={false} // Ensure no background behind the image
        />
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleCrop}>Crop</button>
        <button style={{ ...styles.button, ...styles.closeButton }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '390px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight opacity for the background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    textAlign: 'center',
  },
  cropperContainer: {
    marginBottom: '20px',
    position: 'relative',
    height: '300px', // Adjust height as needed
    overflow: 'hidden', // Ensure no overflow issues
    backgroundColor: '#fff', // Ensure a solid background color
    borderRadius: '10px', // Match the border radius of the cropper
  },
  cropper: {
    height: '100%',
    width: '100%',
    objectFit: 'contain', // Ensure the image is contained within the cropper
    display: 'block', // Ensure no inline-block spacing issues
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    outline: 'none',
  },
  closeButton: {
    backgroundColor: '#dc3545',
  },
};

export default ImageCropper;
