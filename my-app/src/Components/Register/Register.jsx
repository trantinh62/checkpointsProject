import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const register_url = "/api/register";
function Register() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  const [dataRegister, setdataRegister] = useState({
    last_name: "",
    first_name: "",
    address: "",
    phone: "",
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setdataRegister({
      ...dataRegister,
      [name]: value,
    });
  };
  console.log(dataRegister);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(
        register_url + "?token=" + token,
        dataRegister
      );
      console.log("response", response);
      navigate("/login");
    } catch (err) {
      console.log("debug", err);
    }
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <h1 style={{ alignItems: "center" }}>Link register</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  name="first_name"
                  onChange={onChangeInput}
                  placeholder="Enter firstname"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  name="last_name"
                  onChange={onChangeInput}
                  placeholder="Enter lastname"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  onChange={onChangeInput}
                  placeholder="Enter address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  onChange={onChangeInput}
                  placeholder="Enter phone"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={onChangeInput}
                  placeholder="Enter password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmpassword">
                <Form.Label>Confirmpassword</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirm"
                  onChange={onChangeInput}
                  placeholder="Enter password_confirm"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default Register;
