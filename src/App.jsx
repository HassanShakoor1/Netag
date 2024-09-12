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
import ServiceAddCategory from "./Page/Serviceaddcategory";
import ServiceEditCategory from "./Page/Editcategory";
import ManageCategoriesAddNew from "./Page/ManagecategoriesAddnew";


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
          <Route path="/home/notifi" element={<Notification />} />
          <Route path="/home/editimage" element={<EditContact />} />
          <Route path="/home/order" element={<ManageOrder />} />
          <Route path="/home/order/singleorder" element={<ManageScreen2 />} />
          <Route path="/home/order/order3" element={<ManageOrder3 />} />
          <Route path="/home/services" element={<Categories />} />
          <Route path="/home/services/catagory/:id" element={<ManageCategories />} />
          <Route path="/home/setting" element={<Setting />} />
          <Route path="/home/setting/myprofile" element={<MyProfile />} />
          <Route path="/home/setting/lead" element={<Profile1 />} />
          <Route path="/home/setting/subscript" element={<Subscription />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-contact" element={<EditContact />} />
          <Route path="/edit-product" element={<ProductCategory />} />
          <Route path="/edit-product/:id" element={<ProductCategory />} />
          <Route path="/product-catagory" element={<AddCategory />} />
          <Route path="/product-catagory/:id" element={<AddCategory />} />
          <Route path="/edit-product-catagory" element={<EditProduct />} />
          <Route path="/edit-product-catagory/:id" element={<EditProduct />} />
          <Route path="/edit-product-detail" element={<EditProductDetail />} />
          <Route path="/edit-product-detail/:id/:productid?" element={<EditProductDetail />} />

         
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
