import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";

const profile_url = "/api/profile/detail";
const update_url = "/api/profile";

const Profile = () => {
  const navigate = useNavigate();

  const [dataProfile, setDataProfile] = useState({
    id: null,
    age: null,
    email: "",
    role_id: null,
    last_name: "",
    first_name: "",
    address: "",
    phone: "",
    createdAt: null,
    updateAt: null,
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataProfile({
      ...dataProfile,
      [name]: value,
    });
  };
  console.log(dataProfile);

  const token = sessionStorage.getItem("sessionToken");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get(profile_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setDataProfile(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(update_url, dataProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      sessionStorage.setItem("sessionUser", response.data.data.first_name);
      navigate("/profile", { replace: true });
      navigate(0);
    } catch (err) {
      console.log("err", err);
    }
  };
  require("./Profile.css");
  return (
    <>
      <div className="container emp-profile">
        <form onSubmit={handleSubmit}>
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
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{dataProfile.first_name + " " + dataProfile.last_name}</h5>
                <h6>{dataProfile.age}</h6>
                <p className="proile-rating">
                  RANKINGS : <span>8/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#change"
                      role="tab"
                      aria-controls="change"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="">Website Link</a>
                <br />
                <a href="">Bootsnipp Profile</a>
                <br />
                <a href="">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="">Web Designer</a>
                <br />
                <a href="">Web Developer</a>
                <br />
                <a href="">WordPress</a>
                <br />
                <a href="">WooCommerce</a>
                <br />
                <a href="">PHP, .Net</a>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text-form"
                        name="id"
                        defaultValue={dataProfile.id}
                        onChange={onChangeInput}
                        placeholder="id"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Firstname</label>
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
                      <label>Lastname</label>
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
                      <label>Email</label>
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
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text-form"
                        name="phone"
                        defaultValue={dataProfile.phone}
                        onChange={onChangeInput}
                        placeholder="email"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Age</label>
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
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Your Bio</label>
                      <br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
