import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";

import "./ResetPassword.css";
function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [dataPass, setDataPass] = useState({
    password: "",
    password_confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
      if (dataPass.password.length < 8) {
        return Toast(t("profile.login8Chars"), "warning");
      }
      if (dataPass.password !== dataPass.password_confirm) {
        return Toast(t("profile.confirmNotMatch"), "warning");
      }
      setIsLoading(true);
      const response = await resetApi(dataPass, token);
      Toast(t("reset.resetSuccess"), "success");
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      Toast(err.response.data.message, "error");
    }
  };
  return (
    <div className="reset-cover">
      <div className="container reset">
        <div className="row">
          <div className="col-md-3 reset">
            <div className="reset-info">
              <img
                src="https://image.ibb.co/kUASdV/reset-image.png"
                alt="image"
              />
              <h2>{t("reset.title")}</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="reset-form">
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="email">
                    {t("reset.newPass")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder={t("reset.inputNew")}
                      name="password"
                      onChange={onChangeInput}
                      value={dataPass.password}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="email">
                    {t("reset.confirmPass")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="password_confirm"
                      placeholder={t("reset.inputConfirm")}
                      name="password_confirm"
                      onChange={onChangeInput}
                      value={dataPass.password_confirm}
                      required
                    ></input>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10 mt-2">
                    <button
                      type="submit"
                      className="btn btn-default btn-reset"
                      disabled={isLoading}
                    >
                      {t("reset.title")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
