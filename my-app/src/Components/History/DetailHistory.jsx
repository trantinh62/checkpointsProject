import { useState, useEffect } from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  getAvgByCheckpointIdMyHistory,
  getReviewsByCheckpointId,
} from "../../Api/userApi";
import Toast from "../Toast/Toast";
import "./DetailHistory.css";
function DetailHistory() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [listReviews, setListReviews] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [dataAvg, setDataAvg] = useState({
    avg_attitude: 0,
    avg_performance: 0,
    avg_teamwork: 0,
    avg_training: 0,
    avg_adhere: 0,
  });
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listReviews.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");
  const userId = sessionStorage.getItem("sessionUserId");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await getReviewsByCheckpointId(token, params.id);
      setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      setDataPerPage(res.data.data.slice(start, end));
      setListReviews(res.data.data);
      const resAvg = await getAvgByCheckpointIdMyHistory(token, params.id);
      setLoading(true);
      if (resAvg.data.data[0].avg_checkpoint.length !== 0) {
        setDataAvg(resAvg.data.data[0].avg_checkpoint[0]);
      }
    } catch (err) {
      Toast("An error occurred while loading data!", "error");
    }
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
    <div className="detail-histories-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/histories">
                        My checkpoints: Checkpoint histories
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Title: {title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {loading === false && (
            <h3 className="review-notify">Waiting for loading data!</h3>
          )}
          {JSON.stringify(dataPerPage) === JSON.stringify([]) &&
            loading == true && (
              <h3 className="history-notify">No checkpoint history!</h3>
            )}
          {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
            <div>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="point-table">Attitude</th>
                    <th className="point-table">Performance</th>
                    <th className="point-table">Teamwork</th>
                    <th className="point-table">Training</th>
                    <th className="point-table">Adhere</th>
                    <th>Strength</th>
                    <th>Weakness</th>
                    <th style={{ width: "12rem" }}>Reviewer</th>
                    <th style={{ width: "6rem" }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPerPage?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{(page - 1) * itemsPerPage + index + 1}</td>
                        <td>{ele.attitude}</td>
                        <td>{ele.performance}</td>
                        <td>{ele.teamwork}</td>
                        <td>{ele.training}</td>
                        <td>{ele.adhere}</td>
                        <td>{ele.strength}</td>
                        <td>{ele.weakness}</td>
                        <td>
                          {ele.reviewer.first_name !== null &&
                          ele.reviewer.last_name !== null
                            ? ele.reviewer.first_name +
                              " " +
                              ele.reviewer.last_name +
                              " (" +
                              ele.reviewer.email +
                              ")"
                            : ele.reviewer.email}
                        </td>
                        <td>
                          {ele.weakness === null &&
                          ele.performance === null &&
                          ele.teamwork === null &&
                          ele.training === null &&
                          ele.adhere === null
                            ? "Ch??a ????nh gi??"
                            : "???? ????nh gi??"}
                        </td>
                      </tr>
                    );
                  })}
                  <tr key="Avg">
                    <td>Avg</td>
                    <td>
                      {dataAvg.avg_attitude !== 0 && dataAvg.avg_attitude}
                    </td>
                    <td>
                      {dataAvg.avg_performance !== 0 && dataAvg.avg_performance}
                    </td>
                    <td>
                      {dataAvg.avg_teamwork !== 0 && dataAvg.avg_teamwork}
                    </td>
                    <td>
                      {dataAvg.avg_training !== 0 && dataAvg.avg_training}
                    </td>
                    <td>{dataAvg.avg_adhere !== 0 && dataAvg.avg_adhere}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {dataAvg.avg_attitude === 0 &&
                      dataAvg.avg_performance === 0 &&
                      dataAvg.avg_teamwork === 0 &&
                      dataAvg.avg_training === 0 &&
                      dataAvg.avg_adhere === 0
                        ? "Ch??a ho??n th??nh"
                        : "???? ho??n th??nh"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {menuItems}
                </ul>
              </nav>
            </div>
          )}
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
        </div>
      </div>
    </div>
  );
}
export default DetailHistory;
