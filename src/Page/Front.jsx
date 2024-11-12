import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import netag from '../images/netag.png';
const Front = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to the welcome page after 5 seconds (5000ms)
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div style={{width:'100%',display:"flex",justifyContent:'center',margin:'0px',padding:'0px'}}>
      <div style={{display:"flex",justifyContent:'center',alignItems:"center",width:'100%',backgroundColor:"rgb(243, 41, 0)",height:'100vh'}}>
        <img src={netag} alt='logo' width="233px" height="200px" />
      </div>
    </div>
  );
};
export default Front;