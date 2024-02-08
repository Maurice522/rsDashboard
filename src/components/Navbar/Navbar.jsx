import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../images/resumeshaperlogo.png";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <p>
          <b>Resume Shaper</b>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
