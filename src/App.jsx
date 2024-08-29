<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProfile from "./Page/EditProfile";
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import EditProfile from './Page/EditProfile';
import Profile from './Page/Profile';
import Wellcome from './Page/Welcome';
import Create from './Page/Create';
import Signup from './Page/Signup';
import Forgetpassword from './Page/Forgetpassowrd';
>>>>>>> 9091423 (cmt)
import EditContact from './Components/EditContact';
import ProductCatagory from './Page/ProductCatagory';
import Addcatagory from './Page/Addcatagory';
import EditProduct from './Page/EditProduct';
import Editproductdetail from './Page/Editproductdetail';
import Gallery from './Page/Gallery';
import ActiveCard from './Page/ActiveCard';
import Analytics from './Page/Analytics';
import Scanner from './Page/Scanner';
import Subscription from './Page/Subscription';
import Notification from './Page/Notification';
import Manageorder from './Page/Manageorder';
import Managescreen2 from './Page/Managescreen2';
import Manageorder3 from './Page/Manageorder3';
import Categories from './Page/Categories';
import Managecatagories from './Page/Managecategories';
import Setting from './Page/Setting38';
import Myprofile from './Page/Myprofile';
import Profile1 from './Page/Profile1';
<<<<<<< HEAD
import Profile from './Page/Profile';
import Serviceaddcategory from "./Page/Serviceaddcategory"
import Serviceeditcategory from "./Page/Editcategory"

import {database as db} from "./firebase.jsx"
import {get,ref} from "firebase/database"

import ManagecategoriesAddnew from "./Page/ManagecategoriesAddnew"

import { Navigate } from "react-router-dom";


function App() {
  // const[company,setcompany]=useState([])



  // function getData(){
  //   const dbref=ref(db,'categories')

  //   const initialdata=async()=>{
  //      const snap=await get(dbref)
  //      const data= await snap.val()
  //      console.log(data)
  //      try {
  //       const arr=Object.keys(data).map((x)=>({
  //           id:x,
  //           ...data[x]
  //       }))
  //       console.log(arr)
  //       setcompany(arr)


  //      } catch (error) {
  //       console.log(error )
  //      }
  //   }
  //   initialdata()
    
  //  }

  //  useEffect(()=>{
  //   getData()
  //  },[])

const Protectedroute=()=>{

  const userid=localStorage.getItem("userId")
  return userid? <Navigate to="/home"/> : <Navigate to="/create" />
}

const Protectedroute1=()=>{

  const userid=localStorage.getItem("iscompany")
  console.log(userid)
 
  return userid? <Navigate to="/edit-profile"/> : <Navigate to="/create" />
}


=======
import Serviceaddcategory from "./Page/Serviceaddcategory";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isCompany, setIsCompany] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const db = getDatabase();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsAuthenticated(true);
  //       const userId = user.uid;
  //       const userRef = ref(db, `users/${userId}`);
  //       onValue(userRef, (snapshot) => {
  //         const userData = snapshot.val();
  //         setIsCompany(userData?.isCompany || false);
  //         setLoading(false);
  //       });
  //     } else {
  //       setIsAuthenticated(false);
  //       setLoading(false);
  //     }
  //   });
  // }, []);
>>>>>>> 9091423 (cmt)

  // if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="app">
        <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Wellcome />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forget" element={<Forgetpassword/>} />
          <Route path="/home" element={ <>  <Protectedroute/>  <Profile />   </>} />
          <Route path="/home/notifi" element={<Notification />} />
          <Route path="/home/order" element={<Manageorder/>} />
          <Route path="/home/order/singleorder" element={<Managescreen2/>} />
          <Route path="/home/order/order3" element={<Manageorder3/>} />
          <Route path="/home/services" element={<Categories/>} />

          <Route path="/home/services/catagory/:id" element={<Managecatagories/>} />
          
          <Route path="/home/setting" element={<Setting/>} />
          <Route path="/home/setting/myprofile" element={<Myprofile/>} />
          <Route path="/home/setting/lead" element={<Profile1/>} />
          <Route path="/home/setting/subscript" element={<Subscription/>} />
          {/* <Protectedroute1/>  */}
          <Route path="/edit-profile" element={<>  <EditProfile />  </>} />
          <Route path="/edit-contact" element={<EditContact />} /> Add this route
          <Route path="/edit-product" element={<ProductCatagory />} /> Add this route
=======
          <Route path="/" element={<Wellcome />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forgetpassword />} />
          
          {/* Home route based on isCompany */}
          {/* <Route 
  path="/home" 
  element={
    isAuthenticated ? 
      (isCompany ? <Navigate to="/edit-product" /> : <Profile />) : 
      <Navigate to="/" />
  } 
/>

  {/* EditRoute based on isCompany */}
{/* <Route 
            path="/edit-product" 
            element={
              isAuthenticated ? 
                (!isCompany ?  <Navigate to="/home" />: <ProductCatagory/>) : 
                <Navigate to="/" />
            } 
          /> */} 
>>>>>>> 9091423 (cmt)
         

    
          <Route path="/edit-contact" element={<EditContact />} />
          <Route path="/home" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-product" element={<ProductCatagory />} /> 
          <Route path="/edit-product/:id" element={<ProductCatagory />} />
          <Route path="/product-catagory" element={<Addcatagory />} />
          <Route path="/product-catagory/:id" element={<Addcatagory />} />
          <Route path="/edit-product-catagory" element={<EditProduct />} />
          <Route path="/edit-product-catagory/:id" element={<EditProduct />} />
          <Route path="/edit-product-detail" element={<Editproductdetail />} />
          <Route path="/edit-product-detail/:id" element={<Editproductdetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/active-card" element={<ActiveCard />} />
          <Route path="/Analytics-page" element={<Analytics />} />
          <Route path="/setting-page" element={<Scanner />} />
          <Route path="/home/notifi" element={<Notification />} />
          <Route path="/home/order" element={<Manageorder />} />
          <Route path="/home/order/singleorder" element={<Managescreen2 />} />
          <Route path="/home/order/order3" element={<Manageorder3 />} />
          <Route path="/home/services" element={<Categories />} />
          <Route path="/home/services/catagory" element={<Managecatagories />} />
          <Route path="/home/setting" element={<Setting />} />
          <Route path="/home/setting/myprofile" element={<Myprofile />} />
          <Route path="/home/setting/lead" element={<Profile1 />} />
          <Route path="/home/setting/subscript" element={<Subscription />} />
          <Route path='/home/services/serviceaddcategory' element={<Serviceaddcategory/>}></Route>
<<<<<<< HEAD
          <Route path='/home/services/serviceeditcategory/:id' element={<Serviceeditcategory/>}></Route>
          <Route  path='/home/services/catagory/:id/serviceaddcategory' element={<ManagecategoriesAddnew/>}></Route>        
=======

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
>>>>>>> 9091423 (cmt)
        </Routes>
      </div>
    </Router>
  );
}

export default App;
