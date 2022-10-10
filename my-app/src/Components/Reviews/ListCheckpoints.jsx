import { useState, useEffect } from "react";
import { getCheckpointsByReviewId } from "../../Api/userApi";
import { useLocation } from "react-router-dom";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import "./ListCheckpoints.css";
function ListReviews() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataPerPage, setDataPerPage] = useState([]);
  const [listCheckpoints, setListCheckpoints] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleOnClick = (e) => {
    const page = e.target.value;
    setPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listCheckpoints.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await getCheckpointsByReviewId(token);
      setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      setListCheckpoints(res.data.data);
      setDataPerPage(res.data.data.slice(start, end));
      setLoading(true);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
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
    <div className="list-checkpoints-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">
                      {t("myCheckpoints.listCheckpoint")}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {loading === false && (
            <h3 className="review-notify">{t("waitingData")}</h3>
          )}
          {dataPerPage.length === 0 && loading === true && (
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
                    <th className="view-checkpoint">{t("view")}</th>
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
                          <a
                            href={`/mycheckpoints/${ele.checkpoint.id}?title=${ele.checkpoint.name}`}
                          >
                            <button
                              variant="primary"
                              className="btn-list-checkpoint"
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

export default ListReviews;
