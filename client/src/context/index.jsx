import { useState, useEffect, createContext } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user: {},
        token: '',
    })

    let navigate = useNavigate();

    useEffect(() => {
        setState(JSON.parse(localStorage.getItem('auth')))
    }, [])


    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.REACT_APP_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        let res = error.response;
        if(res.status === 401 && res.config && !res.config._isRetryRequest) {
            setState(null);
            window.localStorage.removeItem('auth');
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};