import './App.css';
import { AuthProvider } from './front/Auth';
import { RequireAuth } from './front/RequireAuth';
import Home from './front/Home';
import { Login } from './front/Login';
import PrivateOutlet from './front/PrivateOutlet';
import { Profile } from './front/Profile';
import {Bookings} from './front/Bookings';
import {VehicleRoute} from './front/VehicleRoute';
import {Manager} from './front/Manager';
import {VehicleDriver} from './front/VehicleDriver';
import {PassengerList} from './front/PassengerList';
import {GroupingDetails} from './front/GroupingDetails';

import {
   BrowserRouter as Router, Route, Routes
} from "react-router-dom";

export function App() {

   return (
      <AuthProvider>
      <Router>
         <Routes>

              <Route path="/" element={<Login />} />
              
               <Route path="/" element={<RequireAuth><PrivateOutlet /></RequireAuth>}>
                 
                  <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} ></Route>
                  <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} ></Route>
                  <Route path="/Bookings" element={<RequireAuth><Bookings /></RequireAuth>} ></Route>
                  <Route path="/VehicleRoute" element={<RequireAuth><VehicleRoute /></RequireAuth>}></Route>
                  <Route path="/Manager" element={<RequireAuth><Manager /></RequireAuth>}></Route>
                  <Route path="/VehicleDriver" element={<RequireAuth><VehicleDriver /></RequireAuth>}></Route>
                  <Route path="/PassengerList/:id" element={<RequireAuth><PassengerList /></RequireAuth>}></Route>
                  <Route path="/GroupingDetails" element={<RequireAuth><GroupingDetails /></RequireAuth>}></Route>
              
               </Route>

               <Route path="/login" element={<Login />} />

         </Routes>
      </Router>
      </AuthProvider>
   );
}
export default App;