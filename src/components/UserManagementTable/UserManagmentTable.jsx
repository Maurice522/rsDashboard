import React, { useState } from "react";
import styles from "./UserManagementTable.module.css"; // Import CSS module
import { convertedArrayofStudents } from "../../UserManagment/last31DaysData";
import { DeleteIcon, Edit, XIcon } from "lucide-react";

const UserManagementTable = () => {
  const [data, setData] = useState(convertedArrayofStudents);

  const [modalOpen, setModalOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);

  const openEditModal = (row) => {
    setEditedRow(row);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedRow(null);
    setModalOpen(false);
  };

  const handleDelete = (row) => {
    setData(data.filter((r) => r !== row));
  };

  const handleEdit = (editedData) => {
    setData(
      data.map((row) => (row === editedRow ? { ...row, ...editedData } : row))
    );
    closeEditModal();
  };

  return (
    <div className={styles.tableSection}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Batch</th>
            <th>Degree</th>
            <th>Email</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.batch}</td>
              <td>{row.degree}</td>
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td className={styles.tableButtons}>
                <button
                  className={styles.button}
                  onClick={() => openEditModal(row)}
                >
                  <Edit />
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleDelete(row)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
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
                };
                handleEdit(editedData);
              }}
            >
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={editedRow.name}
              />
              <br />
              <button className={styles.button} type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
