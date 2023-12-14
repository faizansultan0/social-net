import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const UserRoute = ({ children }) => {
	const [state] = useContext(UserContext);
	const [ok, setOK] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const { data } = await axios.get(`/current-user`);
				if (data.ok) {
					setOK(true);
				} else {
					navigate("/login");
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (state && state.token) {
			getCurrentUser();
		}
	}, [state, state.token, navigate]);

	useEffect(() => {
		state === null &&
			setTimeout(() => {
				navigate("/login");
			}, 1000);
	}, []);

	return ok ? (
		<>{children}</>
	) : (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<Spinner role="status" className="text-primary" />
		</div>
	);
};

export default UserRoute;
