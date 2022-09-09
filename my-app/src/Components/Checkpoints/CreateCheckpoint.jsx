import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import "./CreateCheckpoint.css";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Table from "react-bootstrap/esm/Table";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import "./CreateCheckpoint.css";
const create_check_url = "/api/checkpoint";
function Checkpoints() {
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
    start_date: null,
    end_date: null,
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
      const res = await axiosClient.get("/api/checkpoint", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
      setDataListCheck(res.data.data.checkpoints);
      setDataPerPage(res.data.data.checkpoints.slice(start, end));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(
        create_check_url,
        dataCheckpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      navigate(`/assign/${response.data.data.id}`, {
        replace: true,
      });
      navigate(0);
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
  console.log(numPages);
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
    <>
      <div className="container create-check-form">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/perform">Checkpoints</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Create Checkpoint
                </li>
              </ol>
            </nav>
            <div className="input-group mb-3">
              <div>
                <h4 className="title-create">Title</h4>
              </div>
              <input
                type="text1"
                name="name"
                className="form-control"
                onChange={onChangeInput}
                placeholder="Input title of checkpoint"
              ></input>
              <div>
                <h4 className="date-title">Start date</h4>
              </div>
              <input
                type="datetime-local"
                id="start-date"
                onChange={onChangeInput}
                name="start_date"
              ></input>
              <div>
                <h4 className="date-title">End date</h4>
              </div>
              <input
                type="datetime-local"
                id="end-date"
                onChange={onChangeInput}
                name="end_date"
              ></input>
            </div>

            <div className="btn-save">
              <button type="submit" className="btn btn-primary btn-save">
                Create checkpoint
              </button>
            </div>
          </form>
        </div>
        <div>
          <span>List checkpoints has not been assigned</span>
        </div>
        <Table striped bordered hover className="text-center">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name of the checkpoint</th>
              <th>Author ID</th>
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
                      href={`/assign/${ele.id}`}
                    >
                      {ele.name}
                    </a>
                  </td>
                  <td>{ele.user_id}</td>
                  <td>{ele.start_date}</td>
                  <td>{ele.end_date}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">{menuItems}</ul>
        </nav>
      </div>
    </>
  );
}

export default Checkpoints;
