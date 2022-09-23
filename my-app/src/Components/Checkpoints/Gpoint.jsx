import { useState } from "react";
import Toast from "../Toast/Toast";
import { updateGpointApi } from "../../Api/userApi";
import "./Gpoint.css";

function Gpoint() {
  const [dataGpoint, setDataGpoint] = useState({
    group_leader_g_point: "",
    leader_g_point: "",
    member_g_point: "",
  });
  const token = sessionStorage.getItem("sessionToken");
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
        Toast("Invite user successful!", "success");
      }
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };
  return (
    <div className="gpoint-cover">
      <div className="container gpoint">
        <div className="row">
          <div className="col-md-3">
            <div className="gpoint-info">
              <img
                src="https://image.ibb.co/kUASdV/gpoint-image.png"
                alt="image"
              />
              <h2>Update gpoint</h2>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="gpoint-form">
                <div className="form-group gpoint-form">
                  <label className="control-label col-sm-3" htmlFor="email">
                    Group leader's gpoint:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter Group leader's gpoint"
                      name="group_leader_g_point"
                      value={dataGpoint.group_leader_g_point}
                      onChange={onChangeInput}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group gpoint-form">
                  <label className="control-label col-sm-3" htmlFor="email">
                    Team leader's gpoint:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Team leader's gpoint"
                      name="leader_g_point"
                      value={dataGpoint.leader_g_point}
                      onChange={onChangeInput}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group gpoint-form">
                  <label className="control-label col-sm-3" htmlFor="email">
                    Member's gpoint:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Member's gpoint"
                      name="member_g_point"
                      value={dataGpoint.member_g_point}
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
                      Update gpoint
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
