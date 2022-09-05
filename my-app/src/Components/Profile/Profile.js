import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";

const profile_url = "/api/profile/detail";
const update_url = "/api/profile";

const Profile = () => {
  const navigate = useNavigate();

  const [dataProfile, setDataProfile] = useState({
    last_name: "",
    first_name: "",
    address: "",
    phone: "",
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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get(profile_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setDataProfile(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(update_url, dataProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      sessionStorage.setItem("sessionUser", response.data.data.first_name);
      navigate("/profile", { replace: true });
      navigate(0);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <h1>Profile</h1>
            <Form onSubmit={handleSumbit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  readOnly
                  type="email"
                  defaultValue={dataProfile.email}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  name="first_name"
                  defaultValue={dataProfile.first_name}
                  onChange={onChangeInput}
                  placeholder="FirstName"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  name="last_name"
                  defaultValue={dataProfile.last_name}
                  onChange={onChangeInput}
                  placeholder="Lastname"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  onChange={onChangeInput}
                  defaultValue={dataProfile.address}
                  placeholder="Address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  onChange={onChangeInput}
                  defaultValue={dataProfile.phone}
                  placeholder="Phone"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
