import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from "react-bootstrap/Modal";

import { useAuth } from './Auth';

import { CSVLink, /* CSVDownload */ } from "react-csv";
import { getAllVehicles, createVehicle, deleteVehicle, getSingleVehicle, updateVehicle, getAllDrivers, getAllOrganisationDrivers, getAllOrganisationVehicles } from '../services/UserService';

import { toast } from 'react-toastify';

import swal from 'sweetalert';
import axios from 'axios';

export const VehicleRoute = () => {

      const auth = useAuth()

      const [vehicles, setVehicles] = useState([])
      const [numberOfVehicles, setNumberOfVehicles] = useState(0)
      const [file, setFile] = useState();

      const [drivers, setDrivers] = useState([])
      const [numberOfDrivers, setNumberOfDrivers] = useState(0)


      const [isOpen1, setIsOpen1] = React.useState(false);
      const showModal1 = () => { setIsOpen1(true);};
      const hideModal1 = () => { setIsOpen1(false);};

      const [isOpen2, setIsOpen2] = React.useState(false);
      const showModal2 = () => { setIsOpen2(true);};
      const hideModal2 = () => { setIsOpen2(false);};

      const [isOpen4, setIsOpen4] = React.useState(false);
      //const showModal4 = () => { setIsOpen4(true);};
      const hideModal4 = () => { setIsOpen4(false);};

      const initialValues = {};
      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState({});
      const [isSubmit, setIsSubmit] = useState(false);

      const initialEditValues = {};
      const [formEditValues, setEditFormValues] = useState(initialEditValues);
      //const [formEditErrors, setEditFormErrors] = useState({});
      const [isEditSubmit, setIsEditSubmit] = useState(false);

      

      const handleImportChange = (e) => {
         setFile(e.target.files[0]);
      };
   
      const handleImportSubmit = (e) => {
         e.preventDefault();
   
         const formData = new FormData()
         formData.append('user_id', auth.user.id);
         formData.append('org_id', auth.user.org_id);
         formData.append('uploadfile', file)
         axios.post("http://localhost:5000/api/v1/vehicles/import", formData, {
         }).then(response => {
   
               console.log(response)
   
               fetchAllVehicles();
               setIsOpen2(false);
               toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });
         })
   
      }


      const handleAddChange = (e) => {
         const { name, value } = e.target;
         setFormValues({ ...formValues, [name]: value });
         console.log(formValues);    
      };

      const handleAddSubmit = (e) => {
         e.preventDefault();

         setFormErrors(validate(formValues));
         setIsSubmit(true);
         formValues.user_id = auth.user.id;
         formValues.org_id = auth.user.org_id;

         createVehicle(formValues)
            .then(response => {

            console.log(response);

            fetchAllVehicles();
            setIsOpen1(false);
            toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

         });
      }

      const onEditClick = (id) => {
         getSingleVehicle(id).then(response => {
            //console.log(response);
            setEditFormValues(response)
            setIsOpen4(true);
         });
      }

      const handleEditChange = (e) => {
         const { name, value } = e.target;
         setEditFormValues({ ...formEditValues, [name]: value });
         //console.log(formEditValues);    
      };

      const handleEditSubmit = (e) => {
         e.preventDefault();

         //setEditFormErrors(editValidate(formEditValues));
         setIsEditSubmit(true);

         updateVehicle(formEditValues).then(response => {
            console.log(response);
            fetchAllVehicles();
            setIsOpen4(false);
            toast.success('Updated Successfully!', { position: toast.POSITION.TOP_RIGHT });       
         });
      }

      const handleDeleteSubmit = (id) => {

            swal({
               title: "Are you sure you want to delete this ?",
               //text: "Once deleted, you will not be able to recover this imaginary file!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
            })
            .then((willDelete) => {
               if (willDelete) {

                  deleteVehicle(id).then(response => {
                     console.log(response);
                     fetchAllVehicles();
                     toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
                  });

               }
            });
      }

      const fetchAllVehicles = () => {
         
         if(auth.user.type == 2){

            getAllOrganisationVehicles(auth.user.org_id).then(vehicles => {
               console.log(vehicles)
               setVehicles(vehicles);
               setNumberOfVehicles(vehicles.length)
             });

         }else{

            getAllVehicles().then(vehicles => {
              console.log(vehicles)
              setVehicles(vehicles);
              setNumberOfVehicles(vehicles.length)
            });

         }

       }

      useEffect(() => {

         if(auth.user.type == 2){

            getAllOrganisationDrivers(auth.user.org_id).then(drivers => {
               console.log(drivers)
               setDrivers(drivers);
               setNumberOfDrivers(drivers.length)
            });

            getAllOrganisationVehicles(auth.user.org_id).then(vehicles => {
               console.log(vehicles)
               setVehicles(vehicles);
               setNumberOfVehicles(vehicles.length)
             });

         }else{

            getAllDrivers().then(drivers => {
               console.log(drivers)
               setDrivers(drivers);
               setNumberOfDrivers(drivers.length)
            });

            getAllVehicles().then(vehicles => {
              console.log(vehicles)
              setVehicles(vehicles);
              setNumberOfVehicles(vehicles.length)
            });

         }


         console.log(formErrors);
         if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
            console.log('done');
            setFormValues({});
            setIsOpen1(false);
         }
      }, [formErrors]);

      const validate = (values) => {
         const errors = {};
         const regex = '';
         /*if(!values.name){
            errors.name = "Name is required!";
         }*/
         return errors;
      }


    //console.log('vehicles length:::', vehicles.length)
    //if (vehicles.length === 0) return null
  
    const VehicleRow = (vehicle,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                 <td>{index + 1}</td>
                  <td>{vehicle.vehicle_number}</td>
                  <td>{vehicle.boarding_point}</td>
                  <td>{vehicle.destination_point}</td>
                  <td>{vehicle.vehicle_route}</td>
                  <td>{vehicle.driver_name}</td>
                  <td> <i className="fa fa-pencil text-primary" onClick={() => onEditClick(vehicle.id)}></i> &nbsp;<i class="fa fa-trash-o text-danger" onClick={() => handleDeleteSubmit(vehicle.id)} ></i></td>
              </tr>
          )
    }




    const vehicleTable = vehicles.map((vehicle,index) => VehicleRow(vehicle,index))

return (
<>    
<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-12 grid-margin">
            <div className="card">
               <div className="card-body">
                  <h4 className="card-title">
                  Vehicle List
                        <spam className="flot-right-lg">
                        <button className="btn btn-primary btn-sm" type="button" onClick={showModal1}>Add Vehicle</button>&nbsp;&nbsp;
                        <button className="btn btn-secondary btn-sm" type="button"onClick={showModal2}>CSV Import</button>&nbsp;&nbsp;
                        {/*<button className="btn btn-secondary btn-sm" type="button"onClick={showModal1}>Filters</button>&nbsp;&nbsp;*/}
                       
                        <CSVLink className="btn btn-info btn-sm" type="button" filename='Vehicles' data={vehicles}>CSV Export</CSVLink>&nbsp;&nbsp;
                        <a className="btn btn-warning btn-sm" href='/assets/format/Vehicles.csv'>Download Format</a>&nbsp;&nbsp;
                        </spam>
                  </h4>
                  <div className="table-responsive mt-4">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                              <th> # </th>
                              <th> Vehicle Number	 </th>
                              <th> Boarding Point	 </th>
                              <th> Destination Point	 </th>
                              <th> Vehicle Route	</th>
                              <th> Driver Name  </th>
                              <th> Action </th>
                           </tr>
                        </thead>
                        <tbody>
                           {vehicleTable}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</main>

<Modal show={isOpen1} onHide={hideModal1}>
   <Modal.Body className="p_50">
      <form onSubmit={handleAddSubmit} >
         <div className="row mt-3">
            <div className='col-12 text-center mb-3'>
               <h4>Add Vehicle</h4>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="vehicle_number" onChange={handleAddChange} className="form-control" placeholder="Vehicle Number" required/>
            </div>
         
            <div className="col-md-6 mb-3">
               <input type="text" name="boarding_point" onChange={handleAddChange} className="form-control" placeholder="Boarding Point"/>
            </div>

            <div className="col-md-12 mb-3">
               <input type="text" name="destination_point" onChange={handleAddChange} className="form-control" placeholder="Destination Point"/>
            </div>
            
            <div className="col-md-6 mb-3">
               <input type="text" name="vehicle_route" onChange={handleAddChange} className="form-control" placeholder="Vehicle Route"/>
            </div>
            <div className="col-md-6 mb-3">
               {/*<input type="text" name="driver_id" onChange={handleAddChange} className="form-control" placeholder="Driver Name"/>*/}
               <select name="driver_id" onChange={handleAddChange} className="form-control form-control-lg">
                  <option value="">Select Driver</option>
                  {drivers.map((e, key) => {
                     return <option key={key} value={e.id}>{e.name}</option>;
                  })}
               </select>
            </div>

            <div className="col-md-12 mb-3">
               <button className="btn btn-primary btn-block" type="submit">Submit</button>
            </div>
         </div>
      </form>
   </Modal.Body>
</Modal>


<Modal show={isOpen2} onHide={hideModal2}>
   <Modal.Body className="p_50">
   <form onSubmit={handleImportSubmit} enctype="multipart/form-data" method="post">
      <div className="row mt-3">
         <div className='col-12 text-center mb-3'>
            <h4>CSV Import</h4>
         </div>
         <div className="col-md-6 mb-3">
           
            <input type="file" value={formValues.uploadfile} onChange={handleImportChange} className="form-controls" name="uploadfile" accept='csv'/>
         </div>
         <div className="col-md-12 mb-3">
            <button className="btn btn-primary btn-block" type="submit">Submit</button>
         </div>
      </div>
      </form>
   </Modal.Body>
</Modal>

<Modal show={isOpen4} onHide={hideModal4}>
   <Modal.Body className="p_50">
      <form onSubmit={handleEditSubmit} >
         <div className="row mt-3">
            <div className='col-12 text-center mb-3'>
               <h4>Edit Vehicle</h4>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="vehicle_number" value={formEditValues.vehicle_number} onChange={handleEditChange} className="form-control" placeholder="Vehicle Number" required/>
            </div>
         
            <div className="col-md-6 mb-3">
               <input type="text" name="boarding_point" value={formEditValues.boarding_point} onChange={handleEditChange} className="form-control" placeholder="Boarding Point"/>
            </div>

            <div className="col-md-12 mb-3">
               <input type="text" name="destination_point" value={formEditValues.destination_point} onChange={handleEditChange} className="form-control" placeholder="Destination Point"/>
            </div>
            
            <div className="col-md-6 mb-3">
               <input type="text" name="vehicle_route" value={formEditValues.vehicle_route} onChange={handleEditChange} className="form-control" placeholder="Vehicle Route"/>
            </div>
            <div className="col-md-6 mb-3">
               {/*<input type="text" name="driver_id" value={formEditValues.driver_id} onChange={handleEditChange} className="form-control" placeholder="Driver Name"/>*/}
               <select name="driver_id" value={formEditValues.driver_id} onChange={handleEditChange} className="form-control form-control-lg">
                  <option value="">Select Driver</option>
                  {drivers.map((e, key) => {
                     return <option key={key} value={e.id}>{e.name}</option>;
                  })}
               </select>
            </div>

            <div className="col-md-12 mb-3">
               <button className="btn btn-primary btn-block" type="submit">Submit</button>
            </div>
         </div>
      </form>
   </Modal.Body>
</Modal>

</>
)
}
export default VehicleRoute;