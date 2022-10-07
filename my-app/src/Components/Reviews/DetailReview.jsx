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
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title-detail-review">
            <div className="row ">
              <div className="col-sm-8">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb" style={{ width: "max-content" }}>
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
            <div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      1. THÁI ĐỘ TRÁCH NHIỆM
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>
                      - 10 điểm: Luôn chủ động, tích cực. Hoặc tính sẵn sàng đi
                      onsite.- 7 điểm: Bình thường- 5 điểm: Còn thụ động, còn để
                      nhắc nhở về tinh thần, thái độ, ý thức làm việc- 0 điểm:
                      rất có vấn đề về ý thức
                    </span>
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
              </div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      2. HIỆU SUẤT CÔNG VIỆC
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>
                      - 10 điểm: Khối lượng lớn, đảm bảo chất lượng và tiến độ-
                      7 điểm: Hiệu suất bình thường, khối lượng việc vừa phải,
                      chất lượng đạt yêu cầu- 5 điểm: việc còn ít, hoặc chất
                      lượng chưa đảm bảo- 0 điểm: Không có việc
                    </span>
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
              </div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      3. PHỐI HỢP TRONG TEAM & TẦM ẢNH HƯỞNG
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>
                      - 10 điểm: Phối hợp nhóm tốt và có tầm ảnh hưởng trong
                      nhóm- 7 điểm: thành viên quan trọng của nhóm- 5 điểm: Có
                      vai trò bình thường trong nhóm- 0 điểm: Mắt xích yếu cần
                      nhóm hỗ trợ
                    </span>
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
              </div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      4. ĐÀO TẠO PHÁT TRIỂN
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>
                      - 10 điểm: Tham gia huấn luyện, đào tạo đội ngũ- 7 điểm:
                      học thi và đạt chứng chỉ cá nhân- 5 điểm: Không đào tạo
                      cho đội ngũ, nhưng tham gia các khóa học cho công việc.
                      Hoặc D Lead đánh giá được sự tiến bộ của nhân sự qua việc
                      tự học, tự nghiên cứu và áp dụng vào trong công việc.- 0
                      điểm: Không tham gia đào tạo, cũng không tham gia các khóa
                      học
                    </span>
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
              </div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      5. TUÂN THỦ TIÊU CHUẨN CHẤT LƯỢNG
                    </h4>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <span>
                      - 10 điểm: thực hiện nghiêm túc kỷ luật, nội quy, vấn đề
                      BMTT; chủ động có ý tưởng đóng góp cải tiến quy trình
                      chung- 7 điểm: Bình thường- 5 điểm: Đôi khi còn phải nhắc
                      nhở- 0 điểm: tuân thủ kém, nhiều lần vi phạm kỷ luật, nội
                      quy, quy trình dự án, vi phạm quy định BMTT
                    </span>
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
              </div>
              <div
                class="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
                style={{ minHeight: "10rem" }}
              >
                <div class="row align-items-center">
                  <div class="col-12 col-md-3 detail-review-panel">
                    <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                      ĐIỂM MẠNH
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
                      ĐIỂM YẾU
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
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-default btn-detail-review"
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
