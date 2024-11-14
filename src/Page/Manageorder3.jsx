import "./manageorder.css";
import vector from "../images/Vector.svg";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database as db } from "../firebase.jsx";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { useTranslation } from "react-i18next";

function Manageorder3() {
  const userId = localStorage.getItem("userId");
  const orderId = useParams();
  const [activeTab, setActiveTab] = useState("OrdersHistory");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation(); // useTranslation inside the function
  
  const orderData = async () => {
    try {
      const orderRef = ref(db, "/Orders");
      const queryData = query(orderRef, orderByChild("uid"), equalTo(userId));
      const snapShot = await get(queryData);
      const data = snapShot.val();

      if (data) {
        const arr = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setOrders(arr);
      } else {
        setOrders([]);
      }
    } catch (error) {
      alert("Orders not fetched");
      console.log("error: " + error);
    }
  };

  useEffect(() => {
    orderData();
  }, [userId, orderId]);

  const goBack = () => {
    navigate(-1);
  };

  const activeStyle = {
    backgroundColor: "#EE0000",
    color: "#FFFFFF",
    fontWeight: "bold",
  };

  const inactiveStyle = {
    backgroundColor: "#FFE5E5",
    color: "#EE0000",
    fontWeight: "normal",
  };

  // Filter orders based on their status
  const acceptedOrders = orders.filter(
    (order) => order.orderstatus === "accepted"
  );
  const cancelledOrders = orders.filter(
    (order) => order.orderstatus === "rejected"
  );

  return (
    <div className="Manageorder-main">
      <div className="Manageorder-width">
        <div className="Manageorder-center">
          <div className="Manageorder-width1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={goBack}
                  src={vector}
                  alt=""
                />
              </div>
              <div style={{ color: "#EE0000", fontWeight: "500" }}>
               {t("Manage Orders")}
              </div>
              <div></div>
            </div>

            {/* New order and Orders History tabs */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "60%",
                  backgroundColor: "#FFE5E5",
                  borderRadius: "48px",
                  display: "flex",
                  justifyContent: "space-between",
                  height: "6vh",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    ...inactiveStyle,
                    ...(activeTab === "new order" ? activeStyle : {}),
                    borderRadius: "48px",
                    fontSize: "12px",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setActiveTab("new order");
                    navigate(-1);
                  }}
                >
                  {t("New Orders")}
                </div>
                <div
                  style={{
                    ...inactiveStyle,
                    ...(activeTab === "OrdersHistory" ? activeStyle : {}),
                    borderRadius: "48px",
                    fontSize: "12px",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  onClick={() => setActiveTab("OrdersHistory")}
                >
                  {t("Orders History")}
                </div>
              </div>
            </div>

            {/* Accepted Orders */}
            {acceptedOrders.length > 0 &&
              acceptedOrders.map((order) => (
                <div
                  key={order.id}
                  className="box1-width1"
                  style={{ marginTop: "2rem", position: "relative" }}
                >
                  <div
                    style={{
                      backgroundColor: "#019021",
                      position: "absolute",
                      right: "36%",
                      top: "-12px",
                      width: "30%",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "6px",
                      padding: "4px",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "12px" }}>
                      {t("Successful")}
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    {/* Image */}
                    <div style={{ width: "30%" }}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={order.image}
                        alt=""
                      />
                    </div>
                    {/* Order details */}
                    <div style={{ width: "67%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90%",
                        }}
                      >
                        <div style={{ color: "#EE0000", fontSize: "15px" }}>
                          {order.name}
                        </div>
                        <div style={{ fontSize: "10px" }}>{order.time}</div>
                      </div>
                      <div
                        style={{
                          color: "#545454",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {order.price}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#777777",
                            width: "90%",
                          }}
                        >
                          {order.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Cancelled Orders */}
            {cancelledOrders.length > 0 && (
              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
                className="box1-width"
              >
                {cancelledOrders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: "#FFEAEA",
                      border: "1px solid #EE0000",
                      position: "relative", // Set position relative for the label
                    }}
                    className="box1-width1"
                  >
                    <div
                      style={{
                        backgroundColor: "#EE0000",
                        position: "absolute",
                        right: "36%",
                        top: "-12px",
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "6px",
                        padding: "4px",
                      }}
                    >
                      <span style={{ color: "white", fontSize: "12px" }}>
                       {t("Cancelled")}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                    >
                      {/* Image */}
                      <div style={{ width: "30%" }}>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={order.image}
                          alt=""
                        />
                      </div>
                      {/* Order details */}
                      <div style={{ width: "67%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                          }}
                        >
                          <div style={{ color: "#EE0000", fontSize: "15px" }}>
                            {order.name}
                          </div>
                          <div style={{ fontSize: "10px" }}>{order.time}</div>
                        </div>
                        <div
                          style={{
                            color: "#545454",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {order.price}
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#777777",
                              width: "90%",
                            }}
                          >
                            {order.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manageorder3;
