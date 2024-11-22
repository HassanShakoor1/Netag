import "./Appointment.css"
import { IoChevronBack } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'
import { database as db } from "../firebase.jsx"
import { get, ref, query, orderByChild, equalTo, onValue } from "firebase/database"
import { useEffect } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next";

function Appointment() {
    const { t } = useTranslation();
    const [appointment, setAppointment] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    {/*-------------------------navigation------------------------- */}    
    const handleHome = () => {
        navigate('/home');
    };

    {/*-------------------------Appointments Data from FireBase------------------------- */}
    const AppointmentData = async () => {
        const AppointmentRef = ref(db, '/Appointments');
        const queryData = query(
            AppointmentRef,
            orderByChild('uid'),
            equalTo(userId)   
        );

        onValue(queryData, async (snapShot) => {
            let FetchedData = await snapShot.val();
            let data = Object.values(FetchedData);
            setAppointment(data);
        });
    };

    useEffect(() => {
        AppointmentData();
    }, []);

    const MoveAddappointment = () => {
        navigate('/home/Addappoint');
    };

    return (
        <div className="appoint-maindiv">
            <div className="div-center">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="widthh">
                        {/* top-appointment */}
                        <div className="top-appointment">
                            <IoChevronBack
                                onClick={handleHome}
                                className="bck"
                            />
                            <div style={{ fontWeight: '100', fontSize: "20px" }} className="color-font">{t("Appointments")}</div>
                            <div>
                                <button
                                    style={{ height: '30px', borderRadius: "20px", backgroundColor: "transparent" }}
                                    onClick={MoveAddappointment}
                                    className="btn-width"
                                >
                                    {t("Add")}
                                </button>
                            </div>
                        </div>

                        {/* Appointments Data */}
                        {appointment.length === 0 ? (
                            <div className="no-data">
                                <p style={{textAlign:"center",margin:"100px auto"}}>{t("No Data Available")}</p>
                            </div>
                        ) : (
                            appointment.map((x, key) => {
                                return (
                                    <div key={key}>
                                        <div className="box-colr">
                                            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px", paddingTop: "25px" }}>
                                                <div className="color-font1">#JNN823728</div>
                                                <div style={{ fontSize: "10px" }}>{x.starttime}<span style={{ margin: "0px 1px" }}>--</span>{x.selecteddate}</div>
                                            </div>
                                            {/* line */}
                                            <div className="line"></div>
                                            {/* email */}
                                            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px" }}>
                                                <div>
                                                    <div style={{ color: "#555555" }} className="color-font2">Email address</div>
                                                    <div className="color-font2">{x.email}</div>
                                                </div>
                                                <div>
                                                    <div style={{ color: "#555555" }} className="color-font2">Phone number</div>
                                                    <div className="color-font2">+92 300 0120211</div>
                                                </div>
                                            </div>

                                            {/* address */}
                                            <div style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px" }}>
                                                <div style={{ color: "#555555" }} className="color-font2">Address</div>
                                                <div className="color-font2">
                                                    <p>{x.address}</p>
                                                </div>
                                            </div>
                                            {/* details */}
                                            <div style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px" }}>
                                                <div style={{ color: "#555555" }} className="color-font2">Detail</div>
                                                <div className="color-font2">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur. Vitae metus habitant interdum ac. Quam tellus sit amet fermentum. Varius ac eget sed commodo massa tristique. Integer ac vestibulum tristique eu at.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
