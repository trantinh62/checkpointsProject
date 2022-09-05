import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import ForgotPassword from "./Components/ChangePassword/ForgotPassword";
import ResetPassword from "./Components/ChangePassword/ResetPassword";
import Review from "./Components/Checkpoints/Checkpoints";
import PerformCheckpoint from "./Components/Checkpoints/PerformCheckpoint";
import CreateCheckpoint from "./Components/Checkpoints/CreateCheckpoint";
import SelectReviewerAndChecker from "./Components/Checkpoints/SelectReviewerAndChecker";
import History from "./Components/History/History";

import HistoryDetail from "./Components/History/HistoryDetail";
import User from "./Components/Users/Users";
import Invite from "./Components/Invite/Invite";
import Header from "./Common/Header/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [token, setToken] = useState(sessionStorage.getItem("sessionToken"));
  const search = useLocation().search;
  // const tokenRegister = new URLSearchParams(search).get("token");
  // const tokenResetPass = new URLSearchParams(search).get("tokenResetPass");
  if (!token) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <Header></Header>
      </div>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/invite" element={<Invite />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/checkpoints/:id" element={<PerformCheckpoint />}></Route>
        <Route path="/createcheckpoint" element={<CreateCheckpoint />}></Route>
        <Route
          path="/selectreviewerandchecker/:id"
          element={<SelectReviewerAndChecker />}
        ></Route>
        <Route path="/historys" element={<History />}></Route>
        <Route path="/historys/:id" element={<HistoryDetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
