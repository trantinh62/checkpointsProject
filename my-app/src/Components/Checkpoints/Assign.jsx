import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import "./Assign.css";

function Assgin() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation().search;

  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  let [numPages, setNumPages] = useState(1, []);

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
    try {
      const resCheckpoint = await axiosClient.get(
        `/api/checkpoint/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const resUser = await axiosClient.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const resReview = await axiosClient.get(`/api/review/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setDataCheckpoint(resCheckpoint.data.data);
      setDataReview({
        ...dataReview,
        checkpoint_id: resCheckpoint.data.data.id,
        user_id: resUser.data.data[0].id,
      });
      setNumPages(Math.ceil(resUser.data.data.length / itemsPerPage));

      setDataUser(resUser.data.data);
      setDataPerPage(resUser.data.data.slice(start, end));
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "user_id") {
      value = parseInt(value);
      setDataReview({
        ...dataReview,
        [name]: value,
      });
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
    }
  };

  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(dataUser.slice(start, end));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/review", dataReview, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      navigate("/create", { replace: true });
      navigate(0);
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
      <div className="container manage-user">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/perform">Checkpoints</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/create">Create Checkpoint</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Assign user
                </li>
              </ol>
            </nav>
            <div className="input-group mb-3">
              <div>
                <h4 className="title-create">Name</h4>
              </div>
              <input
                type="text1"
                defaultValue={dataCheckpoint.name}
                className="form-control"
                placeholder="Input title"
                readOnly
              ></input>
              <div>
                <h4 className="title-create">Be assigned</h4>
              </div>
              <select
                style={{ width: "150px" }}
                className="form-select"
                name="user_id"
                onChange={onChangeInput}
                defaultValue={dataUser[0]?.id}
                aria-label="Default select example"
              >
                {dataUser?.map((ele, index) => {
                  return (
                    <option key={index} value={ele.id}>
                      {ele.first_name +
                        " " +
                        ele.last_name +
                        " (" +
                        ele.email +
                        " )"}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-3"></div>
            <span>Select reviewer</span>
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Lastname</th>
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
                            dataReview.review_id.includes(ele.id) || false
                          }
                        ></input>
                      </td>
                      <td>{ele.email}</td>
                      <td>{ele.last_name}</td>
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
              </tbody>
            </Table>
            <div>
              <input
                type="checkbox"
                id="selectall"
                name="selectall"
                autoComplete="off"
              ></input>
              <label htmlFor="scales">Chọn tất cả</label>
            </div>
            <div className="btn-save">
              <button type="submit" className="btn btn-primary btn-save">
                Assign
              </button>
            </div>
          </form>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">{menuItems}</ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Assgin;
