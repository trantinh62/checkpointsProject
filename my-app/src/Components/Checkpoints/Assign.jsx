import { useState, useEffect, useRef } from "react";
import axiosClient from "../../Api/axiosClient";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Assign.css";
import {
  getDetailCheckpointApi,
  getCheckedUser,
  getAllUsersApi,
} from "../../Api/userApi";
import Toast from "../Toast/Toast";

function Assgin() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const selectAll = useRef(null);

  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [numPages, setNumPages] = useState(1);
  const [idAssign, setIdAssign] = useState(null);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataChecked, setDataChecked] = useState([]);
  let list_id_checked = [];

  const [dataCheckpoint, setDataCheckpoint] = useState({
    id: "",
    name: "",
  });
  const [dataReview, setDataReview] = useState({
    checkpoint_id: "",
    user_id: "",
    review_id: [],
  });
  const [dataUser, setDataUser] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const token = sessionStorage.getItem("sessionToken");
  const fetchData = async () => {
    try {
      const res = await getDetailCheckpointApi(token, params.id);
      const resUser = await getAllUsersApi(token);
      setDataCheckpoint(res.data.data);
      setDataReview({
        ...dataReview,
        checkpoint_id: res.data.data.id,
        user_id: resUser.data.data[0].id,
      });
      setNumPages(Math.ceil(resUser.data.data.length / itemsPerPage));
      setDataUser(resUser.data.data);
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
      const resChecked = await getCheckedUser(
        token,
        params.id,
        resUser.data.data[0].id
      );
      setDataChecked(resChecked.data.data);
      setIdAssign(resUser.data.data[0].id);
    } catch (err) {}
  };

  const onChangeInput = async (e) => {
    let { name, value } = e.target;
    if (name === "user_id") {
      value = parseInt(value);
      setIdAssign(value);
      setDataFilter(
        dataUser.filter(
          (item) => item.id !== value && item.status !== "disable"
        )
      );
      setDataReview({
        ...dataReview,
        [name]: value,
      });
      setDataPerPage(
        dataUser
          .filter((item) => item.id !== value && item.status !== "disable")
          .slice(start, end)
      );
      const res = await getCheckedUser(token, params.id, value);
      setDataChecked(res.data.data);
      selectAll.current.checked = false;
    } else if (name === "review_id") {
      value = parseInt(value);

      if (!dataReview.review_id.includes(value)) {
        setDataReview({
          ...dataReview,
          [name]: [...dataReview.review_id, value],
        });
      } else {
        setDataReview({
          ...dataReview,
          [name]: dataReview.review_id.filter((item) => item !== value),
        });
      }
      if (
        dataReview.review_id.length + dataChecked.length ===
        dataFilter.length + 1
      ) {
        selectAll.current.checked = false;
      } else if (
        !dataReview.review_id.includes(value) &&
        dataReview.review_id.push(value) + dataChecked.length ===
          dataFilter.length + 1
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
  const handleSelectAll = async (e) => {
    if (e.target.checked) {
      list_id_checked = dataChecked.map((item) => item.review_id);
      setDataReview({
        ...dataReview,
        review_id: dataFilter
          .filter((item) => !list_id_checked.includes(item.id))
          .map((item) => item.id),
      });
    } else {
      setDataReview({
        ...dataReview,
        review_id: [],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dataReview.review_id.length === 0) {
        Toast("Không có user mới nào được assign thêm!", "warning");
        return;
      }
      const res = await axiosClient.post("api/review", dataReview, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setDataReview({ ...dataReview, review_id: [] });
      const reschecked = await getCheckedUser(token, params.id, idAssign);
      setDataChecked(reschecked.data.data);
      Toast("Đăng ký người đánh giá thành công!", "success");
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
                      <a className="breadcrumb" href="/create">
                        Manage checkpoints: Create checkpoints
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Assign users: {dataCheckpoint.name}
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
                      onChange={onChangeInput}
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
              </div>
            </div>
            {JSON.stringify(dataPerPage) === JSON.stringify([]) && (
              <h3 className="review-notify">There are no users to assign</h3>
            )}
            {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
              <Table striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPerPage?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input
                            name="review_id"
                            onChange={onChangeInput}
                            type="checkbox"
                            defaultValue={ele.id}
                            checked={
                              dataReview.review_id.includes(ele.id) ||
                              dataChecked.some(
                                (item) => item.review_id === ele.id
                              ) ||
                              false
                            }
                            disabled={
                              dataChecked.some(
                                (item) => item.review_id === ele.id
                              ) || false
                            }
                          ></input>
                        </td>
                        <td>{ele.email}</td>
                        <td>
                          {ele.first_name + " " + ele.last_name !== "null null"
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
                    <td style={{ textAlign: "initial" }}>Select all</td>
                  </tr>
                </tbody>
              </Table>
            )}
            <div className="form-group form1">
              <div className="d-flex btn-group-1">
                <button type="submit" className="btn btn-default ">
                  Assign users
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

export default Assgin;
