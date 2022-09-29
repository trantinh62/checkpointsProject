import { useState, useEffect } from "react";
import { getAllCheckpoints } from "../../Api/userApi";
import { useLocation } from "react-router-dom";
import Toast from "../Toast/Toast";
import "./History.css";
function History() {
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page") || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const [listHistories, setListHistories] = useState([]);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleOnClick = (e) => {
    const page = e.target.value;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setDataPerPage(listHistories.slice(start, end));
  };
  const token = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await getAllCheckpoints(token);
      setNumPages(Math.ceil(res.data.data.length / itemsPerPage));
      setDataPerPage(res.data.data.slice(start, end));
      setListHistories(res.data.data);
      setLoading(true);
    } catch (err) {
      Toast("An error occurred while loading data!", "error");
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
    <>
      <div className="histories-cover">
        <div className="container ">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        My checkpoints: Checkpoint histories
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {loading === false && (
              <h3 className="review-notify">Waiting for loading data!</h3>
            )}
            {JSON.stringify(dataPerPage) === JSON.stringify([]) &&
              loading === true && (
                <h3 className="history-notify">No checkpoint history!</h3>
              )}
            {JSON.stringify(dataPerPage) !== JSON.stringify([]) && (
              <div>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th className="view-history">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage?.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ele.checkpoint.name}</td>
                          <td>{ele.checkpoint.start_date}</td>
                          <td>{ele.checkpoint.end_date}</td>
                          <td>
                            <a
                              href={`/histories/${ele.checkpoint.id}?title=${ele.checkpoint.name}`}
                            >
                              <button
                                variant="primary"
                                className="btn-list-history"
                              >
                                <i className="bi bi-arrow-right-circle"></i>
                              </button>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {menuItems}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default History;
