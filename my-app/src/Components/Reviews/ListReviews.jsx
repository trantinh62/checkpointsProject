import { useState, useEffect } from "react";
import { getReviewsByCheckpointIdAndMyReviewId } from "../../Api/userApi";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Toast from "../Toast/Toast";
import "./ListReviews.css";
function ListReviews() {
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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
    } catch (err) {
      Toast("An error occurred while loading data!", "error");
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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css"
        integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
        integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
        crossOrigin="anonymous"
      />

      <div className="container">
        <div className="table-wrapper list-review">
          <div className="table-title list-review">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/mycheckpoints">
                        My checkpoints: List checkpoints
                      </a>
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
            {loading === false && (
              <h3 className="review-notify">Waiting for loading data!</h3>
            )}
            {JSON.stringify(dataPerPage) === JSON.stringify([]) &&
              loading === true && (
                <h3 className="review-notify">All checkpoints are checked!</h3>
              )}
            {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
              <>
                {dataPerPage?.map((ele, index) => {
                  return (
                    <div className="col-xl-3 col-sm-6">
                      <div className="card" style={{ height: "19rem" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div class="avatar-md">
                              <div class="avatar-title bg-soft-primary text-primary display-6 m-0 rounded-circle">
                                <i class="bx bxs-user-circle"></i>
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
                            <p className="text-muted mb-0 ">
                              <i className="mdi mdi-phone font-size-5 align-middle pe-2 text-primary"></i>
                              {ele.user.phone}
                            </p>
                            <p className="text-muted mb-0 mt-2 review-panel">
                              <i className="mdi mdi-email font-size-5 align-middle pe-2 text-primary"></i>
                              <div>{ele.user.email}</div>
                            </p>
                          </div>
                          <div className="d-flex gap-2 pt-4 btn-review-div">
                            <a
                              href={`/mycheckpoints/${
                                params.check_id
                              }/reviews/${ele.id}?title=${title}&user_id=${
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
                                Review
                              </button>
                            </a>
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
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListReviews;
