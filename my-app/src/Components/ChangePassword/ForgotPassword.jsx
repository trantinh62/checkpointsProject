import { useState } from "react";
import Toast from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import { forgotApi } from "../../Api/userApi";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";
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
      const response = await forgotApi(dataEmail);
      if (response.data.status === 200) {
        Toast("Send reset password request successfully!", "success");
      }
    } catch (err) {
      Toast("Send reset password request failed!", "error");
    }
  };
  return (
    <div className="forgot-cover">
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
            <p>Forgot password</p>
            <input
              type="email"
              id="inputPassword"
              name="email"
              className="form-control"
              placeholder="Enter email to reset"
              required
              onChange={onChangeInput}
            ></input>
            <button
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Reset
            </button>
          </form>
          <a href="/login" className="forgot-password">
            Back to login!
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
