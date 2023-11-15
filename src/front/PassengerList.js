import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from "react-bootstrap/Modal";

import { CSVLink, /* CSVDownload */ } from "react-csv";
import { useParams } from 'react-router-dom';
import { getAllOrganisationUsers, createUser, deleteUser, importUser, getSinglePassenger, updatePassenger } from '../services/UserService';

import { toast } from 'react-toastify';

import swal from 'sweetalert';


   export const PassengerList = () => {

        const params = useParams();

      const [users, setUsers] = useState([])
      const [numberOfUsers, setNumberOfUsers] = useState(0)

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

      const [file, setFile] = useState();

      const arr = [];
      const handleOnChange = (position) => {
         //console.log(position);
         if(!arr.includes(position)){          //checking weather array contain the id
            arr.push(position);               //adding to array because value doesnt exists
         }else{
            arr.splice(arr.indexOf(position), 1);  //deleting
         }
         console.log(arr);  
      };

      const handleChange = (e) => {
         const { name, value } = e.target;
         setFormValues({ ...formValues, [name]: value });
         console.log(formValues);    
      };

      const handleGroupChange = (e) => {
         //setFile(e.target.files[0]);
        const { name, value } = e.target;
         setFormValues({ ...formValues, [name]: value });
         console.log(e.target.files[0]); 
      };


      const handleGroupSubmit = (e) => {
         e.preventDefault();
         console.log('jjhj');
/*
         const url = 'http://localhost:5000/api/v1/passengers/import';
         const formData = new FormData();
         formData.append('file', file);
         formData.append('fileName', file.name);
         const config = {
           headers: {
             'content-type': 'multipart/form-data',
           },
         };
         axios.post(url, formData, config).then((response) => {
           console.log(response.data);
         });*/

           //setFormErrors(validate(formValues));
           setIsSubmit(true);
           console.log(formValues);
  
           importUser(formValues)
              .then(response => {
              console.log(response);
              //setNumberOfUsers(numberOfUsers+1)
              fetchAllUsers();
              setIsOpen2(false);
  
              toast.success('KKKJKJ', { position: toast.POSITION.TOP_RIGHT });
  
           });
         

      }
      
      
      const handleSubmit = (e) => {
         e.preventDefault();
         console.log('jjhj');
         //setFormErrors(validate(formValues));
         setIsSubmit(true);
         console.log(formValues);

         createUser(formValues)
            .then(response => {
            console.log(response);
            //setNumberOfUsers(numberOfUsers+1)
            fetchAllUsers();
            setIsOpen1(false);

            toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

         });

         //console.log('done');
         //console.log($(this).attr('id') );
         //console.log(e.target.id);
        // navigate('/home');
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

         createUser(formValues)
            .then(response => {

            console.log(response);

            fetchAllUsers();
            setIsOpen1(false);
            toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

         });
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

         updatePassenger(formEditValues).then(response => {
            console.log(response);
            fetchAllUsers();
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

                  deleteUser(id).then(response => {
                     console.log(response);
                     fetchAllUsers();
                     toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
                  });

               }
            });
      }

      const fetchAllUsers = () => {
            getAllOrganisationUsers(params.id).then(users => {
             console.log(users)
             setUsers(users);
             setNumberOfUsers(users.length)
            });
       }

      useEffect(() => {

         console.log('ggg');
         getAllOrganisationUsers(params.id).then(users => {
            console.log(users)
            setUsers(users);
            setNumberOfUsers(users.length)
           });


         console.log(formErrors);
         if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
            console.log('done');
            setFormValues({});
            setIsOpen3(false);
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
                   {/*<td><input type="checkbox" onChange={() => handleOnChange(user.id)} /></td>*/}
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.unique_identity}</td>
                    <td>{user.boarding_point}</td>
                    <td>{user.destination_point}</td>
                    <td>{user.minimum_hour}</td>
                    <td>{user.maximum_hour}</td>
                    {/*<td> <i className="fa fa-pencil text-primary" onClick={() => onEditClick(user.id)}></i> &nbsp;<i class="fa fa-trash-o text-danger" onClick={() => handleDeleteSubmit(user.id)} ></i></td>*/}
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
                     {/*<spam className="flot-right-lg"> 	
                        <button className="btn btn-primary btn-sm" type="button" onClick={showModal1}>Add Passenger</button>&nbsp;&nbsp;
                        <button className="btn btn-danger btn-sm" type="button"onClick={showModal2}>Grouping</button>&nbsp;&nbsp;
                        <button className="btn btn-secondary btn-sm" type="button"onClick={showModal3}>CSV Import</button>&nbsp;&nbsp;
                        <CSVLink className="btn btn-info btn-sm" type="button" data={users}>CSV Export</CSVLink>
                     </spam>*/}
                  </h4>
                  <div className="table-responsive mt-4">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                                {/*<th> # </th>*/}
                              <th> ID </th>
                              <th> Name </th>
                              <th> Email </th>
                              <th> Phone </th>
                              <th> Identity </th>
                              <th> Pickup</th>
                              <th> Dropoff</th>
                              <th> Minimum Time</th>
                              <th> Maximum Time</th>
                              {/*<th> Action </th>*/}
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
               <input type="text" name="boarding_point" onChange={handleAddChange} className="form-control" placeholder="Pickup"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="destination_point" onChange={handleAddChange} className="form-control" placeholder="Dropoff"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="minimum_hour" onChange={handleAddChange} className="form-control" placeholder="Minimum Time"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="maximum_hour" onChange={handleAddChange} className="form-control" placeholder="Maximum Time"/>
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
      <div className="row mt-3">
         <form onSubmit={handleSubmit} >
         <div className='col-12 text-center mb-3'>
            <h4>Grouping</h4>
         </div>
         <div className="col-md-6 mb-3">
            <input type="text" name="group" value={formValues.group} onChange={handleChange} className="form-control" placeholder="Group Name"/>
         </div>
         <p className="danger">{ formErrors.group }</p>

         <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Route"/>
         </div>
         <div className="col-md-12 mb-3">
            <button className="btn btn-primary btn-block" type="submit">Create Group</button>
         </div>
         </form>
      </div>
   </Modal.Body>
</Modal>

<Modal show={isOpen3} onHide={hideModal3}>
   <Modal.Body className="p_50">
   <form onSubmit={handleGroupSubmit} enctype="multipart/form-data" method="post">
      <div className="row mt-3">
         <div className='col-12 text-center mb-3'>
            <h4>CSV Import</h4>
         </div>
         <div className="col-md-6 mb-3">
           
            <input type="file" value={formValues.uploadfile} onChange={handleGroupChange} className="form-controls" name="uploadfile" accept='csv'/>
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
               <input type="text" name="boarding_point" value={formEditValues.boarding_point} onChange={handleEditChange} className="form-control" placeholder="Pickup"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="destination_point" value={formEditValues.destination_point} onChange={handleEditChange} className="form-control" placeholder="Dropoff"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="minimum_hour" value={formEditValues.minimum_hour} onChange={handleEditChange} className="form-control" placeholder="Minimum Time"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="maximum_hour" value={formEditValues.maximum_hour} onChange={handleEditChange} className="form-control" placeholder="Maximum Time"/>
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
export default PassengerList;