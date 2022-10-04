import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUsersApi, updateAllUserApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
import "./User.css";

function User() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataUser, setdataUser] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [dataManage, setDataManage] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const paginationOnClick = (e) => {
    const page = e.target.value;
    setPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(dataUser.slice(start, end));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const token = sessionStorage.getItem("sessionToken");
  const fetchData = async () => {
    try {
      const resUser = await getAllUsersApi(token);
      setNumPages(Math.ceil(resUser.data.data.length / itemsPerPage));
      setdataUser(resUser.data.data);
      setDataPerPage(resUser.data.data.slice(start, end));
      setLoading(true);
    } catch (err) {
      Toast("An error occurred while loading data", "error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (JSON.stringify(dataManage) === JSON.stringify([])) {
        Toast("There is no change in order to update users!", "warning");
        return;
      }
      const res = await updateAllUserApi({ data: dataManage }, token);
      const resUser = await getAllUsersApi(token);
      setdataUser(resUser.data.data);
      setDataPerPage(resUser.data.data.slice(start, end));
      setDataManage([]);
      Toast("Update users successful!", "success");
    } catch (err) {
      Toast("Update users failed!", "error");
    }
  };

  const onChangeInput = (e) => {
    const { name, value, id } = e.target;
    if (name === "role_id") {
      for (var i = 0; i < dataManage.length; i++) {
        if (dataManage[i].id === id) {
          dataManage[i].role_id = value;
          return;
        }
      }
      setDataManage([...dataManage, { id: id, role_id: value }]);
    }
    if (name === "status") {
      for (var i = 0; i < dataManage.length; i++) {
        if (dataManage[i].id === id) {
          dataManage[i].status =
            dataManage[i].status === "enable" ? "disable" : "enable";
          return;
        }
      }
      setDataManage([
        ...dataManage,
        { id: id, status: value === "false" ? "enable" : "disable" },
      ]);
    }
  };
  let menuItems = [];
  for (var i = 0; i < numPages; i++) {
    menuItems.push(
      <li key={i} className="page-item">
        <button className="page-link" value={i + 1} onClick={paginationOnClick}>
          {i + 1}
        </button>
      </li>
    );
  }
  return (
    <div className="user-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                      Manage users: Update users
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {loading === false && (
              <h3 className="user-notify">Waiting for loading data!</h3>
            )}
            {JSON.stringify(dataPerPage) === JSON.stringify([]) &&
              loading === true && <h3 className="user-notify">No data!</h3>}
            {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
              <div>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th className="status-col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>{(page - 1) * itemsPerPage + index + 1}</td>
                          <td>{ele.email}</td>
                          <td>
                            {ele.first_name + " " + ele.last_name !==
                            "null null"
                              ? ele.first_name + " " + ele.last_name
                              : ""}
                          </td>
                          <td>{ele.phone}</td>
                          <td>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={ele.role_id}
                              name="role_id"
                              onChange={onChangeInput}
                              id={ele.id}
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
                                name="status"
                                type="checkbox"
                                id={ele.id}
                                onChange={onChangeInput}
                              ></input>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {menuItems}
                  </ul>
                </nav>
              </div>
            )}
            <div className="form-group form1">
              <div className="d-flex btn-group-1">
                {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
                  <button
                    type="submit"
                    className="btn btn-default btn-user-save"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => navigate(-1)}
                  type="submit"
                  className="btn btn-default btn-user-save"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default User;
