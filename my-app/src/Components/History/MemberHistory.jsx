import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Toast from "../Toast/Toast";
import {
  getCheckApi,
  getCheckedUser,
  getListUsersApi,
  getReviewsByCheckpointIdAndUserId,
  getListUsersByCheckpointId,
} from "../../Api/userApi";
import dayjs from "dayjs";
import "./MemberHistory.css";

function MemberHistory() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const [dataPagination, setDataPagination] = useState({
    page: new URLSearchParams(search).get("page") || 1,
    itemsPerPage: 10,
  });
  const start = (dataPagination.page - 1) * dataPagination.itemsPerPage;
  const end = dataPagination.page * dataPagination.itemsPerPage;
  let [numPages, setNumPages] = useState(1, []);
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
  const fetchData = async () => {
    try {
      const resCheck = await getCheckApi(token, params.id);
      setDataCheckpoint(resCheck.data.data);
      const resUser = await getListUsersByCheckpointId(token, params.id);
      setDataUser(resUser.data.data);
      console.log(resUser);
      const resMemberHistory = await getReviewsByCheckpointIdAndUserId(
        token,
        params.id,
        resUser.data.data[0].id
      );
      setDataCheckpointByUser(resMemberHistory.data);
      console.log("his", resMemberHistory.data);
      setNumPages(
        Math.ceil(resMemberHistory.data.length / dataPagination.itemsPerPage)
      );
      setDataPerPage(resMemberHistory.data.slice(start, end));
    } catch (err) {
      console.log(err);
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
      console.log("his", resMemberHistory.data);
      setNumPages(
        Math.ceil(resMemberHistory.data.length / dataPagination.itemsPerPage)
      );
      setDataCheckpointByUser(resMemberHistory.data);
      setDataPerPage(resMemberHistory.data.slice(start, end));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    <div className="member-his-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/create">
                        Manage checkpoints: Member's review histories
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Title:
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group form2">
                  <label className="control-label label1 col-sm-2">
                    Title:
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
                    Be assigned:
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
                                " )"
                              : "" + " (" + ele.email + " )"}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* <div className="form-group form2">
                  <label className="control-label label1 col-sm-2">
                    Start date:
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="start"
                      name="start_date"
                      onChange={onChangeInput}
                      value={dataCheckpoint.start_date}
                    ></input>
                  </div>
                  <label className="control-label label1 col-sm-2">
                    End date:
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="end"
                      name="end_date"
                      onChange={onChangeInput}
                      value={dataCheckpoint.end_date}
                    ></input>
                  </div>
                </div> */}
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
                      <td>
                        {ele.updated_at !== ele.created_at
                          ? dayjs(ele.updated_at).toString()
                          : ""}
                      </td>
                      <td>{ele.strength}</td>
                      <td>{ele.weakness}</td>
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
              </tbody>
            </table>
            <div className="form-group form1">
              <div className="d-flex btn-group-1">
                <button type="submit" className="btn btn-default ">
                  Create mean value
                </button>
                <button
                  onClick={() => navigate(-1)}
                  type="submit"
                  className="btn btn-default "
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">{menuItems}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default MemberHistory;
