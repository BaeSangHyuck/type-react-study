import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../style/mainPage.module.css";

export default function MainPage() {
  const [userName,setUserName] = useState<string>('');
  const { email } = useParams<{ email: string | undefined }>();

  function memberNumTag(email: string | undefined) {
    if (email !== undefined) {
      fetch(`http://localhost:8080/api/member?email=${email}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(res=>{return res.json();})
      .then(res=>{
        setUserName(res.name);
      })
      .catch(e=>console.log(e))
      return <h1 className={styles.greeting}>{userName} 님 안녕하세요!</h1>;
    } else {
      return <h1 className={styles.greeting}>환영합니다, 킨더랩스에 오신 것을 환영합니다!</h1>;
    }
  }


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>킨더랩스 회원 관리</h1>
        <p className={styles.headerSubtitle}>
          회원가입하고 다양한 서비스를 이용하세요!
        </p>
      </header>

      <div className={styles.content}>
        {memberNumTag(email)}

        <div className={styles.button_container}>
          <Link to="/signup" className={styles.button}>
            회원가입 하러 가기
          </Link>
          <Link to="/login" className={styles.button}>
            로그인 하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
