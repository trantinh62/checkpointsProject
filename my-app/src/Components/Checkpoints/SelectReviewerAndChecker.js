import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

function SelectReviewerAndChecker() {
  const navigate = useNavigate();
  const params = useParams();

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
      setDataUser(resUser.data.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/review", dataReview, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      navigate("/selectreviewerandchecker", { replace: true });
      navigate(0);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="container manage-user">
        <div className="row">
          <h1>Select reviewer and checker</h1>
          <div className="input-group mb-3">
            <div>
              <h4 className="title-create">Name</h4>
            </div>
            <input
              type="text"
              defaultValue={dataCheckpoint.name}
              className="form-control"
              placeholder="Input title"
              readOnly
            ></input>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <div>
                <h4 className="title-create">User be Checked</h4>
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
            <h4>Select user review checkpoint</h4>
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
                {dataUser?.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          name="review_id"
                          onChange={onChangeInput}
                          type="checkbox"
                          value={ele.id}
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
                // onClick={toggle(this)}
                autoComplete="off"
              ></input>
              <label htmlFor="scales">Chọn tất cả</label>
            </div>
            <div className="btn-save">
              <button type="submit" className="btn btn-primary btn-save">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SelectReviewerAndChecker;
