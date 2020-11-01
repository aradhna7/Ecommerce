import { API } from '../config'


//register user
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};


//login user
export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};



//save token in storage
export const authenticate = (data, next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}


//logout
export const signout = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem("jwt");
        next();
    }
    return fetch(`${API}/signout`, {
        method: "GET"
    })
    .then((response)=>{
        console.log("signout", response);
    })
    .catch(err=> console.log(err))
}




//to check if authenticated
export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    return false;

}