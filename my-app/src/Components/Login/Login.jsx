import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast/Toast";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { loginApi } from "../../Api/userApi";
import i18n from "i18next";
import "./Login.css";
function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("localToken");
      if (token) navigate("/");
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dataLogin.password.length < 8)
        return Toast(t("login.login8Chars"), "warning");
      setIsLoading(true);
      const response = await loginApi(dataLogin);
      localStorage.setItem(
        "localUsername",
        response.data.data.first_name + " " + response.data.data.last_name
      );
      localStorage.setItem("localUserId", response.data.data.id);
      localStorage.setItem("localRoleId", response.data.data.role_id);
      localStorage.setItem("localToken", response.data.data.token);
      localStorage.setItem(
        "localLanguage",
        response.data.data.language === 0 ? "vn" : "en"
      );
      setIsLoading(false);
      i18n.changeLanguage(response.data.data.language === 0 ? "vn" : "en");
      Toast(t("login.loginSuccess"), "success");
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      Toast(err.response.data.message, "error");
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
              disabled={isLoading}
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
