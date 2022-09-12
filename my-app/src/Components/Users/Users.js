import Header from "../../Common/Header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./User.css";
import { useState, useEffect } from "react";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();

  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const token = sessionStorage.getItem("sessionToken");
  const fetchData = async () => {
    try {
      const resUser = await axiosClient.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setdataUser(resUser.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put("api/users", dataUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      navigate("/users", { replace: true });
      navigate(0);
    } catch (err) {
      console.log("err", err);
    }
  };

  const onChangeInput = (e, index) => {
    const { name, value } = e.target;
    console.log("index", index, "name", name, "value", value, "dataUser");
    setdataUser({
      ...dataUser,
      [name]: value,
    });
  };
  return (
    <>
      <div className="container manage-user">
        <div className="row">
          <h1>Manage users</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search user by email address..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            ></input>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Search
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.email}</td>
                      <td>{ele.first_name}</td>
                      <td>{ele.last_name}</td>
                      <td>{ele.phone}</td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={ele.role_id}
                          name=""
                          // onChange={onChangeInput}
                        >
                          <option value="1">Group leader</option>
                          <option value="2">Leader</option>
                          <option value="3">Member</option>
                        </select>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            key={index}
                            defaultValue={
                              ele.status === "enable" ? true : false
                            }
                            defaultChecked={
                              ele.status === "enable" ? true : false
                            }
                            className="form-check-input"
                            name="switch"
                            type="checkbox"
                            // role="switch"
                            onChange={onChangeInput}
                            // id="flexSwitchCheckDefault"
                          ></input>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="btn-save">
              <button type="submit" className="btn btn-primary btn-save">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default User;
