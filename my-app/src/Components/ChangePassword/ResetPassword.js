import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [dataProfile, setDataProfile] = useState({
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataProfile({
      ...dataProfile,
      [name]: value,
    });
  };
  console.log(dataProfile);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      console.log(dataProfile);
      const response = await axiosClient.put(
        "/api/reset_password" + "?token=" + token,
        dataProfile
      );
      navigate("/login", { replace: true });
      navigate(0);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <h1>Link Reset password</h1>
            <Form onSubmit={handleSumbit}>
              <Form.Group className="mb-3" controlId="formBasicNewPass">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={onChangeInput}
                  placeholder="New password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasiConfirmPass">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirm"
                  onChange={onChangeInput}
                  placeholder="Confirm password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Change
              </Button>
            </Form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
