import { useState, useEffect, useRef } from "react";
import axiosClient from "../../Api/axiosClient";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./MemberHistory.css";
// import {
//   getCheckApi,
//   getCheckedUser,
//   getListUsersApi,
// } from "../../Api/userApi";
import Toast from "../Toast/Toast";

function MemberHistory() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;
  const selectAll = useRef(null);

  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  let [numPages, setNumPages] = useState(1, []);
  let [idAssign, setIdAssign] = useState(null, []);
  let [dataFilter, setDataFilter] = useState([]);
  let [dataChecked, setDataChecked] = useState([]);
  let list_id_checked = [];

  const [dataCheckpoint, setDataCheckpoint] = useState({
    id: null,
    name: null,
  });
  const [dataReview, setDataReview] = useState({
    checkpoint_id: null,
    user_id: null,
    review_id: [],
  });
  const [dataUser, setDataUser] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const token = sessionStorage.getItem("sessionToken");
  const fetchData = async () => {
    // try {
    //   const res = await getCheckApi(token, params.id);
    //   const resUser = await getListUsersApi(token);
    //   setDataCheckpoint(res.data.data);
    //   setDataReview({
    //     ...dataReview,
    //     checkpoint_id: res.data.data.id,
    //     user_id: resUser.data.data[0].id,
    //   });
    //   setNumPages(Math.ceil(resUser.data.data.length / itemsPerPage));
    //   setDataUser(resUser.data.data);
    //   setDataFilter(
    //     resUser.data.data.filter((item) => item.id !== resUser.data.data[0].id)
    //   );
    //   setDataPerPage(
    //     resUser.data.data
    //       .filter((item) => item.id !== resUser.data.data[0].id)
    //       .slice(start, end)
    //   );
    //   const resChecked = await getCheckedUser(
    //     token,
    //     params.id,
    //     resUser.data.data[0].id
    //   );
    //   setDataChecked(resChecked.data);
    //   setIdAssign(resUser.data.data[0].id);
    // } catch (err) {}
  };

  const onChangeInput = async (e) => {
    let { name, value } = e.target;
    if (name === "user_id") {
      value = parseInt(value);
      setIdAssign(value);
      setDataFilter(dataUser.filter((item) => item.id !== value));
      setDataReview({
        ...dataReview,
        [name]: value,
      });
      setDataPerPage(
        dataUser.filter((item) => item.id !== value).slice(start, end)
      );
      //   const res = await getCheckedUser(token, params.id, value);
      //   setDataChecked(res.data);
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
        dataUser.length - 1
      ) {
        selectAll.current.checked = false;
      } else if (
        !dataReview.review_id.includes(value) &&
        dataReview.review_id.push(value) + dataChecked.length ===
          dataUser.length - 1
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
      //   const reschecked = await getCheckedUser(token, params.id, idAssign);
      //   setDataChecked(reschecked.data);
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
    <div className="member-his-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/create">Checkpoints</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Member's review histories
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
                      defaultValue={dataCheckpoint.name}
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
                <div className="form-group form2">
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
                </div>
              </div>
            </div>

            {/* <Table striped bordered hover className="text-center">
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
                          value={ele.id}
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
                          defaultValue={ele.role_id}
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
            </Table> */}
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
