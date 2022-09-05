import { useState } from "react";
import Button from "react-bootstrap/Button";
import Home from "../Home/Home";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [dataEmail, setDataEmail] = useState({
    email: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataEmail({
      ...dataEmail,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(
        "api/invite_reset_password",
        dataEmail
      );
      console.log(response);
      if (response.data.status === 200) {
        toast.success("Gửi yêu cầu reset password thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
      } else if (err.response.status === 400) {
      }
      console.log("debug", err);
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />

        <div className="row">
          <div className="col-4"></div>
          <div className="col-4" style={{ paddingTop: "100px" }}>
            <h1>Forgot password</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={dataEmail.email}
                  onChange={onChangeInput}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="primary"
                type="button"
                className="forgotpassword"
                style={{ marginLeft: "100px" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/login"
                >
                  Back to login!
                </Link>
              </Button>
            </Form>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
