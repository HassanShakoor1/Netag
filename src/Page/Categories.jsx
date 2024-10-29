import "./categories.css";
import search from "../images/search.svg";
import vector from "../images/Vector.svg";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { database as db } from "../firebase.jsx";
import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
} from "firebase/database";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEM_HEIGHT = 48;

function Categories() {
  const categoryRefs = useRef([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Firebasedata, setFirebasedata] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null);
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getData = async () => {
    toast.dismiss();
    try {
      const querydata = query(
        ref(db, `ServiceCategory`),
        orderByChild("uid"),
        equalTo(userId)
      );
      const snap = await get(querydata);
      const data = await snap.val();

      const filteredData = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setFirebasedata(filteredData);
      // Initialize refs array to the length of the filtered data
      categoryRefs.current = new Array(filteredData.length).fill(null);
    } catch (error) {
      console.log(error);
      toast.error("No Data Found");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const foundCategoryIndex = Firebasedata.findIndex(
      (category) => category.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundCategoryIndex !== -1 && categoryRefs.current[foundCategoryIndex]) {
      categoryRefs.current[foundCategoryIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      toast.error("Category not found!");
    }
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentItemId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlemanage = (id) => {
    navigate(`/home/services/catagory/${id}`);
  };

  const goback = () => {
    navigate("/home");
  };

  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      const itemRef = ref(db, `ServiceCategory/${id}`);
      const servicesRef = ref(db, "Services");

      const servicesSnapshot = await get(servicesRef);
      const servicesData = servicesSnapshot.val();

      if (servicesData) {
        for (const [key, value] of Object.entries(servicesData)) {
          if (value.categoryid === id) {
            const serviceRef = ref(db, `Services/${key}`);
            await remove(serviceRef);
          }
        }
      }

      await remove(itemRef);
      toast.success("Category deleted successfully");
      setFirebasedata((previous) => previous.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    }
  };

  return (
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <img
                onClick={goback}
                style={{ cursor: "pointer" }}
                src={vector}
                alt=""
              />
              <div
                style={{
                  color: "#EE0000",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "2rem",
                }}
              >
                {t("Services Categories")}
              </div>
              <Link to={"/home/services/serviceaddcategory"}>
                <button
                  style={{
                    border: "1.5px solid #EE0000",
                    borderRadius: "14px",
                    padding: "5px 18px",
                    color: "#EE0000",
                    backgroundColor: "white",
                    fontSize: "12px",
                  }}
                >
                  {t("Add")}
                </button>
              </Link>
            </div>

            <div className="categories-input">
              <form
                onSubmit={handleSearchSubmit}
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <img src={search} alt="Search" style={{ marginRight: "8px" }} />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  style={{
                    color: "#929292",
                    width: "100%",
                    border: "none",
                    outline: "none",
                  }}
                />
              </form>
            </div>

            {Firebasedata.map((x, index) => (
              <div key={x.id} ref={(el) => (categoryRefs.current[index] = el)}>
                <div className="cardwidth">
                  <div className="cardcenter">
                    <div className="cardcenter-width">
                      <div style={{ width: "100%", height: "150px" }}>
                        <img
                          style={{
                            maxHeight: "150px",
                            width: "100%",
                            marginTop: "7px",
                            objectFit: "cover",
                            borderRadius: "20px",
                          }}
                          src={x.imageurl}
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#EE0000",
                            fontWeight: "500",
                            width: "100%",
                            marginLeft: "5px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <div
                              style={{ fontSize: "22px", fontWeight: "500" }}
                            >
                              {x.name}
                            </div>
                          </div>
                          <div
                            style={{
                              marginTop: "5px",
                              color: "#777777",
                              fontSize: "15px",
                              width: "90%",
                            }}
                          >
                            {x.description}
                          </div>
                        </div>

                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, x.id)}
                            style={{
                              color: "#EE0000",
                              padding: "0",
                              margin: "0",
                              zIndex: "1",
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl && currentItemId === x.id)}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "20ch",
                              },
                            }}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <MenuItem
                              style={{
                                fontSize: "15px",
                                color: "#7C7C7C",
                                borderBottom: "1px solid #ddd",
                              }}
                              onClick={() =>
                                handleMenuItemClick(
                                  `/home/services/serviceeditcategory/${x.id}`
                                )
                              }
                            >
                              <DoneAllIcon style={{ marginRight: "8px" }} />
                              Edit Profile
                            </MenuItem>
                            <div
                              style={{
                                height: "1px",
                                backgroundColor: "grey",
                                width: "100%",
                              }}
                            ></div>
                            <MenuItem
                              style={{
                                fontSize: "15px",
                                color: "red",
                              }}
                              onClick={() => handleDelete(x.id)}
                            >
                              <DeleteIcon style={{ marginRight: "8px" }} />
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>

                      <div onClick={() => handlemanage(x.id)}>
                        <button
                          style={{
                            marginTop: "1rem",
                            marginBottom: "10px",
                            width: "100%",
                            border: "1px solid #EE0000",
                            borderRadius: "10px",
                            backgroundColor: "#FFDEDE",
                            height: "5.5vh",
                            color: "#EE0000",
                            boxShadow: "1px 1px 1px 2px gainsboro",
                          }}
                        >
                          {t("Explore")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default Categories;
