import { NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const firstName = sessionStorage.getItem("sessionUsername");
  const roleId = sessionStorage.getItem("sessionRoleId");
  const token = sessionStorage.getItem("token");
  const handleLogout = async () => {
    sessionStorage.clear();
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand href="/">Checkpoints</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="My checkpoints" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/mycheckpoints">
                  List checkpoints
                </NavDropdown.Item>
                <NavDropdown.Item href="/histories">
                  Checkpoint histories
                </NavDropdown.Item>
              </NavDropdown>

              {roleId !== "3" && (
                <div>
                  <NavDropdown title="Checkpoints" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/create">
                      Create Checkpoint
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/histories/member">
                      Member's review histories
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}

              {roleId !== "3" && (
                <div>
                  <NavDropdown title="User" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/invite">
                      Invite user
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/users">
                      Manage users
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
            <Nav>
              <NavDropdown title={firstName} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
