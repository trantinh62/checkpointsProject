import { useState } from "react";
import Toast from "../Toast/Toast";
import { updateGpointApi } from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import "./Gpoint.css";

function Gpoint() {
  const { t } = useTranslation();
  const [dataGpoint, setDataGpoint] = useState({
    groupLeader: "",
    leader: "",
    member: "",
  });
  const token = localStorage.getItem("localToken");
  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "role_id") value = parseInt(value);
    setDataGpoint({
      ...dataGpoint,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateGpointApi(dataGpoint, token);
      if (response.data.status === 200) {
        Toast(t("gpoint.updateSuccess"), "success");
      }
    } catch (err) {
      Toast(t("gpoint.updateFailed"), "error");
    }
  };
  return (
    <div className="gpoint-cover">
      <div className="container gpoint">
        <div className="row">
          <div className="col-md-3 gpoint">
            <div className="gpoint-info">
              <img
                src="https://image.ibb.co/kUASdV/gpoint-image.png"
                alt="image"
              />
              <h2>{t("gpoint.title")}</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="gpoint-form">
                <div className="form-group gpoint-form">
                  <label className="control-label col-sm-4" htmlFor="email">
                    {t("gpoint.GLpoint")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter Group leader's gpoint"
                      name="groupLeader"
                      value={dataGpoint.groupLeader}
                      onChange={onChangeInput}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group gpoint-form">
                  <label className="control-label col-sm-4" htmlFor="email">
                    {t("gpoint.TLpoint")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Team leader's gpoint"
                      name="leader"
                      value={dataGpoint.leader}
                      onChange={onChangeInput}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group gpoint-form">
                  <label className="control-label col-sm-4" htmlFor="email">
                    {t("gpoint.Mempoint")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Member's gpoint"
                      name="member"
                      value={dataGpoint.member}
                      onChange={onChangeInput}
                      required
                    ></input>
                  </div>
                </div>

                <div className="form-group gpoint-form">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button
                      type="submit"
                      className="btn btn-default btn-gpoint"
                    >
                      {t("gpoint.btnUpdate")}
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
export default Gpoint;
