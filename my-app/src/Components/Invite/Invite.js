import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { Navigate, useNavigate } from "react-router-dom";
import "./Invite.css";
import { ToastContainer, toast } from "react-toastify";

const invite_url = "/api/invite";

function Invite() {
  const navigate = useNavigate();
  const [dataInvite, setDataInvite] = useState({
    email: "",
    role_id: 0,
  });
  const onChangeInput = (e) => {
    let { name, value } = e.target;
    console.log("value", typeof value);
    if (name === "role_id") value = parseInt(value);
    setDataInvite({
      ...dataInvite,
      [name]: value,
    });
  };
  console.log(dataInvite);
  const handleSubmit = async (e) => {
    console.log("debug");
    e.preventDefault();
    console.log("debug", dataInvite);
    try {
      const response = await axiosClient.post(invite_url, dataInvite);
      console.log("response", response);
      navigate("/invite");
      toast.success("Gửi link đăng ký thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log("debug", err);
    }
  };

  return (
    <>
      <div className="container heading">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <div className="row">
          <h1>Invite user</h1>
          <Form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <div>
                <h4 className="title">Email</h4>
              </div>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={onChangeInput}
                placeholder="Input email address to be checked"
              ></input>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Select
              </button>
            </div>
            <div className="select-role">
              <h4 className="title">Select role</h4>
              <select
                style={{ width: "150px" }}
                className="form-select"
                onChange={onChangeInput}
                name="role_id"
                aria-label="Default select example"
              >
                <option value={1}>Group leader</option>
                <option value={2}>Leader</option>
                <option value={3}>Member</option>
              </select>
            </div>
            <i>Invite user by email</i>
            <div className="btn-save">
              <button type="submit" className="btn btn-primary btn-save">
                Invite user
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
export default Invite;
