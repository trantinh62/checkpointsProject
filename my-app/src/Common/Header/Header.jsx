import { NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const userName = sessionStorage.getItem("sessionUsername");
  const roleId = sessionStorage.getItem("sessionRoleId");
  const token = sessionStorage.getItem("token");
  const handleLogout = async () => {
    sessionStorage.clear();
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
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
                  <NavDropdown
                    title="Manage checkpoints"
                    id="collasible-nav-dropdown"
                  >
                    {roleId === "1" && (
                      <NavDropdown.Item href="/create">
                        Create & assign checkpoint
                      </NavDropdown.Item>
                    )}
                    {roleId === "1" && (
                      <NavDropdown.Item href="/gpoint">
                        Update gpoint
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="/histories/member">
                      Member's checkpoint histories
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}

              {roleId === "1" && (
                <div>
                  <NavDropdown
                    title="Manage users"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/invite">
                      Invite user
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/users">
                      Update users
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
            <Nav>
              <NavDropdown title={userName} id="collasible-nav-dropdown">
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
