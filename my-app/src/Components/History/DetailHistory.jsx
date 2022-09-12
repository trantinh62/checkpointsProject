import Table from "react-bootstrap/Table";
function HistoryDetail() {
  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center", padding: "30px" }}>
          <h1>Detail checkpoints nào đó</h1>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "center" }}>Datetime</th>
              <th style={{ textAlign: "center" }}>Thái độ trách nhiệm</th>
              <th style={{ textAlign: "center" }}>Hiệu suất công việc</th>
              <th style={{ textAlign: "center" }}>
                Phối hợp trong team & tầm ảnh hường
              </th>
              <th style={{ textAlign: "center" }}>Đào tạo phát triển</th>
              <th style={{ textAlign: "center" }}>
                Tuân thủ tiêu chuẩn chất lượng
              </th>
              <th style={{ textAlign: "center" }}>Điểm mạnh</th>
              <th style={{ textAlign: "center" }}>Điểm yếu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td style={{ textAlign: "center" }}>08/25/2022</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>Hoạt bát</td>
              <td style={{ textAlign: "center" }}>Chậm chạp</td>
            </tr>
            <tr>
              <td>2</td>
              <td style={{ textAlign: "center" }}>08/25/2022</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>Hoạt bát</td>
              <td style={{ textAlign: "center" }}>Chậm chạp</td>
            </tr>
            <tr>
              <td>ĐTB</td>
              <td> </td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>9</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <div style={{ fontStyle: "italic" }}></div>
      </div>
    </>
  );
}
export default HistoryDetail;
