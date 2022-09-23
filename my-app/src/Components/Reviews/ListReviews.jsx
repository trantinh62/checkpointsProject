import { useState, useEffect } from "react";
import { getReviewsByCheckpointIdAndMyReviewId } from "../../Api/userApi";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "./ListReviews.css";
function ListReviews() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams();
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [dataYetReview, setDataYetReview] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [numPages, setNumPages] = useState(1, []);
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
    } catch (err) {}
  };
  let menuItems = [];
  for (var i = 0; i < numPages; i++) {
    menuItems.push(
      <li key={i} className="page-item">
        <button className="page-link" value={i + 1} onClick={handleOnClick}>
          {i + 1}
        </button>
      </li>
    );
  }
  console.log(dataPerPage);
  return (
    <div className="list-reviews-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
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
          {JSON.stringify(dataPerPage) === JSON.stringify([]) && (
            <h3 className="review-notify">All checkpoints are checked!</h3>
          )}
          {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User is checked</th>
                  <th className="role-list">Role</th>
                </tr>
              </thead>
              <tbody>
                {dataPerPage?.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{(page - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/mycheckpoints/${ele.id}/reviews/${
                            ele.id
                          }?title=${title}&user_id=${ele.user.id}&username=${
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
                          {ele.user.first_name !== null &&
                          ele.user.first_name !== null
                            ? ele.user.first_name +
                              " " +
                              ele.user.last_name +
                              " (" +
                              ele.user.email +
                              " )"
                            : ele.user.email}
                        </a>
                      </td>
                      <td>
                        <select
                          className="form-select list-reviews"
                          aria-label="Default select example"
                          value={ele.user.role_id}
                          id={ele.id}
                          disabled
                        >
                          <option value="1">Group leader</option>
                          <option value="2">Leader</option>
                          <option value="3">Member</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="form-group form1">
            <div className="d-flex btn-group-1">
              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="btn btn-default"
              >
                Back
              </button>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">{menuItems}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ListReviews;
