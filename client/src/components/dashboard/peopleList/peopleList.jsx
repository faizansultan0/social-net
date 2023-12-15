import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../../context";
import "./peopleList.css";

const PeopleList = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  return (
		<ul className="pt-1 p-0 people-list mb-0">
			{people.slice(0, 5).map((user) => (
				<Card className="people-card mb-2 p-2" key={user._id}>
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
							<div className="sm-round-parent">{user.name[0]}</div>
						)}
						<div className="info-div d-flex align-items-center">
							<Card.Title className="h6 m-0">
								<Link className="text-dark text-decoration-none" to={`/user/${user.username}`}>{user.name}</Link>
							</Card.Title>
						</div>
					</div>
					<div className="right-part">
						{state &&
						state.user &&
						user.followers &&
						user.followers.includes(state.user._id) ? (
							<Button
								onClick={() => handleUnfollow(user)}
								className="bg-transparent border-0 text-primary p-2"
							>
								Unfollow
							</Button>
						) : (
							<Button
								onClick={() => handleFollow(user)}
								className="bg-transparent border-0 text-primary p-2"
							>
								Follow
							</Button>
						)}
					</div>
				</Card>
			))}
		</ul>
  );
};

export default PeopleList;
