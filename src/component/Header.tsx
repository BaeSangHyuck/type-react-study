import React from "react";
import styles from "../style/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header_container}>
      <div style={{
        display:"flex",
      }}>
        <h1 className={styles.header_title}>회원 토이프로젝트</h1>
        <Link to={"/my/:email"} className={styles.button}>내 정보 보기</Link>
      </div>
    </header>
  );
};

export default Header;
