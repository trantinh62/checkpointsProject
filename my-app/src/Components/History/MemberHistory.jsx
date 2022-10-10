import { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  getCheckpointByCheckId,
  getReviewsByCheckpointIdAndUserId,
  getListUsersByCheckpointId,
  getAvgByCheckpointIdAuthor,
} from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import Toast from "../Toast/Toast";
import "./MemberHistory.css";

function MemberHistory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [dataPagination, setDataPagination] = useState({
    page: new URLSearchParams(search).get("page") || 1,
    itemsPerPage: 10,
  });
  const [listDataAvg, setListDataAvg] = useState([]);
  const [dataAvg, setDataAvg] = useState({
    avg_attitude: 0,
    avg_performance: 0,
    avg_teamwork: 0,
    avg_training: 0,
    avg_adhere: 0,
  });
  const start = (dataPagination.page - 1) * dataPagination.itemsPerPage;
  const end = dataPagination.page * dataPagination.itemsPerPage;
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataCheckpoint, setDataCheckpoint] = useState({
    id: null,
    name: "",
  });
  const [dataCheckpointByUser, setDataCheckpointByUser] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const token = sessionStorage.getItem("sessionToken");
  const roleId = sessionStorage.getItem("sessionRoleId");
  const fetchData = async () => {
    try {
      const resCheck = await getCheckpointByCheckId(token, params.id);
      setDataCheckpoint(resCheck.data.data);
      let resUser = [];
      if (roleId === "1") {
        resUser = await getListUsersByCheckpointId(token, params.id);
        setDataUser(resUser.data.data.map((item) => item.user));
      }
      if (roleId === "2") {
        resUser = await getListUsersByCheckpointId(token, params.id); // mai sua
        setDataUser(resUser.data.data.map((item) => item.user));
      }
      const resMemberHistory = await getReviewsByCheckpointIdAndUserId(
        token,
        params.id,
        resUser.data.data[0]?.user.id
      );
      setDataCheckpointByUser(resMemberHistory.data.data);
      setNumPages(
        Math.ceil(
          resMemberHistory.data.data.length / dataPagination.itemsPerPage
        )
      );
      setDataPerPage(resMemberHistory.data.data.slice(start, end));
      const resAvg = await getAvgByCheckpointIdAuthor(token, params.id);
      setListDataAvg(resAvg.data.data);
      const avgPoint = resAvg.data.data[0].avg_checkpoint.filter(
        (item) =>
          item.user_id === parseInt(resAvg.data.data[0].avg_checkpoint[0]?.id)
      );
      if (avgPoint.length === 1) {
        setDataAvg(avgPoint[0]);
      }
      setLoading(true);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };

  const onChangeInput = async (e) => {
    let { name, value } = e.target;
    if (name === "user_id") {
      value = parseInt(value);
      const resMemberHistory = await getReviewsByCheckpointIdAndUserId(
        token,
        params.id,
        value
      );
      setNumPages(
        Math.ceil(
          resMemberHistory.data.data.length / dataPagination.itemsPerPage
        )
      );
      setDataCheckpointByUser(resMemberHistory.data.data);
      setDataPerPage(resMemberHistory.data.data.slice(start, end));
      const avgPoint = listDataAvg[0].avg_checkpoint.filter(
        (item) => item.user_id === parseInt(value)
      );
      if (avgPoint.length === 1) {
        setDataAvg(avgPoint[0]);
      }
      if (avgPoint.length === 0) {
        setDataAvg({
          avg_attitude: 0,
          avg_performance: 0,
          avg_teamwork: 0,
          avg_training: 0,
          avg_adhere: 0,
          created_at: null,
        });
      }
    }
  };

  const handleOnClick = (e) => {
    setDataPagination({
      ...dataPagination,
      page: e.target.value,
    });
    const page = e.target.value;
    const start = (page - 1) * dataPagination.itemsPerPage;
    const end = page * dataPagination.itemsPerPage;
    setDataPerPage(dataCheckpointByUser.slice(start, end));
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
    <div className="member-his-cover">
      <div className="container ">
        <div className="table-wrapper mem-history">
          <div className="table-title mem-history">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/histories/member">
                        {t("listMemberHistory.memberHistory")}
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
          <form>
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group form2">
                  <label className="control-label label1 col-sm-2">
                    {t("title")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title checkpoint"
                      name="name"
                      value={dataCheckpoint.name}
                      readOnly
                    ></input>
                  </div>
                  <label className="control-label label1 col-sm-2">
                    {t("beChecked")}
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      name="user_id"
                      onChange={onChangeInput}
                      aria-label="Default select example"
                    >
                      {dataUser?.map((ele, index) => {
                        return (
                          <option key={index} value={ele.id}>
                            {ele.first_name + " " + ele.last_name !==
                            "null null"
                              ? ele.first_name +
                                " " +
                                ele.last_name +
                                " (" +
                                ele.email +
                                ")"
                              : "(" + ele.email + ")"}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {loading === false && (
              <h3 className="review-notify">{t("waitingData")}</h3>
            )}
            {dataPerPage.length === 0 && loading === true && (
              <h3 className="member-history-notify">
                {t("memberHistory.noCheckpoints")}
              </h3>
            )}
            {dataPerPage.length > 0 && (
              <div>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="point-table-member">{t("Attitude")}</th>
                      <th className="point-table-member">{t("Performance")}</th>
                      <th className="point-table-member">{t("Teamwork")}</th>
                      <th className="point-table-member">{t("Training")}</th>
                      <th className="point-table-member">{t("Adhere")}</th>
                      <th>{t("Strength")}</th>
                      <th>{t("Weakness")}</th>
                      <th style={{ width: "12rem" }}>{t("Reviewer")}</th>
                      <th style={{ width: "6rem" }}>{t("Note")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage?.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {(dataPagination.page - 1) *
                              dataPagination.itemsPerPage +
                              index +
                              1}
                          </td>
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
                            {ele.attitude === null &&
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
                    <tr key="Avg">
                      <td>Avg</td>
                      <td>
                        {dataAvg.avg_attitude !== 0 && dataAvg.avg_attitude}
                      </td>
                      <td>
                        {dataAvg.avg_performance !== 0 &&
                          dataAvg.avg_performance}
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
                          ? "Chưa hoàn thành"
                          : "Đã hoàn thành"}
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
            <div className="form-group form1">
              <div className="d-flex btn-group-1">
                <button
                  onClick={() => {
                    navigate("/histories/member", { replace: true });
                    navigate(0);
                  }}
                  type="submit"
                  className="btn btn-default mem-history"
                >
                  {t("btnBack")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MemberHistory;
