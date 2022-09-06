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
              name="password"
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
