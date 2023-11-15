import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from "react-bootstrap/Modal";

import { useAuth } from './Auth';

import { CSVLink, /* CSVDownload */ } from "react-csv";
import { getAllDrivers, createDriver, deleteDriver, getSingleDriver, updateDriver, getAllOrganisationDrivers } from '../services/UserService';

import { toast } from 'react-toastify';

import swal from 'sweetalert';
import axios from 'axios';


export const VehicleDriver = () => {

      const auth = useAuth()

      const [users, setUsers] = useState([])
      const [numberOfUsers, setNumberOfUsers] = useState(0)
      const [file, setFile] = useState();

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
         axios.post("http://localhost:5000/api/v1/drivers/import", formData, {
         }).then(response => {
   
               console.log(response)
   
               fetchAllUsers();
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
         formValues.type = 3;
         formValues.user_id = auth.user.id;
         formValues.org_id = auth.user.org_id;

         if(formValues.password != formValues.cpassword){

            toast.error('Password Mismatch!', { position: toast.POSITION.TOP_RIGHT }); 
   
         }else{

            delete formValues.cpassword;

            createDriver(formValues)
               .then(response => {

               console.log(response);

               fetchAllUsers();
               setIsOpen1(false);
               toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

            });
         }
      }

      const onEditClick = (id) => {
         getSingleDriver(id).then(response => {
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

         if(formEditValues.password != formEditValues.cpassword){

            toast.error('Password Mismatch!', { position: toast.POSITION.TOP_RIGHT }); 
   
         }else{

            delete formEditValues.cpassword;

            updateDriver(formEditValues).then(response => {
               console.log(response);
               fetchAllUsers();
               setIsOpen4(false);
               toast.success('Updated Successfully!', { position: toast.POSITION.TOP_RIGHT });       
            });
         }
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

                  deleteDriver(id).then(response => {
                     console.log(response);
                     fetchAllUsers();
                     toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
                  });

               }
            });
      }

      const fetchAllUsers = () => {
         

         if(auth.user.type == 2){

            getAllOrganisationDrivers(auth.user.org_id).then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }else{

            getAllDrivers()
            .then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }

       }

      useEffect(() => {

         console.log('ggg');


       if(auth.user.type == 2){

            getAllOrganisationDrivers(auth.user.org_id).then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }else{

            getAllDrivers()
            .then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }


         console.log(formErrors);
         if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
            console.log('done');
            setFormValues({});
         }
      }, [formErrors]);

      const validate = (values) => {
         const errors = {};
         const regex = '';
         if(!values.name){
            errors.name = "Name is required!";
         }
         return errors;
      }




       
      //console.log('users length:::', users.length)
      // if (users.length === 0) return null
  
      const UserRow = (user,index) => {
  
          return(
                <tr key = {index} className={index%2 === 0?'odd':'even'}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td> <i className="fa fa-pencil text-primary" onClick={() => onEditClick(user.id)}></i> &nbsp;<i class="fa fa-trash-o text-danger" onClick={() => handleDeleteSubmit(user.id)} ></i></td>
                </tr>
            )
      }
  
      const userTable = users.map((user,index) => UserRow(user,index))

      
   
return (
<>  

<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-12 grid-margin">
            <div className="card">
               <div className="card-body">
                  <h4 className="card-title">
                  Vehicle  Drivers List 
                    <spam className="flot-right-lg">
                        <button className="btn btn-primary btn-sm" type="button" onClick={showModal1}>Add Vehicle Driver</button>&nbsp;&nbsp;
                        <button className="btn btn-secondary btn-sm" type="button"onClick={showModal2}>CSV Import</button>&nbsp;&nbsp;
                           {/*<button className="btn btn-secondary btn-sm" type="button"onClick={showModal1}>Filters</button>&nbsp;&nbsp;*/}
                        
                        <CSVLink className="btn btn-info btn-sm" type="button" filename='Drivers' data={users}>CSV Export</CSVLink>&nbsp;&nbsp;
                        <a className="btn btn-warning btn-sm" href='/assets/format/Drivers.csv'>Download Format</a>&nbsp;&nbsp;
                        
                     </spam>
                  
                  </h4>
                  <div className="table-responsive mt-4">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                              <th> ID </th>
                              <th> Name </th>
                              <th> Email </th>
                              <th> Phone </th>
                              <th> Action </th>
                           </tr>
                        </thead>
                        <tbody>
                           {userTable}
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
               <h4>Add Driver</h4>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="name" onChange={handleAddChange} className="form-control" placeholder="Driver Name" required/>
            </div>
         
            <div className="col-md-6 mb-3">
               <input type="text" name="email" onChange={handleAddChange} className="form-control" placeholder="Email" required/>
            </div>

            <div className="col-md-12 mb-3">
               <input type="text" name="phone" onChange={handleAddChange} className="form-control" placeholder="Phone"/>
            </div>
            
            <div className="col-md-6 mb-3">
               <input type="password" name="password" value={formValues.password} onChange={handleAddChange} className="form-control" placeholder="Password" required/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="password" name="cpassword" value={formValues.cpassword} onChange={handleAddChange} className="form-control" placeholder="Password Confirmation" required/>
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
               <h4>Edit Driver</h4>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="name" value={formEditValues.name} onChange={handleEditChange} className="form-control" placeholder="Driver Name" required/>
            </div>
         
            <div className="col-md-6 mb-3">
               <input type="text" name="email" value={formEditValues.email} onChange={handleEditChange} className="form-control" placeholder="Email"/>
            </div>

            <div className="col-md-12 mb-3">
               <input type="text" name="phone" value={formEditValues.phone} onChange={handleEditChange} className="form-control" placeholder="Phone"/>
            </div>
            
            <div className="col-md-6 mb-3">
               <input type="password" name="password" value={formEditValues.password} onChange={handleEditChange} className="form-control" placeholder="Password"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="password" name="cpassword" value={formEditValues.cpassword} onChange={handleEditChange} className="form-control" placeholder="Password Confirmation"/>
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
export default VehicleDriver;