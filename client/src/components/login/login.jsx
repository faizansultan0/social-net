import { useState, useContext } from "react";
import { UserContext } from "../../context";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	// Redirecting User to Home Page if LogedIn
	if (state && state.token) {
		navigate("/");
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(`NAME: ${name}, EMAIL: ${email}, SECRET: ${secret}, PASSWORD: ${password}`);
		try {
			setLoading(true);
			let { data } = await axios.post(`/login`, {
				email,
				password,
			});

			if (data.error) {
				toast.error(data.error);
				setLoading(false);
			} else {
				// console.log(data);
				// Save Data in context
				setState(data);

				// Save in Local Storage
				window.localStorage.setItem("auth", JSON.stringify(data));

				// console.log(res.data.ok)
				navigate("/");
				setLoading(false);
				setEmail("");
				setPassword("");
			}
			// .then((res) => {
			//     console.log(res.data);
			//     // Save Data in context
			//     setState(res.data);

			//     // Save in Local Storage
			//     window.localStorage.setItem('auth', JSON.stringify(res.data))

			//     // console.log(res.data.ok)
			//     navigate('/');
			//     setLoading(false);
			//     setEmail('');
			//     setPassword('');
			//     // toast('Congratulations! You are registerd');
			// })
			// .catch(err => {
			//     toast.error(err.response.data);
			//     setLoading(false);
			// })
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="register">
			<Container fluid>
				<div className="card-parent d-flex justify-content-center align-items-center h-100 pt-lg-5">
					<div className="card px-3 p-4">
						<h1 className="text-center h2">Login</h1>

								<Form onSubmit={submitHandler} className="px-4">
									<Form.Group className="mb-3">
										<Form.Label className="text-muted">
											Email address
										</Form.Label>
										<Form.Control
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type="email"
											placeholder="Enter email"
										/>
										<Form.Text className="text-muted">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label className="text-muted">
											Password
										</Form.Label>
										<Form.Control
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											placeholder="Password"
										/>
									</Form.Group>
									<button
										disabled={!email || !password || loading}
										className="btn btn-primary w-100 mb-3"
									>
										{loading ? (
											<Spinner
												animation="border"
												role="status"
												size="sm"
											>
												<span className="visually-hidden">
													Loading...
												</span>
											</Spinner>
										) : (
											"Login"
										)}
									</button>

									<p className="para text-center">
										Not Registered?{" "}
										<Link to="/register">Register</Link>
									</p>
									<div className="para text-center">
										<Link
											to="/forgot-password"
											className="text-danger text-decoration-none"
										>
											Forgot Password
										</Link>
									</div>
								</Form>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Login;
