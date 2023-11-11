import { useState, useContext } from 'react';
import { UserContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Modal, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [secret, setSecret] = useState('');
    const [password, setPassword] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ state ] = useContext(UserContext);

    const navigate = useNavigate();
    
    // Redirecting User to Home Page if LogedIn
    if(state && state.token) {
        navigate('/');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(`NAME: ${name}, EMAIL: ${email}, SECRET: ${secret}, PASSWORD: ${password}`);
        try {
            setLoading(true);
            let {data} = await axios.post(`/register`, {
                name, 
                email,
                secret,
                password,
            })

            if(data.error) {
                toast.error(data.error)
                setLoading(false)

            } else {
                setOk(true);
                setLoading(false);
                setName('');
                setEmail('');
                setSecret('');
                setPassword('');
            }
            // .then((res) => {
            //     // console.log(res.data.ok)
            //     setOk(res.data.ok);
            //     setLoading(false);
            //     setName('');
            //     setEmail('');
            //     setSecret('');
            //     setPassword('');
            //     // toast('Congratulations! You are registerd');
            // })
            // .catch(err => {
            //     toast.error(err.response.data);
            //     setLoading(false);
            // })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="register">
            <Container fluid>
                <h1 className='default-bg text-center py-5 bg-secondary'>User Registeration</h1>


                <Row className='py-5 m-0'>
                    <Col md={ {span: 6, offset: 3} }>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label className='text-muted'>Your Name</Form.Label>
                            <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='text-muted'>Email address</Form.Label>
                            <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='text-muted'>Pick a question</Form.Label>
                            <Form.Select>
                                <option>What is your favourite color?</option>
                                <option>What is your best friend's name?</option>
                                <option>What is your birth city?</option>
                            </Form.Select>
                            <Form.Text>You can use this to reset your password if forgotten.</Form.Text>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Control value={secret} onChange={e => setSecret(e.target.value)} type="text" placeholder="Write your answer here" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='text-muted'>Password</Form.Label>
                            <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <button disabled={!name || !email || !secret || !password || loading } className="btn btn-primary w-100 mb-3">
                            { loading ?     
                                <Spinner animation="border" role="status" size='sm'>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> : 
                                'Submit'
                            }
                        </button>

                        <p className="para text-center">Already Registered? <Link to='/login'>Login</Link></p>
                    </Form>
                    </Col>
                </Row>

                <Modal show={ok} onHide={() => setOk(false)} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Congratulations!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are registered succesfully</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOk(false)}>
                        Close
                    </Button>
                    <Link className="btn btn-primary" to='/login' >
                        Login
                    </Link>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

export default Register;