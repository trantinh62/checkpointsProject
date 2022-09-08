import { useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Toast from "../Toast/Toast";
const register_url = "/api/register";
function Register() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  const [dataRegister, setdataRegister] = useState({
    last_name: "",
    first_name: "",
    address: "",
    phone: "",
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setdataRegister({
      ...dataRegister,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(
        register_url + "?token=" + token,
        dataRegister
      );
      Toast("Register successful!", "success");
      navigate("/login", { replace: true });
      navigate(0);
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  require("./Register.css");
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
              <h2>Register</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="contact-form">
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="firstname">
                    Firstname:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="firstname"
                      className="form-control"
                      id="firstname"
                      placeholder="Enter firstname"
                      name="first_name"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="lastname">
                    Lastname:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="lastname"
                      className="form-control"
                      id="lastname"
                      placeholder="Enter lastname"
                      name="last_name"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="age">
                    Age:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="age"
                      className="form-control"
                      id="age"
                      placeholder="Enter age"
                      name="age"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="phone">
                    Phone:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="phone"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone"
                      name="phone"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="address">
                    Address:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="address"
                      className="form-control"
                      id="address"
                      placeholder="Enter address"
                      name="address"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="password">
                    Password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="password">
                    Password confirm:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="password_confirm"
                      placeholder="Confirm password"
                      name="password_confirm"
                      onChange={onChangeInput}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10 mt-2">
                    <button type="submit" className="btn btn-default">
                      Register
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

export default Register;
