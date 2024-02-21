import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";

import img1 from "../../images/template1.PNG";
import img2 from "../../images/template2.PNG";
import img3 from "../../images/template3.PNG";
import img4 from "../../images/template4.PNG";

import { logout } from "../../redux/slices/userSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import styles from "./StudentPage.module.css";
import { addStudent } from "../../redux/slices/studentSlice";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function StudentPage() {
  const navigate = useNavigate();
  const [gettingUser, SetGettingUser] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [user, setUser] = useState(null);

  const [resumes, setResumes] = useState([]);
  const [savedResumes, setSavedResumes] = useState([]);

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
          <h2>Student Resume Gallery</h2>
          <div>
            <h4>Resumes</h4>
          </div>
          <hr />
          <div className={styles.resumes}>
            {savedResumes.length > 0 ? (
              savedResumes.map((savedResume) => (
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
                  </div>
                </div>
              ))
            ) : (
              <div>Nothing to show here!</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
