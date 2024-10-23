import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import pop from "../images/pops.png";
import Order from "../images/order.png";
import connect from "../images/connection.png";
import links from "../images/linkclicl.png";
import chrtt from "../images/chrt.png";
import { ref, get } from "firebase/database";
import { database } from "../firebase.jsx";
import upwork from "../images/up.png";
import linee from "../images/linee.png";
import skype from "../images/scype.png";
import paypal from "../images/paypal.png";
import whatsapp from "../images/whatsapp.png";
import call from "../images/call.png";
import facebook from "../images/facebook.png";
import mail from "../images/mail.png";
import website from "../images/website.png";
import snapchat from "../images/snapchat.png";
import tiktok from "../images/tiktok.png";
import youtube from "../images/youtube.png";
import vimeo from "../images/vimeo.png";
import twitter from "../images/twitter.png";
import raddit from "../images/radit.png";
import pinterest from "../images/pintrest.png";
import custom from "../images/custom.png";
import spotify from "../images/spotify.png";
import instagram from "../images/instagram.png";
import tick from "../images/tick.png";

import telegram from "../images/telegram.png";
import linkedin from "../images/linkedin.png";
import "./Analytics.css";

import { LineChart } from "@mui/x-charts/LineChart";

function Analytics() {
  const userId = localStorage.getItem("userId");
  const [count, setCount] = useState(0);

  const [link, setLinks] = useState([]);

  const counter = () => {
    setCount(count + 1);
  };
  const ReturnIcon = (name) => {
    switch (name) {
      case "vimeo":
        return vimeo;
      case "call":
        return call;
      case "facebook":
        return facebook;
      case "linkedin":
        return linkedin;
      case "instagram":
        return instagram;
      case "telegram":
        return telegram;
      case "snapchat":
        return snapchat;
      case "tiktok":
        return tiktok;
      case "youtube":
        return youtube;
      case "raddit":
        return raddit;
      case "twitter":
        return twitter;
      case "pinterest":
        return pinterest;
      case "whatsapp":
        return whatsapp;
      case "website":
        return website;
      case "custom":
        return custom;
      case "mail":
        return mail;
      case "spotify":
        return spotify;
      case "paypal":
        return paypal;
      default:
        return null;
    }
  };

  useEffect(() => {
    const FetchAnalytics = async () => {
      const dataref = ref(database, `Analytic`);
      const snap = await get(dataref);
      const data = snap.val();
      const arr = Object.keys(data)
        .filter((key) => data[key].userid === userId) // First, filter the keys
        .map((key) => ({
          id: key,
          ...data[key], // Then, map the filtered keys to create a new object with the id and other link properties
        }));

      console.log("array is", arr);
      setLinks(arr);
    };
    FetchAnalytics();
  }, []);
  console.log;

  return (
    <div className="Analytics-container">
      <div className="analytics-design">
        <p style={{ textAlign: "center", fontSize: "23px", color: "red" }}>
          Analytics
        </p>

        <div className="row">
          {link.map((item) => (
            <div key={item.id} className="col">
              <div className="ana-d" style={{ margin: "15px" }}>
                <div
                  className="points"
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      color: "#E93428",
                      fontWeight: "bold",
                      margin: "0px",
                      fontSize: "12px",
                    }}
                  >
                    Total Pops
                  </p>
                  <p style={{ fontSize: "8px", color: "grey" }}>
                    Lorem ipsum dolor consectetur
                  </p>
                </div>
                <img
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  src={pop}
                  alt="pop"
                />
              </div>
              <h1
                style={{
                  color: "#E93428",
                  margin: 20,
                  fontSize: "35px",
                  letterSpacing: "3px",
                }}
              >
                {item?.totalpops}
              </h1>
            </div>
          ))}

          {link.map((item) => (
            <div key={item.id} className="col">
              <div className="ana-d" style={{ margin: "15px" }}>
                <div
                  className="points"
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      color: "#E93428",
                      fontWeight: "bold",
                      margin: "0px",
                      fontSize: "12px",
                    }}
                  >
                    Total Link clicks
                  </p>
                  <p style={{ fontSize: "8px", color: "grey" }}>
                    Lorem ipsum dolor consectetur
                  </p>
                </div>
                <img
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  src={links}
                  alt="pop"
                />
              </div>
              <h1
                style={{
                  color: "#E93428",
                  margin: 20,
                  fontSize: "35px",
                  letterSpacing: "3px",
                }}
              >
                {item?.totalClicks}
              </h1>
            </div>
          ))}
        </div>

        <div className="row" style={{ margin: "0px" }}>
          {link.map((item) => (
            <div key={item.id} className="col">
              <div className="ana-d" style={{ margin: "15px" }}>
                <div
                  className="points"
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      color: "#E93428",
                      fontWeight: "bold",
                      margin: "0px",
                      fontSize: "12px",
                    }}
                  >
                    New Connections
                  </p>
                  <p style={{ fontSize: "8px", color: "grey" }}>
                    Lorem ipsum dolor consectetur
                  </p>
                </div>
                <img
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  src={connect}
                  alt="pop"
                />
              </div>
              <h1
                style={{
                  color: "#E93428",
                  margin: 20,
                  fontSize: "35px",
                  letterSpacing: "3px",
                }}
              >
                {item?.newconnection}
              </h1>
            </div>
          ))}
          {link.map((item) => (
            <div key={item.id} className="col">
              <div className="ana-d" style={{ margin: "15px" }}>
                <div
                  className="points"
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      color: "#E93428",
                      fontWeight: "bold",
                      margin: "0px",
                      fontSize: "12px",
                    }}
                  >
                    Total Orders
                  </p>
                  <p style={{ fontSize: "8px", color: "grey" }}>
                    Lorem ipsum dolor consectetur
                  </p>
                </div>
                <img
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  src={Order}
                  alt="pop"
                />
              </div>
              <h1
                style={{
                  color: "#E93428",
                  margin: 20,
                  fontSize: "35px",
                  letterSpacing: "3px",
                }}
              >
                {item.totalorders}
              </h1>
            </div>
          ))}
        </div>

        <br />

        {/* Chart */}
        <div
          className="chart"
          style={{
            width: "97%",
            borderRadius: "30px",
            border: " 1px solid rgb(228, 228, 228)",
            boxShadow: "2px 2px 2px 2px rgb(228, 228, 228) ",
            margin: "auto",
          }}
        >
          <div className="ht-btn" style={{ display: "flex", margin: "20px" }}>
            <div className="points" style={{ marginTop: "20px" }}>
              <p
                style={{ fontWeight: "bold", margin: "0px", fontSize: "15px" }}
              >
                Sales Graph
              </p>
              <p style={{ fontSize: "12px", color: "grey", lineHeight: "0px" }}>
                Lorem ipsum dolor consectetur
              </p>
            </div>
          </div>

          <div style={{ paddingLeft: "20px", width: "50%" }}>
            <div></div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "100%",
                    background: "red",
                    border: "2px solid #d7baba",
                  }}
                ></div>
                <h1 style={{ fontSize: "12px" }}>= Taps</h1>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "100%",
                    background: "blue",
                    border: "2px solid #d7baba",
                  }}
                ></div>
                <h1 style={{ fontSize: "12px" }}>= Clicks</h1>
              </div>
            </div>
          </div>

          {link.map((item, index) => (
            <LineChart
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
              xAxis={[
                {
                  data: [0, 1, 2, 3, 4], // Numeric values corresponding to the labels
                  valueFormatter: (value) => {
                    switch (value) {
                      case 0:
                        return "0";
                      case 1:
                        return "daily";
                      case 2:
                        return "weekly";
                      case 3:
                        return "monthly";
                      case 4:
                        return "yearly";
                      default:
                        return "";
                    }
                  },
                },
              ]}
              series={[
                {
                  name: "Clicks",
                  data: [
                    0,
                    item.dailyClicks ?? 0,
                    item.weeklyClicks ?? 0,
                    item.monthlyClicks ?? 0,
                    item.yearlyClicks ?? 0,
                  ],
                  area: true,
                  color: "blue",
                  strokeWidth: 0,
                  lineStyle: "none",
                  zIndex: 1, // Lower z-index to be drawn behind "Pops"
                },
                {
                  name: "Pops",
                  data: [
                    0,
                    item.dailyTaps ?? 0,
                    item.weeklyTaps ?? 0,
                    item.monthlyTaps ?? 0,
                    item.yearlyTaps ?? 0,
                  ],
                  area: true,
                  color: "red",
                  strokeWidth: 0,
                  lineStyle: "none",
                  zIndex: 2, // Higher z-index to be drawn on top of "Clicks"
                },
              ]}
              width={380}
              height={200}
              options={{
                stroke: {
                  show: false, // Turn off stroke globally if your charting library allows it
                  curve: "smooth", // Optionally smooth the line, or remove it entirely
                },
              }}
            />
          ))}

          <br />
        </div>
        <br />

        {/* ................... */}

        {link.map((item) => (
          <div
            key={item.id}
            className="Counter"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "auto",
              gap: "10px",
            }}
          >
            {item.links.map((linkItem) => (
              <div
                className="Upwork"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgb(228, 228, 228)",
                  borderRadius: "20px",
                  width: "97%",
                  margin: "2px auto",
                  maxWidth: "430px",
                  padding: "1rem",
                  boxSizing: "border-box",
                  flexWrap: "wrap",
                  boxShadow: "1px 1px 1px 1px rgb(228, 228, 228)",
                }}
              >
                <img
                  onClick={counter}
                  style={{ width: "18%", height: "auto", marginRight: "1rem" }}
                  src={ReturnIcon(linkItem?.name)}
                  alt={linkItem?.name}
                />

                <div
                  className="points"
                  style={{ flex: "1", marginRight: "1rem" }}
                >
                  <p style={{ margin: "0", fontSize: "1rem" }}>
                    {linkItem.name}
                  </p>
                  <p style={{ fontSize: "0.75rem", gap: "10px" }}>
                    {" "}
                    <span style={{ padding: "4px" }}>{linkItem?.clicks}</span>
                    times user click on Upwork
                  </p>
                </div>

                <h3 style={{ margin: "0", fontSize: "1rem" }}>
                  {linkItem.clicks}
                </h3>
              </div>
            ))}
          </div>
        ))}
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Analytics;
