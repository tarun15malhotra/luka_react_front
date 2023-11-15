
import React from 'react';
import {
    Navigate,
    Outlet
} from "react-router-dom";
import Header from './Header';

function PrivateOutlet() {
    const auth = true;
    return auth ? <React.Fragment><Header /><Outlet /></React.Fragment> : <Navigate to="/login" />;
}
export default PrivateOutlet;