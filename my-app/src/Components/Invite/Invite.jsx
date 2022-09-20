import { useState } from "react";
import Toast from "../Toast/Toast";
import { inviteApi } from "../../Api/userApi";

function Invite() {
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
      const response = await inviteApi(dataInvite);
      if (response.data.status === 200) {
        Toast("Invite user successful!", "success");
      }
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  require("./Invite.css");
  return (
    <div className="invite-cover">
      <div className="container contact">
        <div className="row">
          <div className="col-md-3">
            <div className="contact-info">
              <img
                src="https://image.ibb.co/kUASdV/contact-image.png"
                alt="image"
              />
              <h2>Invite user</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="contact-form">
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="email">
                    Email:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={onChangeInput}
                      value={dataInvite.email}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="role-id">
                    Select role:
                  </label>
                  <div className="col-sm-10">
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
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default ">
                      Invite user
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
