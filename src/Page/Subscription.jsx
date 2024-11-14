import React, { useState } from 'react';
import Footer from '../Components/Footer';
import './setting.css';

import { IoChevronBack } from "react-icons/io5";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import All from '../images/alltime.png';
import one from '../images/one.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 2000,
};

function Subscription() {
  const { t } = useTranslation(); // useTranslation inside the function
  
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // Default to 'monthly'

  const handleMonthlyClick = () => {
    setSelectedPlan('monthly');
  };

  const handleYearlyClick = () => {
    setSelectedPlan('yearly');
  };
  const handleHome = () => {
    navigate(-1);
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
    border: selectedPlan === 'monthly' ? '1px solid red' : '1px solid grey',
    borderRight: 'none',
    borderRadius: '5px 0 0 5px',
  };

  const yearlyStyle = {
    ...optionStyle,
    backgroundColor: selectedPlan === 'yearly' ? 'rgb(255, 228, 228)' : 'rgb(240, 240, 240)',
    color: selectedPlan === 'yearly' ? 'red' : 'black',
    border: selectedPlan === 'yearly' ? '1px solid red' : '1px solid grey',
    borderLeft: 'none',
    borderRadius: '0 5px 5px 0',
  };

  const slideStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
    margin: '15px',
    border: '1px solid #ddd',
  };

  const rateStyle = {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgb(255, 214, 214)',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  };

  const rateStyle2 = {
    ...rateStyle,
    backgroundColor: 'rgb(201, 255, 206)',
  };

  const rateStyle3 = {
    ...rateStyle,
    backgroundColor: '#DDD8FF',
  };

  const rateStyle4 = {
    ...rateStyle,
    backgroundColor: '#D8F3FF',
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
    fontWeight: '700',
  };

  const saveButtonStyle2 = {
    ...saveButtonStyle,
    backgroundColor: 'rgb(35, 239, 2)',
  };

  const saveButtonStyle3 = {
    ...saveButtonStyle,
    backgroundColor: '#7700EE',
  };

  const saveButtonStyle4 = {
    ...saveButtonStyle,
    background: 'linear-gradient(to bottom, #00D1EE, #000AEE)',
  };

  return (
    <div className='Subs-Container' style={{ display: 'flex', justifyContent: 'center', marginBottom: '5rem' }}>
      <div className="subs-design">
        <div className="bak-hed" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: "20px" }}>
          <IoChevronBack
            onClick={handleHome}
            style={{ fontSize: '25px', color: 'red', cursor: 'pointer', position: 'absolute', }}
          />
          <p style={{ color: 'red', fontSize: '22px', margin: '0 auto' }}>
            {t("Subscription Plans")}
          </p>
        </div>

        <br /><br /><br />

        <h4 style={{ color: "red", textAlign: "center", width: '80%', fontSize: "23px", margin: '0px auto' }}>
          {t("Please Buy Subscription Plans to Uncloak This Feature")}
        </h4>
        <br /><br />

        <div className="many" style={{ margin: '2px auto', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
          <p style={{ textAlign: 'center', color: '#727272' }}>{t("Select Plan")}</p>
          <div style={containerStyle}>
            <div style={monthlyStyle} onClick={handleMonthlyClick}>{t("Monthly")}</div>
            <div style={yearlyStyle} onClick={handleYearlyClick}>{t("Yearly")}</div>
          </div>
        </div>
        <br /><br /><br />

        {/* Carousel Section */}
        <div style={{ width: '90%', margin: '0 auto' }}>
          <Slider {...carouselSettings}>
            <div>
              <div style={slideStyle}>

                <h3 style={{ textAlign: 'center', margin: 0, marginTop: '20px', color: 'red', fontSize: '20px' }}>{t("Professional")}</h3>
                <p style={{ textAlign: "center", margin: '0', fontSize: '18px', letterSpacing: '1px', color: 'rgb(136, 136, 136)' }}>{t("For small Business")}</p>
                <div className="rate" style={rateStyle}>
                  {
                    selectedPlan === 'monthly' ? (
                      <>
                        <h1 style={{ margin: 0, color: 'red', fontSize: '3rem' }}>$4.99</h1>
                        <p style={{ margin: 0 }}>{t("per Month")}</p>
                      </>
                    ) : (
                      <>
                        <h1 style={{ margin: 0, color: 'red', fontSize: '3rem' }}>$20.99</h1>
                        <p style={{ margin: 0 }}>{t("per Year")}</p>
                      </>
                    )
                  }

                </div>
                <br /><br />
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Manage 1 Social And Business Profile")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Access your Profile ON/OFF Feature")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Activate Your own Tag")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px", background: "white" }} src={one} alt="all" />
                  <p>{t("Customize Your Profile Colouring")}</p>
                </div>
                <br /><br /><br /><br />
                <div style={saveButtonStyle} className="save">{t("Subscribe Plan")}</div>
                <br /><br />
              </div>
            </div>

            <div>
              <div style={slideStyle}>
                <h3 style={{ textAlign: 'center', margin: 0, marginTop: '20px', color: 'rgb(117, 244, 96)', fontSize: '20px' }}>{t("Premium")}</h3>
                <p style={{ textAlign: "center", margin: '0', fontSize: '18px', letterSpacing: '1px', color: 'rgb(136, 136, 136)' }}>{t("For Medium Business")}</p>
                <div className="rate" style={rateStyle2}>
                {selectedPlan==='monthly'?(

                  <>
                  <h1 style={{ margin: 0, color: 'rgb(117, 244, 96)', fontSize: '3rem' }}>$18.99</h1>
                  <p style={{ margin: 0 }}>{t("per Month")}</p>
                  </>
                ):(
                  <>
                  <h1 style={{ margin: 0, color: 'rgb(117, 244, 96)', fontSize: '3rem' }}>$30.99</h1>
                  <p style={{ margin: 0 }}>{t("per Year")}</p>
                  </>


                )}
                </div>
                <br /><br />
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Create up to 10 Business Profiles")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Access your Profile ON/OFF Feature")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Activate Your own Tag")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px", background: "white" }} src={one} alt="all" />
                  <p>{t("Customize Your Profile Colouring")}</p>
                </div>
                <br /><br /><br /><br />
                <div style={saveButtonStyle2} className="save">{t("Subscribe Plan")}</div>
                <br /><br />
              </div>
            </div>

            <div>
              <div style={slideStyle}>
                <h3 style={{ textAlign: 'center', margin: 0, marginTop: '20px', color: '#4F00CF', fontSize: '20px' }}>{t("Business")}</h3>
                <p style={{ textAlign: "center", margin: '0', fontSize: '18px', letterSpacing: '1px', color: 'rgb(136, 136, 136)' }}>{t("For Large Business")}</p>
                <div className="rate" style={rateStyle3}>
                {selectedPlan==='monthly'?(
                  <>
                  <h1 style={{ margin: 0, color: '#4F00CF', fontSize: '3rem' }}>$49.99</h1>
                  <p style={{ margin: 0 }}>{t("per Month")}</p>
</>
                ):(
                  <>
                  <h1 style={{ margin: 0, color: '#4F00CF', fontSize: '3rem' }}>$109.99</h1>
                  <p style={{ margin: 0 }}>{t("per Year")}</p>
</>
                )}
                 
                </div>
                <br /><br />
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Create Unlimited Business Profiles")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Access your Profile ON/OFF Feature")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Activate Your own Tag")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px", background: "white" }} src={one} alt="all" />
                  <p>{t("Customize Your Profile Colouring")}</p>
                </div>
                <br /><br /><br /><br />
                <div style={saveButtonStyle3} className="save">{t("Subscribe Plan")}</div>
                <br /><br />
              </div>
            </div>

            <div>
              <div style={slideStyle}>
                <h3 style={{ textAlign: 'center', margin: 0, marginTop: '20px', color: '#00D1EE', fontSize: '20px' }}>Enterprise</h3>
                <p style={{ textAlign: "center", margin: '0', fontSize: '18px', letterSpacing: '1px', color: 'rgb(136, 136, 136)' }}>For Enterprises</p>
                <div className="rate" style={rateStyle4}>
                {selectedPlan==='monthly'?(
                  <>
                       <h1 style={{ margin: 0, color: '#00D1EE', fontSize: '3rem' }}>$99.99</h1>
                  <p style={{ margin: 0 }}>{t("per Month")}</p>
                  </>
                ):(
                  <>
                       <h1 style={{ margin: 0, color: '#00D1EE', fontSize: '3rem' }}>$150.99</h1>
                  <p style={{ margin: 0 }}>{t("per Year")}</p>
                  </>
                )}
               
                </div>
                <br /><br />
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Create Unlimited Business Profiles")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Access your Profile ON/OFF Feature")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px" }} src={All} alt="all" />
                  <p>{t("Activate Your own Tag")}</p>
                </div>
                <div className="pic-p">
                  <img style={{ width: '30px', height: "30px", background: "white" }} src={one} alt="all" />
                  <p>{t("Customize Your Profile Colouring")}</p>
                </div>
                <br /><br /><br /><br />
                <div style={saveButtonStyle4} className="save">{t("Subscribe Plan")}</div>
                <br /><br />
              </div>
            </div>

          </Slider>
        </div>
        <br /><br /><br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%', margin: '2px auto', backgroundColor: 'rgb(255, 222, 222)', border: '1px solid red', boxShadow: 'none', color: 'red' }} className="save">
         {t("Contact with us")}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ textAlign: 'center', width: '82px', fontSize: '10px', borderBottom: '1px solid black', }}>{t("Terms of Services")}</p>
        </div>



      </div>
      <Footer />
    </div>
  );
}

export default Subscription;
