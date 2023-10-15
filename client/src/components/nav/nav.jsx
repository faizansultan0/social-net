import { NavLink } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';

const NavBar = () => {

    return (
        <header className='bg-dark'>
            <Container>
                <div className="nav-parent">
                    <Nav
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                    className='d-flex justify-content-between'
                    >
                        <Nav.Item >
                            <NavLink className='nav-link' to="/">Home</NavLink>
                        </Nav.Item>
                        <Nav.Item >
                            <NavLink className='nav-link' to="/login">Login</NavLink>
                        </Nav.Item>
                        <Nav.Item >
                            <NavLink className='nav-link' to="/register">Register</NavLink>
                        </Nav.Item>
                    </Nav>
                </div>
            </Container>
        </header>
    )
};

export default NavBar;