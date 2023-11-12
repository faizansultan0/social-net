import { Card, Button } from "react-bootstrap";
import "./peopleList.css";

const PeopleList = ({ people, handleFollow }) => {
  return (
    <ul className="p-0 people-list">
      {people.map((user) => (
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
            <div className="info-div">
              <Card.Title className="h6">{user.name}</Card.Title>
            </div>
          </div>
          <div className="right-part">
            <Button onClick={()=> handleFollow(user)} className="bg-transparent border-0 text-primary p-2">
              Follow
            </Button>
          </div>
        </Card>
      ))}
    </ul>
  );
};

export default PeopleList;
