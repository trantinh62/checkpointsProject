import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  getListUsersApi,
  getReviewsByCheckpointId,
  getCheckApi,
} from "../../Api/userApi";
import "./DetailCheck.css";
function ListReviews() {
  const params = useParams();
  const navigate = useNavigate();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [listReviews, setListReviews] = useState([]);
  const [dataCheckpoint, setDataCheckpoint] = useState({
    id: null,
    name: "",
  });
  const [dataPerPage, setDataPerPage] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [idAssign, setIdAssign] = useState(null, []);
  let [numPages, setNumPages] = useState(1, []);
  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listReviews.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      try {
        // const res = await getCheckApi(token, params.id);
        const resUser = await getListUsersApi(token);
        const res = await getCheckApi(token, params.id);
        setDataCheckpoint(res.data.data);

        // const res = getReviewsByCheckpointId(token, params.id);
        // console.log("res", res);
        // setDataCheckpoint(res.data.data);
        // setDataReview({
        //   ...dataReview,
        //   checkpoint_id: res.data.data.id,
        //   user_id: resUser.data.data[0].id,
        // });
        setNumPages(Math.ceil(resUser.data.data.length / itemsPerPage));
        setDataUser(resUser.data.data);
        // setDataFilter(
        //   resUser.data.data.filter((item) => item.id !== resUser.data.data[0].id)
        // );
        setDataPerPage(
          resUser.data.data
            .filter((item) => item.id !== resUser.data.data[0].id)
            .slice(start, end)
        );
        // const resChecked = await getCheckedUser(
        //   token,
        //   params.id,
        //   resUser.data.data[0].id
        // );
        // setDataChecked(resChecked.data);
        // setIdAssign(resUser.data.data[0].id);
      } catch (err) {}

      //   const res = await getListReviews(token);
      //   setNumPages(Math.ceil(res.data.data.assign_review.length / itemsPerPage));
      //   setDataPerPage(res.data.data.assign_review.slice(start, end));
      //   setListReviews(res.data.data.assign_review);
    } catch (err) {}
  };

  const onChangeInput = async (e) => {
    let { name, value } = e.target;
    if (name === "user_id") {
      value = parseInt(value);
      setIdAssign(value);
      // setDataFilter(dataUser.filter((item) => item.id !== value));
      // setDataReview({
      //   ...dataReview,
      //   [name]: value,
      // });
      const res = await getReviewsByCheckpointId(token, params.id);
      setDataPerPage();
      // dataUser.filter((item) => item.id !== value).slice(start, end)
      // const res = await getCheckedUser(token, params.id, value);
      // setDataChecked(res.data);
      // selectAll.current.checked = false;
    }
  };
  const handleSubmit = async (e) => {};

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
    <div className="detail-check-cover">
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
                    <li className="breadcrumb-item">
                      <a href="/create">Manage checkpoints</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Detail checkpoint
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

            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="point-table">Attitude</th>
                  <th className="point-table">Performance</th>
                  <th className="point-table">Teamwork</th>
                  <th className="point-table">Training</th>
                  <th className="point-table">Adhere</th>
                  <th>Strength</th>
                  <th>Weakness</th>
                </tr>
              </thead>
              <tbody>
                {dataPerPage?.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.attitude}</td>
                      <td>{ele.performance}</td>
                      <td>{ele.teamwork}</td>
                      <td>{ele.training}</td>
                      <td>{ele.adhere}</td>
                      <td>{ele.strength}</td>
                      <td>{ele.weakness}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="form-group form1">
              <div className="d-flex btn-group-1">
                <button type="submit" className="btn btn-default ">
                  Close & calculate
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

export default ListReviews;
