import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAllCheckpointApi,
  getCheckpointsByReviewId,
} from "../../Api/userApi";
import dayjs from "dayjs";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import removeMark from "../../Helper/removeMark";
import "./ListMemberHistory.css";

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
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("sessionToken");
  const roleId = sessionStorage.getItem("sessionRoleId");

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
      setDataPerPage(dataFilter.slice(start, end));
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

  const handleOnClick = (e) => {
    const page = e.target.value;
    setPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(dataListCheck.slice(start, end));
  };

  const [dataListCheck, setDataListCheck] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = [];
      if (roleId === "1") {
        res = await getAllCheckpointApi(token);
        setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
        setDataListCheck(res.data.data.checkpoints);
        setDataPerPage(res.data.data.checkpoints.slice(start, end));
        setLoading(true);
      }
      if (roleId === "2") {
        res = await getCheckpointsByReviewId(token);
        setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
        setDataListCheck(res.data.data.map((item) => item.checkpoint));
        setDataPerPage(
          res.data.data.map((item) => item.checkpoint).slice(start, end)
        );
        setLoading(true);
      }
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const page = 1;
      setPage(page);
      const start = (page - 1) * itemsPerPage;
      const end = page * itemsPerPage;
      setDataSearch({
        name: "",
        start_date: dayjs(new Date("2022-01-01")).format("YYYY-MM-DDTHH:mm"),
        end_date: dayjs(new Date("2022-12-31")).format("YYYY-MM-DDTHH:mm"),
      });
      setDataPerPage(dataListCheck.slice(start, end));
    } catch (err) {}
  };

  let menuItems = [];
  for (var i = 0; i < numPages; i++) {
    menuItems.push(
      <li key={i} className="page-item">
        <button
          type="button"
          className="page-link"
          value={i + 1}
          onClick={handleOnClick}
        >
          {i + 1}
        </button>
      </li>
    );
  }
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
          {loading === false && (
            <h3 className="review-notify">{t("waitingData")}</h3>
          )}
          {dataPerPage.length === 0 && loading === true && (
            <h3 className="list-member-history-notify">
              {t("listMemberHistory.noCheckpoints")}
            </h3>
          )}
          {dataPerPage.length > 0 && (
            <div>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("title")}</th>
                    <th>{t("startDate")}</th>
                    <th>{t("endDate")}</th>
                    <th className="view-list-member-history">{t("view")}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPerPage?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{(page - 1) * itemsPerPage + index + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.start_date}</td>
                        <td>{ele.end_date}</td>
                        <td>
                          <a
                            href={`/histories/member/${ele.id}?title=${ele.name}`}
                          >
                            <button
                              variant="primary"
                              className="btn-list-member-history"
                            >
                              <i className="bi bi-arrow-right-circle"></i>
                            </button>
                          </a>
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
        </div>
      </div>
    </div>
  );
}

export default ListMemberHistory;
