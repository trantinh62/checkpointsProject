import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllUsersPaginateApi, updateAllUserApi } from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import removeMark from "../../Helper/removeMark";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Toast from "../Toast/Toast";
import "./User.css";

function User() {
  const { t } = useTranslation();
  const search = useLocation().search;
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataUser, setdataUser] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [dataManage, setDataManage] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    name: "",
    role_id: "",
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    links: [],
  });

  const paginationOnClick = async (e) => {
    setIsLoading(true);
    const value = e.target.value;
    const resUser = await getAllUsersPaginateApi(token, value);
    setIsLoading(false);
    setPagination(resUser.data.data);
    setdataUser(resUser.data.data.data);
    setDataFilter(resUser.data.data.data);
    setDataPerPage(resUser.data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem("localToken");
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resUser = await getAllUsersPaginateApi(token, 1);
      setPagination(resUser.data.data);
      setdataUser(resUser.data.data.data);
      setDataFilter(resUser.data.data.data);
      setDataPerPage(resUser.data.data.data);
      setIsLoading(false);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (JSON.stringify(dataManage) === JSON.stringify([])) {
        Toast(t("user.noChangeWarning"), "warning");
        setIsLoading(false);
        return;
      }
      const res = await updateAllUserApi({ data: dataManage }, token);
      const resUser = await getAllUsersPaginateApi(
        token,
        pagination.current_page
      );
      setdataUser(resUser.data.data.data);
      setDataFilter(resUser.data.data);
      setDataManage([]);
      const start = (page - 1) * itemsPerPage;
      const end = page * itemsPerPage;
      let dataFilter = [];
      if (dataSearch.role_id !== "") {
        dataFilter = resUser.data.data.data.filter(
          (item) =>
            removeMark(
              (
                item.first_name +
                " " +
                item.last_name +
                item.email +
                item.phone
              ).toLowerCase()
            ).includes(removeMark(dataSearch.name.toLowerCase())) &&
            item.role_id === parseInt(dataSearch.role_id)
        );
        setDataFilter(dataFilter);
        setDataPerPage(
          dataFilter.length > 10 ? dataFilter.slice(start, end) : dataFilter
        );
      } else {
        dataFilter = resUser.data.data.data.filter((item) =>
          removeMark(
            (
              item.first_name +
              " " +
              item.last_name +
              item.email +
              item.phone
            ).toLowerCase()
          ).includes(removeMark(dataSearch.name.toLowerCase()))
        );
        setDataFilter(dataFilter);
        setDataPerPage(
          dataFilter.length > 10 ? dataFilter.slice(start, end) : dataFilter
        );
      }
      Toast(t("user.updateSuccess"), "success");
      setIsLoading(false);
    } catch (err) {
      Toast(t("user.updateFailed"), "error");
      setIsLoading(false);
    }
  };

  const handleResetFilter = async (e) => {
    e.preventDefault();
    try {
      setDataSearch({
        name: "",
        role_id: "",
      });
      setDataPerPage(dataUser.slice(start, end));
    } catch (err) {}
  };

  const onChangeInput = (e) => {
    const { name, value, id } = e.target;
    let name_value = dataSearch.name || "";
    let dataFilter = [];
    if (name === "name") {
      name_value = value;
      setDataSearch({
        ...dataSearch,
        [name]: value,
      });
      if (dataSearch.role_id === "") {
        dataFilter = dataUser.filter((item) =>
          removeMark(
            (
              item.first_name +
              " " +
              item.last_name +
              item.email +
              item.phone
            ).toLowerCase()
          ).includes(removeMark(name_value.toLowerCase()))
        );
        setDataPerPage(
          dataFilter.length > 10 ? dataFilter.slice(0, 10) : dataFilter
        );
        setNumPages(Math.ceil(dataFilter.length / itemsPerPage));
      } else {
        dataFilter = dataUser.filter(
          (item) =>
            removeMark(
              (
                item.first_name +
                " " +
                item.last_name +
                item.email
              ).toLowerCase()
            ).includes(removeMark(name_value.toLowerCase())) &&
            item.role_id === parseInt(dataSearch.role_id)
        );
        setDataPerPage(
          dataFilter.length > 10 ? dataFilter.slice(0, 10) : dataFilter
        );
        setNumPages(Math.ceil(dataFilter.length / itemsPerPage));
      }
    }
    if (name === "role_id") {
      for (let i = 0; i < dataManage.length; i++) {
        if (dataManage[i].id === id) {
          dataManage[i].role_id = value;
          break;
        }
      }
      setDataManage([...dataManage, { id: id, role_id: value }]);
      let newUpdateUser = dataUser.filter(
        (item) => item.id === parseInt(id)
      )[0];
      const indexOfUser = dataUser.findIndex(function (e) {
        return JSON.stringify(e) === JSON.stringify(newUpdateUser);
      });
      dataUser[indexOfUser].role_id = parseInt(value);
    }
    if (name === "filter_role_id") {
      setDataSearch({
        ...dataSearch,
        role_id: value,
      });
      if (value === "") {
        dataFilter = dataUser.filter((item) =>
          removeMark(
            (
              item.first_name +
              " " +
              item.last_name +
              item.email +
              item.phone
            ).toLowerCase()
          ).includes(removeMark(name_value.toLowerCase()))
        );
        setDataFilter(dataFilter);
        setDataPerPage(
          dataFilter.length > 10 ? dataFilter.slice(0, 10) : dataFilter
        );
        setNumPages(Math.ceil(dataFilter.length / itemsPerPage));
      } else {
        dataFilter = dataUser.filter(
          (item) =>
            removeMark(
              (
                item.first_name +
                " " +
                item.last_name +
                item.email
              ).toLowerCase()
            ).includes(removeMark(dataSearch.name.toLowerCase())) &&
            item.role_id === parseInt(value)
        );
        setNumPages(Math.ceil(dataFilter.length / itemsPerPage));
        setPage(1);
        setDataFilter(dataFilter);
        setDataPerPage(
          dataFilter.length > 10 ? dataFilter.slice(0, 10) : dataFilter
        );
      }
    }
    if (name === "status") {
      for (var i = 0; i < dataManage.length; i++) {
        if (dataManage[i].id === id) {
          dataManage[i].status =
            dataManage[i].status === "enable" ? "disable" : "enable";
          break;
        }
      }
      setDataManage([
        ...dataManage,
        { id: id, status: value === "false" ? "enable" : "disable" },
      ]);
      let newUpdateUser = dataUser.filter(
        (item) => item.id === parseInt(id)
      )[0];
      const indexOfUser = dataUser.findIndex(function (e) {
        return JSON.stringify(e) === JSON.stringify(newUpdateUser);
      });
      dataUser[indexOfUser].status = value === "false" ? "enable" : "disable";
    }
  };

  let menuItems = [];
  menuItems.push(
    <li key="pre" className="page-item">
      <button
        type="button"
        className="page-link pre-btn"
        value={
          pagination.links[pagination.current_page - 1]
            ? pagination.links[pagination.current_page - 1].label
            : "none"
        }
        onClick={paginationOnClick}
        disabled={pagination.current_page === 1}
      >
        {t("previous")}
      </button>
    </li>
  );
  for (var i = 0; i < pagination.last_page; i++) {
    menuItems.push(
      <li key={i} className="page-item">
        <button
          type="button"
          className="page-link"
          value={pagination.links[i + 1] ? pagination.links[i + 1].label : ""}
          onClick={paginationOnClick}
          disabled={pagination.current_page === i + 1}
        >
          {i + 1}
        </button>
      </li>
    );
  }
  menuItems.push(
    <li key="next" className="page-item">
      <button
        type="button"
        className="page-link "
        value={
          pagination.links[pagination.current_page + 1]
            ? pagination.links[pagination.current_page + 1].label
            : ""
        }
        onClick={paginationOnClick}
        disabled={pagination.current_page === pagination.last_page}
      >
        {t("next")}
      </button>
    </li>
  );
  return (
    <div className="user-cover">
      <div className="container ">
        <div className="table-wrapper user">
          <div className="table-title user">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb user">
                    <li className="breadcrumb-item active">{t("user.user")}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleResetFilter} style={{ display: "flex" }}>
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group form2">
                  <label className="control-label label1 col-sm-2">
                    {t("search")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("user.inputUsername")}
                      name="name"
                      onChange={onChangeInput}
                      value={dataSearch.name}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group form2">
                  <label className="control-label label1 col-sm-2">
                    {t("role")}
                  </label>
                  <div className="col-sm-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="filter_role_id"
                      onChange={onChangeInput}
                      value={dataSearch.role_id}
                      style={{ backgroundColor: "#5dabc3", color: "white" }}
                    >
                      <option value="">{t("user.selectRole")}</option>
                      <option value="1">Group leader</option>
                      <option value="2">Team Leader</option>
                      <option value="3">Member</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-default btn-filter-user"
                      disabled={isLoading}
                    >
                      {t("user.resetbtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            {isLoading === true && <LoadingSpinner />}
            {dataPerPage.length === 0 && isLoading === false && (
              <h3 className="user-notify">{t("user.noUsers")}</h3>
            )}
            {dataPerPage.length > 0 && (
              <div>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>{t("username")}</th>
                      <th>{t("phone")}</th>
                      <th>{t("role")}</th>
                      <th className="status-col">{t("status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {(pagination.current_page - 1) *
                              pagination.per_page +
                              index +
                              1}
                          </td>
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
                              value={ele.role_id}
                              name="role_id"
                              onChange={onChangeInput}
                              id={ele.id}
                            >
                              <option value="1">Group leader</option>
                              <option value="2">Team Leader</option>
                              <option value="3">Member</option>
                            </select>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                key={index}
                                value={ele.status === "enable" ? true : false}
                                checked={ele.status === "enable" ? true : false}
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
                  <ul className="pagination justify-content-center user">
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
                    disabled={isLoading}
                    style={{ background: "#5dabc3" }}
                  >
                    {t("btnSave")}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default User;
