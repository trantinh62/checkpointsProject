import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createApi, getCheckApi, deleteCheckpoint } from "../../Api/userApi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import dayjs from "dayjs";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./CreateCheckpoint.css";

function Checkpoints() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    const { id } = e.target;
    setDeleteId(id);
    setShow(true);
  };

  const search = useLocation().search;
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || 1
  );
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
  const [numPages, setNumPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const token = sessionStorage.getItem("sessionToken");

  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "start_date" || name === "end_date")
      value = dayjs(value).format("YYYY-MM-DDTHH:mm");
    setDataCheckpoint({
      ...dataCheckpoint,
      [name]: value,
    });
  };

  const handleOnClick = (e) => {
    const page = parseInt(e.target.value);
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
      setIsLoading(true);
      const res = await getCheckApi(token);
      setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
      setDataListCheck(res.data.data.checkpoints);
      setDataPerPage(res.data.data.checkpoints.slice(start, end));
      setIsLoading(false);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (
        new Date(dataCheckpoint.start_date) >= new Date(dataCheckpoint.end_date)
      ) {
        Toast(t("create.errorChoseDate"), "warning");
        setIsLoading(false);
        return;
      }
      const response = await createApi(dataCheckpoint, token);
      Toast(t("create.createSuccess"), "success");
      const res = await getCheckApi(token);
      setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
      setDataListCheck(res.data.data.checkpoints);
      setDataPerPage(res.data.data.checkpoints.slice(start, end));
      setIsLoading(false);
    } catch (err) {
      Toast(t("create.createFailed"), "error");
      setIsLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      handleClose();
      const resDel = await deleteCheckpoint(deleteId, token);
      Toast(t("create.deleteSuccess"), "success");
      const res = await getCheckApi(token);
      const pageCur =
        page > Math.ceil(res.data.data.checkpoints.length / itemsPerPage) &&
        page !== 1
          ? Math.ceil(res.data.data.checkpoints.length / itemsPerPage)
          : page;
      setNumPages(Math.ceil(res.data.data.checkpoints.length / itemsPerPage));
      setPage(pageCur);
      const start = (pageCur - 1) * itemsPerPage;
      const end = pageCur * itemsPerPage;
      setDataListCheck(res.data.data.checkpoints);
      setDataPerPage(res.data.data.checkpoints.slice(start, end));
      setIsLoading(false);
    } catch (err) {
      Toast(t("create.deleteFailed"), "error");
      setIsLoading(false);
    }
  };

  let menuItems = [];
  for (var i = 0; i < numPages; i++) {
    menuItems.push(
      <li key={i} className="page-item">
        <button
          type="button"
          className="page-link"
          value={i + 1}
          onClick={handleOnClick}
        >
          {i + 1}
        </button>
      </li>
    );
  }
  return (
    <div className="create-cover">
      <div className="container">
        <div className="table-wrapper create">
          <div className="table-title create">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">
                      {t("create.create")}
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
                    {t("title")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control create"
                      placeholder={t("create.inputTitle")}
                      name="name"
                      onChange={onChangeInput}
                      value={dataCheckpoint.name}
                      required
                    ></input>
                  </div>
                  <label className="control-label label1 col-sm-2">
                    {t("startDate")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="datetime-local"
                      className="form-control create"
                      id="start"
                      name="start_date"
                      onChange={onChangeInput}
                      required
                      value={dataCheckpoint.start_date}
                    ></input>
                  </div>
                  <label className="control-label label1 col-sm-2">
                    {t("endDate")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="datetime-local"
                      className="form-control create"
                      id="end"
                      name="end_date"
                      onChange={onChangeInput}
                      required
                      value={dataCheckpoint.end_date}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              {isLoading === true && <LoadingSpinner />}
              <button
                type="submit"
                className="btn btn-default btn-create"
                disabled={isLoading}
              >
                {t("create.createBtn")}
              </button>
            </div>
          </form>

          {dataPerPage.length === 0 && isLoading === false && (
            <h3 className="create-notify">{t("create.yetCheckpoint")}</h3>
          )}
          {dataPerPage.length > 0 && isLoading === false && (
            <div>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("title")}</th>
                    <th>{t("startDate")}</th>
                    <th>{t("endDate")}</th>
                    <th className="assign-delete">
                      {t("create.Assign/Delete")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPerPage?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{(page - 1) * itemsPerPage + index + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.start_date}</td>
                        <td>{ele.end_date}</td>
                        <td>
                          <Link to={`/assign/${ele.id}`}>
                            <i className="bi bi-pen"></i>
                          </Link>
                          <span>|</span>
                          <button
                            variant="primary"
                            className="btn-delete-checkpoint"
                            onClick={handleShow}
                          >
                            <i id={ele.id} className="bi bi-trash"></i>
                          </button>
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

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{t("create.confirmDelete")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{t("create.reallyconfirm")}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t("btnCancel")}
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                {t("btnDelete")}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Checkpoints;
