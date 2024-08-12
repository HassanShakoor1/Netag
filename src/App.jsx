import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";
import Footer from "./Component/Footer";
import EditContact from './Component/EditContact';
import ProductCatagory from './Component/ProductCatagory';
import Addcatagory from './Component/Addcatagory';
import EditProduct from './Component/EditProduct';
import Editproductdetail from './Component/Editproductdetail';
import Gallery from './Component/Gallery';
import ActiveCard from './SettingComponent/ActiveCard';
import Analytics from './SettingComponent/Analytics';
import Setting from './SettingComponent/Setting';


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-contact" element={<EditContact />} /> Add this route
          <Route path="/edit-product" element={<ProductCatagory />} /> Add this route
          <Route path="/product-catagory" element={<Addcatagory />} /> Add this route
          <Route path="/edit-product-catagory" element={<EditProduct />} /> Add this route
          <Route path="/edit-product-detail" element={<Editproductdetail />} /> Add this route
          <Route path="/gallery" element={<Gallery />} /> Add this route
          <Route path="/active-card" element={<ActiveCard />} /> Add this route
          <Route path="/Analytics-page" element={<Analytics />} /> Add this route
          <Route path="/setting-page" element={<Setting />} /> Add this route
        </Routes>
   
      </div>
    </Router>
  );
}

export default App;
