import { useState, useEffect } from "react";
import { getCheckpointsByReviewId } from "../../Api/userApi";
import { useLocation, Link } from "react-router-dom";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./ListCheckpoints.css";
import { useSelector, useDispatch } from "react-redux";

function ListReviews() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const user = useSelector((state) => state.userLogin);

  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataPerPage, setDataPerPage] = useState([]);
  const [listCheckpoints, setListCheckpoints] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      const res = await getCheckpointsByReviewId(token);
      setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      setListCheckpoints(res.data.data);
      setDataPerPage(res.data.data.slice(start, end));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
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
      <div>user: {user.username}</div>
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
                    <th>{t("ratio")}</th>
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
                        <td></td>
                        <td>
                          <Link
                            to={`/mycheckpoints/${ele.checkpoint.id}?title=${ele.checkpoint.name}`}
                          >
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
