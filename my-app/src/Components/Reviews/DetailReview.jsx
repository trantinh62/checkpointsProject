import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { reviewApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
import "./DetailReview.css";

function ListReviews() {
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
      Toast("Check checpoint successful!", "success");
    } catch (err) {
      Toast("Check checpoint failed!", "error");
    }
  };

  return (
    <div className="detail-review">
      <div className="container ">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb" href="/mycheckpoints">
                        My checkpoints: List checkpoints
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a
                        className="breadcrumb"
                        href={`/mycheckpoints/${params.check_id}?title=${title}`}
                      >
                        List reviews: {title}
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Username: {username}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="detail-review-form">
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  Question 1: TH??I ????? TR??CH NHI???M
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 ??i???m: Lu??n ch??? ?????ng, t??ch c???c. Ho???c t??nh s???n s??ng ??i
                    onsite.- 7 ??i???m: B??nh th?????ng- 5 ??i???m: C??n th??? ?????ng, c??n ?????
                    nh???c nh??? v??? tinh th???n, th??i ?????, ?? th???c l??m vi???c- 0 ??i???m: r???t
                    c?? v???n ????? v??? ?? th???c
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="attitude"
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Select point</option>
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
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  Question 2: HI???U SU???T C??NG VI???C
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 ??i???m: Kh???i l?????ng l???n, ?????m b???o ch???t l?????ng v?? ti???n ?????- 7
                    ??i???m: Hi???u su???t b??nh th?????ng, kh???i l?????ng vi???c v???a ph???i, ch???t
                    l?????ng ?????t y??u c???u- 5 ??i???m: vi???c c??n ??t, ho???c ch???t l?????ng ch??a
                    ?????m b???o- 0 ??i???m: Kh??ng c?? vi???c
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="performance"
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Select point</option>
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
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  Question 3: PH???I H???P TRONG TEAM & T???M ???NH H?????NG
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 ??i???m: Ph???i h???p nh??m t???t v?? c?? t???m ???nh h?????ng trong nh??m-
                    7 ??i???m: th??nh vi??n quan tr???ng c???a nh??m- 5 ??i???m: C?? vai tr??
                    b??nh th?????ng trong nh??m- 0 ??i???m: M???t x??ch y???u c???n nh??m h??? tr???
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="teamwork"
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Select point</option>
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
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  Question 4: ????O T???O PH??T TRI???N
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 ??i???m: Tham gia hu???n luy???n, ????o t???o ?????i ng??- 7 ??i???m: h???c
                    thi v?? ?????t ch???ng ch??? c?? nh??n- 5 ??i???m: Kh??ng ????o t???o cho ?????i
                    ng??, nh??ng tham gia c??c kh??a h???c cho c??ng vi???c. Ho???c D Lead
                    ????nh gi?? ???????c s??? ti???n b??? c???a nh??n s??? qua vi???c t??? h???c, t???
                    nghi??n c???u v?? ??p d???ng v??o trong c??ng vi???c.- 0 ??i???m: Kh??ng
                    tham gia ????o t???o, c??ng kh??ng tham gia c??c kh??a h???c
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="training"
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Select point</option>
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
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  Question 5: TU??N TH??? TI??U CHU???N CH???T L?????NG
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 ??i???m: th???c hi???n nghi??m t??c k??? lu???t, n???i quy, v???n ?????
                    BMTT; ch??? ?????ng c?? ?? t?????ng ????ng g??p c???i ti???n quy tr??nh chung-
                    7 ??i???m: B??nh th?????ng- 5 ??i???m: ????i khi c??n ph???i nh???c nh???- 0
                    ??i???m: tu??n th??? k??m, nhi???u l???n vi ph???m k??? lu???t, n???i quy, quy
                    tr??nh d??? ??n, vi ph???m quy ?????nh BMTT
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="adhere"
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Select point</option>
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
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  ??I???M M???NH
                </label>
                <div className="col-sm-9">
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
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  ??I???M Y???U
                </label>
                <div className="col-sm-9">
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
              <div className="form-group form1">
                <div className="d-flex btn-group-1">
                  <button type="submit" className="btn btn-default">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-default"
                  >
                    Back
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
