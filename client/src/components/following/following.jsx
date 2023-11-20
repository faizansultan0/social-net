import { Card, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../context";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from "axios";
// import "./peopleList.css";

const Following = () => {
	const [state, setState] = useContext(UserContext);
	const [people, setPeople] = useState([]);
	useEffect(() => {
		if (state && state.token) fetchFollowing();
	}, [state, state.token]);

	const fetchFollowing = async () => {
		try {
			const { data } = await axios.get("/user-following");
			setPeople(data);
		} catch (err) {
			console.log(err);
		}
	};
	const handleUnfollow = async (user) => {
		try {
			const { data } = await axios.put("/user-unfollow", { _id: user._id });
			let auth = JSON.parse(localStorage.getItem("auth"));
			auth.user = data;
			localStorage.setItem("auth", JSON.stringify(auth));
			setState({ ...state, user: data });

            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
			toast.error(`Unfollowed ${user.name}`);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="following-page">
			<Container>
				<h1 className="h2 text-center pt-3 mb-2">Following</h1>
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<ul className="p-0 people-list">
							{people &&
								people.map((user) => (
									<Card
										className="people-card mb-2 p-2"
										key={people._id}
									>
										<div className="left-part">
											{user && user.image && user.image.url ? (
												<div className="sm-round-parent">
													<img
														className="sm-round-img"
														src={user.image.url}
														alt={user.name}
													/>
												</div>
											) : (
												<div className="sm-round-parent">
													{user.name[0]}
												</div>
											)}
											<div className="info-div">
												<Card.Title className="h6">
													{user.name}
												</Card.Title>
											</div>
										</div>
										<div className="right-part">
											<Button
												onClick={() => handleUnfollow(user)}
												className="bg-transparent border-0 text-primary p-2"
											>
												Unfollow
											</Button>
										</div>
									</Card>
								))}
						</ul>
					</Col>
				</Row>

				<div className="link-div text-center">
					<Link
						to="/user/dashboard"
						className="text-decoration-none text-primary"
					>
						Back to Dashboard
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default Following;
