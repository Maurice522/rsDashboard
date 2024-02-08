import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, getUserFromDatabase } from "../src/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MyPdfViewer2 from "./components/BEDocTemp2";
import MyPdfViewer3 from "./components/BEDocTemp3";
import MyPdfViewer4 from "./components/BEDocTemp4";
import MyPdfViewer1 from "./components/BEDocTemp1";
import PdfDisplayBE from "./components/pdfDisplayBE";
import img3 from "./images/26.png";
import { logout } from "./redux/slices/userSlice";
import { List, Power } from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { addStudent, selectstudent } from "./redux/slices/studentSlice";

export default function CreateLiveContinue() {
  const { emailId, idx } = useParams();
  const location = useLocation();

  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState("");
  const [searchText, setSearchText] = useState("");
  const [photoLoader, setPhotoLoader] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [uploadedPhotoDataURL, setUploadedPhotoDataURL] = useState("");
  const [customDetails, setCustomDetails] = useState({
    courses: [],
    activities: [],
    internships: [],
    hobbies: [],
    languages: [],
    references: [],
    customSections: [],
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
  const [personalData, setPersonalData] = useState({
    jobTitle: "",
    firstName: "",
    middleName: "",
    lastName: "",
    inputEmail: "",
    phone: "",
    dateOfBirth: "",
    city: "",
    address: "",
    postalCode: "",
    drivingLicense: "",
    nationality: "",
    placeOfBirth: "",
    country: "",
    professionalSummary: "",
    uploadedPhotoURL: "",
    employmentHistory: [
      {
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ],
    educationHistory: [
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ],
    websitesAndLinks: [
      {
        name: "",
        url: "",
      },
    ],
  });

  const [gettingUser, SetGettingUser] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [currId, setCurrId] = useState(null);
  const [count, setCount] = useState(0);
  // const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", emailId);
      const docSnap = await getDoc(docRef);
      dispatch(addStudent(docSnap.data()));
    };
    fetchData();
  }, []);

  const user = useSelector(selectstudent);

  useEffect(() => {
    if (user && user.email !== null && count < 1) {
      console.log(user, count);
      console.log("I'm here");
      var temp = {
        jobTitle: "",
        firstName: "",
        middleName: "",
        lastName: "",
        inputEmail: "",
        phone: "",
        dateOfBirth: "",
        city: "",
        address: "",
        postalCode: "",
        drivingLicense: "",
        nationality: "",
        placeOfBirth: "",
        country: "",
        professionalSummary: "",
        uploadedPhotoURL: "",
        employmentHistory: [
          {
            jobTitle: "",
            employer: "",
            startDate: "",
            endDate: "",
            city: "",
            description: "",
          },
        ],
        educationHistory: [
          {
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            city: "",
            description: "",
          },
        ],
        websitesAndLinks: [
          {
            name: "",
            url: "",
          },
        ],
      };
      console.log(location);
      if (location.state !== null) {
        if (location.state.popon) setIsPopupOpen(location.state.popon);

        if (location.state.download) setDownloadPdf(location.state.download);
      }
      console.log("started");
      Object.entries(temp).map(([key, value]) => {
        temp[key] = user.resumes[idx][key];
      });
      console.log(user.resumes[idx]);
      setCustomDetails(user.resumes[idx].customDetails);
      setActivities(user.resumes[idx].customDetails.activities);
      setCourses(user.resumes[idx].customDetails.courses);
      setInternships(user.resumes[idx].customDetails.internships);
      setReferences(user.resumes[idx].customDetails.references);
      setCustomSections(user.resumes[idx].customDetails.customSections);
      setLanguages(user.resumes[idx].customDetails.languages);
      setHobbies(user.resumes[idx].customDetails.hobbies);
      setCurrId(user.resumes[idx].id);
      setSelectedOptions(user.resumes[idx].skills);
      setSelectedTemplateId(user.resumes[idx].resumeId);
      setPersonalData(temp);
      setCount(1);
    }
  }, [idx, emailId]);

  useEffect(() => {
    setAiLoading(false);
  }, []);

  const handleDownload = async () => {
    console.log("berfore", downloadPdf);
    setDownloadPdf(true);
    console.log(downloadPdf);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
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

  useEffect(() => {
    setShowDropdown(false);
  }, [selectedOptions]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      courses: courses,
    });
  }, [courses]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      activities: activities,
    });
  }, [activities]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      internships: internships,
    });
  }, [internships]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      references: references,
    });
  }, [references]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      languages: languages,
    });
  }, [languages]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      hobbies: hobbies,
    });
  }, [hobbies]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      customSections: customSections,
    });
  }, [customSections]);

  // Function to log the selected skills
  useEffect(() => {
    console.log("Selected Skills:", selectedOptions);
  }, [selectedOptions]);

  const redirectHome = () => {
    navigate("/");
  };

  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    if (window.innerWidth > 890) {
      setShowMenu(false);
    }
    const handleResize = () => {
      if (window.innerWidth > 890) {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pdfViewer">
      {user && downloadPdf ? (
        <PdfDisplayBE
          imgFile={imgFile}
          personalData={personalData}
          courses={courses}
          activities={activities}
          internships={internships}
          hobbies={hobbies}
          languages={languages}
          references={references}
          customSections={customSections}
          skills={selectedOptions}
          downloadPdf={downloadPdf}
          setDownloadPdf={setDownloadPdf}
          selectedTemplateId={selectedTemplateId}
        />
      ) : (
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width="240"
          height="240"
          alt="loading..."
          src="https://media2.giphy.com/media/MDrmyLuEV8XFOe7lU6/200w.webp?cid=ecf05e47k6onrtqddz8d98s4j5lhtutlnnegeus1pwcdwkxt&ep=v1_gifs_search&rid=200w.webp&ct=g"
        />
      )}
    </div>
  );
}
