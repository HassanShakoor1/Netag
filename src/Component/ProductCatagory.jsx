import React,{useState} from 'react';
import './product.css';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; 
import hairimg from '../images/hairimg.jpeg';
import dots from '../images/dots.png';
import line from '../images/line.png';
import edcat from '../images/edcat.png';
import dltcat from '../images/dltcat.png';
import Slide from '@mui/material/Slide';
import './Slide.css';
import { MdBorderBottom } from 'react-icons/md';

function ProductCatagory() {
  const navigate = useNavigate();
  const [setting, setSetting] = useState(false);
  const handleSlide = () => {
  
    setSetting(!setting);
  };
  const handleBackscreen = () => {
    navigate('/');
  };

  const handleAddClick = () => {
    navigate('/product-catagory');
  };

  const handleEditproductcatagory = () => {
    navigate('/edit-product-catagory');
  };
  
  return (
    <div className="productContainer">
      <div className="Product-design">
        <div className="bck-head-btn">
          <IoChevronBack onClick={handleBackscreen} className="bck" style={{ paddingTop: "1.5rem", paddingRight: "2rem" }} />
          <h4 style={{ color: "red", fontSize: '20px', fontWeight: '100' }}>Product catagory</h4>
          <button onClick={handleAddClick} style={{ marginTop: '1.5rem' }} className='add-btn'>Add</button>
        </div>

        <div className="search-field">
          <input style={{ textAlign: 'center', fontSize: '20px', fontWeight: '100' }} type="text" placeholder="Search" />
        </div>
        <br />
        <div className="HairoilContainer">
          <div className="hair-img">
            <img style={{ width: "100%", height: "170px", objectFit: 'cover', borderRadius: "20px" }} src={hairimg} alt="" />
          </div>
          <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
            <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
              Hair oil <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>(299 products)</span>
            </h3>
            <div className="p-dots">
              <p style={{ fontSize: '12px', textAlign: "left", paddingLeft: "1rem", width: '70%', paddingTop: '0px', paddingBottom: "0px" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quibusdam nobis sapiente dolorem aspernatur iste neque quos vero aperiam corrupti.
              </p>

              <Slide in={setting} direction="right" timeout={{ appear: 500, enter: 500, exit: 500 }}>
                <div className="slide_main_div relative" style={{height:"90px", marginBottom:"10rem",width:'200px',borderRadius:"10px"}}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:'center',alignItems:'center',margin:"20px auto",padding:"4px"}} >
            
                   <img onClick={handleEditproductcatagory}  style={{width:"90%",borderBottom:'2px solid grey',paddingBottom:'2px',cursor:"pointer"}} src={edcat} alt="line" />


                   <img onClick={handleSlide}  style={{width:"90%",cursor:"pointer"}} src={dltcat} alt="line" />

                
                </div>
                
                </div>
              </Slide>






              
              <img  onClick={handleSlide} style={{ height: '15px', paddingTop: '16px', marginRight: '13px', cursor: "pointer" }} src={dots} alt="" />

            
            
            
            
            
            </div>
            <button style={{ border: '1px solid #EE0000', color: "red" }} className='product-btn'> Explore Products</button>
            <br /><br />
          </div>
        </div>
        <br />
        <div className="HairoilContainer">
          <div className="hair-img">
            <div style={{ width: "100%", height: "170px", objectFit: 'cover', backgroundColor: "#D9D9D9", borderRadius: "20px" }} ></div>
          </div>
          <div className="hair-data" style={{ backgroundColor: "#F5F5F5" }}>
            <h3 style={{ marginTop: "2rem", paddingLeft: '1rem', color: "red", fontWeight: '100', fontSize: '26px' }}>
              Shoes <span style={{ fontSize: '13px', color: "rgb(197, 197, 197)" }}>(299 products)</span>
            </h3>
            <div className="p-dots">
              <p style={{ fontSize: '12px', textAlign: "left", paddingLeft: "1rem", width: '70%' }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quibusdam nobis sapiente dolorem aspernatur iste neque quos vero aperiam corrupti.
              </p>





              <img onClick={handleSlide} style={{ height: '15px', paddingTop: '16px', marginRight: '13px', cursor: "pointer" }} src={dots} alt="" />
            </div>
            <button style={{ border: '1px solid #EE0000', color: 'red' }} className='product-btn'> Explore Products</button>
            <br /><br />
          </div>
        </div>
        <br /><br /><br /><br /><br />
      </div>
    </div>
  );
}

export default ProductCatagory;
