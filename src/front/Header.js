import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import { useAuth } from './Auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Header = () => {

   const auth = useAuth()
   const navigate = useNavigate()

   const handleLogout = () => {
      auth.logout()
      //navigate('/')
   }

   let Dashboard;
  // if (auth.user.type == 1 || auth.user.type == 2) {
      Dashboard = <li className="nav-item">
                  <Link className="nav-link collapsed" to="/Home" >
                  <i className="fa fa-tachometer"></i><span>Dashboard</span></Link>
               </li>
 //  }

   let Bookings;
   if (auth.user.type == 1 || auth.user.type == 2 || auth.user.type == 3) {
      Bookings = <li className="nav-item">
                  <Link className="nav-link" to="/Bookings" >
                  <i className="fa fa-list-ul"></i> <span>Bookings</span> </Link>
               </li>
   }

   let Grouping;
   if (auth.user.type == 1 || auth.user.type == 2) {
      Grouping = <li className="nav-item">
               <Link className="nav-link" to="/GroupingDetails" >
               <i className="fa fa-info-circle"></i> <span>Grouping Details</span> </Link>
            </li>
   }

   let Route;
   if (auth.user.type == 1 || auth.user.type == 2) {
      Route = <li className="nav-item">
               <Link className="nav-link" to="/VehicleRoute" >
               <i className="fa fa-bus"></i> <span>My Plans</span> </Link>
            </li>
   }

   let Manager;
   if (auth.user.type == 1) {
      Manager = <li className="nav-item">
               <Link className="nav-link" to="/Manager" >
               <i className="fa fa-users"></i> <span>Manager</span> </Link>
            </li>;
   }

   let Driver;
   if (auth.user.type == 1 || auth.user.type == 2) {
      Driver = <li className="nav-item">
                     <Link className="nav-link " to="/VehicleDriver" >
                     <i className="fa fa-id-card-o"></i><span>Vehicle Driver</span> </Link>
                  </li>
   }


   {/*<li className="nav-item">
   <Link className="nav-link" to="/Manager" >
   <i className="fa fa-users"></i> <span>Manager</span> </Link>
</li>*/}

return (
<>
<ToastContainer />
<header id="header" className="header fixed-top d-flex align-items-center">
   <div className="d-flex align-items-center justify-content-between">
      <Link to="/Home" className="logo d-flex align-items-center">
      <img src="assets/img/logo.png" alt=""/></Link>
      <i className="fa fa-bars i-menu" aria-hidden="true"></i>
   </div>
   <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
         <li className="nav-item dropdown pe-3">
            <Link to="/Profile" className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
            <span className="d-none d-md-block dropdown-toggle ps-2">{ auth.user.name }</span></Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
               <li className="dropdown-header">
                  <h6>{ auth.user.name }</h6>
               </li>
               <li>
                  <hr className="dropdown-divider"/>
               </li>
               <li>
                  <Link to="/Profile" className="dropdown-item d-flex align-items-center">
                  <i className="fa fa-user"></i><span>My Profile</span></Link>
               </li>
               <li>
                  <hr className="dropdown-divider"/>
               </li>
               <li>
                  <Link to="/Login" className="dropdown-item d-flex align-items-center">
                  <i className="fa fa-sign-out"></i><span>Logout</span></Link>
               </li>
            </ul>
         </li>
      </ul>
   </nav>
</header>
<aside id="sidebar" className="sidebar">
<ul className="sidebar-nav" id="sidebar-nav">
      
      {Dashboard}
      {Bookings}
      {Grouping}
      {Route}
      {Manager}
      {Driver}
      
      <li className="nav-item">
         <Link className="nav-link " to="/Profile" >
         <i className="fa fa-user"></i><span>My Profile</span> </Link>
      </li>
      
      <li className="nav-item">
         <Link className="nav-link" onClick={handleLogout} to="/">
         <i className="fa fa-sign-out"></i><span>Logout</span> </Link>
      </li>
      {auth.USER && (
         <li className="nav-item">
            <Link className="nav-link " to="/Login" >
            <i className="fa fa-sign-in"></i><span>Login</span> </Link>
         </li>
      )}
   </ul>
</aside>
</>
);
};
export default Header;