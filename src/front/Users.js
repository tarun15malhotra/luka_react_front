import React from 'react';
import { Link } from 'react-router-dom';

export const Users = ({ users, loading}) => {

    if(loading){
        return <h2>Loading...</h2>;
    }

    console.log('yes11');
    console.log(users);
/*
return(
    {users.map(user => (
    <tr key = {user.id}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td><Link to={`/PassengerList/${user.id}`} className="btn btn-success btn-sm">View</Link></td>
        <td> <i className="fa fa-pencil text-primary" onClick={() => onEditClick(user.id)}></i> &nbsp;<i class="fa fa-trash-o text-danger" onClick={() => handleDeleteSubmit(user.id)} ></i></td>
    </tr>
    ))}
);*/

const UserRow = (user,index) => {

    return(
          <tr key = {index} className={index%2 === 0?'odd':'even'}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td><Link to={`/PassengerList/${user.id}`} className="btn btn-success btn-sm">View</Link></td>
              <td> <i className="fa fa-pencil text-primary"></i> &nbsp;<i class="fa fa-trash-o text-danger"  ></i></td>
          </tr>
      )
}

const userTable = users.map((user,index) => UserRow(user,index))

};

export default Users;