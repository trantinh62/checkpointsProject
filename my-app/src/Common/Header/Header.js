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
          <Navbar.Brand href="/">Checkpoints</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/checkpoints">Checkpoints</Nav.Link>
              <Nav.Link href="/historys">History checks</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={firstName} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/changepassword">
                  Change password
                </NavDropdown.Item>
                <NavDropdown.Divider />

                {roleId !== "3" && (
                  <div>
                    <NavDropdown.Item href="/invite">
                      Invite user
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/users">
                      Manage users
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/createcheckpoint">
                      Create checkpoint
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/managecheckpoints">
                      Manage checkpoints
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </div>
                )}

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
