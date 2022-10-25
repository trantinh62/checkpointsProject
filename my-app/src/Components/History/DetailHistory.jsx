import { useState, useEffect } from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import {
  getAvgByCheckpointIdMyHistory,
  getReviewsByCheckpointId,
  getAllCheckpoints,
} from "../../Api/userApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useTranslation } from "react-i18next";
import Toast from "../Toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListHistories,
  updateListDetailHistories,
  updateListHistories,
} from "../../store/listHistorySlice";
import "./DetailHistory.css";
function DetailHistory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const [title, setTitle] = useState("");
  const [searchParams] = useSearchParams();
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
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listReviews.slice(start, end));
  };
  const token = localStorage.getItem("localToken");
  const userId = localStorage.getItem("localUserId");
  const history = useSelector(selectListHistories);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getReviewsByCheckpointId(token, params.id);
      setTitle(res.data.data[0].name);
      setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      setDataPerPage(res.data.data.slice(start, end));
      setListReviews(res.data.data);
      const resAvg = await getAvgByCheckpointIdMyHistory(token, params.id);
      if (resAvg.data.data[0].avg_checkpoint.length !== 0) {
        res.data.data.avg = resAvg.data.data[0].avg_checkpoint[0];
        setDataAvg(resAvg.data.data[0].avg_checkpoint[0]);
      }
      setIsLoading(false);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
      setIsLoading(false);
    }
  };

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
                      <Link to="/histories">{t("history.listHistories")}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {isLoading && <LoadingSpinner />}
          {dataPerPage.length === 0 && isLoading === false && (
            <h3 className="history-notify">{t("history.noHistories")}</h3>
          )}
          {dataPerPage.length > 0 && isLoading === false && (
            <div>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th className="point-table">{t("Attitude")}</th>
                    <th className="point-table">{t("Performance")}</th>
                    <th className="point-table">{t("Teamwork")}</th>
                    <th className="point-table">{t("Training")}</th>
                    <th className="point-table">{t("Adhere")}</th>
                    <th>{t("Strength")}</th>
                    <th>{t("Weakness")}</th>
                    <th style={{ width: "15%" }}>{t("Reviewer")}</th>
                    <th style={{ width: "6%" }}>{t("Note")}</th>
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
                            ? t("yetChecked")
                            : t("checked")}
                        </td>
                      </tr>
                    );
                  })}
                  <tr key="Avg">
                    <td>{t("Avg")}</td>
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
                        ? t("yet")
                        : t("done")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="form-group">
            <div className="d-flex">
              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="btn btn-default btn-detail-history"
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
export default DetailHistory;
