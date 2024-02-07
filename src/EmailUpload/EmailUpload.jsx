import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import styles from "./EmailUpload.module.css";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

function EmailUpload() {
  const [csvData, setCsvData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFileUpload = (data) => {
    const header = data[0][0].trim().toLowerCase();
    if (header === "emails") {
      const formatted = data.slice(1).map((row) => ({ email: row[0].trim() }));
      setCsvData(data);
      setFormattedData(formatted);
      checkEmailFormats(formatted);
      toast.success("CSV uploaded!");
    } else {
      toast.error(
        'Invalid CSV format. Please make sure the header is "Emails".'
      );
    }
  };

  const checkEmailFormats = (data) => {
    const isAllValid = data.every((row) => validateEmailFormat(row.email));
    setIsButtonDisabled(!isAllValid);
  };

  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEditEmail = (index, newEmail) => {
    const updatedData = [...formattedData];
    updatedData[index].email = newEmail.trim();
    setFormattedData(updatedData);
    checkEmailFormats(updatedData);
    toast.success("Row updated successfully!");
  };

  const handleDeleteEmail = (index) => {
    const updatedData = [...formattedData];
    updatedData.splice(index, 1);
    setFormattedData(updatedData);
    checkEmailFormats(updatedData);
    toast.success("Row deleted successfully!");
  };

  const handleUploadToFirestore = async () => {
    try {
      const emailsCollection = collection(db, "meta");
      const docRef = doc(emailsCollection, "validEmails");

      await setDoc(docRef, { emails: formattedData }, { merge: true });

      console.log("Document updated successfully");
      toast.success("Uploaded to firestore successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Encountered some error!");
    }
  };

  return (
    <main>
      <Navbar />
      <div className={styles.emailupload}>
        <Sidebar />
        <div className={styles.container}>
          <h2>Upload Student Emails</h2>
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
                    <th>Serial Number</th>
                    <th>Email ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedData.map((row, index) => (
                    <tr
                      key={index}
                      className={
                        !validateEmailFormat(row.email) ? styles.errorRow : ""
                      }
                    >
                      <td>{index + 1}</td>
                      <td>{row.email}</td>
                      <td>
                        <button
                          className={styles.button}
                          onClick={() =>
                            handleEditEmail(
                              index,
                              prompt("Enter new email:", row.email)
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className={styles.button}
                          onClick={() => handleDeleteEmail(index)}
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
    </main>
  );
}

export default EmailUpload;
