import { useState } from "react";
import axiosClient from "../../Api/axiosClient";
import Toast from "../Toast/Toast";
import { useNavigate } from "react-router-dom";

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
        navigate("/login", { replace: true });
        navigate(0);
        Toast("Gửi yêu cầu reset password thành công!", "success");
      }
    } catch (err) {
      if (err.response.status === 403) {
        Toast("Email của bạn đã bị khóa!", "error");
      } else if (err.response.status === 400) {
        Toast("Email bạn nhập không đúng!", "error");
      }
      console.log("debug", err);
    }
  };
  require("./ForgotPassword.css");
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
    </>
  );
}

export default ForgotPassword;
