import React, { useState } from 'react';
import Footer from '../Component/Footer';
import './Setting.css';
import { IoChevronBack } from "react-icons/io5";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import All from '../images/alltime.png';
import one from '../images/one.png';

// Configuration for the carousel
// Configuration for the carousel
const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,           // Enable auto-scroll
    autoplaySpeed: 3000,      // Adjust the speed (3000ms = 3 seconds)
  };
  

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // Default to 'monthly'

  const handleMonthlyClick = () => {
    setSelectedPlan('monthly');
  };

  const handleYearlyClick = () => {
    setSelectedPlan('yearly');
  };

  // Styles for the container and options
  const containerStyle = {
    display: 'flex',
    width: '300px',
    height: '50px',
    overflow: 'hidden',
  };

  const optionStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    textAlign: 'center',
  
    transition: 'background-color 0.3s ease, color 0.3s ease, border 0.3s ease',
  };

  const monthlyStyle = {
    ...optionStyle,
    backgroundColor: selectedPlan === 'monthly' ? 'rgb(255, 228, 228)' : 'rgb(240, 240, 240)',
    color: selectedPlan === 'monthly' ? 'red' : 'black',
    border: selectedPlan === 'monthly' ? '1px solid red' : '1px solid grey', // Full border when selected
    // borderRight: selectedPlan === 'monthly' ? '' : "",
    borderRight: 'none', // Remove right border for the first option
    borderRadius: '5px 0 0 5px', // Add border radius to the left side
  };

  const yearlyStyle = {
    ...optionStyle,
    backgroundColor: selectedPlan === 'yearly' ? 'rgb(255, 228, 228)' : 'rgb(240, 240, 240)',
    color: selectedPlan === 'yearly' ? 'red' : 'black',
    border: selectedPlan === 'yearly' ? '1px solid red' : '1px solid grey', // Full border when selected
    // borderLeft: selectedPlan === 'yearly' ? '1px solid red' : "none",
    borderLeft: 'none', // Remove left border for the second option
    borderRadius: '0 5px 5px 0', // Add border radius to the right side
  };

  

  const slideStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
  margin:'15px',


    border: '1px solid #ddd', // Optional border to outline the slide
   
  };
  
  const rateStyle = {
    textAlign: 'center',
    width: '100%', // This will make sure the rate takes the full width of the parent container
    backgroundColor: 'rgb(255, 214, 214)',
    height: '120px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'50px',


 
  };
  const rateStyle2 = {
    textAlign: 'center',
    width: '100%', // This will make sure the rate takes the full width of the parent container
    backgroundColor: 'rgb(201, 255, 206)',
    height: '120px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'50px',


 
  };
  const rateStyle3 = {
    textAlign: 'center',
    width: '100%', // This will make sure the rate takes the full width of the parent container
    backgroundColor: '#DDD8FF',
    height: '120px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'50px',


 
  };
  
  const rateStyle4 = {
    textAlign: 'center',
    width: '100%', // This will make sure the rate takes the full width of the parent container
    backgroundColor: '#D8F3FF',
    height: '120px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'50px',


 
  };
  



  const saveButtonStyle = {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    fontSize: '18px',
    height: '60px',
    borderRadius: '20px',
    backgroundColor: 'red',
    cursor: 'pointer',
    fontWeight:"700"
  };
  const saveButtonStyle2 = {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    fontSize: '18px',
    height: '60px',
    borderRadius: '20px',
    backgroundColor: 'rgb(35, 239, 2)',
    cursor: 'pointer',
    fontWeight:"700"
  };
  const saveButtonStyle3 = {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    fontSize: '18px',
    height: '60px',
    borderRadius: '20px',
    backgroundColor: '#7700EE',
    cursor: 'pointer',
    fontWeight:"700"
  };
  const saveButtonStyle4 = {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    fontSize: '18px',
    height: '60px',
    borderRadius: '20px',
    background: 'linear-gradient(to bottom, #00D1EE, #000AEE)',
    cursor: 'pointer',
    fontWeight:"700"
  };


  return (
    <div className='Subs-Container'>
      <div className="subs-design">
        <div className="bak-hed">
          <IoChevronBack style={{ fontSize: '22px', color: 'red', cursor: 'pointer' }} />
          <p style={{ marginLeft: '4rem', color: 'red', fontSize: '22px' }}>Subscription Plans</p>
        </div>
        <br />

        <h4 style={{ color: "red", textAlign: "center", width: '70%', fontSize: "23px", margin: '0px auto' }}>
          Please Buy Subscription Plans to Uncloak This Feature
        </h4>
        <br /><br />

        <div className="many" style={{ margin: '2px auto', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
          <p style={{ textAlign: 'center' }}>Select Plan</p>
          <div style={containerStyle}>
            <div 
              style={monthlyStyle}
              onClick={handleMonthlyClick}
            >
              Monthly
            </div>
            <div 
              style={yearlyStyle}
              onClick={handleYearlyClick}
            >
              Yearly
            </div>
          </div>
        </div>
        <br /><br /><br />

        {/* Carousel Section */}
        <div style={{ width: '90%', margin: '0 auto' }}>
          <Slider {...carouselSettings}>
      <div >
           <div style={slideStyle}>
              <h3 style={{ textAlign: 'center' ,margin:0,marginTop:'20px',color:'red',fontSize:'20px'}}>Professional</h3>
              <p style={{ textAlign: "center",margin:'0',fontSize:'18px',letterSpacing:'1px',color:'rgb(136, 136, 136' }}>For small Business</p>
              <div className="rate" style={rateStyle}>
                <h1 style={{ margin: 0, color: 'red', fontSize: '3rem' }}>$4.99</h1>
                <p style={{ margin: 0 }}>per month</p>
              </div>
              <br /><br />
              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Manage 1 Social And Business Profile</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Access your Profile ON/OFF Feature</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Activate Your own Tag</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px", background: "white" }} src={one} alt="all" />
                <p>Customize Your Profile Colouring</p>
              </div>
              <br /><br /><br /><br />
              <div style={saveButtonStyle} className="save">
                Subscribe Plan
              </div>
              <br /><br />
            </div>


      </div>
         

         
      <div >
           <div style={slideStyle}>
              <h3 style={{ textAlign: 'center' ,margin:0,marginTop:'20px',color:'rgb(117, 244, 96)',fontSize:'20px'}}>Premium</h3>
              <p style={{ textAlign: "center",margin:'0',fontSize:'18px',letterSpacing:'1px',color:'rgb(136, 136, 136' }}>For Medium Business</p>
              <div className="rate" style={rateStyle2}>
                <h1 style={{ margin: 0, color: 'rgb(117, 244, 96)', fontSize: '3rem' }}>$18.99</h1>
                <p style={{ margin: 0 }}>per month</p>
              </div>
              <br /><br />
              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Create upto 10 Business Profiles</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Access your Profile ON/OFF Feature</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Activate Your own Tag</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px", background: "white" }} src={one} alt="all" />
                <p>Customize Your Profile Colouring</p>
              </div>
              <br /><br /><br /><br />
              <div style={saveButtonStyle2} className="save">
                Subscribe Plan
              </div>
              <br /><br />
            </div>


      </div>


      <div >
           <div style={slideStyle}>
              <h3 style={{ textAlign: 'center' ,margin:0,marginTop:'20px',color:'#7700EE',fontSize:'20px'}}>Business</h3>
              <p style={{ textAlign: "center",margin:'0',fontSize:'18px',letterSpacing:'1px',color:'rgb(136, 136, 136' }}>For Huge Business</p>
              <div className="rate" style={rateStyle3}>
                <h1 style={{ margin: 0, color: '#7700EE', fontSize: '3rem' }}>$28.99</h1>
                <p style={{ margin: 0 }}>per month</p>
              </div>
              <br /><br />
              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Create upto 15 Business Profiles</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Access your Profile ON/OFF Feature</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Activate Your own Tag</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px", background: "white" }} src={All} alt="all" />
                <p>Customize Your Profile Colouring</p>
              </div>
              <br /><br /><br /><br />
              <div style={saveButtonStyle3} className="save">
                Subscribe Plan
              </div>
              <br /><br />
            </div>


      </div>


      <div >
           <div style={slideStyle}>
              <h3 className='gradient-text' style={{ textAlign: 'center' ,margin:0,marginTop:'20px',color:'#7700EE',fontSize:'20px'}}>Enterprices</h3>
              <p style={{ textAlign: "center",margin:'0',fontSize:'18px',letterSpacing:'1px',color:'rgb(136, 136, 136' }}>For Group of companies</p>
              <div className="rate" style={rateStyle4}>
      
              <h1 className="gradient-text" style={{ margin: 0, fontSize: '3rem' }}>
  Submit Form
</h1>

            
              </div>
              <br /><br />
              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Create upto 15 Business Profiles</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Access your Profile ON/OFF Feature</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                <p>Activate Your own Tag</p>
              </div>

              <div className="pic-p">
                <img style={{ width: '30px', height: "30px", background: "white" }} src={All} alt="all" />
                <p>Customize Your Profile Colouring</p>
              </div>
              <br /><br /><br /><br />
              <div style={saveButtonStyle4} className="save">
                Subscribe Plan
              </div>
              <br /><br />
            </div>


      </div>

        
          </Slider>
        </div>
        <br /><br />
      </div>

      <Footer />
    </div>
  );
}

export default Subscription;
