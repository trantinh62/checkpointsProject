import { useState } from "react";
import Toast from "../Toast/Toast";
import { forgotApi } from "../../Api/userApi";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./ForgotPassword.css";
function ForgotPassword() {
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
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await forgotApi(dataEmail);
      Toast("Send reset password request successfully!", "success");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Toast(err.response.data.message, "error");
    }
  };
  return (
    <div className="forgot-cover">
      <div className="container">
        <div className="card card-container forgot">
          <img
            id="forgot-img"
            className="forgot-img-card"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
          <p id="forgot-name" className="forgot-name-card"></p>
          {isLoading === true && <LoadingSpinner />}
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
              className="btn btn-lg btn-primary btn-block btn-forgot"
              type="submit"
              disabled={isLoading}
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
