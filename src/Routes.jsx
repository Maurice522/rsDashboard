import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./redux/slices/userSlice";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmailUpload from "./pages/EmailUpload/EmailUpload";
import ResumeRepository from "./pages/ResumeRepository/ResumeRepositoty";
import UserManagementPage from "./pages/UserManagment/UserManagement";
import Login from "./pages/Login/Login";
import AcitvityLogs from "./pages/ActivityLogs/AcitvityLogs";
import StudentPage from "./pages/StudentPage/StudentPage";
import CreateLiveContinue from "./pages/CreateLive/createLive";

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
