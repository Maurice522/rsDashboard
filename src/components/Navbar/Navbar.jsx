import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../images/resumeshaperlogo.png";
import { CrossIcon, MenuIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  notvisible,
  selectsidebar,
  visible,
} from "../../redux/slices/sidebarSlice";

function Navbar() {
  const dispatch = useDispatch();
  const sidebarVisible = useSelector(selectsidebar);
  return (
    <div className={styles.navbar}>
      <div className={styles.buttonAndLogo}>
        {!sidebarVisible && (
          <button
            className={styles.sidebarButton}
            onClick={() => {
              dispatch(visible());
            }}
          >
            <MenuIcon />
          </button>
        )}
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
          <p>
            <b>Resume Shaper</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
