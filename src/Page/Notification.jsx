import "./notification.css"
import vector from "../images/vector.png"
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { database } from '../firebase';  // Ensure correct path
import { Query, orderBy } from "firebase/firestore";
function Notification(){
    const navigate = useNavigate();

const [data,setData]=useState([])
const userId=localStorage.getItem('userId')
useEffect(() => {

    const getData= async()=>{
        try{
        const dataRef= query(
            ref(database,`Notifications`),
            orderByChild('parentid'),
            equalTo(userId)
        )
        const snap=await get(dataRef)
        const data=await snap.val()
        console.log(data)
        
        const filterData=Object.keys(data).map(key=>({
            id:key,
            ...data[key]
        }))
        console.log(filterData)
        setData(filterData)
      
  
    }catch(errer){
        console.log(errer)
    }
   
    }
    
getData();

}, [])




    const goback=()=>{
      navigate(-1);
    }
    return(
        <div className="notification-maibdiv">
            <div className="notification-width">
                <div className="notification-centerdiv">
                    <div className="secondwidth">
                        
                        {/* notification */}

                        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",width:"65%"}}>
                            <div>
                                <img onClick={goback}src={vector} alt="" style={{cursor:'pointer'}} />
                            </div>
                            <div style={{color:"#EE0000",fontWeight:"500"}}>
                            Notifications
                            </div>
                        </div>

                        {/* All Notifications */}


                        <div style={{display:"flex",padding:"16px",marginTop:"2rem",fontSize:"14px",fontWeight:"500"}}>
                        All Notifications
                        </div>

                        {/* box1 */}

                        {data && data.length > 0 && data.map((item) => (
    <div key={item.id} className="notification-boxwidth">
        <div style={{color:"#EE0000",fontWeight:"500"}}>
            {item.title}
        </div>
        <div style={{fontSize:"13px",fontWeight:"500"}}>
           {item.createdat}
        </div>
        <div style={{color:"#777777",fontSize:"12px",width:"90%"}}>
{item.body}
        </div>
    </div>
))}
 

                    </div>

                </div>

            </div>
            
        </div>
    )
}
export default Notification