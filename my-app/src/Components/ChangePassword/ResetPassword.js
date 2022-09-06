import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [dataProfile, setDataProfile] = useState({
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
  console.log(dataProfile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(dataProfile);
      const response = await axiosClient.put(
        "/api/reset_password" + "?token=" + token,
        dataProfile
      );
      navigate("/login", { replace: true });
      navigate(0);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first"></div>
          <form onSubmit={handleSubmit}>
            <h1>Reset password Form</h1>
            <input
              type="password"
              className="fadeIn second"
              name="password"
              onChange={onChangeInput}
              placeholder="password"
            ></input>
            <input
              type="password"
              className="fadeIn second"
              name="password_confirm"
              onChange={onChangeInput}
              placeholder="confirm password"
            ></input>
            <input
              type="submit"
              className="fadeIn fourth"
              value="Submit"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
