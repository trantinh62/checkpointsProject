import { useState } from "react";
import Button from "react-bootstrap/Button";
import Home from "../Home/Home";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login_url = "/api/login";
function Login() {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(login_url, dataLogin);
      sessionStorage.setItem("sessionUsername", response.data.data.last_name);
      sessionStorage.setItem("sessionUserId", response.data.data.id);
      sessionStorage.setItem("sessionRoleId", response.data.data.role_id);
      sessionStorage.setItem("sessionToken", response.data.data.token);
      console.log(response);
      if (response.data.status === 200) {
        navigate("/home", { replace: true });
        navigate(0);
        toast.success("Đăng nhập thành công!", {
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
        toast.error("Tài khoản đã bị khóa!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (err.response.status === 400) {
        toast.error("Sai thông tin tài khoản!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={dataLogin.email}
                  onChange={onChangeInput}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={dataLogin.password}
                  onChange={onChangeInput}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
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
                <Link style={{ textDecoration: "none", color:"white" }} to="/forgotpassword">
                  Forgot password?
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

export default Login;
