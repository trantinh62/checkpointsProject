import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createApi,
  getAllCheckpointApi,
  getCheckpointsByReviewId,
} from "../../Api/userApi";
import dayjs from "dayjs";
import Toast from "../Toast/Toast";
import "./ListMemberHistory.css";

function ListMemberHistory() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataSearch, setDataSearch] = useState({
    name: "",
    start_date: "",
    end_date: new Date().now,
  });

  const [dataPerPage, setDataPerPage] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const token = sessionStorage.getItem("sessionToken");
  const roleId = sessionStorage.getItem("sessionRoleId");

  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      const name_value = value;
      // let dataFilter = [];
      // dataFilter = dataListCheck.filter((item) =>
      //   removeMark(item.name.toLowerCase()).includes(
      //     removeMark(value.toLowerCase())
      //   )
      // );
      // setDataSearch({
      //   ...dataSearch,
      //   [name]: value,
      // });
      // const start = (page - 1) * itemsPerPage;
      // const end = page * itemsPerPage;
      // setDataPerPage(dataFilter.slice(start, end));
    }
    if (name === "start_date") {
      const start_date_value = value;
    }
    if (name === "end_date") {
    }
    value = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    setDataSearch({
      ...dataSearch,
      [name]: value,
    });
    let dataFilter = [];
    dataFilter = dataListCheck.filter(
      (item) =>
        removeMark(item.name.toLowerCase()).includes(
          removeMark(dataSearch.name.toLowerCase())
        ) &&
        new Date(item.start_date) > new Date(value) &&
        new Date(item.end_date) < new Date(value)
    );
    setDataPerPage(dataFilter.slice(start, end));
  };

  const handleOnClick = (e) => {
    const page = e.target.value;
    setPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(dataListCheck.slice(start, end));
  };

  const [dataListCheck, setDataListCheck] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = [];
      if (roleId === "1") {
        res = await getAllCheckpointApi(token);
        setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
        setDataListCheck(res.data.data.checkpoints);
        setDataPerPage(res.data.data.checkpoints.slice(start, end));
      }
      if (roleId === "2") {
        res = await getCheckpointsByReviewId(token);
        setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
        setDataListCheck(res.data.data.map((item) => item.checkpoint));
        setDataPerPage(
          res.data.data.map((item) => item.checkpoint).slice(start, end)
        );
      }
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      Toast(err.response.data.message, "error");
    }
  };

  function removeMark(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

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
                    <li className="breadcrumb-item active" aria-current="page">
                      Manage checkpoints: Member's checkpoint histories
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
                      value={dataSearch.name}
                    ></input>
                  </div>
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
                      value={dataSearch.start_date}
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
                      value={dataSearch.end_date}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn-create">
                Reset search
              </button>
            </div>
          </form>

          {JSON.stringify(dataPerPage) === JSON.stringify([]) && (
            <h3 className="list-member-history-notify">
              No checkpoint history!
            </h3>
          )}
          {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
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
                          href={`/histories/member/${ele.id}?title=${ele.name}`}
                        >
                          {ele.name}
                        </a>
                      </td>
                      <td>{ele.start_date}</td>
                      <td>{ele.end_date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">{menuItems}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ListMemberHistory;
