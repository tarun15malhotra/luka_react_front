import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from "react-bootstrap/Modal";

export const PassengerList = () => {
const [isOpen, setIsOpen] = React.useState(false);
const showModal = () => { setIsOpen(true);};
const hideModal = () => { setIsOpen(false);};

const [isOpen1, setIsOpen1] = React.useState(false);
const showModal1 = () => { setIsOpen1(true);};
const hideModal1 = () => { setIsOpen1(false);};

const [isOpen2, setIsOpen2] = React.useState(false);
const showModal2 = () => { setIsOpen2(true);};
const hideModal2 = () => { setIsOpen2(false);};


return (
<>    
<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-12 grid-margin">
            <div className="card">
               <div className="card-body">
                  <h4 className="card-title">
                  Organisation Passenger List 
                  </h4>
                  <div className="table-responsive mt-4">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                              <th> ID </th>
                              <th> Name </th>
                              <th> Age </th>
                              <th> Phone </th>
                              <th> Boarding Point</th>
                              <th> Destination Point</th>
                              <th> Total Distance</th>
                              <th> Maximum Hour</th>
                              <th> Minimum Hour</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>1</td>
                              <td>John</td>
                              <td>20</td>
                              <td>+42342423212</td>
                              <td>Manchester</td>
                              <td>New York</td>
                              <td>10km</td>
                              <td>2H</td>
                              <td>1H</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>John</td>
                              <td>20</td>
                              <td>+42342423212</td>
                              <td>Manchester</td>
                              <td>New York</td>
                              <td>10km</td>
                              <td>2H</td>
                              <td>1H</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>John</td>
                              <td>20</td>
                              <td>+42342423212</td>
                              <td>Manchester</td>
                              <td>New York</td>
                              <td>10km</td>
                              <td>2H</td>
                              <td>1H</td>
                            </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</main>
<Modal show={isOpen} onHide={hideModal}>
   <Modal.Body className="p_50">
      <div className="row mt-3">
         <div className='col-12 text-center mb-3'>
            <h4>Add Booking Details</h4>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Full Name"/>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Email"/>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Age"/>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Phone"/>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Boarding Point"/>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Destination Point"/>
         </div>
         <div className="col-md-6 mb-3">
            <select id="inputState" className="form-control">
               <option selected>Allocte Bus</option>
               <option>XYZ</option>
               <option>abc</option>
               <option>sew</option>
            </select>
         </div>
         <div className="col-md-6 mb-3">
            <input type="Date" className="form-control" placeholder="Last name"/>
         </div>
         <div className="col-md-12 mb-3">
            <button className="btn btn-primary btn-block" type="submit">Register</button>
         </div>
      </div>
   </Modal.Body>
</Modal>
<Modal show={isOpen1} onHide={hideModal1}>
   <Modal.Body className="p_50">
      <div className="row mt-3">
         <div className='col-12 text-center mb-3'>
            <h4>Filters</h4>
         </div>
         <div className="col-md-6 mb-3">
            <label>From</label>
            <input type="date" className="form-control" placeholder="Full Name"/>
         </div>
         <div className="col-md-6 mb-3">
         <label>To</label>
            <input type="date" className="form-control" placeholder="Email"/>
         </div>
         <div className="col-md-12 mb-3">
            <button className="btn btn-primary btn-block" type="submit">Apply Filters</button>
         </div>
      </div>
   </Modal.Body>
</Modal>

<Modal show={isOpen2} onHide={hideModal2}>
   <Modal.Body className="p_50">
      <div className="row mt-3">
         <div className='col-12 text-center mb-3'>
            <h4>Grouping</h4>
         </div>
         <div className="col-md-6 mb-3">
            <input type="type" className="form-control" placeholder="Group Name"/>
         </div>
         <div className="col-md-6 mb-3">
            <input type="type" className="form-control" placeholder="Route"/>
         </div>
         <div className="col-md-12 mb-3">
            <button className="btn btn-primary btn-block" type="submit">Create Group</button>
         </div>
      </div>
   </Modal.Body>
</Modal>
</>
)
}
export default PassengerList;