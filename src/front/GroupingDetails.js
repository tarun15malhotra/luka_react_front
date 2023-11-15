import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from "react-bootstrap/Modal";

import { useAuth } from './Auth';

import { CSVLink, /* CSVDownload */ } from "react-csv";
import { getAllGroups, createGroup, deleteGroup, getSingleGroup, updateGroup, getAllVehicles, getAllUserGroups } from '../services/UserService';

import { toast } from 'react-toastify';

import swal from 'sweetalert';
import axios from 'axios';


export const GroupingDetails = () => {

   const auth = useAuth()

   const [groups, setGroups] = useState([])
   const [numberOfGroups, setNumberOfGroups] = useState(0)
   const [file, setFile] = useState();
   
   const [vehicles, setVehicles] = useState([])
   const [numberOfVehicles, setNumberOfVehicles] = useState(0)

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
      axios.post("http://localhost:5000/api/v1/groups/import", formData, {
      }).then(response => {

            console.log(response)

            fetchAllGroups();
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

      createGroup(formValues)
         .then(response => {

         console.log(response);

         fetchAllGroups();
         setIsOpen1(false);
         toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

      });
   }

   const onEditClick = (id) => {
      getSingleGroup(id).then(response => {
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

      updateGroup(formEditValues).then(response => {
         console.log(response);
         fetchAllGroups();
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

               deleteGroup(id).then(response => {
                  console.log(response);
                  fetchAllGroups();
                  toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
               });

            }
         });
   }

   const fetchAllGroups = () => {

      if(auth.user.type == 1){
         getAllGroups()
         .then(groups => {
            console.log(groups)
            setGroups(groups);
            setNumberOfGroups(groups.length)
         });
      }else{

         getAllUserGroups(auth.user.org_id)
         .then(groups => {
            console.log(groups)
            setGroups(groups);
            setNumberOfGroups(groups.length)
         });

      }
    }

   useEffect(() => {

      console.log('ggg');

      getAllVehicles()
      .then(vehicles => {
        console.log(vehicles)
        setVehicles(vehicles);
        setNumberOfVehicles(vehicles.length)
      });

      if(auth.user.type == 1){
         getAllGroups()
         .then(groups => {
            console.log(groups)
            setGroups(groups);
            setNumberOfGroups(groups.length)
         });
      }else{

         getAllUserGroups(auth.user.org_id)
         .then(groups => {
            console.log(groups)
            setGroups(groups);
            setNumberOfGroups(groups.length)
         });

      }


      console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit){
         console.log(formValues);
         console.log('done');
         setFormValues({});
         setIsOpen2(false);
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


    //console.log('groups length:::', groups.length)
    //if (groups.length === 0) return null
  
    const GroupRow = (group,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                 <td>{index + 1}</td>
                  <td>{group.name}</td>
                  <td>{group.number_of_seats}</td>
                  <td>{group.maximum_minutes}</td>
                  <td>{group.logical_number}</td>
                  <td>{group.vehicle_number}</td>
                  <td>{group.no_of_passengers}</td>
                  <td> <i className="fa fa-pencil text-primary" onClick={() => onEditClick(group.id)}></i> &nbsp;<i class="fa fa-trash-o text-danger" onClick={() => handleDeleteSubmit(group.id)} ></i></td>
              </tr>
          )
    }

    const groupTable = groups.map((group,index) => GroupRow(group,index))

return (
<>    

<main id="main" className="main">
   <section className="section dashboard">
      <div className="row">
         <div className="col-12 grid-margin">
            <div className="card">
               <div className="card-body">
                  <h4 className="card-title">
                  Grouping Details     
                        <spam className="flot-right-lg">
                           <button className="btn btn-primary btn-sm" type="button" onClick={showModal1}>Add Group</button>&nbsp;&nbsp;
                           <button className="btn btn-secondary btn-sm" type="button"onClick={showModal2}>CSV Import</button>&nbsp;&nbsp;
                           {/*<button className="btn btn-secondary btn-sm" type="button"onClick={showModal1}>Filters</button>&nbsp;&nbsp;*/}
                        
                           <CSVLink className="btn btn-info btn-sm" type="button" filename='Groups' data={groups}>CSV Export</CSVLink>&nbsp;&nbsp;
                           <a className="btn btn-warning btn-sm" href='/assets/format/Groups.csv'>Download Format</a>&nbsp;&nbsp;
                        </spam>                
                  </h4>
                  <div className="table-responsive mt-4">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                           <th> # </th>
                              <th> Group Name </th>
                              <th> Number of Seats </th>                              
                              <th> Maximum Minutes</th>
                              <th> Logical Number</th>
                              <th> Vehicle Number </th>
                              <th> Number of Passengers</th>
                              <th> Action </th>
                           </tr>
                        </thead>
                        <tbody>  
                        {groupTable}
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
               <h4>Add Group</h4>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="name" onChange={handleAddChange} className="form-control" placeholder="Group Name" required/>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="number_of_seats" onChange={handleAddChange} className="form-control" placeholder="Number of Seats"/>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="maximum_minutes" onChange={handleAddChange} className="form-control" placeholder="Maximum Minutes"/>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="logical_number" onChange={handleAddChange} className="form-control" placeholder="Logical Number"/>
            </div>

            <div className="col-md-6 mb-3">
               <select name="vehicle_id" onChange={handleAddChange} className="form-control form-control-lg">
                  <option value="">Select Vehicle</option>
                  {vehicles.map((e, key) => {
                     return <option key={key} value={e.id}>{e.vehicle_number}</option>;
                  })}
               </select>
            </div>

            {/*<div className="col-md-6 mb-3">
               <input type="text" name="route" onChange={handleAddChange} className="form-control" placeholder="Route"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="vehicle_id" onChange={handleAddChange} className="form-control" placeholder="Allocated Vehicle"/>
            </div>*/}
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
               <h4>Edit Group</h4>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="name" value={formEditValues.name} onChange={handleEditChange} className="form-control" placeholder="Group Name" required/>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="number_of_seats"  value={formEditValues.number_of_seats} onChange={handleEditChange} className="form-control" placeholder="Number of Seats"/>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="maximum_minutes" value={formEditValues.maximum_minutes} onChange={handleEditChange} className="form-control" placeholder="Maximum Minutes"/>
            </div>

            <div className="col-md-6 mb-3">
               <input type="text" name="logical_number" value={formEditValues.logical_number} onChange={handleEditChange} className="form-control" placeholder="Logical Number"/>
            </div>

            <div className="col-md-6 mb-3">
               <select name="vehicle_id" value={formEditValues.vehicle_id} onChange={handleEditChange} className="form-control form-control-lg">
                  <option value="">Select Vehicle</option>
                  {vehicles.map((e, key) => {
                     return <option key={key} value={e.id}>{e.vehicle_number}</option>;
                  })}
               </select>
            </div>

            

            {/*<div className="col-md-6 mb-3">
               <input type="text" name="route" onChange={handleAddChange} className="form-control" placeholder="Route"/>
            </div>
            <div className="col-md-6 mb-3">
               <input type="text" name="vehicle_id" onChange={handleAddChange} className="form-control" placeholder="Allocated Vehicle"/>
            </div>*/}
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
export default GroupingDetails;