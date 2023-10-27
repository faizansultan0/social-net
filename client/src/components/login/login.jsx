import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate =  useNavigate();
    
    const [state, setState] = useContext(UserContext);

    // Redirecting User to Home Page if LogedIn
    if(state && state.token) {
        navigate('/');
    }


    const submitHandler = e => {
        e.preventDefault();
        // console.log(`NAME: ${name}, EMAIL: ${email}, SECRET: ${secret}, PASSWORD: ${password}`);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/login`, {
            email,
            password,
        })
        .then((res) => {
            console.log(res.data);
            // Save Data in context
            setState(res.data);

            // Save in Local Storage
            window.localStorage.setItem('auth', JSON.stringify(res.data))

            // console.log(res.data.ok)
            navigate('/');
            setLoading(false);
            setEmail('');
            setPassword('');
            // toast('Congratulations! You are registerd');
        })
        .catch(err => {
            toast.error(err.response.data);
            setLoading(false);
        })
    }

    return (
        <div className="register">
            <Container fluid>
                <h1 className='default-bg text-center py-5 bg-secondary'>Login</h1>


                <Row className='py-5 m-0'>
                    <Col md={ {span: 6, offset: 3} }>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label className='text-muted'>Email address</Form.Label>
                            <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='text-muted'>Password</Form.Label>
                            <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <button disabled={!email || !password } className="btn btn-primary w-100 mb-3">
                            { loading ?     
                                <Spinner animation="border" role="status" size='sm'>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> : 
                                'Login'
                            }
                        </button>

                        <p className="para text-center">Not Registered? <Link to='/register'>Register</Link></p>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;