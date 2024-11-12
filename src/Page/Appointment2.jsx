import React, { useState ,useEffect} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "./Appointment2.module.css";
import dayjs from 'dayjs';
import { IoChevronBack } from "react-icons/io5";
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { database } from '../firebase';
import { ref, update, get } from "firebase/database"; // import these functions
import { CiCircleInfo } from "react-icons/ci";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default CSS for styling

const Appointment2 = () => {
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentSlots,setAppointmentSlots] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [timeSlotHistory, setTimeSlotHistory] = useState([]);



  const [finalSlots, setFinalSlots] = useState([]);

  const handleSlotClick = (slot) => {
    // Check if the slot is already in the finalSlots array
    const isSelected = finalSlots.some((finalSlot) => finalSlot.startTime === slot.startTime && finalSlot.endTime === slot.endTime);
    
    if (isSelected) {
      // If the slot is already selected, remove it
      setFinalSlots(finalSlots.filter((finalSlot) => finalSlot.startTime !== slot.startTime || finalSlot.endTime !== slot.endTime));
    } else {
      // Otherwise, add it to the finalSlots array
      setFinalSlots([...finalSlots, slot]);
    }
  };

  
  const handleBack = () => {
    navigate(-1);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  
  const handleChange = (event) => {
    setSelectedDuration(event.target.value);
    setChecked(event.target.checked);
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
  
    // Update the timeSlotHistory state with the generated slots
    setTimeSlotHistory(generatedSlots);
  
    // Save generated slots to localStorage
    localStorage.setItem("generatedTimeSlots", JSON.stringify(generatedSlots));
  
    // Log to verify localStorage contains the slots

  
    SaveData(); // Save start and end times to Firebase
  };
  
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
  
      console.log(startTimestamp, endTimestamp);
  
      // Prepare the AppointmentSlots object where dates will be keys
      const appointmentSlots = {};
      console.log(selectedDates);
  
      // Iterate over selectedDates to create slots for each date
      selectedDates.forEach((date) => {
        const formattedDate = dayjs(date).format('MM-DD-YYYY'); // Format the selected date (e.g., "08-11-2024")
        console.log(formattedDate);
  
        // Structure for each date (including date, duration, and the generated time slots)
        appointmentSlots[formattedDate] = {
          date: formattedDate,
          duration: parseInt(selectedDuration, 10),
          timeSlots: finalSlots, // Add the generated time slots as objects with start and end timestamps
        };
      });
  
      console.log(finalSlots);
      console.log(appointmentSlots);
  
      // If isRepeatSlots is true, create repeatedSlots with the same time slots, repeating daily starting from today
      let repeatedSlots = {};
      if (checked) {
        const currentDate = dayjs(); // Use current date
        
        // Generate the current date and store it as the key in repeatedSlots
        const formattedRepeatedDate = currentDate.format('MM-DD-YYYY'); // Format as "MM-DD-YYYY"
  
        // Set the current date as the key for repeatedSlots
        repeatedSlots[formattedRepeatedDate] = {
          date: formattedRepeatedDate, // The current date
          duration: parseInt(selectedDuration, 10), // Duration for each repeated slot
          timeSlots: finalSlots, // Reuse the generated time slots
        };
  
        console.log("Current Repeated Slot:", repeatedSlots);
      }
  
      // Save data to Firebase, now including repeatedSlots correctly
      await update(userRef, {
        availabilityStartTime: startTimestamp,
        availabilityEndTime: endTimestamp,
        isRepeatSlots: checked || false,
        AppointmentSlots: appointmentSlots, // Save the entire appointmentSlots object
        repeatedSlots: checked ? repeatedSlots : {}, // Only save repeatedSlots if checked is true
      });
  
      console.log("Data saved successfully with AppointmentSlots and repeatedSlots!");
  
    } catch (error) {
      console.error("Error saving data:", error);
    }
  

  
  }
  




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

  const onChange = (date) => {
    // If the date is already selected, remove it from the list
    const index = selectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (index !== -1) {
      // Remove the date if already selected
      setSelectedDates(selectedDates.filter((_, i) => i !== index));
    } else {
      // Add the date to the list of selected dates
      setSelectedDates([...selectedDates, date]);
    }
  };
console.log(selectedDates);
  // Function to check if a date is selected
  const isSelected = (date) => {
    return selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );
  }; 
  


  

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <div className={styles.navbar}>
        <IoChevronBack
            onClick={handleBack}
            className="bck"
            style={{ paddingRight:"0px"}}
          />
          <p style={{ textAlign: "center", fontFamily: 'Inter', fontSize: '20px', color: 'red' }}>Appointments</p>
          <button className={styles.addButton}>Add</button>
        </div>

        <div className={styles.timeset}>
          <p style={{ textAlign: "center", fontFamily: 'Inter', fontSize: '20px', fontWeight:"500" }}>Select Availability</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div className={styles.start}>
              <p style={{ fontSize: "17px", paddingLeft: "10px" }}>Starting Time</p>
              <input
                type="time"
                className={styles.inputField}
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <div className={styles.end}>
              <p style={{ fontSize: "17px", paddingLeft: "10px" }}>Ending Time</p>
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
            value={appointmentSlots?.duration}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Appointment Duration
            </option>
            <option value="15">15 mins</option>
            <option value="30">30 mins</option>
            <option value="45">45 mins</option>
            <option value="60">60 mins</option>
          </select>

<div style={{display:'flex',justifyContent:"space-between",alignItems:'center',width:"99%"}}>
<div style={{display:"flex",gap:'10px',width:"80%",justifyContent:"space-between",alignItems:'center'}}>
<CiCircleInfo  style={{fontSize:"30px"}}/>
  <p style={{fontSize:'14px'}}>Repeat the Selected Slots Daily (untill you turn this switch off)</p>
</div>

  <IOSSwitch
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      inputProps={{ 'aria-label': 'iOS style switch' }}
    />
</div>

         

          <div className={styles.datePickerSection}>
            <p style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '20px' }}>Select Date</p>
            <p style={{ textAlign: 'center', fontSize: '14px', fontFamily: 'Inter', color: "#666" }}>
              Select date you want for maintenance!
            </p>
            <div style={{ backgroundColor: "#F8F8F8", borderRadius: "25px", border: "1px solid #B7B6B6" }}>
             
            <Calendar
        onChange={onChange}
        value={appointmentSlots?.date}
        tileClassName={({ date, view }) => {
          // Apply the class only to dates in 'month' view
          if (view === 'month' && isSelected(date)) {
            return 'selected-date'; // Return the class for selected dates
          }
          return null; // Return null for unselected dates
        }}
      /> 

            </div>
          </div>

          <div className={styles.timeSlots}>
            <p style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '16px' }}>Select Time</p>
            <p style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'Inter', color: "#666" }}>
              Select available time you want for maintenance!
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

<button style={{height:'50px',fontSize:"20px"}} className={styles.updateButton} onClick={handleUpdateClick}>Update</button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment2;