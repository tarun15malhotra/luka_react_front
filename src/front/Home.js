import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { useAuth } from './Auth';

import { getAllVehicles, getAllUsers, getAllDrivers, getAllManagers, getAllOrganisationUsers, getAllVehiclePassengers, getAllOrganisationManagers, getAllOrganisationDrivers, getAllOrganisationVehicles } from '../services/UserService';


export const Home = () => {

   const auth = useAuth()

   const [numberOfVehicles, setNumberOfVehicles] = useState(0)
   const [numberOfPassengers, setNumberOfPassengers] = useState(0)
   const [numberOfDrivers, setNumberOfDrivers] = useState(0)
   const [numberOfManagers, setNumberOfManagers] = useState(0)

   useEffect(() => {


      if(auth.user.type == 1){

         getAllUsers().then(users => {
            setNumberOfPassengers(users.length)
         });

      }else if(auth.user.type == 2){

         getAllOrganisationUsers(auth.user.org_id).then(users => {
            setNumberOfPassengers(users.length)
         });

      }else{

         getAllVehiclePassengers(auth.user.id).then(users => {
            setNumberOfPassengers(users.length)
         });

      }

     

      if(auth.user.type == 1){

         getAllManagers().then(users => {
            setNumberOfManagers(users.length)
         });

         getAllDrivers().then(users => {
            setNumberOfDrivers(users.length)
         });

         getAllVehicles().then(vehicles => {
            setNumberOfVehicles(vehicles.length)
         });

      }else{

         getAllOrganisationManagers(auth.user.org_id).then(users => {
            setNumberOfManagers(users.length)
         });

         getAllOrganisationDrivers(auth.user.org_id).then(users => {
            setNumberOfDrivers(users.length)
         });

         getAllOrganisationVehicles(auth.user.org_id).then(users => {
            setNumberOfVehicles(users.length)
         });
         
      }



   }, []);

return (
<>    
<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>                  
                  <h2>{ numberOfVehicles }</h2>
                  <h4 className="font-weight-normal mb-3">Total Vehicle</h4>
               </div>
            </div>
         </div>
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>
                  <h2>{ numberOfPassengers }</h2>
                  <h4 className="font-weight-normal mb-3">Total Passenger</h4>                  
               </div>
            </div>
         </div>
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>
                  <h2>{ numberOfDrivers }</h2>
                  <h4 className="font-weight-normal mb-3">Total Vehicle Driver</h4>                  
               </div>
            </div>
         </div>
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-success2 card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>
                  <h2>{ numberOfManagers }</h2>
                  <h4 className="font-weight-normal mb-3">Total Manager</h4>                  
               </div>
            </div>
         </div>
      </div>
   </section>
</main>
</>
)
}
export default Home;