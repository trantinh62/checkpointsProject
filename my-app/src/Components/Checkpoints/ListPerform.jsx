import Table from "react-bootstrap/Table";
import "./PerformCheckpoint.css";
function ListPerform() {
  const handleSubmit = () => {};
  return (
    <>
      <div className="container manage-user">
        <nav  aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/perform">Checkpoints</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Perform Checkpoint
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search checkpoints by title..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            ></input>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Search
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* <tbody>
                {dataUser.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.email}</td>
                      <td>{ele.first_name}</td>
                      <td>{ele.last_name}</td>
                      <td>{ele.phone}</td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={ele.role_id}
                          name=""
                          // onChange={onChangeInput}
                        >
                          <option value="1">Group leader</option>
                          <option value="2">Leader</option>
                          <option value="3">Member</option>
                        </select>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            key={index}
                            defaultValue={
                              ele.status === "enable" ? true : false
                            }
                            defaultChecked={
                              ele.status === "enable" ? true : false
                            }
                            className="form-check-input"
                            name="switch"
                            type="checkbox"
                            // role="switch"
                            onChange={onChangeInput}
                            // id="flexSwitchCheckDefault"
                          ></input>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody> */}
            </Table>
            <div className="btn-save">
              <button type="submit" className="btn btn-primary btn-save">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ListPerform;
