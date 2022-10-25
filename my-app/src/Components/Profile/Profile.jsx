import { useState, useEffect } from "react";
import Toast from "../Toast/Toast";
import {
  profileApi,
  passApi,
  getProfileApi,
  updateAvatar,
} from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
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
    image: "",
    link: "",
    createdAt: null,
    updateAt: null,
  });
  const [dataPass, setDataPass] = useState({
    old_password: "",
    password: "",
    password_confirm: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const token = localStorage.getItem("localToken");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getProfileApi(token);
      setDataProfile(res.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Toast(err.response.data.message, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", selectedFile);
      setIsLoading(true);
      const response = await profileApi(dataProfile, token);
      localStorage.setItem(
        "localUsername",
        response.data.data.first_name + " " + response.data.data.last_name
      );
      const updateAvt = await updateAvatar(formData, token);
      Toast(t("profile.updateSuccess"), "success");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Toast(err.response.data.message, "error");
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      if (dataPass.password.length < 8) {
        return Toast(t("profile.login8Chars"), "warning");
      }
      if (dataPass.password !== dataPass.password_confirm) {
        return Toast(t("profile.confirmNotMatch"), "warning");
      }
      setIsLoading(true);
      const response = await passApi(dataPass, token);
      Toast(t("profile.updatePassSuccess"), "success");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response.request.status === 422) {
        Toast(t("errorFormatPass"), "error");
        return;
      }
      Toast(err.response.data.message, "error");
    }
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="profile-cover">
      <div className="container emp-profile">
        <div className="row">
          {isLoading === true && <LoadingSpinner />}
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src={
                  dataProfile.link
                    ? dataProfile.link
                    : "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
                }
                alt=""
              />
              <div className="file btn btn-lg btn-primary">
                {t("profile.changePhoto")}
                <input type="file" name="image" onChange={handleFileSelect} />
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
                      <div className="col-8 col1">
                        <input
                          type="text-form"
                          name="first_name"
                          value={dataProfile.first_name}
                          onChange={onChangeInput}
                          placeholder={t("profile.firstname")}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.lastname")}</label>
                      </div>
                      <div className="col-8 col1">
                        <input
                          type="text-form"
                          name="last_name"
                          value={dataProfile.last_name}
                          onChange={onChangeInput}
                          placeholder={t("profile.lastname")}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>Email:</label>
                      </div>
                      <div className="col-8 col1">
                        <input
                          type="text-form"
                          name="email"
                          value={dataProfile.email}
                          onChange={onChangeInput}
                          placeholder={t("profile.email")}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.phone")}</label>
                      </div>
                      <div className="col-8 col1">
                        <input
                          type="text-form"
                          name="phone"
                          value={dataProfile.phone}
                          onChange={onChangeInput}
                          placeholder={t("profile.phone")}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.age")}</label>
                      </div>
                      <div className="col-8 col1">
                        <input
                          type="text-form"
                          name="age"
                          value={dataProfile.age}
                          onChange={onChangeInput}
                          placeholder={t("profile.age")}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col1">
                        <label>{t("profile.address")}</label>
                      </div>
                      <div className="col-8 col1">
                        <input
                          type="text-form"
                          name="address"
                          value={dataProfile.address}
                          onChange={onChangeInput}
                          placeholder={t("profile.address")}
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
                        disabled={isLoading}
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
                  <div className="col-8 col1">
                    <input
                      type="password"
                      className="profile-pass"
                      name="old_password"
                      value={dataPass.old_password}
                      onChange={onChangePass}
                      placeholder={t("profile.oldPass")}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col1">
                    <label>{t("profile.newPass")}</label>
                  </div>
                  <div className="col-8 col1">
                    <input
                      type="password"
                      name="password"
                      className="profile-pass"
                      value={dataPass.password}
                      onChange={onChangePass}
                      placeholder={t("profile.newPass")}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col1">
                    <label>{t("profile.confirmPass")}</label>
                  </div>
                  <div className="col-8 col1">
                    <input
                      type="password"
                      name="password_confirm"
                      className="profile-pass"
                      value={dataPass.password_confirm}
                      onChange={onChangePass}
                      placeholder={t("profile.confirmPass")}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="d-flex btn-profile">
                    <button
                      type="submit"
                      className="btn btn-default btn-profile"
                      disabled={isLoading}
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
