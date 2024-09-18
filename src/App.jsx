import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; // Include your CSS for transitions

// Import your pages
import EditProfile from './Page/EditProfile';
import Profile from './Page/Profile';
import Welcome from './Page/Welcome';
import Create from './Page/Create';
import Signup from './Page/Signup';
import ForgetPassword from './Page/Forgetpassowrd';
import EditContact from './Components/EditContact';
import ProductCategory from './Page/ProductCatagory';
import AddCategory from './Page/Addcatagory';
import EditProduct from './Page/EditProduct';
import EditProductDetail from './Page/Editproductdetail';
import Gallery from './Page/Gallery';
import ActiveCard from './Page/ActiveCard';
import Analytics from './Page/Analytics';
import Scanner from './Page/Scanner';
import Subscription from './Page/Subscription';
import Notification from './Page/Notification';
import ManageOrder from './Page/Manageorder';
import ManageScreen2 from './Page/Managescreen2';
import ManageOrder3 from './Page/Manageorder3';
import Categories from './Page/Categories';
import ManageCategories from './Page/Managecategories';
import Setting from './Page/Setting38';
import MyProfile from './Page/Myprofile';
import Profile1 from './Page/Profile1';
import Managecatagories from './Page/Managecategories'
import Myprofile from './Page/Myprofile'
import ProductCatagory  from './Page/ProductCatagory'
import Addcatagory  from './Page/Addcatagory'
import Editproductdetail  from './Page/Editproductdetail'
 
import Serviceaddcategory from "./Page/Serviceaddcategory"
import Serviceeditcategory from "./Page/Editcategory"
import Language from "../src/Page/Language"

import {database as db} from "./firebase.jsx"
import {get,ref} from "firebase/database"

import ManagecategoriesAddnewProduct from "./Page/ManagecategoriesAddnew"


import ManageCategoriesEdit from './Page/ManageCategoriesEdit';
import CreateNewProfile from './Page/CreateNewProfile';

import ManageCategoriesAddNew from "./Page/ManagecategoriesAddnew";
import ServiceAddCategory from "./Page/Serviceaddcategory";
import ServiceEditCategory from "./Page/Editcategory";



import Links from './Page/Links';




// Correctly handle Protected Routes
function ProtectedRoute({ element }) {
  const userId = localStorage.getItem("userId");
  return userId ? element : <Navigate to="/create" />;
}


function App() {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname} // Ensure unique key for location
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <Routes location={location}>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/home" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/home/notifi"  element={<ProtectedRoute element={<Notification />} />} />
          <Route path="/home/editimage" element={<EditContact />} />
          <Route path="/home/Link" element={<Links/>} />

          <Route path="/home/order" element={<ProtectedRoute element={<ManageOrder />}  />} />
          <Route path="/home/order/singleorder" element={<ProtectedRoute element={<ManageScreen2 />} />} />
          <Route path="/home/order/order3"   element={<ProtectedRoute element={<ManageOrder3 />} />} />
          <Route path="/home/services" element={<Categories />} />
          <Route path="/home/services/catagory/:id" element={<ManageCategories />} />
          <Route path="/home/setting" element={<Setting />} />
          <Route path="/home/setting/myprofile" element={<MyProfile />} />
          <Route path="/home/setting/lead" element={<Profile1 />} />
          <Route path="/home/setting/subscript" element={<Subscription />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-contact" element={<EditContact />} />
          {/* <Route path="/edit-contact:/id" element={<EditContact />} /> */}
          <Route path="/edit-product" element={<ProductCategory />} />
          <Route path="/edit-product/:id" element={<ProductCategory />} />
          <Route path="/product-catagory" element={<AddCategory />} />
          <Route path="/product-catagory/:id" element={<AddCategory />} />
          <Route path="/edit-product-catagory" element={<EditProduct />} />
          <Route path="/edit-product-catagory/:id" element={<EditProduct />} />
          <Route path="/edit-product-detail" element={<EditProductDetail />} />
          <Route path="/edit-product-detail/:id/:productid?" element={<EditProductDetail />} />

          <Route path="/home/services/catagory/:id" element={<Managecatagories/>} />
          
          <Route path="/home/setting" element={<Setting/>} />

          <Route path='/home/setting/language' element={<Language/>}/>

          <Route path="/home/setting/myprofile" element={<Myprofile/>} />
          <Route path="/home/setting/lead" element={<Profile1/>} />
          <Route path="/home/setting/subscript" element={<Subscription/>} />
          {/* <Protectedroute1/>  */}
          <Route path="/edit-profile" element={<>  <EditProfile />  </>} />
          <Route path="/edit-contact" element={<EditContact />} /> Add this route
          <Route path="/edit-product" element={<ProductCatagory />} /> Add this route
         
          <Route path="/product-catagory" element={<Addcatagory />} /> Add this route
          <Route path="/product-catagory/:id" element={<Addcatagory />} /> Add this route
          <Route path="/edit-product-catagory" element={<EditProduct />} /> Add this route
        
          <Route path="/edit-product-detail" element={<Editproductdetail />} /> Add this route
          <Route path="/gallery" element={<Gallery />} /> Add this route
          <Route path="/active-card" element={<ActiveCard />} /> Add this route
          <Route path="/Analytics-page" element={<Analytics />} /> Add this route
          <Route path="/setting-page" element={<Scanner />} /> Add this route
          <Route path='/home/services/serviceaddcategory' element={<Serviceaddcategory/>}></Route>
          <Route path='/home/services/serviceeditcategory/:id' element={<Serviceeditcategory/>}></Route>
          <Route  path='/home/services/catagory-products/:id/serviceaddcategory-product' element={<ManagecategoriesAddnewProduct/>}></Route>        
          <Route path='/home/services/catagory/ManageCategories-products-Edit/:id' element={<ManageCategoriesEdit/>}></Route>
          
          {/* create new profile  */}
          <Route path='/home/create-new-profile/:id?' element={<CreateNewProfile/>}></Route>

          
         
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/active-card" element={<ActiveCard />} />
          <Route path="/Analytics-page" element={<Analytics />} />
          <Route path="/setting-page" element={<Scanner />} />
          <Route path='/home/services/serviceaddcategory' element={<ServiceAddCategory />} />
          <Route path='/home/services/serviceeditcategory/:id' element={<ServiceEditCategory />} />
          <Route path='/home/services/catagory/:id/serviceaddcategory' element={<ManageCategoriesAddNew />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
