import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import netag from '../images/netag.png';
const Front = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Set the background color for the page content only (not system UI)
    document.body.style.backgroundColor = "rgb(243, 41, 0)";
    document.body.style.margin = "0"; // Remove margin
    document.body.style.padding = "0"; // Remove padding

    // For iOS status bar color (ensure the meta tag is set in HTML as mentioned)
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      // iOS devices: set the background color for status bar
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(243, 41, 0)");
    }

    // Redirect to the welcome page after 2 seconds (2000ms)
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);

    // Cleanup function to reset the background color, margin, and padding after the timer
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color to default
      document.body.style.margin = ""; // Reset margin to default
      document.body.style.padding = ""; // Reset padding to default
      clearTimeout(timer);
    };
  }, [navigate]);



  return (
    <div style={{width:'100%',display:"flex",justifyContent:'center',margin:'0',padding:'0',boxSizing:'border-box'}}>
      <div style={{maxWidth:"430px",display:"flex",justifyContent:'center',alignItems:"center",width:'100%',backgroundColor:"rgb(243, 41, 0)",height:'100vh'}}>
        <img src={netag} alt='logo' width="233px" height="200px" />
      </div>
    </div>
  );
};
export default Front;