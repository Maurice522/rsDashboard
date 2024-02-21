import React, { useEffect, useState } from "react";
import styles from "./UserManagementTable.module.css";
import { DeleteIcon, Edit, View, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { convertTimestampsInArray } from "../../helper/userConvertTimestampsInArray";

const UserManagementTable = () => {
  const [data, setData] = useState([]);
  const [noOfResumes, setNoOfResumes] = useState();

  useEffect(() => {
    const fetchStudentData = async () => {
      const docRef = doc(db, "meta", "registeredUsers");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(convertTimestampsInArray(docSnap.data()?.users));
      } else {
        toast.error("Student data missing!");
      }
    };
    fetchStudentData();
  }, []);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [viewedRow, setViewedRow] = useState(null);

  const openViewModal = async (row) => {
    setViewedRow(row);
    const docRef = doc(db, "users", row.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap?.data()?.resumes?.length > 0) {
        setNoOfResumes(docSnap?.data()?.resumes?.length);
      } else {
        setNoOfResumes(0);
      }
    } else {
      toast.error("No such document!");
    }
    setViewModalOpen(true);
  };
  const openEditModal = (row) => {
    setEditedRow(row);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedRow(null);
    setEditModalOpen(false);
  };
  const closeViewModal = () => {
    setViewedRow(null);
    setViewModalOpen(false);
  };

  const handleDelete = (row) => {
    setData(data.filter((r) => r !== row));
  };

  const handleEdit = async (editedData) => {
    setData(
      data.map((row) => (row === editedRow ? { ...row, ...editedData } : row))
    );

    try {
      await setDoc(
        doc(db, "meta", "registeredUsers"),
        {
          users: data.map((row) =>
            row === editedRow ? { ...row, ...editedData } : row
          ),
        },
        { merge: true }
      );
      toast.success("Successfully updated data");
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred!");
    }

    closeEditModal();
  };

  const [searchText, setSearchText] = useState("");

  const parseTimestamp = (timestampString) => {
    const timestamp = timestampString.replace(" at ", " ");
    return new Date(timestamp);
  };

  const sortedData = data.sort((a, b) => {
    const dateA = parseTimestamp(a.date + " at " + a.time);
    const dateB = parseTimestamp(b.date + " at " + b.time);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });

  const filteredStudents = sortedData.filter(
    (student) =>
      (student.name &&
        student.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.degree &&
        student.degree.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.batch &&
        student.batch.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.id &&
        student.id.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.password &&
        student.password.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className={styles.tableSection}>
      <div className={styles.searchBox}>
        <input
          value={searchText}
          type="text"
          placeholder="Search for any student"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {filteredStudents.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Email</th>
              <th>Password</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.batch}</td>
                <td>{row.degree}</td>
                <td>{row.email}</td>
                <td>{row.password}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td className={styles.tableButtons}>
                  <button
                    className={styles.actionButton}
                    onClick={() => openViewModal(row)}
                  >
                    <View />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => openEditModal(row)}
                  >
                    <Edit />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDelete(row)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>no results found!</p>
      )}

      {editModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeEditModal}>
              <XIcon />
            </span>
            <h2>Edit Student Data</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const editedData = {
                  batch: e.target.batch.value,
                  degree: e.target.degree.value,
                  email: e.target.email.value,
                  name: e.target.name.value,
                  password: e.target.password.value,
                };
                handleEdit(editedData);
              }}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={editedRow.name}
              />
              <br />
              <label htmlFor="batch">Batch</label>
              <input
                type="text"
                id="batch"
                name="batch"
                defaultValue={editedRow.batch}
              />
              <br />
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                name="degree"
                defaultValue={editedRow.degree}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={editedRow.email}
              />
              <br />
              <label htmlFor="email">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                defaultValue={editedRow.password}
              />
              <br />
              <button className={styles.button} type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      {viewModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeViewModal}>
              <XIcon />
            </span>
            <h2>Student Data</h2>
            <p>
              <b>Name:</b> {viewedRow?.name}
            </p>
            <p>
              <b>Batch:</b> {viewedRow?.batch}
            </p>
            <p>
              <b>Degree:</b> {viewedRow?.degree}
            </p>
            <p>
              <b>Email:</b> {viewedRow?.email}
            </p>
            <p>
              <b>Resumes Created:</b> {noOfResumes}
            </p>
            <p>
              <b>Created:</b> On {viewedRow?.date} at {viewedRow?.time}
            </p>
            {noOfResumes > 0 && (
              <button className={styles.button}>
                <Link to={`/student/${viewedRow?.email}`}>
                  Open stduent's page
                </Link>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
