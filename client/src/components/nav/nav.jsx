import { NavLink, useNavigate } from "react-router-dom";
import { Nav, Container, Dropdown } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context";
import "./nav.css";

const NavBar = () => {
  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  // For Making Active Link
  // const [currentLink, setCurrentLink] = useState('');

  // useEffect(() => {
  //    setCurrentLink(window.location.pathname);
  //   }, [ window.location.pathname])

  const logout = () => {
    localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  return (
    <header className="bg-dark">
      <Container>
        <div className="nav-parent">
          <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className="d-flex justify-content-between"
          >
            <Nav.Item>
              <NavLink
                className="nav-link logo"
                to="/"
                style={{ textShadow: "1px 1px 2px grey" }}
              >
                SN
              </NavLink>
            </Nav.Item>

            {!state ? (
              <>
                <Nav.Item>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </Nav.Item>
              </>
            ) : (
              <>
                <Dropdown>
                    <Dropdown.Toggle
                      className="border-none"
                    variant="transparent text-light"
                    id="dropdown-basic"
                  >
                    {state.user && state.user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <NavLink
                      className="text-decoration-none dropdown-item"
                      to="/user/dashboard"
                    >
                      Dashboard
                    </NavLink>
                    <button className="dropdown-item border-0 py-0" onClick={logout}>
                      Logout
                    </button>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
