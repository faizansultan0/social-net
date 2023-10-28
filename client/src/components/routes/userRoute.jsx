import { useEffect, useState, useContext } from "react";
import {UserContext} from '../../context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const UserRoute = ({children}) => {
    const [state, setState] = useContext(UserContext);
    const [ok, setOK] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(state && state.token) getCurrentUser();
    }, [state && state.token])

    const getCurrentUser = async () => {
        try {
            const {data} = await axios.get(`/current-user`
            );
            if(data.ok) setOK(true);
        } catch (err) {
            navigate('/login');
        }
    }

    state === null && setTimeout(()=>{
        navigate('/login');
    }, 1000)

    return !ok? (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner role="status" className="text-primary" />
        </div>
    )
        : (
            <>
                {children}
            </>
        )
}

export default UserRoute;