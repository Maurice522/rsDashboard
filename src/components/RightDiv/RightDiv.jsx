import React from "react";
import Welcome from "../../Welcome/Welcome";
import UserManagement from "../../UserManagment/UserManagement";
import AcitvityLogs from "../../ActivityLogs/AcitvityLogs";
import ResumeRepository from "../../ResumeRepository/ResumeRepositoty";
import EmailUpload from "../../EmailUpload/EmailUpload";
import ResumeUsageAnalytics from "../../ResumeUsageAnalytics/ResumeUsageAnalytics";

const RightDiv = ({ active }) => {
  return (
    <>
      {active === null && <Welcome />}
      {active === "user-management" && <UserManagement />}
      {active === "resume-analytics" && <ResumeUsageAnalytics />}
      {active === "activity-logs" && <AcitvityLogs />}
      {active === "resume-repository" && <ResumeRepository />}
      {active === "upload-emails" && <EmailUpload />}
    </>
  );
};

export default RightDiv;
