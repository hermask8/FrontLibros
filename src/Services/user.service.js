import { RouteUrl}  from './GlobalRoute';
export const userService = {
    login,
    logout
};

var config = RouteUrl;

function login(username, password) {

    const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({ username, password })
    };
  
    return fetch(`${config}/Login/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                console.log(user.estado);
                if(user.estado===0){
                    window.location.href = '/Contrasena'; 
                    localStorage.setItem('user2', JSON.stringify(user));
                }
                else {
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('user', JSON.stringify(user));
                }
            }
                
            return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}