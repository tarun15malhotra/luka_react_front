import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export const Home = () => {
return (
<>    
<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>                  
                  <h2>24</h2>
                  <h4 className="font-weight-normal mb-3">Total Vehicle</h4>
               </div>
            </div>
         </div>
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>
                  <h2>961</h2>
                  <h4 className="font-weight-normal mb-3">Total Passenger</h4>                  
               </div>
            </div>
         </div>
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>
                  <h2>261</h2>
                  <h4 className="font-weight-normal mb-3">Total Vehicle Driver</h4>                  
               </div>
            </div>
         </div>
         <div className="col-md-6 stretch-card grid-margin">
            <div className="card bg-gradient-success2 card-img-holder text-white">
               <div className="card-body">
                  <img src="assets/img/circle.svg" className="card-img-absolute" alt="circle-image"/>
                  <h2>71</h2>
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