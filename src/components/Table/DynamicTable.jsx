import React from "react";
import styles from "./DynamicTable.module.css";

const DynamicTableComponent = ({ data }) => {
  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>No data to display</p>;
    }

    const columns = Object.keys(data[0]);

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {column[0].toUpperCase() + column.substring(1, column.length)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div>{renderTable()}</div>;
};

export default DynamicTableComponent;