import { useState, useEffect } from "react";
import { getReviewsByCheckpointIdAndMyReviewId } from "../../Api/userApi";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
  Link,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Toast from "../Toast/Toast";
import "./ListReviews.css";
function ListReviews() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams();
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [dataYetReview, setDataYetReview] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [numPages, setNumPages] = useState(1, []);
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = (e) => {
    const page = e.target.value;
    setPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(dataYetReview.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getReviewsByCheckpointIdAndMyReviewId(
        token,
        params.check_id
      );
      const yetReview = res.data.data.filter(
        (item) =>
          item.attitude === null &&
          item.performance === null &&
          item.strength === null &&
          item.teamwork === null &&
          item.training === null
      );
      setDataYetReview(yetReview);
      setNumPages(Math.ceil(yetReview.length / itemsPerPage));
      setDataPerPage(yetReview.slice(start, end));
      // setDataYetReview(res.data.data);
      // setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      // setDataPerPage(res.data.data.slice(start, end));
      setIsLoading(false);
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
    <div className="list-reviews-cover">
      <div className="container">
        <div className="table-wrapper list-review">
          <div className="table-title list-review">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/mycheckpoints">
                        {t("myCheckpoints.listCheckpoint")}
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            {isLoading === true && <LoadingSpinner />}
            {dataPerPage.length === 0 && isLoading === false && (
              <h3 className="review-notify">{t("listReviews.allChecked")}</h3>
            )}
            {dataPerPage.length > 0 && isLoading === false && (
              <>
                {dataPerPage?.map((ele, index) => {
                  return (
                    <div key={index} className="col-xl-3 col-sm-6">
                      <div className="card" style={{ height: "19rem" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="avatar-md">
                              <div className="avatar-title bg-soft-primary text-primary display-6 m-0 rounded-circle">
                                <i className="bx bxs-user-circle"></i>
                              </div>
                            </div>
                            <div className="flex-1 ms-3">
                              <h5 className="font-size-16 mb-1 review-name">
                                {ele.user.first_name !== null &&
                                ele.user.first_name !== null
                                  ? ele.user.first_name +
                                    " " +
                                    ele.user.last_name
                                  : "Unknown"}
                              </h5>
                              <span className="badge badge-soft-success mb-0">
                                {ele.user.role_id === 1 && "Group leader"}
                                {ele.user.role_id === 2 && "Team leader"}
                                {ele.user.role_id === 3 && "Member"}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 pt-1">
                            <div className="text-muted mb-0">
                              <i className="bi bi-phone"></i>
                              {ele.user.phone}
                            </div>
                            <div className="text-muted mb-0 mt-2 review-panel">
                              <i className="bi bi-envelope"></i>
                              <div>{ele.user.email}</div>
                            </div>
                          </div>
                          <div className="d-flex gap-2 pt-4 btn-review-div">
                            <Link
                              to={`/mycheckpoints/${params.check_id}/reviews/${
                                ele.id
                              }?title=${title}&user_id=${
                                ele.user.id
                              }&username=${
                                ele.user.first_name !== null &&
                                ele.user.first_name !== null
                                  ? ele.user.first_name +
                                    " " +
                                    ele.user.last_name +
                                    " (" +
                                    ele.user.email +
                                    " )"
                                  : ele.user.email
                              }`}
                            >
                              <button
                                type="button"
                                className="btn btn-primary btn-review"
                                style={{
                                  background: "#5dabc3",
                                  border: "none",
                                }}
                              >
                                <i className="bx bx-message-square-dots me-1"></i>
                                {t("listReviews.btnReview")}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {menuItems}
                  </ul>
                </nav>
              </>
            )}
          </div>

          <div className="form-group form1">
            <div className="d-flex btn-group-1">
              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="btn btn-default btn-review"
                disabled={isLoading}
              >
                {t("btnBack")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListReviews;
