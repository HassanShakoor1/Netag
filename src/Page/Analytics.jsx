import React, { useState } from 'react'
import Footer from '../Components/Footer'
import pop from '../images/pops.png'
import Order from '../images/order.png'
import connect from '../images/connection.png'
import link from '../images/linkclicl.png'
import chrtt from '../images/chrt.png'
import upwork from '../images/up.png'
import linee from '../images/linee.png'
import scype from '../images/scype.png'
import paypal from '../images/paypal.png'
import './Analytics.css';
function Analytics() {

  const [count ,setCount]=useState(0)

   const counter =()=>{

    setCount(count+1)
   }

  return (
    <div className="Analytics-container">
        <div className="analytics-design">
           
                <p style={{textAlign:'center',fontSize:'23px',color:'red'}}>Analytics</p>
       
                <div className="row">
            <div className="col" >
            <div className="ana-d" style={{margin:'15px'}}>

<div  className="points" style={{display:'flex',justifyContent:"start",flexDirection:'column'}}>
<p style={{  color: '#E93428', fontWeight: 'bold' ,margin:'0px',fontSize:"12px"}}>Total Pops</p>
                 <p style={{fontSize:'8px',color:'grey'}}>Lorem ipsum dolor consectetur</p>
</div>
                 <img style={{width:'50px',height:'50px',cursor:'pointer'}} src={pop} alt="pop" />

            </div>
            <h1 style={{color: '#E93428',margin:20,fontSize:'35px',letterSpacing:'3px'}}>5,283</h1>
            </div>

        

            <div className="col" >
            <div className="ana-d" style={{margin:'15px'}}>

<div  className="points" style={{display:'flex',justifyContent:"start",flexDirection:'column'}}>
<p style={{  color: '#E93428', fontWeight: 'bold' ,margin:'0px',fontSize:'12px'}}>Total Link clicks</p>
                 <p style={{fontSize:'8px',color:'grey'}}>Lorem ipsum dolor consectetur</p>
</div>
                 <img style={{width:'50px',height:'50px',cursor:'pointer'}} src={link} alt="pop" />

            </div>
            <h1 style={{color: '#E93428',margin:20,fontSize:'35px',letterSpacing:'3px'}}>1,272</h1>
            </div>
               
          </div>
          
       



          <div className="row" style={{margin:"0px"}}>
            <div className="col">
            <div className="ana-d" style={{margin:'15px'}}>

<div  className="points" style={{display:'flex',justifyContent:"start",flexDirection:'column'}}>
<p style={{  color: '#E93428', fontWeight: 'bold' ,margin:'0px',fontSize:'12px'}}>New Connections</p>
                 <p style={{fontSize:'8px',color:'grey'}}>Lorem ipsum dolor consectetur</p>
</div>
                 <img style={{width:'50px',height:'50px',cursor:'pointer'}} src={connect} alt="pop" />

            </div>
            <h1 style={{color: '#E93428',margin:20,fontSize:'35px',letterSpacing:'3px'}}>318</h1>
       
            </div>
            
        

            <div className="col" >
            <div className="ana-d" style={{margin:'15px'}}>

<div  className="points" style={{display:'flex',justifyContent:"start",flexDirection:'column'}}>
<p style={{  color: '#E93428', fontWeight: 'bold' ,margin:'0px',fontSize:'12px'}}>Total Pops</p>
                 <p style={{fontSize:'8px',color:'grey'}}>Lorem ipsum dolor consectetur</p>
</div>
                 <img style={{width:'50px',height:'50px',cursor:'pointer'}} src={Order} alt="pop" />

            </div>
            <h1 style={{ color: '#E93428',margin:20,fontSize:'35px',letterSpacing:'3px'}}>99</h1>
            </div>
               
          </div>

<br />
<div className="chart" style={{width:'97%',borderRadius:"30px",border: " 1px solid rgb(228, 228, 228)",boxShadow:'2px 2px 2px 2px rgb(228, 228, 228) ',margin:"auto"}}>
<div className="ht-btn" style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>
  <div className="points" style={{marginTop:"20px"}} >
  <p style={{  fontWeight: 'bold' ,margin:'0px',fontSize:'12px'}}>Sales Graph</p>
                 <p style={{fontSize:'8px',color:'grey'}}>Lorem ipsum dolor consectetur</p>
  </div>
  <button className='save'style={{backgroundColor:'#FFE5E5',color:'#E93428',marginTop:'20px',width:'25%',height:'30px',fontSize:'10px'}}> March, 2023 </button>
</div>

 <img style={{width:'90%', height:"100px",display:'flex',justifyContent:'center',margin:'auto'}} src={chrtt} alt=" xhart" />
 <br />
</div>
<br />



<div className="Counter" style={{width: '100%', display: 'flex', justifyContent: 'center',margin: 'auto'}}>
  <div className="Upwork" style={{ display: 'flex', alignItems: 'center',  border: '1px solid rgb(228, 228, 228)', borderRadius: '20px',  width: '97%', margin:'2px auto',maxWidth: '430px',  padding: '1rem',  boxSizing: 'border-box',  flexWrap: 'wrap',boxShadow:'1px 1px 1px 1px rgb(228, 228, 228)'}}>
    <img onClick={counter} style={{ width: '18%', height: 'auto',  marginRight: '1rem'}} src={upwork} alt="Upwork logo" />
    
    <div className="points" style={{  flex: '1', marginRight: '1rem' }}>
      <p style={{fontWeight: 'bold', margin: '0', fontSize: '1rem', }}>Upwork</p>
      <p style={{ fontSize: '0.75rem' }}>1 times user click on Upwork</p>
    </div>
    
    <h3 style={{ margin: '0',  fontSize: '1.5rem', }}>1</h3>
  </div>
</div>

<br />

<div className="Counter" style={{width: '100%', display: 'flex', justifyContent: 'center',margin: 'auto'}}>
  <div className="Upwork" style={{ display: 'flex', alignItems: 'center',  border: '1px solid rgb(228, 228, 228)', borderRadius: '20px',  width: '97%', margin:'2px auto',maxWidth: '430px',  padding: '1rem',  boxSizing: 'border-box',  flexWrap: 'wrap',boxShadow:'1px 1px 1px 1px rgb(228, 228, 228)'}}>
    <img style={{ width: '18%', height: 'auto',  marginRight: '1rem'}} src={linee} alt="Upwork logo" />
    
    <div className="points" style={{  flex: '1', marginRight: '1rem' }}>
      <p style={{fontWeight: 'bold', margin: '0', fontSize: '1rem', }}>Upwork</p>
      <p style={{ fontSize: '0.75rem' }}>1 times user click on Line</p>
    </div>
    
    <h3 style={{ margin: '0',  fontSize: '1.5rem', }}>1</h3>
  </div>
</div>

<br />

<div className="Counter" style={{width: '100%', display: 'flex', justifyContent: 'center',margin: 'auto'}}>
  <div className="Upwork" style={{ display: 'flex', alignItems: 'center',  border: '1px solid rgb(228, 228, 228)', borderRadius: '20px',  width: '97%', margin:'2px auto',maxWidth: '430px',  padding: '1rem',  boxSizing: 'border-box',  flexWrap: 'wrap',boxShadow:'1px 1px 1px 1px rgb(228, 228, 228)'}}>
    <img style={{ width: '18%', height: 'auto',  marginRight: '1rem'}} src={scype} alt="Upwork logo" />
    
    <div className="points" style={{  flex: '1', marginRight: '1rem' }}>
      <p style={{fontWeight: 'bold', margin: '0', fontSize: '1rem', }}>Upwork</p>
      <p style={{ fontSize: '0.75rem' }}>1 times user click on skype</p>
    </div>
    
    <h3 style={{ margin: '0',  fontSize: '1.5rem', }}>1</h3>
  </div>
</div>

<br />

<div className="Counter" style={{width: '100%', display: 'flex', justifyContent: 'center',margin: 'auto'}}>
  <div className="Upwork" style={{ display: 'flex', alignItems: 'center',  border: '1px solid rgb(228, 228, 228)', borderRadius: '20px',  width: '97%', margin:'2px auto',maxWidth: '430px',  padding: '1rem',  boxSizing: 'border-box',  flexWrap: 'wrap',boxShadow:'1px 1px 1px 1px rgb(228, 228, 228)'}}>
    <img style={{ width: '18%', height: 'auto',  marginRight: '1rem'}} src={paypal} alt="Upwork logo" />
    
    <div className="points" style={{  flex: '1', marginRight: '1rem' }}>
      <p style={{fontWeight: 'bold', margin: '0', fontSize: '1rem', }}>Upwork</p>
      <p style={{ fontSize: '0.75rem' }}>1 times user click on paypal</p>
    </div>
    
    <h3 style={{ margin: '0',  fontSize: '1.5rem', }}>1</h3>
  </div>
</div>



        </div>
        <br /><br /><br /><br /><br /><br />
        <Footer/>
    </div>
  )
}

export default Analytics