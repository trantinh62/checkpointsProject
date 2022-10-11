import { useState, useEffect } from "react";
import Toast from "../Toast/Toast";
import { profileApi, passApi, getProfileApi } from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import "./Profile.css";
const Profile = () => {
  const { t } = useTranslation();
  const [dataProfile, setDataProfile] = useState({
    id: null,
    email: "",
    role_id: null,
    last_name: "",
    first_name: "",
    age: "",
    address: "",
    phone: "",
    createdAt: null,
    updateAt: null,
  });
  const [dataPass, setDataPass] = useState({
    old_password: "",
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataProfile({
      ...dataProfile,
      [name]: value,
    });
  };
  const onChangePass = (e) => {
    const { name, value } = e.target;
    setDataPass({
      ...dataPass,
      [name]: value,
    });
  };

  const token = sessionStorage.getItem("sessionToken");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProfileApi(token);
      setDataProfile(res.data.data);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await profileApi(dataProfile, token);
      sessionStorage.setItem(
        "sessionUsername",
        response.data.data.first_name + " " + response.data.data.last_name
      );
      Toast(t("profile.updateSuccess"), "success");
    } catch (err) {
      Toast(t("profile.updateFailed"), "error");
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await passApi(dataPass, token);
      Toast(t("profile.updatePassSuccess"), "success");
    } catch (err) {
      if (err.response.request.status === 422) {
        Toast(t("errorFormatPass"), "error");
        return;
      }
      Toast(t("profile.updatePassFailed"), "error");
    }
  };
  return (
    <div className="profile-cover">
      <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
                alt=""
              />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" disabled />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="profile-head">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.firstname")}</label>
                      </div>
                      <div className="col-md-6 col1">
                        <input
                          type="text-form"
                          name="first_name"
                          value={dataProfile.first_name}
                          onChange={onChangeInput}
                          placeholder="firstname"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.lastname")}</label>
                      </div>
                      <div className="col-md-6 col1">
                        <input
                          type="text-form"
                          name="last_name"
                          value={dataProfile.last_name}
                          onChange={onChangeInput}
                          placeholder="lastname"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>Email:</label>
                      </div>
                      <div className="col-md-6 col1">
                        <input
                          type="text-form"
                          name="email"
                          value={dataProfile.email}
                          onChange={onChangeInput}
                          placeholder="email"
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.phone")}</label>
                      </div>
                      <div className="col-md-6 col1">
                        <input
                          type="text-form"
                          name="phone"
                          value={dataProfile.phone}
                          onChange={onChangeInput}
                          placeholder="phone"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.age")}</label>
                      </div>
                      <div className="col-md-6 col1">
                        <input
                          type="text-form"
                          name="age"
                          value={dataProfile.age}
                          onChange={onChangeInput}
                          placeholder="age"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.address")}</label>
                      </div>
                      <div className="col-md-6 col1">
                        <input
                          type="text-form"
                          name="address"
                          value={dataProfile.address}
                          onChange={onChangeInput}
                          placeholder="address"
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group profile-form">
                    <div className="d-flex btn-profile">
                      <button
                        type="submit"
                        className="btn btn-default btn-profile"
                      >
                        {t("profile.btnUp")}
                      </button>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  ></div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <h3 className="profile-name">
                {dataProfile.first_name + " " + dataProfile.last_name}
              </h3>
              <p>
                {t("role")} {dataProfile.role_id === 1 && "Group leader"}
                {dataProfile.role_id === 2 && "Tech leader"}
                {dataProfile.role_id === 3 && "Member"}
              </p>
              <p>
                {t("age")} {dataProfile.age}
              </p>
              <p>
                {t("status")} {dataProfile.status}
              </p>
              <p>
                {t("address")} {dataProfile.address}
              </p>
              <br />
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleChange}>
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6 col1">
                    <label>{t("profile.oldPass")}</label>
                  </div>
                  <div className="col-md-6 col1">
                    <input
                      type="password"
                      className="profile-pass"
                      name="old_password"
                      value={dataPass.old_password}
                      onChange={onChangePass}
                      placeholder="old password"
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col1">
                    <label>{t("profile.newPass")}</label>
                  </div>
                  <div className="col-md-6 col1">
                    <input
                      type="password"
                      name="password"
                      className="profile-pass"
                      value={dataPass.password}
                      onChange={onChangePass}
                      placeholder="new password"
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col1">
                    <label>{t("profile.confirmPass")}</label>
                  </div>
                  <div className="col-md-6 col1">
                    <input
                      type="password"
                      name="password_confirm"
                      className="profile-pass"
                      value={dataPass.password_confirm}
                      onChange={onChangePass}
                      placeholder="confirm password"
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="d-flex btn-profile">
                    <button
                      type="submit"
                      className="btn btn-default btn-profile"
                    >
                      {t("profile.btnChange")}
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
};

export default Profile;
