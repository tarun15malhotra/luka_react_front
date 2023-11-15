import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import React, { useState, useEffect } from 'react';

import { useAuth } from './Auth';
import { updateUser } from '../services/UserService';

import { toast } from 'react-toastify';

   
export const Profile = () => {
   
   const auth = useAuth()
   
   const initialValues = auth.user;
   const [formValues, setFormValues] = useState(initialValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);



   const handleAddChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      //console.log(formValues);    
   };

   const handleAddSubmit = (e) => {
      e.preventDefault();

      setFormErrors(validate(formValues));
      setIsSubmit(true);

      if(formValues.password != formValues.cpassword){

         toast.error('Password Mismatch!', { position: toast.POSITION.TOP_RIGHT }); 

      }else{

         updateUser(formValues).then(response => {
            console.log(response);
            auth.login(formValues)
            toast.success('Updated Successfully!', { position: toast.POSITION.TOP_RIGHT });       

         });
      }
   }

   useEffect(() => {
      console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit){
         console.log(formValues);
         console.log('done');
         setFormValues(formValues);
      }
   }, [formErrors]);

   const validate = (values) => {
      const errors = {};
      const regex = '';
      if(!values.email){
         errors.email = "Email is required!";
      }
      /*if(!values.password){
         errors.password = "Password is required!";
      }*/
      return errors;
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
                     Edit Profile  
                  </h4>
                  <form onSubmit={handleAddSubmit}>
                     <div className="row">
                        <div className="col-md-12 mb-3">
                           <label>Name</label>
                           <input type="text" name="name" value={formValues.name} onChange={handleAddChange} className="form-control" placeholder="Name" required/>
                        </div>
                        <div className="col-md-6 mb-3">
                           <label>Email</label>
                           <input type="text" name="email" value={formValues.email} onChange={handleAddChange} className="form-control" placeholder="Email" readOnly/>
                        </div>
                        <div className="col-md-6 mb-3">
                           <label>Phone Number</label>
                           <input type="text" name="phone" value={formValues.phone} onChange={handleAddChange} className="form-control" placeholder="Phone NUmber" required/>
                        </div>
                        <div class="col-md-6 mb-3">
                           <label>Password</label>
                           <input type="password" name="password" value={formValues.password} onChange={handleAddChange} className="form-control" placeholder="Password"/>
                        </div>
                        <div className="col-md-6 mb-3">
                           <label>Password Confirmation</label>
                           <input type="password" name="cpassword" value={formValues.cpassword} onChange={handleAddChange} className="form-control" placeholder="Password Confirmation"/>
                        </div>
                        <div className="col-md-12 mb-3">
                           <button type="submit" className="btn btn-success">Update</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </section>
</main>
</>
)
}
export default Profile;