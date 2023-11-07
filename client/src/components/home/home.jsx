import { useContext } from 'react';
import { UserContext } from '../../context/index';
import { Container } from 'react-bootstrap';
import './home.css';

const Home = () => {
    const [state] = useContext(UserContext);

    return (
        <Container>
            <h1>Home</h1>
            <p>
                {JSON.stringify(state)}
            </p>
        </Container>
    )
}

export default Home;