// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebase";
// import { Download } from "lucide-react";

// const StudentPage = () => {
//   const { id } = useParams();
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const q = query(collection(db, "users"), where("email", "==", id));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         setResumes(doc.data()?.resumes);
//       });
//     };
//     fetchData();
//   }, [id]);

//   console.log(resumes);

//   return (
//     <div>
//       <h1>Student Page</h1>
//       <h2>Resumes</h2>
//       <ul>
//         {resumes.map((savedResume) => (
//           <div key={savedResume.id} className="resume1Div col-md-6">
//             <div className="row">
//               <div className="col-md-4">
//                 <img
//                   src={savedResume.img}
//                   className="resumeImg zoom"
//                   alt="Profile"
//                 />
//                 <h6 className="resumeTitle">{savedResume.title}</h6>
//               </div>
//               <div className="col-md-8 editResumeOptions">
//                 <button className="editResumeBtns ">
//                   <Download className="text-xl" />
//                   Download
//                 </button>
//                 <br />
//                 <br />
//               </div>
//               <p className="resumeDesc">
//                 <strong>Created At : </strong>
//                 {savedResume.description}
//               </p>
//             </div>
//           </div>
//         ))}
//         {resumes.map((resume) => (
//           <li key={resume.id}>
//             <a href={resume.resume} download>
//               {resume.firstName + " " + resume.lastName + " " + resume.jobTitle}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addUserResume,
  auth,
  db,
  getUserFromDatabase,
  updateUserResumes,
} from "../firebase";

import img1 from "../images/template1.PNG";
import img2 from "../images/template2.PNG";
import img3 from "../images/template3.PNG";
import img4 from "../images/template4.PNG";

import { Power } from "lucide-react";
import { logout } from "../redux/slices/userSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import styles from "./StudentPage.module.css";
import { addStudent } from "../redux/slices/studentSlice";

export default function StudentPage() {
  const navigate = useNavigate();
  const [gettingUser, SetGettingUser] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [user, setUser] = useState(null);

  const [resumes, setResumes] = useState([]);
  const [savedResumes, setSavedResumes] = useState([
    {
      resumeId: 1,
      img: img1,
      title: "My Profile",
      description: "Description",
      id: "id46876548",
      idx: -1,
    },
  ]);

  const { emailId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"), where("email", "==", emailId));
      const querySnapshot = await getDocs(q);
      var tempResume;
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setResumes(doc.data()?.resumes);
        setUser(doc.data());
        tempResume = doc.data()?.resumes;
      });
      initializeSavedResumes(tempResume);
    };
    fetchData();
    const initializeSavedResumes = (resumes) => {
      if (resumes) {
        var temp = [];
        var srem = {};
        var arr = [];
        const currentTimestamp = new Date().toLocaleString();
        for (var i = 0; i < resumes.length; i++) {
          var resume = resumes[i];
          var tempimg = img1;

          if (resume.resumeId === 2) {
            tempimg = img2;
          } else if (resume.resumeId === 3) {
            tempimg = img3;
          } else if (resume.resumeId === 4) {
            tempimg = img4;
          }
          srem.resumeId = resume.resumeId;
          srem.img = tempimg;
          srem.title = resume.jobTitle;
          srem.description = currentTimestamp;
          srem.id = resume.id;
          srem.idx = i;
          arr = [...arr, srem];
          srem = {};
        }
        setSavedResumes(arr);
      }
    };
  }, [emailId]);

  const dispatch = useDispatch();

  const handler = (e) => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        console.log("signed out successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", emailId);
      const docSnap = await getDoc(docRef);
      dispatch(addStudent(docSnap.data()));
    };
    fetchData();
  }, []);

  const download = (idx) => {
    navigate(`/createcontinue/${emailId}/${idx}`, {
      state: { download: true },
    });
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <main>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        <div className={styles.studentpage}>
          <h2>Resume Gallery</h2>
          <p>
            "Welcome to your hub for organized resumes.Access, edit, or create
            new resumes for tailored job application."
          </p>
          <div>
            <h4>Documents</h4>
          </div>
          <hr />
          <div className={styles.resumes}>
            {savedResumes.map((savedResume) => (
              <div key={savedResume.id}>
                <div className={styles.resume}>
                  <div onClick={() => download(savedResume.idx)}>
                    <img
                      className={styles.img}
                      src={savedResume.img}
                      alt="Profile"
                    />
                    <h6 className="resumeTitle">{savedResume.title}</h6>
                  </div>
                  {/* <p>
                    <strong>Created At : </strong>
                    {savedResume.description}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
