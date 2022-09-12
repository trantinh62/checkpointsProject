import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DetailHistory.css";
function DetailHistory() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 2;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [listReviews, setListReviews] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  let [numPages, setNumPages] = useState(1, []);
  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listReviews.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // const res = await getListReviews(token);
      // setNumPages(Math.ceil(res.data.data.assign_review.length / itemsPerPage));
      // setDataPerPage(res.data.data.assign_review.slice(start, end));
      // setListReviews(res.data.data.assign_review);
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
    <div className="reviews-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/histories">Histories</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/histories">List histories</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Detail history
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
                <th>Title</th>
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
                        href={`/reviews/${ele.id}`}
                      >
                        {ele.name_checkpoint.name}
                      </a>
                    </td>
                    <td>{ele.name_checkpoint.end_date}</td>
                    <td>{ele.name_checkpoint.end_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="form-group">
            <div className="d-flex">
              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="btn btn-default "
              >
                Cancel
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
export default DetailHistory;
