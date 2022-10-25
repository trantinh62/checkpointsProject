import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAllCheckpointApi,
  getCheckpointsByReviewId,
} from "../../Api/userApi";
import dayjs from "dayjs";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import removeMark from "../../Helper/removeMark";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./ListMemberHistory.css";
import variable from "../../Common/Variable/variabe";

function ListMemberHistory() {
  const { t } = useTranslation();
  const search = useLocation().search;
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataSearch, setDataSearch] = useState({
    name: "",
    start_date: dayjs(new Date("2022-01-01")).format("YYYY-MM-DDTHH:mm"),
    end_date: dayjs(new Date("2025-12-31")).format("YYYY-MM-DDTHH:mm"),
  });

  const [dataPerPage, setDataPerPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("localToken");
  const roleId = localStorage.getItem("localRoleId");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    links: [],
  });
  const onChangeInput = (e) => {
    let { name, value } = e.target;
    let name_value = dataSearch.name || "";
    let start_date_value = dataSearch.start_date || "";
    let end_date_value = dataSearch.end_date || "";
    let dataFilter = [];
    if (name === "name") {
      name_value = value;
      setDataSearch({
        ...dataSearch,
        [name]: value,
      });
      dataFilter = dataListCheck.filter(
        (item) =>
          removeMark(item.name.toLowerCase()).includes(
            removeMark(name_value.toLowerCase())
          ) &&
          new Date(item.start_date) > new Date(start_date_value) &&
          new Date(item.end_date) < new Date(end_date_value)
      );
      setDataPerPage(dataFilter);
    }
    if (name === "start_date") {
      start_date_value = value;
      setDataSearch({
        ...dataSearch,
        [name]: value,
      });
      dataFilter = dataListCheck.filter(
        (item) =>
          removeMark(item.name.toLowerCase()).includes(
            removeMark(dataSearch.name.toLowerCase())
          ) &&
          new Date(item.start_date) > new Date(start_date_value) &&
          new Date(item.end_date) < new Date(end_date_value)
      );
      setDataPerPage(dataFilter.slice(start, end));
    }
    if (name === "end_date") {
      end_date_value = value;
      setDataSearch({
        ...dataSearch,
        [name]: value,
      });
      dataFilter = dataListCheck.filter(
        (item) =>
          removeMark(item.name.toLowerCase()).includes(
            removeMark(dataSearch.name.toLowerCase())
          ) &&
          new Date(item.start_date) > new Date(dataSearch.start_date) &&
          new Date(item.end_date) < new Date(end_date_value)
      );
      setDataPerPage(dataFilter.slice(start, end));
    }
  };

  const handleOnClick = async (e) => {
    setIsLoading(true);
    let res = [];
    const value = e.target.value;
    if (parseInt(roleId) === variable.GLRoleId) {
      res = await getAllCheckpointApi(token, value);
    }
    if (parseInt(roleId) === variable.TLRoleId) {
      res = await getCheckpointsByReviewId(token, value);
    }
    setDataPerPage(res.data.data.checkpoint.data);
    setPagination(res.data.data.checkpoint);
    setDataListCheck(res.data.data.checkpoint.data);
    setIsLoading(false);
  };

  const [dataListCheck, setDataListCheck] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = [];
      if (parseInt(roleId) === variable.GLRoleId) {
        setIsLoading(true);
        res = await getAllCheckpointApi(token, 1);
        setDataListCheck(res.data.data.checkpoint.data);
        setDataPerPage(res.data.data.checkpoint.data);
        setPagination(res.data.data.checkpoint);
        setIsLoading(false);
      }
      if (parseInt(roleId) === variable.TLRoleId) {
        setIsLoading(true);
        res = await getCheckpointsByReviewId(token, 1);
        setDataListCheck(res.data.data.data.map((item) => item.checkpoint));
        setDataPerPage(
          res.data.data.data.map((item) => item.checkpoint).slice(start, end)
        );
        setPagination(res.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setDataSearch({
        name: "",
        start_date: dayjs(new Date("2022-01-01")).format("YYYY-MM-DDTHH:mm"),
        end_date: dayjs(new Date("2025-12-31")).format("YYYY-MM-DDTHH:mm"),
      });
      setDataPerPage(dataListCheck);
      setIsLoading(false);
    } catch (err) {}
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
        onClick={handleOnClick}
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
          onClick={handleOnClick}
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
        onClick={handleOnClick}
        disabled={pagination.current_page === pagination.last_page}
      >
        {t("next")}
      </button>
    </li>
  );
  return (
    <div className="list-member-his-cover">
      <div className="container ">
        <div className="table-wrapper list-mem-history">
          <div className="table-title list-mem-history">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">
                      {t("listMemberHistory.memberHistory")}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group form2">
                  <label className="control-label label1 col-sm-2">
                    {t("title")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("listMemberHistory.titleFilter")}
                      name="name"
                      onChange={onChangeInput}
                      value={dataSearch.name}
                    ></input>
                  </div>
                  <label className="control-label label1 col-sm-2">
                    {t("startDate")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="start"
                      name="start_date"
                      onChange={onChangeInput}
                      value={dataSearch.start_date}
                    ></input>
                  </div>
                  <label className="control-label label1 col-sm-2">
                    {t("endDate")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="end"
                      name="end_date"
                      onChange={onChangeInput}
                      value={dataSearch.end_date}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-default btn-filter">
                {t("listMemberHistory.resetFilter")}
              </button>
            </div>
          </form>
          {isLoading === true && <LoadingSpinner />}
          {dataPerPage.length === 0 && isLoading === false && (
            <h3 className="list-member-history-notify">
              {t("listMemberHistory.noCheckpoints")}
            </h3>
          )}
          {dataPerPage.length > 0 && isLoading === false && (
            <div>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("title")}</th>
                    <th>{t("startDate")}</th>
                    <th>{t("endDate")}</th>
                    <th>{t("count")}</th>
                    <th className="view-list-member-history">{t("view")}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPerPage?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {(pagination.current_page - 1) * pagination.per_page +
                            index +
                            1}
                        </td>
                        <td>{ele.name}</td>
                        <td>{ele.start_date}</td>
                        <td>{ele.end_date}</td>
                        <td>{ele.count_review}</td>
                        <td>
                          <Link to={`/histories/member/${ele.id}`}>
                            <button
                              variant="primary"
                              className="btn-list-member-history"
                            >
                              <i className="bi bi-arrow-right-circle"></i>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center list-mem-history">
                  {menuItems}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListMemberHistory;
