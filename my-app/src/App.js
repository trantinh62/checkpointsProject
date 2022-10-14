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
import Gpoint from "./Components/Checkpoints/Gpoint";
import History from "./Components/History/History";
import DetailHistory from "./Components/History/DetailHistory";
import ListMemberHistory from "./Components/History/ListMemberHistory";
import MemberHistory from "./Components/History/MemberHistory";
import User from "./Components/Users/User";
import Invite from "./Components/Invite/Invite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Common/Layout/Layout";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
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
          <Route path="/gpoint" element={<Gpoint />}></Route>
          <Route path="/assign/:id" element={<Assign />}></Route>
          <Route path="/histories" element={<History />}></Route>
          <Route
            path="/histories/member"
            element={<ListMemberHistory />}
          ></Route>
          <Route
            path="/histories/member/:id"
            element={<MemberHistory />}
          ></Route>
          <Route path="/histories/:id" element={<DetailHistory />}></Route>
        </Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
