import Table from "react-bootstrap/Table";
import Header from "../../Common/Header/Header";
import "./PerformCheckpoint.css";
function PerformCheckpoint() {
  return (
    <>
      <div className="container heading">
        <div>
          <h1>Perform checkpoint</h1>
        </div>
        <div class="input-group mb-3">
          <div>
            <h4 className="title-checks">Title</h4>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Title of checkpoint"
          ></input>
        </div>
        <div className="form-checkpoint">
          <h3>1- Thái độ trách nhiệm</h3>
          <div className="form-detail">
            <h2>
              - 10 điểm: Luôn chủ động, tích cực. Hoặc tính sẵn sàng đi onsite.-
              7 điểm: Bình thường- 5 điểm: Còn thụ động, còn để nhắc nhở về tinh
              thần, thái độ, ý thức làm việc- 0 điểm: rất có vấn đề về ý thức
            </h2>
            <select
              style={{ width: "100px" }}
              class="form-select"
              aria-label="Default select example"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div className="form-checkpoint">
          <h3>2- Thái độ trách nhiệm</h3>
          <div className="form-detail">
            <h2>
              - 10 điểm: Luôn chủ động, tích cực. Hoặc tính sẵn sàng đi onsite.-
              7 điểm: Bình thường- 5 điểm: Còn thụ động, còn để nhắc nhở về tinh
              thần, thái độ, ý thức làm việc- 0 điểm: rất có vấn đề về ý thức
            </h2>
            <select
              style={{ width: "100px" }}
              class="form-select"
              aria-label="Default select example"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        <div className="btn-save">
          <button type="button" class="btn btn-primary ">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default PerformCheckpoint;
