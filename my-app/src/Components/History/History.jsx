import { useState, useEffect } from "react";
import { getAllCheckpoints } from "../../Api/userApi";
import { useLocation, Link } from "react-router-dom";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListHistories,
  updateListHistories,
} from "../../store/listHistorySlice";
import "./History.css";
function History() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [listHistories, setListHistories] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    links: [],
  });
  const handleOnClick = async (e) => {
    setIsLoading(true);
    const value = e.target.value;
    const resCheck = await getAllCheckpoints(token, value);
    setPagination(resCheck.data.data);
    setDataPerPage(resCheck.data.data.data);
    setIsLoading(false);
  };
  const token = localStorage.getItem("localToken");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getAllCheckpoints(token, 1);
      setDataPerPage(res.data.data.data);
      setPagination(res.data.data);
      setIsLoading(false);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
      setIsLoading(false);
    }
  };

  let menuItems = [];
  menuItems.push(
    <li key="pre" className="page-item">
      <button
        type="button"
        className="page-link"
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
    <>
      <div className="histories-cover">
        <div className="container ">
          <div className="table-wrapper history">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {t("history.listHistories")}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {isLoading === true && <LoadingSpinner />}
            {dataPerPage.length === 0 && isLoading === false && (
              <h3 className="history-notify">{t("history.noHistories")}</h3>
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
                      <th style={{ width: "14%" }}>{t("ratio")}</th>
                      <th className="view-history">{t("view")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage?.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>{(page - 1) * itemsPerPage + index + 1}</td>
                          <td>{ele.checkpoint.name}</td>
                          <td>{ele.checkpoint.start_date}</td>
                          <td>{ele.checkpoint.end_date}</td>
                          <td>
                            {ele.checkpoint.count_review_done}/
                            {ele.checkpoint.count_review}
                          </td>
                          <td>
                            <Link to={`/histories/${ele.checkpoint.id}`}>
                              <button
                                variant="primary"
                                className="btn-list-history"
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
                  <ul className="pagination justify-content-center history">
                    {menuItems}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default History;
