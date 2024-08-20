import "./managescreen.css"
import vector from "../images/vector.png"
import { useNavigate } from "react-router-dom";
function Managescreen(){
   const navigate = useNavigate();

   const goback=()=>{
     navigate(-1);
   }

    return(
      <div className="managescreen-main">
        <div className="managescreen-width">
            <div className="managescreen-divcenter">
                <div className="managescreen-divwidth">
                   
                   {/* top */}
                   <div style={{display:"flex",justifyContent:"space-between",width:"59%",marginLeft:"10px"}}>
                    <div>
                         <img style={{cursor:'pointer'}} onClick={goback} src={vector} alt="" />
                    </div>
                    <div style={{color:"#EE0000",fontWeight:"450"}}>
                    Single Order
                    </div>
                   </div>
                   {/* box */}
                   <div style={{marginTop:"3rem"}} className="managescreen-boxwidth">
                     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{color:"#EE0000",fontWeight:"500",fontSize:"18px"}}>Robin Denio</div>
                        <div style={{fontSize:"11px",fontWeight:"500"}}>12:34PM - 12/02/2024</div>
                     </div>
                     {/* dollar */}
                     <div style={{color:"#545454",fontWeight:"500"}}>
                     $59.99
                     </div>
                     {/* email */}
                     <div style={{marginTop:"1.3rem",display:"flex",justifyContent:"space-between",width:"97%"}}>
                        <div>
                            <div style={{color:"#555555",fontSize:"12px"}}>Email address</div>
                            <div style={{color:"#545454",fontSize:"14px",fontWeight:"500"}}>robindenio@gmail.com</div>
                        </div>
                        <div>
                            <div style={{color:"#555555",fontSize:"12px"}}>Phone number</div>
                            <div style={{color:"#545454",fontWeight:"500",fontSize:"14px"}}>+92 300 0120211</div>
                        </div>
                     </div>
                     {/* address  */}
                     <div style={{marginTop:"1.3rem"}}>
                        <div style={{color:"#555555",fontSize:"12px"}}>Address</div>
                        <div style={{color:"#545454",fontSize:"14px",fontWeight:"500"}}>St nagaraka, juwain sendor 123, El Salvadar</div>
                     </div>
                     {/* detail  */}

                     <div style={{marginTop:"1.3rem",width:"95%"}}>
                        <div style={{color:"#555555",fontSize:"12px"}}>Details</div>
                        <div style={{color:"#545454",fontSize:"14px",fontWeight:"500"}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laudantium temporibus, laborum optio recusandae ad aut quia asperiores repudiandae rem.
                        </div>
                     </div>

                     {/* line */}

                     <div style={{marginTop:"2rem",width:"100%",marginBottom:"2rem"}}>
                        <div className="managescreen-line"></div>
                     </div>

                     {/* hair oil */}
                     <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <div style={{color:"#7B7B7B",display:"flex",alignItems:"center"}}>Hair Oil <span style={{fontSize:"9px",fontWeight:"500",marginLeft:"5px",color:"#393838"}}>(1x)</span></div>
                            <div style={{color:"#7B7B7B",display:"flex",alignItems:"center"}}>Croate Oil <span style={{fontSize:"9px",fontWeight:"500",marginLeft:"5px",color:"#393838"}}>(2x)</span></div>
                            <div style={{color:"#7B7B7B",display:"flex",alignItems:"center"}}>Hair Care<span style={{fontSize:"9px",fontWeight:"500",marginLeft:"5px",color:"#393838"}}>(2x)</span></div>
                            <div style={{color:"#7B7B7B",display:"flex",alignItems:"center"}}>Arm Oil<span style={{fontSize:"9px",fontWeight:"500",marginLeft:"5px",color:"#393838"}}>(2x)</span></div>
                            <div style={{color:"#7B7B7B",display:"flex",alignItems:"center"}}>Tax<span style={{fontSize:"9px",fontWeight:"500",marginLeft:"5px",color:"#393838"}}>(2x)</span></div>
                           
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"end"}}>
                            <div style={{color:"#545454",fontSize:"16px",fontWeight:"450"}}>$59.99</div>
                            <div style={{color:"#545454",fontWeight:"450"}}>$529.99</div>
                            <div style={{color:"#545454",fontWeight:"450"}}>$22.99</div>
                            <div style={{color:"#545454",fontWeight:"450"}}>$29.99</div>
                            <div style={{color:"#545454",fontWeight:"450"}}>$2.00</div>
                        </div>
                        
                     </div>
                     {/* line  */}
                     <div style={{marginTop:"1rem",width:"100%",marginBottom:"12px"}}>
                        <div className="managescreen-line"></div>
                     </div>
                     {/* sub total */}
                     <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div style={{color:"#7B7B7B",fontWeight:"bold"}}>Sub Total</div>
                        <div style={{color:"#545454",fontWeight:"bold"}}>$644.99</div>
                     </div>
                     {/* button  */}
                     <div style={{marginTop:"1rem",display:"flex",justifyContent:"space-between"}}>
                        <button style={{borderRadius:"6px",fontSize:"11px",fontWeight:"500",color:"white",width:"48%",height:"5vh",backgroundColor:"#EE0000",display:"flex",justifyContent:"center",alignItems:"center",padding:"14px"}}>Reject Offer</button>
                        <button style={{borderRadius:"6px",fontSize:"11px",fontWeight:"500",color:"white",width:"48%",height:"5vh",backgroundColor:"#169923",display:"flex",justifyContent:"center",alignItems:"center",padding:"14px"}}>Accept Offer</button>
                     </div>


                   </div>
                </div>

            </div>

        </div>

      </div>
    )
}
export default Managescreen