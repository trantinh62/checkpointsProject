import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axiosClient from "../../Api/axiosClient";

function Checkpoints() {
  const [dataListReview, setDataListReview] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const token = sessionStorage.getItem("sessionToken");

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/api/review/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setDataListReview(res.data.data.checkpoints);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <div style={{ paddingTop: "30px" }}>
          <h1>List checkpoints need to be checked</h1>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "center" }}>Checkpoints</th>
            </tr>
          </thead>
          <tbody>
            {dataListReview.map((ele, item) => {
              return (
                <tr>
                  <td>1</td>
                  <td style={{ textAlign: "center" }}>{}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div style={{ fontStyle: "italic" }}>
          <h4>Click on title to checkpoint</h4>
        </div>
      </div>
    </>
  );
}

export default Checkpoints;
