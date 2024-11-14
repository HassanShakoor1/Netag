import React, { useEffect, useState } from "react";
import "./managescreen.css";
import vector from "../images/Vector.svg";
import { useNavigate, useParams } from "react-router-dom";
import { database as db } from "../firebase.jsx";
import { useTranslation } from "react-i18next";

import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";

function Managescreen2() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const userId = localStorage.getItem("userId");
  const [orderDetails, setOrderDetails] = useState(null);
  console.log("order", orderDetails); // Log the order details to check the structure
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

        // Find the specific order details based on orderId
        const order = arr.find((order) => order.id === orderId);
        setOrderDetails(order || {}); // Set order details or an empty object if not found
      } else {
        console.log("No orders found for this user.");
        setOrderDetails({}); // Set to an empty object if no orders found
      }
    } catch (error) {
      alert("Orders not fetched");
      console.error("Error fetching order details:", error);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      const orderRef = ref(db, `/Orders/${orderId}`);
      await update(orderRef, { orderstatus: status });
      alert(
        `Order has been ${status === "accepted" ? "accepted" : "rejected"}.`
      );
      // You can navigate back or to another page here if needed
      navigate("/home/order"); // Adjust the navigation as needed
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  useEffect(() => {
    orderData();
  }, [userId, orderId]); // Dependencies: userId and orderId

  const goback = () => {
    navigate(-1);
  };

  // If orderDetails is null or empty, show loading or message
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="managescreen-main">
      <div className="managescreen-width">
        <div className="managescreen-divcenter">
          <div className="managescreen-divwidth">
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
                  onClick={goback}
                  src={vector}
                  alt="Go Back"
                />
              </div>
              <div style={{ color: "#EE0000", fontWeight: "500" }}>
                {t("Manage Orders")}
              </div>
              <div></div>
            </div>

            {/* Order Details */}
            <div
              style={{ marginTop: "3rem" }}
              className="managescreen-boxwidth"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#EE0000",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {orderDetails?.name || "Customer Name"}
                </div>
                <div style={{ fontSize: "11px", fontWeight: "500" }}>
                  {orderDetails?.time || "Order Date"}
                </div>
              </div>
              <div style={{ color: "#545454", fontWeight: "500" }}>
                ${orderDetails?.price || "0.00"}
              </div>

              {/* Email and Phone */}
              <div
                style={{
                  marginTop: "1.3rem",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "97%",
                }}
              >
                <div>
                  <div style={{ color: "#555555", fontSize: "12px" }}>
                    Email address
                  </div>
                  <div
                    style={{
                      color: "#545454",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {orderDetails?.email}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#555555", fontSize: "12px" }}>
                    Phone number
                  </div>
                  <div
                    style={{
                      color: "#545454",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {orderDetails?.phonenumber}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div style={{ marginTop: "1.3rem" }}>
                <div style={{ color: "#555555", fontSize: "12px" }}>
                  Address
                </div>
                <div
                  style={{
                    color: "#545454",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {orderDetails?.address}
                </div>
              </div>

              {/* Order Description */}
              <div style={{ marginTop: "1.3rem", width: "95%" }}>
                <div style={{ color: "#555555", fontSize: "12px" }}>
                  Details
                </div>
                <div
                  style={{
                    color: "#545454",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {orderDetails?.description}
                </div>
              </div>

              {/* Items and Prices */}
              <div style={{ marginTop: "1.3rem" }}>
                <div style={{ color: "#555555", fontSize: "12px" }}>Items</div>
                {orderDetails?.list && orderDetails.list.length > 0 ? (
                  orderDetails.list.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          color: "#7B7B7B",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item.productname || "Product Name"}{" "}
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: "500",
                            marginLeft: "5px",
                            color: "#393838",
                          }}
                        >
                          ({item.quantity || 0}x)
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                        }}
                      >
                        <div style={{ color: "#545454", fontWeight: "450" }}>
                          {item.price || "0.00"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No items in this order.</div>
                )}
              </div>

              {/* Sub Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <div style={{ color: "#7B7B7B", fontWeight: "bold" }}>
                  Sub Total
                </div>
                <div style={{ color: "#545454", fontWeight: "bold" }}>
                  ${orderDetails?.subtotoal || "0.00"}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={() => updateOrderStatus("rejected")}
                  style={{
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "white",
                    width: "48%",
                    height: "5vh",
                    backgroundColor: "#EE0000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "14px",
                  }}
                >
                 {t("Reject Offer")}
                </button>
                <button
                  onClick={() => updateOrderStatus("accepted")}
                  style={{
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "white",
                    width: "48%",
                    height: "5vh",
                    backgroundColor: "#169923",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "14px",
                  }}
                >
                  {t("Accept Offer")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Managescreen2;
