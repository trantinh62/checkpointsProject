import { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Assign.css";
import {
  getDetailCheckpointApi,
  getCheckedUser,
  getAllUsersApi,
  createAndDeleteReview,
} from "../../Api/userApi";
import { useTranslation } from "react-i18next";
import Toast from "../Toast/Toast";

function Assgin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const selectAll = useRef(null);

  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [idAssign, setIdAssign] = useState(null);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataChecked, setDataChecked] = useState([]);
  const [copyChecked, setCopyChecked] = useState([]);
  let list_id_checked = [];

  const [dataCheckpoint, setDataCheckpoint] = useState({
    id: "",
    name: "",
  });
  const [dataReview, setDataReview] = useState({
    checkpoint_id: "",
    user_id: "",
    role_id: [],
    new_reviewers: [],
    remove_reviewers: [],
  });
  const [dataUser, setDataUser] = useState([]);
  const [dataUserEnable, setDataUserEnable] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const token = sessionStorage.getItem("sessionToken");
  const fetchData = async () => {
    try {
      const res = await getDetailCheckpointApi(token, params.id);
      const resUser = await getAllUsersApi(token);
      const resChecked = await getCheckedUser(
        token,
        params.id,
        resUser.data.data[0].id
      );
      setDataChecked(resChecked.data.data);
      setCopyChecked(resChecked.data.data);
      const beAssignedRoleId = resUser.data.data
        .filter((item) => item.id === resUser.data.data[0].id)
        .map((item) => item.role_id)[0];

      setDataCheckpoint(res.data.data);
      setDataReview({
        ...dataReview,
        checkpoint_id: res.data.data.id,
        user_id: resUser.data.data[0].id,
        role_id: [
          ...resChecked.data.data.map((item) => item.reviewer.role_id),
          beAssignedRoleId,
        ],
      });
      setNumPages(Math.ceil(resUser.data.data.length / itemsPerPage));
      setDataUser(resUser.data.data);
      setDataUserEnable(
        resUser.data.data.filter((item) => item.status !== "disable")
      );
      setDataFilter(
        resUser.data.data.filter(
          (item) =>
            item.id !== resUser.data.data[0].id && item.status !== "disable"
        )
      );
      setDataPerPage(
        resUser.data.data
          .filter(
            (item) =>
              item.id !== resUser.data.data[0].id && item.status !== "disable"
          )
          .slice(start, end)
      );
      setIdAssign(resUser.data.data[0].id);
      setLoading(true);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };
  const onChangeInput = async (e) => {
    let { name, value, id } = e.target;
    if (name === "user_id") {
      const resChecked = await getCheckedUser(token, params.id, value);
      setDataChecked(resChecked.data.data);
      setCopyChecked(resChecked.data.data);
      value = parseInt(value);
      setIdAssign(value);
      const beAssignedRoleId = dataUser
        .filter((item) => item.id === value)
        .map((item) => item.role_id)[0];
      setDataFilter(
        dataUser.filter(
          (item) => item.id !== value && item.status !== "disable"
        )
      );
      setDataReview({
        ...dataReview,
        new_reviewers: [],
        remove_reviewers: [],
        [name]: value,
        role_id: [
          ...resChecked.data.data.map((item) => item.reviewer.role_id),
          beAssignedRoleId,
        ],
      });
      setDataPerPage(
        dataUser
          .filter((item) => item.id !== value && item.status !== "disable")
          .slice(start, end)
      );

      selectAll.current.checked = false;
    } else if (name === "new_reviewers") {
      value = parseInt(value);
      if (copyChecked.filter((item) => item.review_id === value).length > 0) {
        if (!dataReview.remove_reviewers.includes(value)) {
          dataReview.role_id.splice(
            dataReview.role_id.indexOf(parseInt(id)),
            1
          );
          setDataReview({
            ...dataReview,
            remove_reviewers: [...dataReview.remove_reviewers, value],
            role_id: dataReview.role_id,
          });
          setDataChecked(
            dataChecked.filter((item) => item.review_id !== value)
          );
          return;
        }
        dataReview.remove_reviewers.splice(
          dataReview.remove_reviewers.indexOf(value),
          1
        );
        setDataReview({
          ...dataReview,
          remove_reviewers: dataReview.remove_reviewers,
          role_id: [
            ...dataReview.role_id,
            ...dataUser
              .filter((item) => item.id === value)
              .map((item) => item.role_id),
          ],
        });
        setDataChecked([
          ...dataChecked,
          ...copyChecked.filter((item) => item.review_id === value),
        ]);
        return;
      }
      if (!dataReview.new_reviewers.includes(value)) {
        setDataReview({
          ...dataReview,
          [name]: [...dataReview.new_reviewers, value],
          role_id: [...dataReview.role_id, parseInt(id)],
        });
      } else {
        dataReview.role_id.splice(dataReview.role_id.indexOf(parseInt(id)), 1);
        setDataReview({
          ...dataReview,
          [name]: dataReview.new_reviewers.filter((item) => item !== value),
          role_id: dataReview.role_id,
        });
      }
      let numCheckedUser =
        dataChecked.length === 0 ? dataChecked.length : dataChecked.length - 1;
      if (
        dataReview.new_reviewers.length + numCheckedUser ===
        dataFilter.length
      ) {
        selectAll.current.checked = false;
      } else if (
        !dataReview.new_reviewers.includes(value) &&
        dataReview.new_reviewers.push(value) + numCheckedUser ===
          dataFilter.length
      ) {
        selectAll.current.checked = true;
      }
    }
  };

  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(dataFilter.slice(start, end));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      list_id_checked = copyChecked.map((item) => item.review_id);
      const beAssignedRoleId = dataUser
        .filter((item) => item.id === idAssign)
        .map((item) => item.role_id)[0];
      setDataReview({
        ...dataReview,
        new_reviewers: dataFilter
          .filter((item) => !list_id_checked.includes(item.id))
          .map((item) => item.id),
        remove_reviewers: [],
        role_id: [beAssignedRoleId, ...dataUser.map((item) => item.role_id)],
      });
      setDataChecked(copyChecked);
    } else {
      list_id_checked = dataChecked.map((item) => item.review_id);
      const beAssignedRoleId = dataUser
        .filter((item) => item.id === idAssign)
        .map((item) => item.role_id)[0];
      setDataReview({
        ...dataReview,
        new_reviewers: [],
        remove_reviewers: [...list_id_checked],
        role_id: [beAssignedRoleId],
      });
      setDataChecked([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        dataReview.new_reviewers.length === 0 &&
        dataReview.remove_reviewers.length === 0
      ) {
        Toast(t("assign.noChangeWarning"), "warning");
        return;
      }
      if (Array.from(new Set(dataReview.role_id)).length < 3) {
        Toast(t("assign.rolesWarning"), "warning");
        return;
      }
      const res = await createAndDeleteReview(dataReview, token);
      const reschecked = await getCheckedUser(token, params.id, idAssign);

      const beAssignedRoleId = dataUser
        .filter((item) => item.id === idAssign)
        .map((item) => item.role_id)[0];
      setDataReview({
        ...dataReview,
        role_id: [
          ...reschecked.data.data.map((item) => item.reviewer.role_id),
          beAssignedRoleId,
        ],
        new_reviewers: [],
        remove_reviewers: [],
      });
      setDataChecked(reschecked.data.data);
      setCopyChecked(reschecked.data.data);
      Toast(t("assign.updateSuccess"), "success");
    } catch (err) {
      Toast(t("assign.updateFailed"), "error");
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
    <div className="assign-cover">
      <div className="container ">
        <div className="table-wrapper assign">
          <div className="table-title assign">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/create">
                        {t("create.create")}
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {dataCheckpoint.name}
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
                    {t("title")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title checkpoint"
                      name="name"
                      onChange={onChangeInput}
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
                      {dataUserEnable?.map((ele, index) => {
                        return (
                          <option key={index} value={ele.id}>
                            {ele.first_name + " " + ele.last_name !==
                            "null null"
                              ? ele.first_name +
                                " " +
                                ele.last_name +
                                " (" +
                                ele.email +
                                " ) (" +
                                ((ele.role_id === 1 && "Group leader") ||
                                  (ele.role_id === 2 && "Team Leader") ||
                                  (ele.role_id === 3 && "Member")) +
                                " )"
                              : "(" +
                                ele.email +
                                " )" +
                                ((ele.role_id === 1 && "Group leader") ||
                                  (ele.role_id === 2 && "Team Leader") ||
                                  (ele.role_id === 3 && "Member")) +
                                " )"}
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
              <h3 className="review-notify">{t("assign.noUsers")}</h3>
            )}
            {dataPerPage.length > 0 && (
              <div>
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>{t("username")}</th>
                      <th>{t("role")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage?.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              name="new_reviewers"
                              onChange={onChangeInput}
                              type="checkbox"
                              value={ele.id}
                              id={ele.role_id}
                              checked={
                                dataReview.new_reviewers.includes(ele.id) ||
                                dataChecked.some(
                                  (item) => item.review_id === ele.id
                                ) ||
                                false
                              }
                            ></input>
                          </td>
                          <td>{ele.email}</td>
                          <td>
                            {ele.first_name + " " + ele.last_name !==
                            "null null"
                              ? ele.first_name + " " + ele.last_name
                              : ""}
                          </td>
                          <td>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              disabled
                              value={ele.role_id}
                            >
                              <option value="1">Group leader</option>
                              <option value="2">Leader</option>
                              <option value="3">Member</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="selectall"
                          className="checkbox-all"
                          autoComplete="off"
                          onClick={handleSelectAll}
                          ref={selectAll}
                        ></input>
                      </td>
                      <td style={{ textAlign: "initial" }}>
                        {t("assign.selectAll")}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {menuItems}
                  </ul>
                </nav>
                <div className="form-group form1">
                  <div className="d-flex btn-group-1">
                    <button
                      type="submit"
                      className="btn btn-default btn-assign"
                    >
                      {t("assign.btnAssign")}
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      type="submit"
                      className="btn btn-default btn-assign"
                    >
                      {t("btnCancel")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Assgin;
