import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";

import EditContact from './Component/EditContact';
import ProductCatagory from './Component/ProductCatagory';
import Addcatagory from './Component/Addcatagory';
import EditProduct from './Component/EditProduct';
import Editproductdetail from './Component/Editproductdetail';
import Gallery from './Component/Gallery';
import ActiveCard from './SettingComponent/ActiveCard';
import Analytics from './SettingComponent/Analytics';
import Scanner from './SettingComponent/Scanner';
import Subscription from './SettingComponent/Subscription';
import Wellcome from './hanan/Welcome'
import Create from './hanan/Create'
import Signup from './hanan/Signup'
import Forgetpassword from './hanan/Forgetpassowrd';
import Notification from './hanan/Notification';
import Manageorder from './hanan/Manageorder';
import Managescreen2 from './hanan/Managescreen2';
import Manageorder3 from './hanan/Manageorder3';
import Categories from './hanan/Categories';
import Managecatagories from './hanan/Managecategories';
import Setting from './hanan/Setting38';
import Myprofile from './hanan/Myprofile';
import Profile1 from './hanan/Profile1';



function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forget" element={<Forgetpassword/>} />
          <Route path="/home" element={<Profile />} />
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
        
        </Routes>
   
      </div>
    </Router>
  );
}

export default App;
