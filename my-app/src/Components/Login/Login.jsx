import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast/Toast";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useraccount } from "../../actions/user";
import { loginApi } from "../../Api/userApi";
import "./Login.css";
function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };
  const user = useSelector((state) => state.userLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(dataLogin);
      sessionStorage.setItem(
        "sessionUsername",
        response.data.data.first_name + " " + response.data.data.last_name
      );
      sessionStorage.setItem("sessionUserId", response.data.data.id);
      sessionStorage.setItem("sessionRoleId", response.data.data.role_id);
      sessionStorage.setItem("sessionToken", response.data.data.token);
      sessionStorage.setItem(
        "sessionLanguage",
        response.data.data.language === 0 ? "en" : "vn"
      );

      dispatch(
        useraccount({
          username:
            response.data.data.first_name + " " + response.data.data.last_name,
          language: response.data.data.language === 0 ? "en" : "vn",
        })
      );
      Toast(t("login.loginSuccess"), "success");
      navigate("/mycheckpoints");
    } catch (err) {
      if (err.response.status === 403) {
        Toast("This account is locked", "error");
      } else if (err.response.status === 400) {
        Toast("Wrong account information!", "error");
      } else if (err.response.status === 422) {
        Toast("Password must be longer than 8 characters!", "warning");
      } else Toast(err.response.data.message, "error");
    }
  };

  return (
    <div className="login-cover">
      <div className="container ">
        <div className="card card-container login">
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
              value={dataLogin.email}
            ></input>
            <input
              type="password"
              id="inputPassword"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={onChangeInput}
              value={dataLogin.password}
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
    </div>
  );
}

export default Login;
