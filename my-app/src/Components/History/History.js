import Table from "react-bootstrap/Table";
function History() {
  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center", padding: "30px" }}>
          <h1>History checkpoints</h1>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "center" }}>Checkpoints</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td style={{ textAlign: "center" }}>
                Checkpoint 360 HungDV đợt tháng 4
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td style={{ textAlign: "center" }}>
                Checkpoint 360 HungDV đợt tháng 10
              </td>
            </tr>
          </tbody>
        </Table>

        <div style={{ fontStyle: "italic" }}>
          <h4>Click on title to view checkpoint</h4>
        </div>
      </div>
    </>
  );
}
export default History;
