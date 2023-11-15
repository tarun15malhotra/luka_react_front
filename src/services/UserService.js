const BASEURL ="http://localhost:5000";

export async function userLogin(data) {
    const response = await fetch(BASEURL+`/api/v1/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updateUser(data) {
    const response = await fetch(BASEURL+`/api/v1/auth/`+data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updateUserInGroup(data) {
    console.log('service');
    console.log(data);
    const response = await fetch(BASEURL+`/api/v1/auth/updateUserInGroup/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function getAllUsers() {

    try{
        const response = await fetch(BASEURL+'/api/v1/passengers/');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getAllOrganisationUsers(id) {

    try{
        const response = await fetch(BASEURL+'/api/v1/managers/users/'+id);
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getAllOrganisationManagers(id) {

    try{
        const response = await fetch(BASEURL+'/api/v1/managers/managers/'+id);
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getAllOrganisationDrivers(id) {

    try{
        const response = await fetch(BASEURL+'/api/v1/drivers/drivers/'+id);
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getAllOrganisationVehicles(id) {

    try{
        const response = await fetch(BASEURL+'/api/v1/vehicles/vehicles/'+id);
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getAllUserGroups(id) {

    try{
        const response = await fetch(BASEURL+'/api/v1/groups/users/'+id);
        //console.log(response)
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getAllVehiclePassengers(id) {

    try{
        const response = await fetch(BASEURL+'/api/v1/drivers/users/'+id);
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getSinglePassenger(id) {
    const response = await fetch(BASEURL+`/api/v1/passengers/`+id, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updatePassenger(data) {
    const response = await fetch(BASEURL+`/api/v1/passengers/`+data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function importUser(data) {
    const response = await fetch(BASEURL+`/api/v1/passengers/import/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
       // headers: {
        //    'content-type': 'multipart/form-data',
       //   },
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(BASEURL+`/api/v1/passengers/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function deleteUser(id) {
    const response = await fetch(BASEURL+`/api/v1/passengers/`+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}


export async function getAllGroups() {

    try{
        const response = await fetch(BASEURL+'/api/v1/groups/');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getSingleGroup(id) {
    const response = await fetch(BASEURL+`/api/v1/groups/`+id, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updateGroup(data) {
    const response = await fetch(BASEURL+`/api/v1/groups/`+data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function importGroup(data) {
    const response = await fetch(BASEURL+`/api/v1/groups/import/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
       // headers: {
        //    'content-type': 'multipart/form-data',
       //   },
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function createGroup(data) {
    const response = await fetch(BASEURL+`/api/v1/groups/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function deleteGroup(id) {
    const response = await fetch(BASEURL+`/api/v1/groups/`+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}


export async function getAllVehicles() {

    try{
        const response = await fetch(BASEURL+'/api/v1/vehicles/');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getSingleVehicle(id) {
    const response = await fetch(BASEURL+`/api/v1/vehicles/`+id, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updateVehicle(data) {
    const response = await fetch(BASEURL+`/api/v1/vehicles/`+data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function importVehicle(data) {
    const response = await fetch(BASEURL+`/api/v1/vehicles/import/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
       // headers: {
        //    'content-type': 'multipart/form-data',
       //   },
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function createVehicle(data) {
    const response = await fetch(BASEURL+`/api/v1/vehicles/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function deleteVehicle(id) {
    const response = await fetch(BASEURL+`/api/v1/vehicles/`+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}


export async function getAllManagers() {

    try{
        const response = await fetch(BASEURL+'/api/v1/managers/');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getSingleManager(id) {
    const response = await fetch(BASEURL+`/api/v1/managers/`+id, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updateManager(data) {
    const response = await fetch(BASEURL+`/api/v1/managers/`+data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}


export async function importManager(data) {
    const response = await fetch(BASEURL+`/api/v1/managers/import/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
       // headers: {
        //    'content-type': 'multipart/form-data',
       //   },
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function createManager(data) {
    const response = await fetch(BASEURL+`/api/v1/managers/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function deleteManager(id) {
    const response = await fetch(BASEURL+`/api/v1/managers/`+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}

export async function getAllDrivers() {

    try{
        const response = await fetch(BASEURL+'/api/v1/drivers/');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getSingleDriver(id) {
    const response = await fetch(BASEURL+`/api/v1/drivers/`+id, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}

export async function updateDriver(data) {
    const response = await fetch(BASEURL+`/api/v1/drivers/`+data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function importDriver(data) {
    const response = await fetch(BASEURL+`/api/v1/drivers/import/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
       // headers: {
        //    'content-type': 'multipart/form-data',
       //   },
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function createDriver(data) {
    const response = await fetch(BASEURL+`/api/v1/drivers/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function deleteDriver(id) {
    const response = await fetch(BASEURL+`/api/v1/drivers/`+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
      })
    return await response.json();
}