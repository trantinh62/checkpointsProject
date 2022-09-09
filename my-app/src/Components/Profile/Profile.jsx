import { useState, useEffect } from "react";
import Toast from "../Toast/Toast";
import { profileApi, passApi, getProfileApi } from "../../Api/userApi";

const Profile = () => {
  const [dataProfile, setDataProfile] = useState({
    id: null,
    age: null,
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
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await profileApi(dataProfile, token);
      sessionStorage.setItem("sessionUser", response.data.data.first_name);
      Toast("Update profile successful!", "success");
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await passApi(dataPass, token);
      Toast("Update password successful!", "success");
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  require("./Profile.css");
  return (
    <>
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
                <input type="file" name="file" />
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
                      <div className="col-md-6">
                        <label>Firstname:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text-form"
                          name="first_name"
                          defaultValue={dataProfile.first_name}
                          onChange={onChangeInput}
                          placeholder="firstname"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Lastname:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text-form"
                          name="last_name"
                          defaultValue={dataProfile.last_name}
                          onChange={onChangeInput}
                          placeholder="lastname"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text-form"
                          name="email"
                          defaultValue={dataProfile.email}
                          onChange={onChangeInput}
                          placeholder="email"
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text-form"
                          name="phone"
                          defaultValue={dataProfile.phone}
                          onChange={onChangeInput}
                          placeholder="phone"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Age:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text-form"
                          name="age"
                          defaultValue={dataProfile.age}
                          onChange={onChangeInput}
                          placeholder="age"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Address:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text-form"
                          name="address"
                          defaultValue={dataProfile.address}
                          onChange={onChangeInput}
                          placeholder="address"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 btn-save">
                    <input
                      type="submit"
                      className="profile-edit-btn"
                      name="btnAddMore"
                      value="Update Profile"
                    />
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
              <h3>{dataProfile.first_name + " " + dataProfile.last_name}</h3>
              <p>
                ROLE: {dataProfile.role_id === 1 && "Group leader"}
                {dataProfile.role_id === 2 && "Tech leader"}
                {dataProfile.role_id === 3 && "Member"}
              </p>
              <p>STATUS: {dataProfile.status}</p>
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
                  <div className="col-md-6">
                    <label>Old password:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      name="old_password"
                      defaultValue={dataPass.old_password}
                      onChange={onChangePass}
                      placeholder="old password"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>New password:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      name="password"
                      defaultValue={dataPass.password}
                      onChange={onChangePass}
                      placeholder="new password"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Confirm password:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      name="password_confirm"
                      defaultValue={dataPass.password_confirm}
                      onChange={onChangePass}
                      placeholder="confirm password"
                    ></input>
                  </div>
                </div>
                <div className="col-md-6 btn-save">
                  <input
                    type="submit"
                    className="profile-edit-btn"
                    name="btnAddMore"
                    value="Change password"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
