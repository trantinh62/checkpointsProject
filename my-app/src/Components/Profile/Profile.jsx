import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../Api/axiosClient";
import { toast } from "react-toastify";
import "./Profile.css";
const profile_url = "/api/profile/detail";
const update_url = "/api/profile";

const Profile = () => {
  const [dataProfile, setDataProfile] = useState({
    last_name: "",
    first_name: "",
    age: "",
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
      console.log(response);
      sessionStorage.setItem("sessionUser", response.data.data.first_name);
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
      toast.error("Update failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="container content">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <Form className="form-profile" onSubmit={handleSumbit}>
              <h1>Profile</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text-form"
                  readOnly
                  defaultValue={dataProfile.email}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text-form"
                  name="first_name"
                  defaultValue={dataProfile.first_name}
                  onChange={onChangeInput}
                  placeholder="FirstName"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text-form"
                  name="last_name"
                  defaultValue={dataProfile.last_name}
                  onChange={onChangeInput}
                  placeholder="Lastname"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text-form"
                  name="age"
                  onChange={onChangeInput}
                  defaultValue={dataProfile.age}
                  placeholder="Age"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text-form"
                  name="address"
                  onChange={onChangeInput}
                  defaultValue={dataProfile.address}
                  placeholder="Address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text-form"
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
