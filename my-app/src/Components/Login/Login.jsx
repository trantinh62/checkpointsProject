import { useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

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

  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first"></div>

          <form onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="email"
              value={dataLogin.email}
              onChange={onChangeInput}
              placeholder="email"
            ></input>
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              value={dataLogin.password}
              onChange={onChangeInput}
              placeholder="password"
            ></input>
            <input
              type="submit"
              className="fadeIn fourth"
              value="Log In"
            ></input>
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="/forgotpassword">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
