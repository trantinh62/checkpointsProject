import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resetApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
function ResetPassword() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [dataPass, setDataPass] = useState({
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataPass({
      ...dataPass,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetApi(dataPass, token);
      Toast("Reset password successful!", "success");
      navigate("/login", { replace: true });
      navigate(0);
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  require("./ResetPassword.css");
  return (
    <>
      <div className="container contact">
        <div className="row">
          <div className="col-md-3">
            <div className="contact-info">
              <img
                src="https://image.ibb.co/kUASdV/contact-image.png"
                alt="image"
              />
              <h2>Reset password</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="contact-form">
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="email">
                    New password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password reset"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={onChangeInput}
                      value={dataPass.password}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="email">
                    Confirm password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password reset"
                      className="form-control"
                      id="password_confirm"
                      placeholder="Confirm password"
                      name="password_confirm"
                      onChange={onChangeInput}
                      value={dataPass.password_confirm}
                    ></input>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10 mt-2">
                    <button type="submit" className="btn btn-default ">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
