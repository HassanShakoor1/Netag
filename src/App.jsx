import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProfile from "./Page/EditProfile";
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
import Wellcome from './Page/Welcome'
import Create from './Page/Create'
import Signup from './Page/Signup'
import Forgetpassword from './Page/Forgetpassowrd';
import Notification from './Page/Notification';
import Manageorder from './Page/Manageorder';
import Managescreen2 from './Page/Managescreen2';
import Manageorder3 from './Page/Manageorder3';
import Categories from './Page/Categories';
import Managecatagories from './Page/Managecategories';
import Setting from './Page/Setting38';
import Myprofile from './Page/Myprofile';
import Profile1 from './Page/Profile1';
import Profile from './Page/Profile';
import Serviceaddcategory from "./Page/Serviceaddcategory"

import { Navigate } from "react-router-dom";


function App() {

const Protectedroute=()=>{

  const userid=localStorage.getItem("userId")
  return userid? <Navigate to="/home"/> : <Navigate to="/create" />
}




  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forget" element={<Forgetpassword/>} />
          <Route path="/home" element={ <> <Protectedroute/>     <Profile />   </>} />
          <Route path="/home/notifi" element={<Notification />} />
          <Route path="/home/order" element={<Manageorder/>} />
          <Route path="/home/order/singleorder" element={<Managescreen2/>} />
          <Route path="/home/order/order3" element={<Manageorder3/>} />
          <Route path="/home/services" element={<Categories/>} />
          <Route path="/home/services/catagory" element={<Managecatagories/>} />
          <Route path="/home/setting" element={<Setting/>} />
          <Route path="/home/setting/myprofile" element={<Myprofile/>} />
          <Route path="/home/setting/lead" element={<Profile1/>} />
          <Route path="/home/setting/subscript" element={<Subscription/>} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-contact" element={<EditContact />} /> Add this route
          <Route path="/edit-product" element={<ProductCatagory />} /> Add this route
          <Route path="/product-catagory" element={<Addcatagory />} /> Add this route
          <Route path="/edit-product-catagory" element={<EditProduct />} /> Add this route
          <Route path="/edit-product-detail" element={<Editproductdetail />} /> Add this route
          <Route path="/gallery" element={<Gallery />} /> Add this route
          <Route path="/active-card" element={<ActiveCard />} /> Add this route
          <Route path="/Analytics-page" element={<Analytics />} /> Add this route
          <Route path="/setting-page" element={<Scanner />} /> Add this route
          <Route path='/home/services/serviceaddcategory' element={<Serviceaddcategory/>}></Route>
        
        </Routes>
   
      </div>
    </Router>
  );
}

export default App;
