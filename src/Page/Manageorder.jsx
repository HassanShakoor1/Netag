import "./manageorder.css"
import vector from "../images/vector.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
function Manageorder() {
    const navigate = useNavigate();

    const goback=()=>{
      navigate(-1);
    }
    const handleSingleview=()=>{
        navigate('/home/order/singleorder');
      }
    const handleorder3=()=>{
        navigate('/home/order/order3');
      }
    const [activeTab, setActiveTab] = useState('newOrders'); // State to track the active tab

    // Define styles for active and inactive tabs
    const activeStyle = {
        backgroundColor: '#EE0000',
        color: '#FFFFFF',
        fontWeight: 'bold'
    };

    const inactiveStyle = {
        backgroundColor: '#FFE5E5',
        color: '#EE0000',
        fontWeight: 'normal'
    };

    return (
        <div className="Manageorder-main">
            <div className="Manageorder-width">
                <div className="Manageorder-center">
                    <div className="Manageorder-width1">

                        {/* top manage order */}
                        <div style={{ display: "flex", justifyContent: "space-between", width: "67%" }}>
                            <div>
                                <img onClick={goback} style={{cursor:"pointer"}} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontWeight: "500" }}>
                                Manage Orders
                            </div>
                        </div>

                        {/* new order  */}
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center',cursor:"pointer" }}>
                            <div style={{ width: '60%', backgroundColor: '#FFE5E5', borderRadius: '48px', display: 'flex', justifyContent: 'space-between', height: '6vh' }}>
                                <div
                                    style={{
                                        ...inactiveStyle,
                                        ...(activeTab === 'newOrders' ? activeStyle : {}),
                                        borderRadius: '48px',
                                        fontSize: '12px',
                                        width: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '100%',
                                        alignItems: 'center'
                                    }}
                                    onClick={() => setActiveTab('newOrders')}
                                >
                                    New Orders
                                </div>
                                <div 
    style={{
        ...inactiveStyle,
        ...(activeTab === 'ordersHistory' ? activeStyle : {}),
        borderRadius: '48px',
        fontSize: '12px',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center'
    }}
    onClick={() => {
        setActiveTab('ordersHistory');
        handleorder3();
    }}
>
    Orders History
</div>

                            </div>
                        </div>

                        {/* <div style={{marginTop:"2rem",display:"flex",justifyContent:"center",cursor:"pointer"}}>
                            <div style={{width:"60%",backgroundColor:"#FFE5E5",borderRadius:"48px",display:"flex",justifyContent:"space-between",height:"6vh"}}>
                            <div style={{backgroundColor:"#EE0000",borderRadius:"48px",fontWeight:"bold",fontSize:"12px",color:color,width:"50%",display:"flex",justifyContent:"center",height:"100%",alignItems:"center"}}>New Orders</div>
                            <div style={{fontSize:"12px",color:"#EE0000",fontWeight:"bold",width:"50%",display:"flex",justifyContent:"center",height:"100%",alignItems:"center"}}>Orders History</div>
                            </div>
                        </div> */}

                        {/*1 view order  */}
                        <div className="vieworder-width">
                            <div className="ist-div">
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ color: "#EE0000", fontWeight: "500" }}>Robin Denio</div>
                                        <div style={{ fontSize: "12px", fontWeight: "500" }}>12:34PM - 12/02/2024</div>

                                    </div>
                                    <div style={{ fontWeight: "500", color: "#545454" }}>
                                        $59.99
                                    </div>

                                    <div style={{ fontSize: "10px", color: "#777777", marginTop: "10px" }}>
                                        Lorem ipsum dolor sit amet  elit. Hic dolor maxime omnis, quasi non magni ipsum deleniti, eos repellendus, magnam eligendi quis cumque officia quo rem accusamus quam nam accusantium!
                                    </div>

                                    {/* button  */}
                                    <div style={{ width: "100%", backgroundColor: "#EE0000", borderRadius: "12px", marginTop: "2rem", height: "6vh" }}>
                                        <div onClick={handleSingleview} style={{ fontSize: "13px", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", color: "#FFFFFF" }}>
                                            View Order
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* 2 view order */}
                        <div style={{ marginTop: "1rem" }} className="vieworder-width">
                            <div className="ist-div">
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ color: "#EE0000", fontWeight: "500" }}>Robin Denio</div>
                                        <div style={{ fontSize: "12px", fontWeight: "500" }}>12:34PM - 12/02/2024</div>

                                    </div>
                                    <div style={{ fontWeight: "500", color: "#545454" }}>
                                        $59.99
                                    </div>

                                    <div style={{ fontSize: "10px", color: "#777777", marginTop: "10px" }}>
                                        Lorem ipsum dolor sit amet  elit. Hic dolor maxime omnis, quasi non magni ipsum deleniti, eos repellendus, magnam eligendi quis cumque officia quo rem accusamus quam nam accusantium!
                                    </div>

                                    {/* button  */}
                                    <div style={{ width: "100%", backgroundColor: "#EE0000", borderRadius: "12px", marginTop: "2rem", height: "6vh" }}>
                                        <div style={{ fontSize: "13px", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", color: "#FFFFFF" }}>
                                            View Order
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* 3 view order */}
                        <div style={{ marginTop: "1rem" }} className="vieworder-width">
                            <div className="ist-div">
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ color: "#EE0000", fontWeight: "500" }}>Robin Denio</div>
                                        <div style={{ fontSize: "12px", fontWeight: "500" }}>12:34PM - 12/02/2024</div>

                                    </div>
                                    <div style={{ fontWeight: "500", color: "#545454" }}>
                                        $59.99
                                    </div>

                                    <div style={{ fontSize: "10px", color: "#777777", marginTop: "10px" }}>
                                        Lorem ipsum dolor sit amet  elit. Hic dolor maxime omnis, quasi non magni ipsum deleniti, eos repellendus, magnam eligendi quis cumque officia quo rem accusamus quam nam accusantium!
                                    </div>

                                    {/* button  */}
                                    <div style={{ width: "100%", backgroundColor: "#EE0000", borderRadius: "12px", marginTop: "2rem", height: "6vh" }}>
                                        <div style={{ fontSize: "13px", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", color: "#FFFFFF" }}>
                                            View Order
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* 4 view order */}
                        <div style={{ marginTop: "1rem" }} className="vieworder-width">
                            <div className="ist-div">
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ color: "#EE0000", fontWeight: "500" }}>Robin Denio</div>
                                        <div style={{ fontSize: "12px", fontWeight: "500" }}>12:34PM - 12/02/2024</div>

                                    </div>
                                    <div style={{ fontWeight: "500", color: "#545454" }}>
                                        $59.99
                                    </div>

                                    <div style={{ fontSize: "10px", color: "#777777", marginTop: "10px" }}>
                                        Lorem ipsum dolor sit amet  elit. Hic dolor maxime omnis, quasi non magni ipsum deleniti, eos repellendus, magnam eligendi quis cumque officia quo rem accusamus quam nam accusantium!
                                    </div>

                                    {/* button  */}
                                    <div style={{ width: "100%", backgroundColor: "#EE0000", borderRadius: "12px", marginTop: "2rem", height: "6vh" }}>
                                        <div style={{ fontSize: "13px", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", color: "#FFFFFF" }}>
                                            View Order
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>




                    </div>

                </div>
            </div>

        </div>
    )
}
export default Manageorder