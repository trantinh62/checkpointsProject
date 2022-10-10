import { useState } from "react";
import Toast from "../Toast/Toast";
import { inviteApi } from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import "./Invite.css";

function Invite() {
  const { t } = useTranslation();
  const token = sessionStorage.getItem("sessionToken");
  const [dataInvite, setDataInvite] = useState({
    email: "",
    role_id: 0,
  });
  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "role_id") value = parseInt(value);
    setDataInvite({
      ...dataInvite,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await inviteApi(dataInvite, token);
      if (response.data.status === 200) {
        Toast(t("invite.inviteSuccess"), "success");
      }
    } catch (err) {
      Toast(t("invite.inviteFailed"), "error");
    }
  };
  return (
    <div className="invite-cover">
      <div className="container invite">
        <div className="row">
          <div className="col-md-3 invite">
            <div className="invite-info">
              <img
                src="https://image.ibb.co/kUASdV/invite-image.png"
                alt="image"
              />
              <h2>{t("invite.invite")}</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="invite-form">
                <div className="form-group invite-form">
                  <label className="control-label col-sm-2" htmlFor="email">
                    Email:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder={t("invite.inputEmail")}
                      name="email"
                      onChange={onChangeInput}
                      value={dataInvite.email}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group invite-form">
                  <label className="control-label col-sm-2" htmlFor="role-id">
                    {t("invite.selectRole")}
                  </label>
                  <div className="col-sm-10">
                    <select
                      style={{ width: "150px" }}
                      className="form-select"
                      onChange={onChangeInput}
                      name="role_id"
                      aria-label="Default select example"
                      required
                    >
                      <option value="">{t("invite.selectRole")}</option>
                      <option value={1}>Group leader</option>
                      <option value={2}>Leader</option>
                      <option value={3}>Member</option>
                    </select>
                  </div>
                </div>
                <div className="form-group invite-form">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button
                      type="submit"
                      className="btn btn-default btn-invite"
                    >
                      {t("invite.inviteBtn")}
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
export default Invite;
