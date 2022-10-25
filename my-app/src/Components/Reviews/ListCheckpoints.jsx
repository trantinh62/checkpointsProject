import { useState, useEffect } from "react";
import { getCheckpointsByReviewId } from "../../Api/userApi";
import { useLocation, Link } from "react-router-dom";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./ListCheckpoints.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListCheckpoints,
  updateListCheckpoints,
} from "../../store/listCheckpointSlice";

function ListReviews() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const dispatch = useDispatch();

  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataPerPage, setDataPerPage] = useState([]);
  const [listCheckpoints, setListCheckpoints] = useState([]);
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
    const resCheck = await getCheckpointsByReviewId(token, value);
    setPagination(resCheck.data.data);
    setDataPerPage(resCheck.data.data.data);
    dispatch(updateListCheckpoints(resCheck.data.data.data));
    setIsLoading(false);
  };
  const token = localStorage.getItem("localToken");
  const list = useSelector(selectListCheckpoints);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getCheckpointsByReviewId(token, 1);
      setNumPages(Math.ceil(res.data.data.data.length / itemsPerPage));
      setListCheckpoints(res.data.data.data);
      setDataPerPage(res.data.data.data.slice(start, end));
      dispatch(updateListCheckpoints(res.data.data.data));
      setPagination(res.data.data);
      setIsLoading(false);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
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
          type="button"
          className="page-link"
          value={pagination.links[i + 1] ? pagination.links[i + 1].label : ""}
          onClick={handleOnClick}
          disabled={pagination.current_page === i + 1}
          style={{ zIndex: 0 }}
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
    <div className="list-checkpoints-cover">
      <div className="container ">
        <div className="table-wrapper list-check">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb list-check">
                    <li className="breadcrumb-item active" aria-current="page">
                      {t("myCheckpoints.listCheckpoint")}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {isLoading === true && <LoadingSpinner />}
          {dataPerPage.length === 0 && isLoading === false && (
            <h3 className="checkpoint-notify">
              {t("myCheckpoints.allChecked")}
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
                    <th style={{ width: "14%" }}>{t("ratio")}</th>
                    <th className="view-checkpoint">{t("view")}</th>
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
                        <td>{ele.checkpoint.name}</td>
                        <td>{ele.checkpoint.start_date}</td>
                        <td>{ele.checkpoint.end_date}</td>
                        <td>
                          {ele.checkpoint.count_review_done}/
                          {ele.checkpoint.count_review}
                        </td>
                        <td>
                          <Link to={`/mycheckpoints/${ele.checkpoint.id}`}>
                            <button
                              variant="primary"
                              className="btn-list-checkpoint"
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
                <ul className="pagination justify-content-center list-checkpoints">
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

export default ListReviews;
