import React, { useState } from "react";
import styles from "../style/login.module.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal.tsx";
import AlertModal from "./AlertModal.tsx";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showLoginFailedAlert, setShowLoginFailedAlert] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const history = useNavigate();
  const loginFailedMessage:string = '로그인 정보가 잘못되었습니다.';

  function handleLogin(): void {
    if (email && password) {
      fetch(
        `http://localhost:8080/api/member/login?email=${email}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((res) => {
          setWelcomeMessage(`${res.email} 님 환영합니다.`);
          setShowAlert(true);
        })
        .catch((e) => {
          setShowLoginFailedAlert(true);
        });
    } else {
      console.log("이메일과 비밀번호를 입력하세요");
    }
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setShowConfirm(true);
  }

  return (
    <div className={styles.login_container}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <h2 className={styles.login_title}>로그인</h2>
        <input
          className={styles.login_input}
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.login_input}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.login_button} type="submit">
          로그인
        </button>
      </form>

      {showConfirm && (
        <ConfirmModal
          message="로그인 하시겠습니까?"
          onConfirm={() => {
            setShowConfirm(false);
            handleLogin();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showAlert && (
        <AlertModal
          message={welcomeMessage}
          onClose={() => {
            setShowAlert(false);
            history(`/main/${welcomeMessage.split(" ")[0]}`);
          }}
        />
      )}

      {showLoginFailedAlert && (
        <AlertModal
          message={loginFailedMessage}
          onClose={() => {
            setShowLoginFailedAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default Login;
