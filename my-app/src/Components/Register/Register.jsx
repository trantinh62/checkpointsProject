
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { registerApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
import "./Register.css";
function Register() {
  const navigate = useNavigate();
  const {search} = useLocation();
  const token = new URLSearchParams(search).get("token");

  const [dataRegister, setdataRegister] = useState({
    last_name: "",
    first_name: "",
    address: "",
    phone: "",
    age: "",
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setdataRegister({
      ...dataRegister,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerApi(dataRegister, token);
      Toast("Register successful!", "success");
      navigate("/login", { replace: true });
      navigate(0);
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  return (
    <div className="register-cover">
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
                      type="text"
                      id="first_name"
                      className="form-control"
                      placeholder="Enter firstname"
                      value={dataRegister.first_name}
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
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Enter lastname"
                      value={dataRegister.last_name}
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
                      type="text"
                      className="form-control"
                      id="age"
                      placeholder="Enter age"
                      value={dataRegister.age}
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
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone"
                      value={dataRegister.phone}
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
                      type="text"
                      className="form-control"
                      id="address"
                      value={dataRegister.address}
                      placeholder="Enter address"
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
                      value={dataRegister.password}
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
                      value={dataRegister.password_confirm}
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
    </div>
  );
}

export default Register;
