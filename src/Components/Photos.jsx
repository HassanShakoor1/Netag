import React, { useState, useEffect } from 'react';
import '../App.css';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Import the Slider component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Photos() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const userId = localStorage.getItem('userId');
  
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchMediaFiles = async () => {
      if (userId) {
        const database = getDatabase(app);
        const featuredPhotosRef = ref(database, `User/${userId}/featuredPhotos`);
        const featuredVideosRef = ref(database, `User/${userId}/featuredVideos`);

        try {
          // Fetch images
          const photoSnapshot = await get(featuredPhotosRef);
          const videoSnapshot = await get(featuredVideosRef);
          const mediaUrls = [];

          // Handle photo data
          if (photoSnapshot.exists()) {
            const photoData = photoSnapshot.val();
            const photoRecords = Object.keys(photoData).map(key => ({
              id: key,
              url: photoData[key].imageUrl,
              type: 'image',
            }));
            mediaUrls.push(...photoRecords);
            // console.log("photos",photoRecords)
          }
         

          // Handle video data
          if (videoSnapshot.exists()) {
            const videoData = videoSnapshot.val();
            const videoRecords = Object.keys(videoData).map(key => ({
              id: key,
              url: videoData[key].videoUrl,
              type: 'video',
            }));
            mediaUrls.push(...videoRecords);
          }

          setMediaFiles(mediaUrls);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.warn('User ID not found in local storage.');
      }
    };

    fetchMediaFiles();
  }, [userId]);

  const handleImagemove = () => {
    navigate(`/home/editimage/${userId}`);
  };

  const images = mediaFiles.filter(media => media.type === 'image');
  const videos = mediaFiles.filter(media => media.type === 'video');
  // console.log( "fgbdfh",mediaFiles)
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
console.log(images)
let [run,setRun]=useState(false)
useEffect(()=>{
  // console.log("running")
    setRun(true)

},[images])
  return (
    <div className='profile-design'>
      <div className="p-vContainer">
        <div className="data" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='head' style={{ fontSize: '22px', fontWeight: '100', color: 'rgb(238, 2, 0)', padding: '10px', margin: '0px' }}>
            Photos and Video
          </h2>
        </div>
     
        <div className="slider-container" style={{ padding: '10px', maxHeight: '120px' }}>
        {run &&
        <>
          {images?.length > 0 ? (
            
            <Slider {...settings} style={{ width: '100%' }}>
              {images?.map(media => (
                <div key={media?.id} style={{outline:'none'}}>
                  <img
                    src={media?.url}
                    alt={`Uploaded ${media?.id}`}
                    style={{ height: '100px', width: '90%', objectFit: 'cover', display: 'flex', gap: "10px", borderRadius: "20px",outline:'none' }} // Set max height for slider images
                  />
                </div>
              ))}
          
            </Slider>
          ) :null}
          </>
        }
        </div>
      
        <div style={{ marginTop: '6px',width:"98%"}}>
          {videos.length > 0 ? (
            videos.map((media, index) => (
              <div
                className="column"
                key={media.id}
                style={{
                  width: '95%',
                  minHeight: '175px',
                  margin: '10px auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <video
                  src={media.url}
                  controls
                  style={{ width: '100%', objectFit: 'cover', maxHeight: "200px" }}
                />
              </div>
            ))
          ) :  null

          }
        </div>

        <label htmlFor="file-upload" style={{
          display: 'block',
          width: '95%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          marginTop:"30px",
          justifyContent: 'center',
          margin: '0px auto',
          backgroundColor: '#EFEFEF',
          color: '#747474',
          fontWeight: 'bold',
          cursor: 'pointer',
          textAlign: 'center',
          borderRadius: '12px',
        }} onClick={handleImagemove}>
          +Add
        </label>
      </div>
    </div>
  );
}

export default Photos;
