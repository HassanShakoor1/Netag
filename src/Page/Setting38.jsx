import pic from "../images/Ellipse.png";
import "./setting.css";
import { useState, useContext, useEffect } from "react";
import person from "../images/personrounded.svg";
import lead from "../images/lead.png";
import member from "../images/membership.png";
import { getDatabase, ref, update, get,set } from "firebase/database";
import shop from "../images/shop.png";
import languages from "../images/Languages.png";
import privacy from "../images/privacy.png";
import Delete from "../images/Delete.png";
import Footer from "../Components/Footer";
import Logout from "../images/Logout.png";
import vectorrr from "../images/vectorrr.svg";
import { useNavigate, Link } from "react-router-dom";
import {  query, orderByChild, equalTo, remove } from "firebase/database";

import { AppContext } from "./LanguageContextProvider";

import { useTranslation } from "react-i18next";
import { database } from "../firebase";
function Setting() {
  // for translation
  const { t } = useTranslation();

  const { language } = useContext(AppContext);
  const [record, setRecord] = useState([]);
  console.log(language);
  const [activeTab, setActiveTab] = useState("newOrders"); // State to track the active tab
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Check localStorage for activeTab on initial render
    const savedTab = localStorage.getItem("activeTab");

    if (savedTab) {
      setActiveTab(savedTab); // Use saved activeTab from localStorage if available
    }

    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("No userId found in localStorage");
         
          return;
        }

        const userRef = ref(database, `User/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const profileData = snapshot.val();
          const userActiveTab = profileData.profileOn === 1 ? "ordersHistory" : "newOrders";
          setActiveTab(userActiveTab); // Set the tab based on profileOn field in Firebase
        } else {
          console.log("No data available for this userId:", userId);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
       
      }
    };

    fetchData();
  }, []);

  
  const updateProfileOn = (newTab) => {
    setActiveTab(newTab);
    localStorage.setItem("activeTab", newTab); 

    const profileOn = newTab === "ordersHistory" ? 1 : 0; 
    const userId = localStorage.getItem("userId");
    
    if (!userId) return; 
    
    const userRef = query(ref(database, 'User'), orderByChild('parentID'), equalTo(userId));

    get(userRef).then(snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const userKey = childSnapshot.key;
          
          set(ref(database, `User/${userKey}/profileOn`), profileOn);
        });
      }
    });
  };


  // Define styles for active and inactive tabs
  const activeStyle = {
    backgroundColor: "#EE0000",
    color: "#FFFFFF",
    fontWeight: "bold",
  };

  const inactiveStyle = {
    backgroundColor: "#FFFFFF",
    color: "#A6A6A6",
    fontWeight: "normal",
  };
  const navigate = useNavigate();
  const handlemyprofiles = () => {
    navigate("/home/setting/myprofile");
  };
  const handlelead = () => {
    navigate("/home/setting/lead");
  };
  const handlesubs = () => {
    navigate("/home/setting/subscript");
  };

  {
    /*--------------------------logout--------------------------*/
  }
  function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("parentId");
    navigate("/signup");
  }
  
  useEffect(() => {
    const fetch = async () => {
      try {
        // Reference to the 'User' node in your Firebase Realtime Database
        const dataRef = ref(database, `User`);
        const snap = await get(dataRef);
        const data = snap.val();

        if (data) {
          // Filter and map the data to match the userId
          let arr = Object.keys(data)
            .filter((key) => data[key].id === userId) // Check if the id matches the userId
            .map((key) => ({
              id: key, // Key from the Firebase data
              ...data[key], // Spread operator to get the rest of the data for each user
            }));

          console.log("User data is", arr);
          setRecord(arr); // Set the filtered data in the state
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the function
    fetch();
  }, []);


  // Delete data

  
  // Make sure to initialize your Firebase app and database

  const deleteUserData = async (uid) => {
    try {
      // Tables in which the UID is stored
      const tables = ['User', 'Products', 'Services', 'ProductCategory', 'ServiceCategory', 'Orders','Notifications'];
  
      // 1. First, delete all entries where `uid` is directly matching the UID in each table.
      for (const table of tables) {
        const tableRef = ref(database, table);
        let uidQuery;
      
        if (table === 'User') {
          uidQuery = query(tableRef, orderByChild('id'), equalTo(uid)); // For the 'User' table, query by 'id'
        } else if (table === 'Notifications' || table === 'Analytic') {
          uidQuery = query(tableRef, orderByChild('parentid'), equalTo(uid)); // For 'Notifications' and 'Analytic', query by 'parentid'
        } else {
          uidQuery = query(tableRef, orderByChild('uid'), equalTo(uid)); // For all other tables, query by 'uid'
        }
      
        try {
          const snapshot = await get(uidQuery);
          if (snapshot.exists()) {
            // Iterate over each child in the snapshot and remove it
            snapshot.forEach((childSnapshot) => {
              // Use remove to delete the data at the child's reference
               remove(childSnapshot.ref);
            });
          } else {
            console.log(`No data found for table: ${table}`);
          }
        } catch (error) {
          console.error(`Error while querying or deleting data from table ${table}:`, error);
        }
      }
      
  
      // 2. Retrieve the `parentID` from localStorage
      const parentID = localStorage.getItem("parentId");
      console.log('Parent ID retrieved from localStorage:', parentID);
  
      if (!parentID) {
        console.log("No parentID found in localStorage. Exiting function.");
        return;  // Exit if no parentID found
      }
  
      // 3. Query all users with the same parentId
      // const userTableRef = ref(database, 'User');
      // const parentQuery = query(userTableRef, orderByChild('parentID'), equalTo(parentID));
      // const parentSnapshot = await get(parentQuery);

      const parentQuery = query(
        ref(database, `User`),
        orderByChild("parentID"),
        equalTo(parentID)
      
    );
    const parentSnapshot = await get(parentQuery);
    console.log("parent data",parentSnapshot)

  
      if (parentSnapshot.exists()) {
        console.log( "hyy",parentSnapshot)
        console.log(`Found ${parentSnapshot.size} records with parentID ${parentID}. Deleting them...`);
        parentSnapshot.forEach((childSnapshot) => {
          console.log(`Deleting user with UID: ${childSnapshot.key}`);
          remove(childSnapshot.ref); // Delete the user record
          
        });

      } else {
        console.log(`No users found with parentID ${parentID}.`);
      }
  
      console.log(`User data with UID ${uid} and related parentId entries deleted from all tables.`);
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };
  

  
  

  const handleDelete = () => {
    const userUid = localStorage.getItem("userId");  // Replace with the UID you want to delete
    deleteUserData(userUid);
    navigate("/")
  };

  return (
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">
            {/* red div  */}

            <div className="reddiv">
              <div className="reddiv-flex">
                {record.map((item, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "100%",
                          objectFit: "cover",
                        }}
                        src={item.profileUrl}
                        alt=""
                      />
                    </div>
                    <div style={{ marginLeft: "10px", color: "white" }}>
                      <div style={{ fontSize: "20px", fontWeight: "100" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "10px", color: "#FFFFFF" }}>
                        ({item.username})
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    padding: "1px",
                    width: "60%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "48px",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "6vh",
                  }}
                >
                  <div
                    style={{
                      ...inactiveStyle,
                      ...(activeTab === "newOrders" ? activeStyle : {}),
                      borderRadius: "48px",
                      fontSize: "10px",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      alignItems: "center",
                    }}
                    onClick={() => updateProfileOn("newOrders")}
                  >
                    {t("Profile Off")}
                  </div>
                  <div
                    style={{
                      ...inactiveStyle,
                      ...(activeTab === "ordersHistory" ? activeStyle : {}),
                      borderRadius: "48px",
                      fontSize: "10px",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      alignItems: "center"
                    }}
                    onClick={() => updateProfileOn("ordersHistory")}
                  >
                    Profile On
                  </div>
                </div>
              </div>
            </div>

            {/* profile cards */}

            <div style={{ marginTop: "2rem" }}></div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div
                      onClick={handlemyprofiles}
                      style={{
                        cursor: "pointer",
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <img src={person} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                          }}
                        >
                          Your Profiles
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    onClick={handlelead}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <img src={lead} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                          }}
                        >
                          Leads
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div
                      onClick={handlesubs}
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <img src={member} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                        >
                          Membership
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor:"pointer"
                      }}
                    >
                      <div  onClick={() => {
      window.open('https://netagstore.com/shop/', '_blank');
  }} style={{ display: "flex", alignItems: "center",cursor:'pointer' }}>
                        <div>
                          <img src={shop} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                          }}
                        >
                          Shop
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <img src={languages} alt="" />
                        </div>
                        <Link
                          to="/home/setting/language"
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            style={{
                              color: "#868686",
                              marginLeft: "6px",
                              fontSize: "16px",
                            }}
                          >
                            Languages
                          </div>
                        </Link>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor:'pointer'
                      }}
                      onClick={() => {
      window.open('https://avicennaenterpse.blogspot.com/2022/02/app-terms-and-services.html', '_blank');}}
                    >
                      <div  style={{ display: "flex", alignItems: "center",cursor :"pointer" }}
                      
                      >
                        <div>
                          <img src={privacy} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                          }}
                        >
                          Privacy Policy & Terms & Conditions
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                      cursor:"pointer"
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}
                      onClick={handleDelete}>
                        <div>
                          <img src={Delete} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                          }}
                        >
                          Delete Account
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div className="settingcard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    <div onClick={logout}
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor:"pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center",cursor:"pointer" }}>
                        <div >
                          <img src={Logout} alt="" />
                        </div>
                        <div
                          style={{
                            color: "#868686",
                            marginLeft: "6px",
                            fontSize: "16px",
                          }}
                        >
                          Logout
                        </div>
                      </div>
                      <div>
                        <img src={vectorrr} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}
export default Setting;
