import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './Auth';

import { userLogin } from '../services/UserService';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {

   const initialValues = {};
   const [formValues, setFormValues] = useState(initialValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const [user, setUser] = useState('')
   const auth = useAuth()
   const navigate = useNavigate();

   const handleLogin = () => {
      //console.log('kkkkkgg');
      //console.log(user);
      //alert('hh')
      //auth.login(user)
      //navigate('/home');
   }

   /*function loginHandle(e){
      e.preventDefault();
      //console.log('jjhj');
      //console.log($(this).attr('id') );
     // console.log(e.target.id);
      navigate('/home');
   }*/


   const handleAddChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      //console.log(formValues);    
   };

   const handleAddSubmit = (e) => {
      e.preventDefault();

      setFormErrors(validate(formValues));
      setIsSubmit(true);

      userLogin(formValues).then(response => {

         console.log('Login--');
         console.log(response);

         if(response == 101){

            toast.error('User not found!', { position: toast.POSITION.TOP_RIGHT });

         }else if(response == 102){

            toast.error('Please enter a valid password!', { position: toast.POSITION.TOP_RIGHT });

         }else{

            delete response.password;
            auth.login(response)
            toast.success('Login Successfully!', { position: toast.POSITION.TOP_RIGHT });
            navigate('/home');

            //toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
         }
      });
      
   }

   useEffect(() => {
      /*console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit){
         console.log(formValues);
         console.log('done');
         setFormValues({});
      }*/
   }, [formErrors]);

   const validate = (values) => {
      const errors = {};
      const regex = '';
      if(!values.email){
         errors.email = "Email is required!";
      }
      if(!values.password){
         errors.password = "Password is required!";
      }
      return errors;
   }

return (
   <>
   <ToastContainer />
<section className="section dashboard">
   <div className="container-login100">
      <div className="login100-more" style={{backgroundImage: `url("assets/img/bg-01.jpg")`}}></div>
      <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
         <form className="login100-form" id="133" onSubmit={handleAddSubmit}>
            <img src="assets/img/logo.png" alt="logo"  className="img-fluid mb-3"/>
            <span className="login100-form-title p-b-59">Welcome back!</span>
            <p className="text-white">Enter your email address and password to access admin panel.</p>
            <div className="col-12 mb-4 mt-4">
               <input className="form-control" type="email" name="email" value={formValues.email} placeholder="User name" onChange={handleAddChange} /*onChange={(e) => setUser(e.target.value)}*/ required/>
            </div>
            <div className="col-12 mb-4">
               <input className="form-control" type="password" name="password" value={formValues.password} placeholder="Type password" onChange={handleAddChange} required/>
            </div>
            <div className="col-12">
               
               <button type="submit" onClick={handleLogin} className="btn btn-warning  btn-block btn-lg">Sign in <i className="fa fa-long-arrow-right m-l-5"></i></button>
            </div>
         </form>
      </div>
   </div>
</section>
</>
)
}
export default Login;