import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from "react-bootstrap/Modal";

import { useAuth } from './Auth';

import { CSVLink, /* CSVDownload */ } from "react-csv";
import { useParams } from 'react-router-dom';
import { getAllUsers, getAllOrganisationUsers, createUser, deleteUser, importUser, getSinglePassenger, updatePassenger, getAllGroups, updateUserInGroup, getAllVehiclePassengers, getAllUserGroups } from '../services/UserService';

import { toast } from 'react-toastify';

import swal from 'sweetalert';
import axios from 'axios';

   export const Bookings = () => {

      const auth = useAuth()
      const params = useParams();

      const [users, setUsers] = useState([])
      const [numberOfUsers, setNumberOfUsers] = useState(0)
      const [file, setFile] = useState();

      const [groups, setGroups] = useState([])
      const [numberOfGroups, setNumberOfGroups] = useState(0)
      const [selectUsers, setSelectUsers] = useState([])
      

      const [isOpen1, setIsOpen1] = React.useState(false);
      const showModal1 = () => { setIsOpen1(true);};
      const hideModal1 = () => { setIsOpen1(false);};

      const [isOpen2, setIsOpen2] = React.useState(false);
      const showModal2 = () => { setIsOpen2(true);};
      const hideModal2 = () => { setIsOpen2(false);};

      const [isOpen3, setIsOpen3] = React.useState(false);
      const showModal3 = () => { setIsOpen3(true);};
      const hideModal3 = () => { setIsOpen3(false);};

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

      const [isSubscribed, setIsSubscribed] = useState(false);

      const handleOnChange = event => {

         var position = event.target.id;

         console.log(position);

         if (event.target.checked) {

            console.log('Checkbox is checked');
            
            getSinglePassenger(position).then(response => {

               if(response.name =='' | response.name =='' | response.email =='' | response.phone =='' | response.unique_identity =='' | response.pickup ==''
               | response.dropoff =='' | response.minimum_time =='' | response.maximum_time ==''){

                  toast.error("Passenger Information incomplete!", { position: toast.POSITION.TOP_RIGHT });

                  event.target.checked = false;

               } else if(response.group_id !=''){

                  toast.error("Passenger have already in another group!", { position: toast.POSITION.TOP_RIGHT });

                  event.target.checked = false;
                  
               } else if(!selectUsers.includes(position)){          //checking weather array contain the id
                  
                  selectUsers.push(position);               //adding to array because value doesnt exists
                  setSelectUsers(selectUsers); 
                  console.log(selectUsers); 

               }else{
                  selectUsers.splice(selectUsers.indexOf(position), 1);  //deleting
                  console.log(selectUsers); 
               }
            
            });

         } else {

            selectUsers.splice(selectUsers.indexOf(position), 1);  //deleting
            console.log(selectUsers);
            console.log('Checkbox is NOT checked');
         }

        


            /*if(!selectUsers.includes(position)){          //checking weather array contain the id
               selectUsers.push(position);               //adding to array because value doesnt exists
            }else{
               selectUsers.splice(selectUsers.indexOf(position), 1);  //deleting
            }
            console.log('test');  
            console.log(selectUsers); 
            setSelectUsers(selectUsers); */

      };

      const handleChange = (e) => {
         const { name, value } = e.target;
         setFormValues({ ...formValues, [name]: value });
         console.log(formValues);    
      };

      const handleImportChange = (e) => {
         setFile(e.target.files[0]);
      };

      const handleImportSubmit = (e) => {
         e.preventDefault();

         const formData = new FormData()
         formData.append('user_id', auth.user.id);
         formData.append('org_id', auth.user.org_id);
         formData.append('uploadfile', file)
         axios.post("http://localhost:5000/api/v1/passengers/import", formData, {
         }).then(response => {

               console.log(response)

               fetchAllUsers();
               setIsOpen3(false);
               toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });
         })

      }
      
      
      const handleSubmit = (e) => {
         e.preventDefault();
         console.log('jjhj');
         //setFormErrors(validate(formValues));
         setIsSubmit(true);
         console.log(selectUsers);
         formValues.user_ids = selectUsers;
         console.log(formValues);
         
         

         if (typeof formValues.group_id == 'undefined') {

            toast.error("Please Select a group!", { position: toast.POSITION.TOP_RIGHT });

         } else if(selectUsers.length == 0){

            setIsOpen2(false);
            toast.error("Please Select Passengers First!", { position: toast.POSITION.TOP_RIGHT });
         
         }else{
               //toast.success('gg', { position: toast.POSITION.TOP_RIGHT });
            
               updateUserInGroup(formValues)
                  .then(response => {
                  console.log(response);
                  fetchAllUsers();
                  setIsOpen2(false);

                  toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

                 // event.target.checked = false;
                  var checkboxes = document.getElementsByName('isSubscribed');
                  for (var checkbox of checkboxes) {
                     checkbox.checked = false;
                  }
                  setSelectUsers([]);

               });
         }
         
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
         formValues.type = 4;
         formValues.user_id = auth.user.id;
         formValues.org_id = auth.user.org_id;

         //alert(formValues.minimum_time);
         if (formValues.minimum_time > formValues.maximum_time) {

            toast.error("Cannot set min to be greater than the maximum time!", { position: toast.POSITION.TOP_RIGHT });

         }else{

            createUser(formValues)
               .then(response => {

               console.log(response);
               //setFormValues({});
               fetchAllUsers();
               setIsOpen1(false);
               toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

            });
         }
      }

      const onEditClick = (id) => {
         getSinglePassenger(id).then(response => {
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

         if (formEditValues.minimum_time > formEditValues.maximum_time) {

            toast.error("Cannot set min to be greater than the maximum time!", { position: toast.POSITION.TOP_RIGHT });

         }else{

            updatePassenger(formEditValues).then(response => {
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

                  deleteUser(id).then(response => {
                     console.log(response);
                     fetchAllUsers();
                     toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
                  });

               }
            });
      }

      const fetchAllUsers = () => {

         if(auth.user.type == 1){

            getAllUsers().then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }else if(auth.user.type == 2){

            getAllOrganisationUsers(auth.user.org_id).then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }else{

            getAllVehiclePassengers(auth.user.id).then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }
      }

      useEffect(() => {


         if(auth.user.type == 1){
            getAllGroups()
            .then(groups => {
               console.log(groups)
               setGroups(groups);
               setNumberOfGroups(groups.length)
            });
         }else{
   
            getAllUserGroups(auth.user.id)
            .then(groups => {
               console.log(groups)
               setGroups(groups);
               setNumberOfGroups(groups.length)
            });
   
         }

         if(auth.user.type == 1){

            getAllUsers().then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });


         }else if(auth.user.type == 2){

            getAllOrganisationUsers(auth.user.org_id).then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }else{

            getAllVehiclePassengers(auth.user.id).then(users => {
               console.log(users)
               setUsers(users);
               setNumberOfUsers(users.length)
            });

         }


         console.log(formErrors);
         /*if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
            console.log('done');
            setFormValues({});
            setIsOpen3(false);
         }*/
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
         
         let Action;
         if(auth.user.type == 1 || auth.user.type == 2){

            Action = <td> <i className="fa fa-pencil text-primary" onClick={() => onEditClick(user.id)}></i> &nbsp;<i class="fa fa-trash-o text-danger" onClick={() => handleDeleteSubmit(user.id)} ></i></td>
                
         }else{
            
            Action = <td>{user.vehicle_number}</td>;
         }
         
  
          return(
                <tr key = {index} className={index%2 === 0?'odd':'even'}>
                   <td><input type="checkbox" value={isSubscribed} onChange={handleOnChange} id={user.id} name="isSubscribed" /></td>
                    {/*<td>{index + 1}</td>*/}
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.unique_identity}</td>
                    <td>{user.pickup}</td>
                    <td>{user.dropoff}</td>
                    <td>{user.minimum_time}</td>
                    <td>{user.maximum_time}</td>
                    <td>{user.group_name}</td>
                     {Action}
                   </tr>
            )
      }
  
      const userTable = users.map((user,index) => UserRow(user,index))

      


      //



      /*function loginHandle(e){
         e.preventDefault();
         //console.log('jjhj');
         //console.log($(this).attr('id') );
         console.log(e.target.value);
        // navigate('/home');
      }*/
/*
      <button className="btn btn-primary btn-sm" type="button" onClick={showModal1}>Add Passenger</button>&nbsp;&nbsp;
      <button className="btn btn-danger btn-sm" type="button"onClick={showModal2}>Grouping</button>&nbsp;&nbsp;
      <button className="btn btn-secondary btn-sm" type="button"onClick={showModal3}>CSV Import</button>&nbsp;&nbsp;
      */

      let Options, Title;
      if(auth.user.type == 1 || auth.user.type == 2){
         Title = 'Action';
         Options =  <span>
            <button className="btn btn-primary btn-sm" type="button" onClick={showModal1}>Add Passenger</button>&nbsp;&nbsp;
            <button className="btn btn-danger btn-sm" type="button"onClick={showModal2}>Grouping</button>&nbsp;&nbsp;
            <button className="btn btn-secondary btn-sm" type="button"onClick={showModal3}>CSV Import</button>&nbsp;&nbsp;
            <CSVLink className="btn btn-info btn-sm" type="button" filename='Passengers' data={users}>CSV Export</CSVLink>&nbsp;&nbsp;
            <a className="btn btn-warning btn-sm" href='/assets/format/Passengers.csv'>Download Format</a>&nbsp;&nbsp;
            
         </span>;
         
  
      }else{
         Options ='';
         Title = 'Vehicle Number';
         Options =  <span>
               <CSVLink className="btn btn-info btn-sm" type="button" filename='Passengers' data={users}>CSV Export</CSVLink>&nbsp;&nbsp;
            </span>
 
      }

return (
<>    

<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-12 grid-margin">
            <div className="card">
               <div className="card-body">
                  <h4 className="card-title">
                     Passenger List 
                     <spam className="flot-right-lg"> 	
                       {Options}
                     </spam>
                  </h4>
                  <div className="table-responsive mt-4">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                           <th> # </th>
                              <th> ID </th>
                              <th> Name </th>
                              <th> Email </th>
                              <th> Phone </th>
                              <th> Identity </th>
                              <th> Pickup</th>
                              <th> Dropoff</th>
                              <th> Minimum Time</th>
                              <th> Maximum Time</th>
                              <th> Group Name</th>
                              <th> {Title} </th>
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
               <h4>Add Passenger</h4>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="name" onChange={handleAddChange} className="form-control" placeholder="Full Name" required/>
            </div>
         
            <div className="col-md-6 mb-3">
               <input type="text" name="email" onChange={handleAddChange} className="form-control" placeholder="Email"/>
            </div>
            {/*<div className="col-md-6 mb-3">
               <input type="text" name="age" onChange={handleAddChange} className="form-control" placeholder="Age"/>
            </div>*/}
            <div className="col-md-6 mb-3">
               <input type="text" name="phone" onChange={handleAddChange} className="form-control" placeholder="Phone"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="unique_identity" onChange={handleAddChange} className="form-control" placeholder="Identity"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="pickup" onChange={handleAddChange} className="form-control" placeholder="Pickup"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="dropoff" onChange={handleAddChange} className="form-control" placeholder="Dropoff"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="time" name="minimum_time" onChange={handleAddChange} className="form-control" placeholder="Minimum Time" required/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="time" name="maximum_time" onChange={handleAddChange} className="form-control" placeholder="Maximum Time" required/>
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
   <form onSubmit={handleSubmit} >
      <div className="row mt-3">
         
         <div className='col-12 text-center mb-3'>
            <h4>Grouping</h4>
         </div>
         <div className="col-md-6 mb-3">
         <select name="group_id" value={formValues.group_id} onChange={handleChange} className="form-control form-control-lg">
            <option value="">Select Group</option>
            {groups.map((e, key) => {
               return <option key={key} value={e.id}>{e.name}</option>;
            })}
         </select>
         </div>

         <div className="col-md-6 mb-3">
            <button className="btn btn-primary btn-block" type="submit">Assign to group</button>
         </div>
         
      </div>
      </form>
   </Modal.Body>
</Modal>

<Modal show={isOpen3} onHide={hideModal3}>
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
               <h4>Edit Passenger</h4>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="name" value={formEditValues.name} onChange={handleEditChange} className="form-control" placeholder="Full Name" required/>
            </div>
         
            <div className="col-md-6 mb-3">
               <input type="text" name="email" value={formEditValues.email} onChange={handleEditChange} className="form-control" placeholder="Email"/>
            </div>
            {/*<div className="col-md-6 mb-3">
               <input type="text" name="age" value={formEditValues.age} onChange={handleEditChange} className="form-control" placeholder="Age"/>
            </div>*/}
            <div className="col-md-6 mb-3">
               <input type="text" name="phone" value={formEditValues.phone} onChange={handleEditChange} className="form-control" placeholder="Phone"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="unique_identity" value={formEditValues.unique_identity} onChange={handleEditChange} className="form-control" placeholder="Identity"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="pickup" value={formEditValues.pickup} onChange={handleEditChange} className="form-control" placeholder="Pickup"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="dropoff" value={formEditValues.dropoff} onChange={handleEditChange} className="form-control" placeholder="Dropoff"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="time" name="minimum_time" value={formEditValues.minimum_time} onChange={handleEditChange} className="form-control" placeholder="Minimum Time"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="time" name="maximum_time" value={formEditValues.maximum_time} onChange={handleEditChange} className="form-control" placeholder="Maximum Time"/>
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
export default Bookings;