import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const change_pass_url = "/api/profile/change_password";

function ChangePassword() {
  const navigate = useNavigate();

  const [dataProfile, setDataProfile] = useState({
    old_password: "",
    password: "",
    password_confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataProfile({
      ...dataProfile,
      [name]: value,
    });
  };
  console.log(dataProfile);
  const token = sessionStorage.getItem("sessionToken");

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      console.log(dataProfile);
      const response = await axiosClient.put(change_pass_url, dataProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      navigate("/changepassword", { replace: true });
      navigate(0);
      toast.success("Update successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log("err", err);
      if (err.response.status === 422) {
        toast.error("The password must be at least 8 characters.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <Form className="form-profile" onSubmit={handleSumbit}>
              <h1>Change password</h1>
              <Form.Group className="mb-3" controlId="formBasicOldPass">
                <Form.Label>Old password</Form.Label>
                <Form.Control
                  type="password"
                  name="old_password"
                  onChange={onChangeInput}
                  placeholder="Old password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNewPass">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={onChangeInput}
                  placeholder="New password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasiConfirmPass">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirm"
                  onChange={onChangeInput}
                  placeholder="Confirm password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Change
              </Button>
            </Form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
