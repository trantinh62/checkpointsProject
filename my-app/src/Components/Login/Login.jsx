import { useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";

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
        navigate("/perform", { replace: true });
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
  require("./Login.css");
  return (
    <>
      <div className="container">
        <div className="card card-container">
          <img
            id="profile-img"
            className="profile-img-card"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form-signin" onSubmit={handleSubmit}>
            <span id="reauth-email" className="reauth-email"></span>
            <input
              type="email"
              id="inputEmail"
              name="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              onChange={onChangeInput}
            ></input>
            <input
              type="password"
              id="inputPassword"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={onChangeInput}
            ></input>
            <button
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <a href="/forgot" className="forgot-password">
            Forgot the password?
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
