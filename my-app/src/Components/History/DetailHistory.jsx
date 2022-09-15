import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getReviewsByCheckpointId } from "../../Api/userApi";
import "./DetailHistory.css";
function DetailHistory() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
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
      const res = await getReviewsByCheckpointId(token, params.id);
      console.log(res);
      setNumPages(Math.ceil(res.data.length / itemsPerPage));
      setDataPerPage(res.data.slice(start, end));
      setListReviews(res.data);
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
    <div className="histories-cover">
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
                <th className="point-table">Attitude</th>
                <th className="point-table">Performance</th>
                <th className="point-table">Teamwork</th>
                <th className="point-table">Training</th>
                <th className="point-table">Adhere</th>
                <th className="point-table">Created date</th>
                <th>Strength</th>
                <th>Weakness</th>
                <th className="point-table">Note</th>
              </tr>
            </thead>
            <tbody>
              {dataPerPage?.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.attitude}</td>
                    <td>{ele.performance}</td>
                    <td>{ele.teamwork}</td>
                    <td>{ele.training}</td>
                    <td>{ele.adhere}</td>
                    <td>
                      {ele.updated_at !== ele.created_at
                        ? Date(ele.updated_at).toString()
                        : ""}
                    </td>
                    <td>{ele.strength}</td>
                    <td>{ele.weakness}</td>
                    <td>
                      {ele.weakness === null &&
                      ele.performance === null &&
                      ele.teamwork === null &&
                      ele.training === null &&
                      ele.adhere === null
                        ? "Chưa đánh giá"
                        : "Đã đánh giá"}
                    </td>
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
export default DetailHistory;
