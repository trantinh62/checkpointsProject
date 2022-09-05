import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import "./CreateCheckpoint.css";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Table from "react-bootstrap/esm/Table";
import { ToastContainer, toast } from "react-toastify";

const create_check_url = "/api/checkpoint";
function Checkpoints() {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("sessionUserId");
  const [dataCheckpoint, setDataCheckpoint] = useState({
    user_id: user_id,
    name: "",
    start_date: null,
    end_date: null,
  });

  const token = sessionStorage.getItem("sessionToken");

  const onChangeInput = (e) => {
    let { name, value } = e.target;
    console.log("value", value);
    if (name === "start_date" || name === "end_date")
      value = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    setDataCheckpoint({
      ...dataCheckpoint,
      [name]: value,
    });
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
      setDataListCheck(res.data.data.checkpoints);
      console.log(res.data);
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
      navigate(`/selectreviewerandchecker/${response.data.data.id}`, {
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
  return (
    <>
      <div className="container create-check-form">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <h1>Create checkpoint</h1>
            <div className="input-group mb-3">
              <div>
                <h4 className="title-create">Name</h4>
              </div>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={onChangeInput}
                placeholder="Input title of checkpoint"
              ></input>
            </div>
            <div className="input-group mb-3">
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
          <i>
            List checkpoint below can assign reviewer and checker by click on
            name of checkpoint
          </i>
        </div>
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name of the checkpoint</th>
              <th>Author ID</th>
              <th>Start date</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {dataListCheck?.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      style={{ textDecoration: "none" }}
                      href={`/selectreviewerandchecker/${ele.id}`}
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
      </div>
    </>
  );
}

export default Checkpoints;
