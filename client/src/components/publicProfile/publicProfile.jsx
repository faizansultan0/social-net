// import { Card, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { UserOutlined } from "@ant-design/icons";
import { Card, Avatar } from "antd";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const PublicProfile = () => {
	const [state, setState] = useContext(UserContext);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	const { username } = useParams();

	useEffect(() => {
		if (username) fetchUser();
	}, [username]);

	const fetchUser = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get(`/user/${username}`);
			setLoading(false);
			setUser(data);
			// console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="following-page">
			<Container>
				<div className="link-div py-2">
					<Link
						to="/"
						className="text-decoration-none text-primary mb-2"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
						Back
					</Link>
				</div>
				{loading ? (
					<div className="d-flex justify-content-center align-items-center vh-100">
						<Spinner role="status" className="text-primary" />
					</div>
				) : (
                        // <pre>{JSON.stringify(user, null, 4)}</pre>
					<Card
						className="p-sm-4 p-1 mb-2"
						hoverable
						cover={
							<div className="d-flex justify-content-center">
								{user && user.image && user.image.url ? (
									<Avatar
										size={140}
										icon={<img src={user.image.url} />}
									/>
								) : (
									<Avatar size={100} icon={<UserOutlined />} />
								)}
							</div>
						}
					>
						<Card.Meta
							title={user && user.name}
							description={
								user.about ? user.about : "No About information"
							}
							className="mb-2"
						/>

						<p className="text-muted">
							Joined {moment(user.createdAt).fromNow()}
						</p>

						<p className="text-muted">
							{user && user.followers && user.followers.length} Followers
						</p>

						<p className="text-muted">
							{user && user.following && user.following.length} Following
						</p>
					</Card>
				)}

				{/* <h1 className="h2 text-center pt-3 mb-2">Following</h1>
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
				</Row> */}
			</Container>
		</div>
	);
};

export default PublicProfile;
