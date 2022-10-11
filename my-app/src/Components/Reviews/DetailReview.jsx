import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { reviewApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
import { useTranslation } from "react-i18next";
import "./DetailReview.css";

function ListReviews() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const check_id = params.check_id;
  const title = searchParams.get("title");
  const username = searchParams.get("username");
  const user_id = searchParams.get("user_id");
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
  });
  const token = sessionStorage.getItem("sessionToken");

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
      const res = await reviewApi(dataReview, token, params.review_id);
      Toast(t("detailReview.reviewSuccess"), "success");
    } catch (err) {
      Toast(t("detailReview.reviewFailed"), "error");
    }
  };

  return (
    <div className="detail-review">
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title-detail-review">
            <div className="row ">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb" style={{ width: "max-content" }}>
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/mycheckpoints">
                        {t("myCheckpoints.listCheckpoint")}
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a
                        className="breadcrumb"
                        href={`/mycheckpoints/${params.check_id}?title=${title}`}
                      >
                        {title}
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {t("detailReview.beChecked")} {username}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      <p>{t("detailReview.check1")}</p>
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>{t("detailReview.descrip1")}</span>
                  </div>
                  <div class="col-12 col-md-3 detail-review-panel text-center">
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
                    >
                      <option value="">{t("detailReview.selectPoint")}</option>
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
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      {t("detailReview.check2")}
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>{t("detailReview.descrip2")}</span>
                  </div>
                  <div class="col-12 col-md-3 detail-review-panel text-center">
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
                    >
                      <option value="">{t("detailReview.selectPoint")}</option>
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
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      {t("detailReview.check3")}
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>{t("detailReview.descrip3")}</span>
                  </div>
                  <div class="col-12 col-md-3 detail-review-panel text-center">
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
                    >
                      <option value="">{t("detailReview.selectPoint")}</option>
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
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      {t("detailReview.check4")}
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>{t("detailReview.descrip4")}</span>
                  </div>
                  <div class="col-12 col-md-3 detail-review-panel text-center">
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
                    >
                      <option value="">{t("detailReview.selectPoint")}</option>
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
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      {t("detailReview.check5")}
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>{t("detailReview.descrip5")}</span>
                  </div>
                  <div class="col-12 col-md-3 detail-review-panel text-center">
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
                    >
                      <option value="">{t("detailReview.selectPoint")}</option>
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
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      {t("Strength")}
                    </h4>
                  </div>
                  <div class="col-12 col-sm-9 text-center">
                    <textarea
                      className="form-control"
                      rows="5"
                      id="comment"
                      name="strength"
                      onChange={onChangeInput}
                      value={dataReview.strength}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      {t("Weakness")}
                    </h4>
                  </div>
                  <div class="col-12 col-sm-9 text-center">
                    <textarea
                      className="form-control"
                      rows="5"
                      id="comment"
                      name="weakness"
                      onChange={onChangeInput}
                      value={dataReview.weakness}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="form-group form1">
                <div className="d-flex btn-group-1">
                  <button
                    type="submit"
                    className="btn btn-default btn-detail-review"
                  >
                    {t("btnSave")}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-default btn-detail-review"
                  >
                    {t("btnBack")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListReviews;
