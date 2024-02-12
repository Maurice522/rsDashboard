import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import EmailUpload from "./EmailUpload/EmailUpload";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import UserManagementPage from "./UserManagment/UserManagement";
import Dashboard from "./Dashboard/Dashboard";
import AcitvityLogs from "./ActivityLogs/AcitvityLogs";
import ResumeRepository from "./ResumeRepository/ResumeRepositoty";
import StudentPage from "./StudentPage/StudentPage";
import CreateLiveContinue from "./createLive";
import ResumeUsageAnalytics from "./ResumeUsageAnalytics/ResumeUsageAnalytics";
import Statistics from "./components/Statistics/Statistics";

const RoutesComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user.email, user.uid));
      } else {
        dispatch(logout());
        navigate("/login");
      }
    });
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, []);

  const loggedInUser = useSelector(selectUser);

  return (
    <>
      {loggedInUser ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/email-upload" element={<EmailUpload />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route path="/activity-logs" element={<AcitvityLogs />} />
          <Route path="/resume-repository" element={<ResumeRepository />} />
          <Route path="/resume-analytics" element={<ResumeUsageAnalytics />} />
          {/* <Route path="/statistics" element={<Statistics />} /> */}
          <Route path="/student/:emailId" element={<StudentPage />} />
          <Route
            path="createcontinue/:emailId/:idx"
            element={<CreateLiveContinue />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default RoutesComponent;
