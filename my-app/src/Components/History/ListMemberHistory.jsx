import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createApi, getAllCheckpointApi } from "../../Api/userApi";
import dayjs from "dayjs";
import Toast from "../Toast/Toast";
import "./ListMemberHistory.css";

function ListMemberHistory() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const user_id = sessionStorage.getItem("sessionUserId");
  const [dataCheckpoint, setDataCheckpoint] = useState({
    user_id: user_id,
    name: "",
    start_date: "",
    end_date: "",
  });

  const [dataPerPage, setDataPerPage] = useState([]);
  let [numPages, setNumPages] = useState(1, []);
  const token = sessionStorage.getItem("sessionToken");

  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "start_date" || name === "end_date")
      value = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    setDataCheckpoint({
      ...dataCheckpoint,
      [name]: value,
    });
  };

  const handleOnClick = (e) => {
    const page = e.target.value;
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
      const res = await getAllCheckpointApi(token);
      setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
      setDataListCheck(res.data.data.checkpoints);
      setDataPerPage(res.data.data.checkpoints.slice(start, end));
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createApi(dataCheckpoint, token);
      navigate(`/assign/${response.data.data.id}`, {
        replace: true,
      });
      navigate(0);
      Toast("Tạo checkpoint thành công!", "success");
    } catch (err) {
      Toast(err.response.data.message, "error");
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
                      List checkpoints
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
            <div className="col-md-12">
              <button type="submit" className="btn-create">
                Search
              </button>
            </div>
          </form>
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
                        href={`/histories/member/${ele.id}`}
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
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">{menuItems}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ListMemberHistory;
