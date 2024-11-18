import React, { useState ,useEffect} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "./Appointment2.module.css";
import dayjs from 'dayjs';
import { IoChevronBack } from "react-icons/io5";
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { database } from '../firebase';
import { ref, update, get,remove } from "firebase/database"; // import these functions
import { CiCircleInfo } from "react-icons/ci";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default CSS for styling
import { useTranslation } from "react-i18next";
const Appointment2 = () => {
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentSlots,setAppointmentSlots] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [timeSlotHistory, setTimeSlotHistory] = useState([]);
  const { t } = useTranslation();


  const [finalSlots, setFinalSlots] = useState([]);


  useEffect(() => {
    // On component mount, retrieve the selected slots from localStorage
    const savedSlots = localStorage.getItem('finalSlots');
    if (savedSlots) {
      setFinalSlots(JSON.parse(savedSlots)); // Parse and set the slots in state
    }
  }, []);

  const handleSlotClick = (slot) => {
    // Check if the slot is already selected
    const isSelected = finalSlots.some(
      (finalSlot) => finalSlot.startTime === slot.startTime && finalSlot.endTime === slot.endTime
    );
  
    let updatedSlots;
    if (isSelected) {
      // If the slot is already selected, remove it from finalSlots
      updatedSlots = finalSlots.filter(
        (finalSlot) => finalSlot.startTime !== slot.startTime || finalSlot.endTime !== slot.endTime
      );
    } else {
      // Otherwise, add it to finalSlots
      updatedSlots = [...finalSlots, slot];
    }
  
    // Update the finalSlots state with the updated slots
    setFinalSlots(updatedSlots);
  
    // Store the updated slots in localStorage
    localStorage.setItem('finalSlots', JSON.stringify(updatedSlots));
  };
  

  console.log("final",finalSlots)
  
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Check if startTime and endTime are in localStorage, and load them
    const savedStartTime = localStorage.getItem('startTime');
    const savedEndTime = localStorage.getItem('endTime');

    if (savedStartTime) {
      setStartTime(savedStartTime); // Set saved startTime to state
    }

    if (savedEndTime) {
      setEndTime(savedEndTime); // Set saved endTime to state
    }
  }, []); // Empty dependency array to run only on mount

  const handleStartTimeChange = (event) => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);
    localStorage.setItem('startTime', newStartTime); // Save to localStorage
  };

  const handleEndTimeChange = (event) => {
    const newEndTime = event.target.value;
    setEndTime(newEndTime);
    localStorage.setItem('endTime', newEndTime); // Save to localStorage
  };
  
 
  useEffect(() => {
    // Retrieve the saved duration and checked state from localStorage
    const savedDuration = localStorage.getItem('selectedDuration');
    const savedChecked = localStorage.getItem('checked');

    if (savedDuration) {
      setSelectedDuration(savedDuration); // Set the saved duration
    }
    if (savedChecked) {
      setChecked(JSON.parse(savedChecked)); // Set the saved checked state (convert string to boolean)
    }
  }, []);

  const handleChange = (event) => {
    // Update the state
    setSelectedDuration(event.target.value);

    // If it's a checkbox, update the checked state
    if (event.target.type === 'checkbox') {
      setChecked(event.target.checked);
      // Save the new checked state to localStorage
      localStorage.setItem('checked', JSON.stringify(event.target.checked));
    } else {
      // Save the new selected duration to localStorage
      localStorage.setItem('selectedDuration', event.target.value);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes} ${period}`;
  };

  const generateTimeSlots = (startTimestamp, endTimestamp) => {
    if (!startTimestamp || !endTimestamp || !selectedDuration) return [];
  
    const slots = [];
    let start = dayjs.unix(startTimestamp);
    const end = dayjs.unix(endTimestamp);
    const duration = parseInt(selectedDuration, 10);
  
    // Ensure only one time range is processed (not for multiple dates)
    // Generate the slots in the form of Unix timestamps with start and end times
    while (start.add(duration, 'minute').isBefore(end) || start.add(duration, 'minute').isSame(end)) {
      const slotStartTimestamp = start.unix();
      const slotEndTimestamp = start.add(duration, 'minute').unix();
      slots.push({
        startTime: slotStartTimestamp,
        endTime: slotEndTimestamp
      });
      start = start.add(duration, 'minute');
    }
  
    console.log(slots);
    return slots;
  };
  
  

  const handleUpdateClick = () => {
    // Example values for startTimestamp, endTimestamp, and selectedDuration
    const startTimeString = startTime; // Format: "15:12"
    const endTimeString = endTime; // Format: "18:12"
    const selectedDuration = "30"; // Replace with your actual selected duration in minutes
  
    console.log("startTimeString:", startTimeString);  // Log to see the raw value
    console.log("endTimeString:", endTimeString);      // Log to see the raw value
  
    // Check if startTimeString and endTimeString are valid time strings
    if (!startTimeString || !endTimeString) {
      console.error("Invalid time strings:", startTimeString, endTimeString);
      return;
    }
  
    // Use dayjs to parse the time strings and add today's date as the base date
    const today = dayjs().startOf('day'); // Get today's date at midnight
    const startTimestamp = today.hour(parseInt(startTimeString.split(':')[0], 10))
                                 .minute(parseInt(startTimeString.split(':')[1], 10))
                                 .second(0)
                                 .unix(); // Convert to Unix timestamp (seconds)
  
    const endTimestamp = today.hour(parseInt(endTimeString.split(':')[0], 10))
                               .minute(parseInt(endTimeString.split(':')[1], 10))
                               .second(0)
                               .unix(); // Convert to Unix timestamp (seconds)
  
    console.log("Converted startTimestamp:", startTimestamp); // Log the timestamp
    console.log("Converted endTimestamp:", endTimestamp); // Log the timestamp
  
    // If the timestamps are invalid (NaN or invalid range), log an error
    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      console.error("Invalid timestamps:", startTimestamp, endTimestamp);
      return;
    }
  
    // Now you can format the time correctly
    const formattedStartTime = dayjs.unix(startTimestamp).format('hh:mm A');
    const formattedEndTime = dayjs.unix(endTimestamp).format('hh:mm A');
  
    console.log("Formatted Start Time:", formattedStartTime); // Log the formatted time
    console.log("Formatted End Time:", formattedEndTime); // Log the formatted time
  
    // Generate the time slots
    const generatedSlots = generateTimeSlots(startTimestamp, endTimestamp, selectedDuration);
  
    // Remove old time slots from localStorage
    localStorage.removeItem("generatedTimeSlots");
   

console.log(`User/${userId}/AppointmentSlots/${selectedDates}`)
const selectedDate = new Date(selectedDates);  // Convert selectedDates to Date

// Check if it's a valid Date
if (isNaN(selectedDate)) {
  console.error("Invalid date:", selectedDates);
} else {
  // Format the date to MM-DD-YYYY format
  const formattedDate = `${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}-${selectedDate.getFullYear()}`;

  const timeSlotsRef = ref(database, `User/${userId}/AppointmentSlots/${formattedDate}`);

  remove(timeSlotsRef)
    .then(() => {
      console.log("timeSlots deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting timeSlots: ", error);
    });
}

  
    // Save newly generated slots to localStorage
    localStorage.setItem("generatedTimeSlots", JSON.stringify(generatedSlots));

    localStorage.removeItem("finalSlots")
   
    

    // Update the timeSlotHistory state with the generated slots
    setTimeSlotHistory(generatedSlots);


  };
  
  

const save=()=>{
  SaveData();
}



  const fromLocal = localStorage.getItem("generatedTimeSlots");

  // Parse the time slots from localStorage
  let parsedSlots = [];
  if (fromLocal) {
    try {
      parsedSlots = JSON.parse(fromLocal); // Parse the string into an array
    } catch (error) {
      console.error("Error parsing stored slots:", error);
    }
  }
  
  // Check if appointmentSlots is defined before proceeding
  let combinedSlots = [...parsedSlots];

if (appointmentSlots && Object.keys(appointmentSlots).length > 0) {
  Object.values(appointmentSlots).forEach((appointment) => {
    if (appointment && appointment.timeSlots && Array.isArray(appointment.timeSlots)) {
      const { timeSlots } = appointment;

      timeSlots.forEach((slot) => {
        // Check if this slot already exists in parsedSlots
        const exists = combinedSlots.some(
          (existingSlot) =>
            existingSlot.startTime === slot.startTime &&
            existingSlot.endTime === slot.endTime
        );
        if (!exists) {
          combinedSlots.push(slot); // Add the new slot if it's not a duplicate
        }
      });
    } else {
      console.warn(
        "timeSlots is not an array or is undefined for appointment:",
        appointment
      );
    }
  });
} else {
  console.warn("appointmentSlots is undefined or empty");
}

// console.log("Retrieved Slots: ", savedSlots);

  const IOSSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    display: 'flex',
    '& .MuiSwitch-switchBase': {
      padding: 1,
      margin: 1,
      transform: 'translateX(0px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(16px)',
        '& + .MuiSwitch-track': {
          backgroundColor: 'red',
          opacity: 1,
          border: 0,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 22,
      height: 22,
      boxShadow: '0 2px 4px 0 rgba(0, 35, 11, 0.2)',
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#bdbdbd',
      boxSizing: 'border-box',
    },
  }));
  
  const userId = localStorage.getItem("userId");

 
  const SaveData = async () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
  
    try {
      const userRef = ref(database, `User/${userId}`);
      const today = dayjs().format('YYYY-MM-DD'); // Get today's date to combine with times
  
      // Generate the start and end timestamps for the day
      const startTimestamp = dayjs(`${today} ${startTime}`, 'YYYY-MM-DD HH:mm').unix();
      const endTimestamp = dayjs(`${today} ${endTime}`, 'YYYY-MM-DD HH:mm').unix();
  
      console.log("Start Timestamp:", startTimestamp);
      console.log("End Timestamp:", endTimestamp);
  
      // Prepare the AppointmentSlots object where dates will be keys
      const appointmentSlots = {};
      console.log("Selected Dates:", selectedDates);
  
      // Iterate over selectedDates to create slots for each date
      selectedDates.forEach((date) => {
        const formattedDate = dayjs(date).format('MM-DD-YYYY'); // Format the selected date (e.g., "08-11-2024")
        console.log("Formatted Date:", formattedDate);
  
        // Structure for each date (including date, duration, and the generated time slots)
        appointmentSlots[formattedDate] = {
          date: formattedDate,
          duration: parseInt(selectedDuration, 10),
          timeSlots: finalSlots, // Add the generated time slots as objects with start and end timestamps
        };
      });
  
      console.log("Generated Appointment Slots:", appointmentSlots);
  
      // Fetch the existing data from Firebase (if any)
      const existingDataSnapshot = await get(userRef);
      let existingAppointmentSlots = existingDataSnapshot.val()?.AppointmentSlots || {};
      let existingRepeatedSlots = existingDataSnapshot.val()?.repeatedSlots || {};
  
      // Remove old slots that no longer exist in the updated data (based on selected dates)
      const updatedAppointmentSlots = { ...existingAppointmentSlots };
      Object.keys(existingAppointmentSlots).forEach((dateKey) => {
        if (!selectedDates.some(date => dayjs(date).format('MM-DD-YYYY') === dateKey)) {
          console.log(`Deleting slot for date: ${dateKey}`);
          delete updatedAppointmentSlots[dateKey]; // Remove the date slot if it's no longer selected
        }
      });
  
      // Check if the duration has changed and remove timeSlots if duration is updated
      Object.keys(appointmentSlots).forEach((dateKey) => {
        if (existingAppointmentSlots[dateKey]) {
          // Compare the current duration with the new duration
          if (existingAppointmentSlots[dateKey].duration !== appointmentSlots[dateKey].duration) {
            console.log(`Duration changed for ${dateKey}. Clearing timeSlots.`);
            // If the duration has changed, clear all timeSlots for that date
            updatedAppointmentSlots[dateKey] = {
              ...updatedAppointmentSlots[dateKey],
              timeSlots: [], // Explicitly clear the timeSlots array
            };
          }
        }
      });
  
      console.log("Updated Appointment Slots (after clearing timeSlots where needed):", updatedAppointmentSlots);
  
      // Reindex timeSlots after deletion or update
      Object.keys(updatedAppointmentSlots).forEach((dateKey) => {
        if (updatedAppointmentSlots[dateKey]?.timeSlots?.length > 0) {
          updatedAppointmentSlots[dateKey].timeSlots = updatedAppointmentSlots[dateKey].timeSlots.map((slot, index) => {
            return { ...slot, index }; // Reassign index after deletion
          });
        }
      });
  
      console.log("Reindexed TimeSlots:", updatedAppointmentSlots);
  
      // If isRepeatSlots is true, handle the repeated slots
      let repeatedSlots = {};
      if (checked) {
        const currentDate = dayjs(); // Use current date
        const formattedRepeatedDate = currentDate.format('MM-DD-YYYY'); // Format as "MM-DD-YYYY"
  
        repeatedSlots[formattedRepeatedDate] = {
          date: formattedRepeatedDate, // The current date
          duration: parseInt(selectedDuration, 10), // Duration for each repeated slot
          timeSlots: finalSlots, // Reuse the generated time slots
        };
  
        console.log("Current Repeated Slot:", repeatedSlots);
      }
  
      // Update Firebase with new data, including the removed old slots
      await update(userRef, {
        availabilityStartTime: startTimestamp,
        availabilityEndTime: endTimestamp,
        isRepeatSlots: checked || false,
        AppointmentSlots: { ...updatedAppointmentSlots, ...appointmentSlots }, // Combine existing and new slots
        repeatedSlots: checked ? repeatedSlots : existingRepeatedSlots, // Only save repeatedSlots if checked is true
      });
  
      console.log("Data saved successfully with AppointmentSlots and repeatedSlots!");
  
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  
  
  
  
  
  




  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error("User ID is required to fetch data.");
        return;
      }
  
      try {
        // Fetch the AppointmentSlots data from Firebase
        const userRef = ref(database, `User/${userId}`);
        const snapshot = await get(userRef);
  
        if (snapshot.exists()) {
          const data = snapshot.val();
  
          // Extract the AppointmentSlots object
          const slots = data.AppointmentSlots;
          setAppointmentSlots(slots); // Set the fetched slots data to state
  
          console.log("Fetched appointment slots:", slots); // Log after setting state
        } else {
          console.log("No appointment slots available.");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
  
    fetchData();
  }, [userId, database]);
  
  console.log("Fetched appointment :", appointmentSlots)
  

  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const savedSelectedDates = localStorage.getItem('selectedDates');
    if (savedSelectedDates) {
      // Parse the stored stringified dates and ensure they are Date objects
      const parsedDates = JSON.parse(savedSelectedDates).map((dateString) => new Date(dateString));
      setSelectedDates(parsedDates);
    }
  }, []);

  // Check if a date is selected
  const isSelected = (date) => {
    const formattedDate = date.toDateString();
    return selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === formattedDate
    );
  };

  // Check if a date is today (ignoring the time part)
  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for today's date comparison
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0); // Reset time part for comparison

    return today.getTime() === currentDate.getTime();
  };

  // Handle date change (select or deselect a date)
  const onChange = (date) => {
    console.log(date); // Log to check the clicked date
    
    setSelectedDates((prevSelectedDates) => {
      const formattedDate = date.toDateString();
      const isDateSelected = prevSelectedDates.some(
        (selectedDate) => selectedDate.toDateString() === formattedDate
      );

      let updatedSelectedDates;
      if (isDateSelected) {
        // If the date is already selected, remove it
        updatedSelectedDates = prevSelectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== formattedDate
        );
      } else {
        // If the date is not selected, add it
        updatedSelectedDates = [...prevSelectedDates, date];
      }

      // Store the updated selected dates in localStorage, converting Date objects to strings
      localStorage.setItem('selectedDates', JSON.stringify(updatedSelectedDates.map((date) => date.toISOString())));

      // Return the updated state
      return updatedSelectedDates;
    });
  };

  useEffect(() => {
    const savedCheckedState = localStorage.getItem('checkedState');
    if (savedCheckedState !== null) {
      setChecked(JSON.parse(savedCheckedState)); // Parse and set the state
    }
  }, []);

  // Handle change in switch state
  const handleSwitchChange = (event) => {
    const newCheckedState = event.target.checked;
    setChecked(newCheckedState);

    // Save the updated state to localStorage
    localStorage.setItem('checkedState', JSON.stringify(newCheckedState));
  };


 

  

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <div style={{display:"flex",justifyContent:"space-between"}} className={styles.navbar}>
        <IoChevronBack
            onClick={handleBack}
            className="bck"
            style={{ paddingRight:"0px",paddingLeft:"0px",fontSize:"25px"}}
          />
          <p style={{ textAlign: "center", fontFamily: 'Inter', fontSize: '22px', color: 'red' }}>{t("Appointments")}</p>
         <div>

         </div>
        </div>

        <div className={styles.timeset}>
          <p style={{ textAlign: "center", fontFamily: 'Inter', fontSize: '20px', fontWeight:"500" }}>{t("Select Availability")}</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div className={styles.start}>
              <p style={{ fontSize: "17px", paddingLeft: "10px" }}>{t("Starting Time")}</p>
              <input
                type="time"
                className={styles.inputField}
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <div className={styles.end}>
              <p style={{ fontSize: "17px", paddingLeft: "10px" }}>{t("Ending Time")}</p>
              <input
                type="time"
                className={styles.inputField}
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>

          <select
            className={styles.inputField}
            style={{ marginBottom: '10px', paddingRight: '15px', width: "100%" }}
            value={selectedDuration}
            onChange={handleChange}
          >
            <option value="" disabled>
              {t("Select Appointment Duration")}
            </option>
            <option value="15">15 mins</option>
            <option value="30">30 mins</option>
            <option value="45">45 mins</option>
            <option value="60">60 mins</option>
          </select>

          <button style={{height:'50px',fontSize:"20px"}} className={styles.updateButton} onClick={handleUpdateClick}>{t("Update")}</button>

<div style={{display:'flex',justifyContent:"space-between",alignItems:'center',width:"99%"}}>
<div style={{display:"flex",gap:'10px',width:"80%",justifyContent:"space-between",alignItems:'center'}}>
<CiCircleInfo  style={{fontSize:"30px"}}/>
  <p style={{fontSize:'14px'}}>{t("Repeat the Selected Slots Daily (untill you turn this switch off)")}</p>
</div>

<IOSSwitch
        checked={checked}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'iOS style switch' }}
      />
</div>

         

          <div className={styles.datePickerSection}>
            <p style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '20px' }}>{t("Select Date")}</p>
            <p style={{ textAlign: 'center', fontSize: '14px', fontFamily: 'Inter', color: "#666" }}>
              {t("Select date you want for maintenance!")}
            </p>
            <div style={{ backgroundColor: "#F8F8F8", borderRadius: "25px", border: "1px solid #B7B6B6" }}>
             
            <Calendar
      onChange={onChange}
      value={selectedDates} // Use selectedDates for the calendar's value
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          if (isSelected(date)) {
            return 'selected-date'; // Apply the class for selected dates
          }
          if (isToday(date)) {
            return 'today'; // Apply the class for today's date
          }
        }
        return null;
      }}
    />


            </div>
          </div>

          <div className={styles.timeSlots}>
            <p style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '16px' }}>{t("Select Time")}</p>
            <p style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'Inter', color: "#666" }}>
              {t("Select available time you want for maintenance!")}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {parsedSlots?.length > 0 ? (
  parsedSlots.map((slot, index) => {
    const isSelected = finalSlots?.some(
      (finalSlot) => finalSlot?.startTime === slot?.startTime && finalSlot?.endTime === slot?.endTime
    );
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? 'red' : '#f0f0f0',
          height: '40px',
          borderRadius: '10px',
          padding: '2px',
          flexBasis: '30%',
          cursor: 'pointer',
        }}
        onClick={() => handleSlotClick(slot)}
      >
        <p style={{ fontSize: '12px' }}>
          {formatTime(dayjs.unix(slot.startTime).format('HH:mm'))} - {formatTime(dayjs.unix(slot.endTime).format('HH:mm'))}
        </p>
      </div>
    );
  })
) : (
  <p>No time slots available</p>
)}

<button style={{height:'50px',fontSize:"20px"}} className={styles.updateButton} onClick={save}>{t("Save")}</button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment2;