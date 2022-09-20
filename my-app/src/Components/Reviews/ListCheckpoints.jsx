import { useState, useEffect } from "react";
import { getCheckpointsByUserId } from "../../Api/userApi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./ListCheckpoints.css";
function ListReviews() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [dataPerPage, setDataPerPage] = useState([]);
  const [listCheckpoints, setListCheckpoints] = useState([]);
  const [numPages, setNumPages] = useState(1, []);
  const handleOnClick = (e) => {
    const page = e.target.value;
    setPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listCheckpoints.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await getCheckpointsByUserId(token);
      setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      setListCheckpoints(res.data.data);
      setDataPerPage(res.data.data.slice(start, end));
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
    <div className="list-checkpoints-cover">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">
                      My checkpoints: List checkpoints
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
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
                    <td>{(page - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <a
                        style={{ textDecoration: "none" }}
                        href={`/mycheckpoints/${ele.name_checkpoint.id}?title=${ele.name_checkpoint.name}`}
                      >
                        {ele.name_checkpoint.name}
                      </a>
                    </td>
                    <td>{ele.name_checkpoint.start_date}</td>
                    <td>{ele.name_checkpoint.end_date}</td>
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

export default ListReviews;
