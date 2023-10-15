import { useState } from 'react';
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

    const handleModal = () => setOk(false);

    const submitHandler = e => {
        e.preventDefault();
        // console.log(`NAME: ${name}, EMAIL: ${email}, SECRET: ${secret}, PASSWORD: ${password}`);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/register`, {
            name, 
            email,
            secret,
            password,
        })
        .then((res) => {
            // console.log(res.data.ok)
            setOk(res.data.ok);
            setLoading(false);
            setName('');
            setEmail('');
            setSecret('');
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
                <h1 className='default-bg text-center py-5 bg-secondary'>Register</h1>


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
                        <button disabled={!name || !email || !secret || !password } className="btn btn-primary w-100">
                            { loading ?     
                                <Spinner animation="border" role="status" size='sm'>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> : 
                                'Submit'
                            }
                        </button>
                    </Form>
                    </Col>
                </Row>

                <Modal show={ok} onHide={handleModal} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Congratulations!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are registered succesfully</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>
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