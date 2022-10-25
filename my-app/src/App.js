import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { PrivateRoute } from "./Common/PrivateRoute/PrivateRoute";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/invite"
            element={
              <PrivateRoute>
                <Invite />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ListCheckpoints />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/mycheckpoints"
            element={
              <PrivateRoute>
                <ListCheckpoints />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/mycheckpoints/:check_id"
            element={
              <PrivateRoute>
                <ListReviews />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/mycheckpoints/:check_id/reviews/:review_id"
            element={
              <PrivateRoute>
                <DetailReview />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateCheckpoint />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/gpoint"
            element={
              <PrivateRoute>
                <Gpoint />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/assign/:id"
            element={
              <PrivateRoute>
                <Assign />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/histories"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/histories/member"
            element={
              <PrivateRoute>
                <ListMemberHistory />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/histories/member/:id"
            element={
              <PrivateRoute>
                <MemberHistory />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/histories/:id"
            element={
              <PrivateRoute>
                <DetailHistory />
              </PrivateRoute>
            }
          ></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
