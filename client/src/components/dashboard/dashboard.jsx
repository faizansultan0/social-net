import UserRoute from "../routes/userRoute";
import { Container } from "react-bootstrap";

const Dashboard = () => {

    return (
        <UserRoute>
            <Container>
                <h1 className="text-center">Dashboard</h1>
            </Container>
        </UserRoute>
    )
}

export default Dashboard;