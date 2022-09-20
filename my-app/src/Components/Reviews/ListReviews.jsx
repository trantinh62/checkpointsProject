import { useState, useEffect } from "react";
import { getReviewsByCheckpointIdAndUserId } from "../../Api/userApi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ListReviews.css";
function ListReviews() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams();
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataYetReview, setDataYetReview] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [numPages, setNumPages] = useState(1, []);
  const handleOnClick = (e) => {
    const page = e.target.value;
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
      const res = await getReviewsByCheckpointIdAndUserId(token, true, false);
      const yetReview = res.data.data.assign_review.filter(
        (item) =>
          item.attitude === null &&
          item.performance === null &&
          item.strength === null &&
          item.teamwork === null &&
          item.training === null
      );
      setDataYetReview(yetReview);
      setNumPages(Math.ceil(yetReview.length / itemsPerPage));
      setDataPerPage(res.data.data.assign_review.slice(start, end));
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
                      List reviews: {dataPerPage[0]?.name_checkpoint.name}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>User is checked</th>
                <th>Start date</th>
                <th>End date</th>
              </tr>
            </thead>
            <tbody>
              {dataPerPage?.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a
                        style={{ textDecoration: "none" }}
                        href={`/mycheckpoints/${
                          ele.name_checkpoint.id
                        }/reviews/${ele.id}?title=${
                          ele.name_checkpoint.name
                        }&user_id=${ele.user_info.id}&username=${
                          ele.user_info.first_name !== null &&
                          ele.user_info.first_name !== null
                            ? ele.user_info.first_name +
                              " " +
                              ele.user_info.last_name +
                              " (" +
                              ele.user_info.email +
                              " )"
                            : ele.user_info.email
                        }`}
                      >
                        {ele.user_info.first_name !== null &&
                        ele.user_info.first_name !== null
                          ? ele.user_info.first_name +
                            " " +
                            ele.user_info.last_name +
                            " (" +
                            ele.user_info.email +
                            " )"
                          : ele.user_info.email}
                      </a>
                    </td>
                    <td>{ele.name_checkpoint.start_date}</td>
                    <td>{ele.name_checkpoint.end_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">{menuItems}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ListReviews;
