import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { reviewApi } from "../../Api/userApi";
import Toast from "../Toast/Toast";
import "./DetailReview.css";

function ListReviews() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const username = searchParams.get("username");
  const [dataReview, setDataReview] = useState({
    attitude: 0,
    performance: 0,
    teamwork: 0,
    training: 0,
    adhere: 0,
    strength: "",
    weakness: "",
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
      const res = await reviewApi(
        dataReview,
        token,
        params.check_id,
        searchParams.get("user_id")
      );
      Toast("Review successful!", "success");
    } catch (err) {
      Toast(err.response.data.message, "error");
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
            <div className="contact-form">
              <div className="form-group form1">
                <label className="control-label col-sm-3" htmlFor="email">
                  Question 1: THÁI ĐỘ TRÁCH NHIỆM
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 điểm: Luôn chủ động, tích cực. Hoặc tính sẵn sàng đi
                    onsite.- 7 điểm: Bình thường- 5 điểm: Còn thụ động, còn để
                    nhắc nhở về tinh thần, thái độ, ý thức làm việc- 0 điểm: rất
                    có vấn đề về ý thức
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="attitude"
                    aria-label="Default select example"
                  >
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
                  Question 2: HIỆU SUẤT CÔNG VIỆC
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 điểm: Khối lượng lớn, đảm bảo chất lượng và tiến độ- 7
                    điểm: Hiệu suất bình thường, khối lượng việc vừa phải, chất
                    lượng đạt yêu cầu- 5 điểm: việc còn ít, hoặc chất lượng chưa
                    đảm bảo- 0 điểm: Không có việc
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="performance"
                    aria-label="Default select example"
                  >
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
                  Question 3: PHỐI HỢP TRONG TEAM & TẦM ẢNH HƯỞNG
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 điểm: Phối hợp nhóm tốt và có tầm ảnh hưởng trong nhóm-
                    7 điểm: thành viên quan trọng của nhóm- 5 điểm: Có vai trò
                    bình thường trong nhóm- 0 điểm: Mắt xích yếu cần nhóm hỗ trợ
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="teamwork"
                    aria-label="Default select example"
                  >
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
                  Question 4: ĐÀO TẠO PHÁT TRIỂN
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 điểm: Tham gia huấn luyện, đào tạo đội ngũ- 7 điểm: học
                    thi và đạt chứng chỉ cá nhân- 5 điểm: Không đào tạo cho đội
                    ngũ, nhưng tham gia các khóa học cho công việc. Hoặc D Lead
                    đánh giá được sự tiến bộ của nhân sự qua việc tự học, tự
                    nghiên cứu và áp dụng vào trong công việc.- 0 điểm: Không
                    tham gia đào tạo, cũng không tham gia các khóa học
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="training"
                    aria-label="Default select example"
                  >
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
                  Question 5: TUÂN THỦ TIÊU CHUẨN CHẤT LƯỢNG
                </label>
                <div className="col-sm-9">
                  <h6>
                    - 10 điểm: thực hiện nghiêm túc kỷ luật, nội quy, vấn đề
                    BMTT; chủ động có ý tưởng đóng góp cải tiến quy trình chung-
                    7 điểm: Bình thường- 5 điểm: Đôi khi còn phải nhắc nhở- 0
                    điểm: tuân thủ kém, nhiều lần vi phạm kỷ luật, nội quy, quy
                    trình dự án, vi phạm quy định BMTT
                  </h6>
                  <select
                    style={{ width: "150px" }}
                    className="form-select"
                    onChange={onChangeInput}
                    name="adhere"
                    aria-label="Default select example"
                  >
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
                  ĐIỂM MẠNH
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
                  ĐIỂM YẾU
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
                  <button type="submit" className="btn btn-default ">
                    Save
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    type="submit"
                    className="btn btn-default "
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
