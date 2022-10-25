import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import {
  getReviewById,
  getCheckpointsByReviewId,
  getReviewsByCheckpointIdAndMyReviewId,
  reviewApi,
} from "../../Api/userApi";
import Toast from "../Toast/Toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListCheckpoints,
  updateListCheckpoints,
  updateListReviews,
} from "../../store/listCheckpointSlice";

import "./DetailReview.css";

function ListReviews() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const check_id = params.check_id;
  const user_id = searchParams.get("user_id");
  const [isLoading, setIsLoading] = useState(false);
  const [dataReview, setDataReview] = useState({
    attitude: null,
    performance: null,
    teamwork: null,
    training: null,
    adhere: null,
    strength: "",
    weakness: "",
    checkpoint_id: check_id,
    user_id: user_id,
    title: "",
    userBeChecked: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const token = localStorage.getItem("localToken");
  const list = useSelector(selectListCheckpoints);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const review = await getReviewById(parseInt(params.review_id), token);
      setDataReview({
        ...review.data.data,
        title: review.data.data.checkpoint.name,
        userBeChecked:
          review.data.data.user.first_name +
          " " +
          review.data.data.user.last_name,
      });
      setIsChecked(review.data.data.attitude != null ? true : false);
      setIsLoading(false);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };
  const onChangeInput = (e) => {
    let { name, value } = e.target;
    if (Number(value)) value = parseInt(value);
    setDataReview({
      ...dataReview,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await reviewApi(dataReview, token, params.review_id);
      const resCheck = await getCheckpointsByReviewId(token, 1);
      dispatch(updateListCheckpoints(resCheck.data.data.data));
      const resReviews = await getReviewsByCheckpointIdAndMyReviewId(
        token,
        params.check_id
      );
      dispatch(updateListReviews(resReviews.data.data));
      Toast(t("detailReview.reviewSuccess"), "success");
      navigate(`/mycheckpoints/${params.check_id}`);
      setIsLoading(false);
    } catch (err) {
      Toast(t("detailReview.reviewFailed"), "error");
      setIsLoading(false);
    }
  };
  return (
    <div className="detail-review">
      <div className="container">
        <div className="table-wrapper detail-review-wrap">
          <div className="table-title-detail-review">
            <div className="row ">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb" style={{ width: "max-content" }}>
                    <li className="breadcrumb-item">
                      <Link to="/mycheckpoints">
                        {t("myCheckpoints.listCheckpoint")}
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={`/mycheckpoints/${params.check_id}`}>
                        {dataReview.title}
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {t("detailReview.beChecked")}{" "}
                      {dataReview.userBeChecked !== "null null"
                        ? dataReview.userBeChecked
                        : "Unknown"}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {isLoading === true && <LoadingSpinner />}
          {isLoading === false && (
            <form onSubmit={handleSubmit}>
              <div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        <p>{t("detailReview.check1")}</p>
                      </h4>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <span>{t("detailReview.descrip1")}</span>
                    </div>
                    <div className="col-12 col-md-3 detail-review-panel text-center">
                      <select
                        style={{
                          width: "150px",
                          backgroundColor: "#5dabc3",
                          margin: "auto",
                          color: "white",
                        }}
                        className="form-select"
                        onChange={onChangeInput}
                        name="attitude"
                        aria-label="Default select example"
                        required
                        value={dataReview.attitude ? dataReview.attitude : ""}
                        disabled={
                          dataReview.attitude && isChecked ? true : false
                        }
                      >
                        <option value="">
                          {t("detailReview.selectPoint")}
                        </option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        {t("detailReview.check2")}
                      </h4>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <span>{t("detailReview.descrip2")}</span>
                    </div>
                    <div className="col-12 col-md-3 detail-review-panel text-center">
                      <select
                        style={{
                          width: "150px",
                          backgroundColor: "#5dabc3",
                          margin: "auto",
                          color: "white",
                        }}
                        className="form-select"
                        onChange={onChangeInput}
                        name="performance"
                        aria-label="Default select example"
                        required
                        value={
                          dataReview.performance ? dataReview.performance : ""
                        }
                        disabled={
                          dataReview.performance && isChecked ? true : false
                        }
                      >
                        <option value="">
                          {t("detailReview.selectPoint")}
                        </option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        {t("detailReview.check3")}
                      </h4>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <span>{t("detailReview.descrip3")}</span>
                    </div>
                    <div className="col-12 col-md-3 detail-review-panel text-center">
                      <select
                        style={{
                          width: "150px",
                          backgroundColor: "#5dabc3",
                          margin: "auto",
                          color: "white",
                        }}
                        className="form-select"
                        onChange={onChangeInput}
                        name="teamwork"
                        aria-label="Default select example"
                        required
                        value={dataReview.teamwork ? dataReview.teamwork : ""}
                        disabled={
                          dataReview.teamwork && isChecked ? true : false
                        }
                      >
                        <option value="">
                          {t("detailReview.selectPoint")}
                        </option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        {t("detailReview.check4")}
                      </h4>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <span>{t("detailReview.descrip4")}</span>
                    </div>
                    <div className="col-12 col-md-3 detail-review-panel text-center">
                      <select
                        style={{
                          width: "150px",
                          backgroundColor: "#5dabc3",
                          margin: "auto",
                          color: "white",
                        }}
                        className="form-select"
                        onChange={onChangeInput}
                        name="training"
                        aria-label="Default select example"
                        required
                        value={dataReview.training ? dataReview.training : ""}
                        disabled={
                          dataReview.training && isChecked ? true : false
                        }
                      >
                        <option value="">
                          {t("detailReview.selectPoint")}
                        </option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        {t("detailReview.check5")}
                      </h4>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <span>{t("detailReview.descrip5")}</span>
                    </div>
                    <div className="col-12 col-md-3 detail-review-panel text-center">
                      <select
                        style={{
                          width: "150px",
                          backgroundColor: "#5dabc3",
                          margin: "auto",
                          color: "white",
                        }}
                        className="form-select"
                        onChange={onChangeInput}
                        name="adhere"
                        aria-label="Default select example"
                        required
                        value={dataReview.adhere ? dataReview.adhere : ""}
                        disabled={dataReview.adhere && isChecked ? true : false}
                      >
                        <option value="">
                          {t("detailReview.selectPoint")}
                        </option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        {t("Strength")}
                      </h4>
                    </div>
                    <div className="col-12 col-sm-9 text-center">
                      <textarea
                        type="text"
                        className="form-control"
                        rows="5"
                        id="comment"
                        name="strength"
                        onChange={onChangeInput}
                        value={dataReview.strength}
                        disabled={isChecked}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div
                  className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                  style={{ minHeight: "10rem" }}
                >
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 detail-review-panel">
                      <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                        {t("Weakness")}
                      </h4>
                    </div>
                    <div className="col-12 col-sm-9 text-center">
                      <textarea
                        className="form-control"
                        rows="5"
                        id="comment"
                        name="weakness"
                        onChange={onChangeInput}
                        value={dataReview.weakness}
                        disabled={isChecked}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group form1">
                  <div className="d-flex btn-group-1">
                    {!isChecked && (
                      <button
                        type="submit"
                        className="btn btn-default btn-detail-review"
                      >
                        {t("btnSave")}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="btn btn-default btn-detail-review"
                      disabled={isLoading}
                    >
                      {t("btnBack")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListReviews;
