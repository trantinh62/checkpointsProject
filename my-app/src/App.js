import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import ForgotPassword from "./Components/ChangePassword/ForgotPassword";
import ResetPassword from "./Components/ChangePassword/ResetPassword";
import ListCheckpoints from "./Components/Reviews/ListCheckpoints";
import ListReviews from "./Components/Reviews/ListReviews";
import DetailReview from "./Components/Reviews/DetailReview";
import CreateCheckpoint from "./Components/Checkpoints/CreateCheckpoint";
import Assign from "./Components/Checkpoints/Assign";
import History from "./Components/History/History";
import HistoryDetail from "./Components/History/HistoryDetail";
import ListMemberHistory from "./Components/History/ListMemberHistory";
import MemberHistory from "./Components/History/MemberHistory";
import User from "./Components/Users/User";
import Checkpoint from "./Components/Checkpoints/ListCheckpoints";
import Invite from "./Components/Invite/Invite";
import Header from "./Common/Header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [token, setToken] = useState(sessionStorage.getItem("sessionToken"));
  if (!token) {
    return (
      <>
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
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot" element={<ForgotPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/profile" element={<Login />}></Route>
          <Route path="/invite" element={<Login />}></Route>
          <Route path="/users" element={<Login />}></Route>
          <Route path="/mycheckpoints" element={<Login />}></Route>
          <Route path="/mycheckpoints/:check_id" element={<Login />}></Route>
          <Route
            path="/mycheckpoints/:check_id/reviews/:review_id"
            element={<Login />}
          ></Route>
          <Route path="/create" element={<Login />}></Route>
          <Route path="/assign/:id" element={<Login />}></Route>
          <Route path="/histories/member" element={<Login />}></Route>
          <Route path="/histories/:id" element={<Login />}></Route>
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
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/invite" element={<Invite />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/mycheckpoints" element={<ListCheckpoints />}></Route>
        <Route
          path="/mycheckpoints/:check_id"
          element={<ListReviews />}
        ></Route>
        <Route
          path="/mycheckpoints/:check_id/reviews/:review_id"
          element={<DetailReview />}
        ></Route>
        <Route path="/create" element={<CreateCheckpoint />}></Route>
        <Route path="/assign/:id" element={<Assign />}></Route>
        <Route path="/histories" element={<History />}></Route>
        <Route path="/histories/member" element={<ListMemberHistory />}></Route>
        <Route path="/histories/member/:id" element={<MemberHistory />}></Route>
        <Route path="/histories/:id" element={<HistoryDetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
