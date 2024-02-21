import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import styles from "./EmailUpload.module.css";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import logActivity, { auth, db } from "../firebase";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import generateRandomId from "../helper/generateId";
import { activity } from "../helper/activity";

function EmailUpload() {
  const [csvData, setCsvData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [modalData, setModalData] = useState({});
  const [passwords, setPasswords] = useState({});

  useEffect(() => {
    const generatePasswords = () => {
      const updatedPasswords = {};
      formattedData.forEach((row, index) => {
        const generatedPassword = generatePassword(
          row.name,
          row.batch,
          row.dob
        );
        updatedPasswords[index] = generatedPassword;
      });
      setPasswords(updatedPasswords);
    };

    if (formattedData.length > 0) {
      generatePasswords();
    }
  }, [formattedData]);

  const handleFileUpload = (data) => {
    if (data && data.length > 0) {
      const header = data[0];
      const requiredColumns = [
        "name",
        "batch",
        "dob",
        "degree",
        "email",
        "rollNumber",
      ];

      // Check if all required columns are present
      if (header && requiredColumns.every((col) => header.includes(col))) {
        const formatted = data.slice(1).map((row) => ({
          name: (row[header.indexOf("name")] || "").trim(),
          batch: (row[header.indexOf("batch")] || "").trim(),
          dob: (row[header.indexOf("dob")] || "").trim(),
          degree: (row[header.indexOf("degree")] || "").trim(),
          email: (row[header.indexOf("email")] || "").trim(),
          rollNumber: (row[header.indexOf("rollNumber")] || "").trim(),
        }));

        setCsvData(data);
        setFormattedData(formatted);
        checkDataFormats(formatted);
        toast.success("CSV uploaded!");
      } else {
        toast.error(
          'Invalid CSV format. Please make sure all required columns are present: "name", "batch", "dob", "degree", "email", "rollNumber".'
        );
      }
    } else {
      toast.error("No data found in the CSV file.");
    }
  };

  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateBatch = (batch) => {
    const regex = /^\d{4}-\d{4}$/;
    return regex.test(batch);
  };

  const generatePassword = (name, batch, dob) => {
    const [startYear, endYear] = batch.split("-");
    const dobYear = dob.substring(dob.length - 4);
    return `${name.replace(/\s+/g, "")}${endYear}${dobYear}`;
  };

  const validateDateOfBirthFormat = (dob) => {
    const dateParts = dob.split("/");
    if (dateParts.length !== 3) return false;
    const [day, month, year] = dateParts.map((part) => parseInt(part, 10));
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (month < 1 || month > 12) return false;
    if (year.toString().length !== 4) return false;
    if (day.toString().length > 2) return false;
    if (month.toString().length > 2) return false;
    return true;
  };

  const checkDataFormats = (data) => {
    const isAllValid = data.every(
      (row) =>
        validateEmailFormat(row.email) &&
        validateDateOfBirthFormat(row.dob) &&
        validateBatch(row.batch)
    );
    console.log(isAllValid);
    setIsButtonDisabled(!isAllValid);
  };

  const validateRow = (row) => {
    return (
      validateEmailFormat(row.email) &&
      validateDateOfBirthFormat(row.dob) &&
      validateBatch(row.batch)
    );
  };

  const openModal = (index) => {
    setEditIndex(index);
    setModalData(formattedData[index]);
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  const handleEditData = () => {
    const updatedData = [...formattedData];
    updatedData[editIndex] = modalData;
    setFormattedData(updatedData);
    checkDataFormats(updatedData);
    toast.success("Row updated successfully!");
    closeModal();
  };

  const handleDeleteData = (index) => {
    const updatedData = [...formattedData];
    updatedData.splice(index, 1);
    setFormattedData(updatedData);
    checkDataFormats(updatedData);
    toast.success("Row deleted successfully!");
  };

  const handleUploadToFirestore = async () => {
    const registeredUsersRef = doc(db, "meta", "registeredUsers");
    try {
      formattedData.forEach((student, index) => {
        createUserWithEmailAndPassword(auth, student.email, passwords[index]);
        logActivity(
          activity.signUp.type,
          null,
          generateRandomId(),
          activity.signUp.description,
          student.email
        );
        logActivity(
          activity.createProfile.type,
          null,
          generateRandomId(),
          activity.createProfile.description,
          student.email
        );
        updateDoc(registeredUsersRef, {
          users: arrayUnion({
            ...student,
            password: passwords[index],
            timestamp: new Date(),
          }),
        });
        setDoc(doc(db, "users", student?.email), {
          name: student.name,
          batch: student.batch,
          dob: student.dob,
          degree: student.degree,
          email: student.email,
          rollNumber: student.rollNumber,
          password: passwords[index],
          timestamp: new Date(),
        });
        if (formattedData.length > 100) {
          const percentage = (index / formattedData.length) * 100;
          toast.success(`${percentage}% uploaded!`);
        }
      });

      console.log("Document updated successfully");
      toast.success("Uploaded to firestore successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Encountered some error!");
    }
  };

  const handleEditPassword = (index, newPassword) => {
    const updatedPasswords = { ...passwords };
    updatedPasswords[index] = newPassword;
    setPasswords(updatedPasswords);
  };

  return (
    <main>
      <Navbar />
      <div className={styles.emailupload}>
        <Sidebar />
        <div className={styles.container}>
          <h2>Upload Student Data</h2>
          {!csvData.length > 0 && (
            <CSVReader
              cssInputClass={styles.fileUploadButton}
              onFileLoaded={handleFileUpload}
            />
          )}
          {formattedData.length > 0 && (
            <div className={styles.tableDiv}>
              <table className={styles.emailTable}>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Batch</th>
                    <th>DOB</th>
                    <th>Degree</th>
                    <th>Email</th>
                    <th>Roll Number</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedData.map((row, index) => (
                    <tr
                      key={index}
                      className={validateRow(row) ? "" : styles.errorRow}
                    >
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.batch}</td>
                      <td>{row.dob}</td>
                      <td>{row.degree}</td>
                      <td>{row.email}</td>
                      <td>{row.rollNumber}</td>
                      <td>
                        <input
                          type="text"
                          className={styles.editPassword}
                          value={
                            passwords[index] ||
                            generatePassword(row.name, row.batch, row.dob)
                          }
                          onChange={(e) =>
                            handleEditPassword(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => openModal(index)}
                          className={styles.button}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.button}
                          onClick={() => handleDeleteData(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className={styles.button}
                onClick={handleUploadToFirestore}
                disabled={isButtonDisabled}
              >
                Upload to Firestore
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  setCsvData([]);
                  setFormattedData([]);
                }}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Edit Data</h2>
          </div>
          <div className={styles.modalBody}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={modalData.name || ""}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
            <label htmlFor="batch">Batch:</label>
            <input
              type="text"
              id="batch"
              value={modalData.batch || ""}
              onChange={(e) =>
                setModalData({ ...modalData, batch: e.target.value })
              }
            />
            <label htmlFor="dob">DOB:</label>
            <input
              type="text"
              id="dob"
              value={modalData.dob || ""}
              onChange={(e) =>
                setModalData({ ...modalData, dob: e.target.value })
              }
            />
            <label htmlFor="degree">Degree:</label>
            <input
              type="text"
              id="degree"
              value={modalData.degree || ""}
              onChange={(e) =>
                setModalData({ ...modalData, degree: e.target.value })
              }
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={modalData.email || ""}
              onChange={(e) =>
                setModalData({ ...modalData, email: e.target.value })
              }
            />
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="text"
              id="rollNumber"
              value={modalData.rollNumber || ""}
              onChange={(e) =>
                setModalData({ ...modalData, rollNumber: e.target.value })
              }
            />
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.button} onClick={handleEditData}>
              Save
            </button>
            <button className={styles.button} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmailUpload;

//alternate signup
//on csv upload
//name:string, batch:string eg. 2017-2022, dob:string format:date/month/year,
//degree : string, email:string, rollNumber: string
//none can be empty
//password: {name}{batch.endYear}{dob.year}
//percentage wise loading state, while users upload, when number is large
//toast messages
