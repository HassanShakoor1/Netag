import "./manageorder.css"
import vector from "../images/Vector.svg";
import { useState } from "react"
import plate from "../images/plate.png"
import sky from "../images/sky.png"
import tree from "../images/tree.png"
import { useNavigate } from "react-router-dom"
function Manageorder3() {
    const [activeTab, setactiveTab] = useState("new order")
    const navigate = useNavigate();

    const goback = () => {
        navigate(-1);
    }

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
                        {/* <div style={{ display: "flex", justifyContent: "space-between", width: "67%" }}>
                            <div>
                                <img style={{cursor:"pointer"}} onClick={goback} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontWeight: "500" }}>
                                Manage Orders
                            </div>
                        </div> */}

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                                <img style={{ cursor: "pointer" }} onClick={goback} src={vector} alt="" />
                            </div>
                            <div style={{ color: "#EE0000", fontWeight: "500" }}>
                                Manage Orders
                            </div>
                            <div></div>
                        </div>

                        {/* new order  */}
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', cursor: "pointer" }}>
                            <div style={{ width: '60%', backgroundColor: '#FFE5E5', borderRadius: '48px', display: 'flex', justifyContent: 'space-between', height: '6vh' }}>
                                <div
                                    style={{
                                        ...inactiveStyle,
                                        ...(activeTab == "new order" ? activeStyle : {}),
                                        borderRadius: '48px',
                                        fontSize: '12px',
                                        width: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '100%',
                                        alignItems: 'center'
                                    }}
                                    onClick={() => setactiveTab("new order")}
                                >
                                    New Orders
                                </div>
                                <div
                                    style={{
                                        ...inactiveStyle,
                                        ...(activeTab == "OrdersHistory" ? activeStyle : {}),
                                        borderRadius: '48px',
                                        fontSize: '12px',
                                        width: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '100%',
                                        alignItems: 'center'
                                    }}
                                    onClick={() => setactiveTab("OrdersHistory")}
                                >
                                    Orders History
                                </div>
                            </div>
                        </div>
                        {/* box */}
                        <div className="box1-width">

                            <div style={{ backgroundColor: "#019021", position: "absolute", right: "36%", top: "-12px", width: "30%", display: "flex", justifyContent: "center", borderRadius: "6px", padding: "4px" }}>
                                <span style={{ color: "white", fontSize: "12px" }}>Successful</span>
                            </div>

                            <div className="box1-width1">
                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    {/* image  */}
                                    <div style={{ width: "30%" }}>
                                        <img style={{ width: "100%", height: "100%" }} src={plate} alt="" />
                                    </div>
                                    {/* lorem  */}
                                    <div style={{ width: "67%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '90%' }}>
                                            <div style={{ color: "#EE0000", fontSize: "15px" }}>Food</div>
                                            <div style={{ fontSize: "10px" }}>12:34PM - 12/02/2024</div>
                                        </div>
                                        <div style={{ color: "#545454", fontSize: "10px", fontWeight: "bold" }}>$59.99</div>
                                        {/* lorem  */}
                                        <div>
                                            <p style={{ fontSize: "10px", color: "#777777" }}>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* cancelled */}
                        <div style={{ marginTop: "1.5rem" }} className="box1-width">

                            <div style={{ backgroundColor: "#EE0000", position: "absolute", right: "36%", top: "-12px", width: "30%", display: "flex", justifyContent: "center", borderRadius: "6px", padding: "4px" }}>
                                <span style={{ color: "white", fontSize: "12px" }}>Cancelled</span>
                            </div>

                            <div style={{ backgroundColor: "#FFEAEA", border: "1px solid #EE0000" }} className="box1-width1">
                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    {/* image  */}
                                    <div style={{ width: "30%" }}>
                                        <img style={{ width: "100%", height: "100%" }} src={sky} alt="" />
                                    </div>
                                    {/* lorem  */}
                                    <div style={{ width: "67%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '90%' }}>
                                            <div style={{ color: "#EE0000", fontSize: "15px" }}>Food</div>
                                            <div style={{ fontSize: "10px" }}>12:34PM - 12/02/2024</div>
                                        </div>
                                        <div style={{ color: "#545454", fontSize: "10px", fontWeight: "bold" }}>$59.99</div>
                                        {/* lorem  */}
                                        <div>
                                            <p style={{ fontSize: "10px", color: "#777777" }}>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* box3 */}
                        <div style={{ marginTop: "1.5rem" }} className="box1-width">

                            <div style={{ backgroundColor: "#019021", position: "absolute", right: "36%", top: "-12px", width: "30%", display: "flex", justifyContent: "center", borderRadius: "6px", padding: "4px" }}>
                                <span style={{ color: "white", fontSize: "12px" }}>Successful</span>
                            </div>

                            <div className="box1-width1">
                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    {/* image  */}
                                    <div style={{ width: "30%" }}>
                                        <img style={{ width: "100%", height: "100%" }} src={tree} alt="" />
                                    </div>
                                    {/* lorem  */}
                                    <div style={{ width: "67%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '90%' }}>
                                            <div style={{ color: "#EE0000", fontSize: "15px" }}>Food</div>
                                            <div style={{ fontSize: "10px" }}>12:34PM - 12/02/2024</div>
                                        </div>
                                        <div style={{ color: "#545454", fontSize: "10px", fontWeight: "bold" }}>$59.99</div>
                                        {/* lorem  */}
                                        <div>
                                            <p style={{ fontSize: "10px", color: "#777777" }}>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* box4 */}
                        <div style={{ marginTop: "1.5rem" }} className="box1-width">

                            <div style={{ backgroundColor: "#019021", position: "absolute", right: "36%", top: "-12px", width: "30%", display: "flex", justifyContent: "center", borderRadius: "6px", padding: "4px" }}>
                                <span style={{ color: "white", fontSize: "12px" }}>Successful</span>
                            </div>

                            <div className="box1-width1">
                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    {/* image  */}
                                    <div style={{ width: "30%" }}>
                                        <img style={{ width: "100%", height: "100%" }} src={plate} alt="" />
                                    </div>
                                    {/* lorem  */}
                                    <div style={{ width: "67%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '90%' }}>
                                            <div style={{ color: "#EE0000", fontSize: "15px" }}>Food</div>
                                            <div style={{ fontSize: "10px" }}>12:34PM - 12/02/2024</div>
                                        </div>
                                        <div style={{ color: "#545454", fontSize: "10px", fontWeight: "bold" }}>$59.99</div>
                                        {/* lorem  */}
                                        <div>
                                            <p style={{ fontSize: "10px", color: "#777777" }}>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* box5 */}
                        <div style={{ marginTop: "1.5rem" }} className="box1-width">

                            <div style={{ backgroundColor: "#EE0000", position: "absolute", right: "36%", top: "-12px", width: "30%", display: "flex", justifyContent: "center", borderRadius: "6px", padding: "4px" }}>
                                <span style={{ color: "white", fontSize: "12px" }}>Cancelled</span>
                            </div>

                            <div style={{ backgroundColor: "#FFEAEA", border: "1px solid #EE0000" }} className="box1-width1">
                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    {/* image  */}
                                    <div style={{ width: "30%" }}>
                                        <img style={{ width: "100%", height: "100%" }} src={sky} alt="" />
                                    </div>
                                    {/* lorem  */}
                                    <div style={{ width: "67%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '90%' }}>
                                            <div style={{ color: "#EE0000", fontSize: "15px" }}>Food</div>
                                            <div style={{ fontSize: "10px" }}>12:34PM - 12/02/2024</div>
                                        </div>
                                        <div style={{ color: "#545454", fontSize: "10px", fontWeight: "bold" }}>$59.99</div>
                                        {/* lorem  */}
                                        <div>
                                            <p style={{ fontSize: "10px", color: "#777777" }}>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            </p>
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
export default Manageorder3