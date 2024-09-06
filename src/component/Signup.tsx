import React, { useState } from "react";
import styles from "../style/signup.module.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal.tsx";
import AlertModal from "./AlertModal.tsx";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const history = useNavigate();

  function handleSignup(): void {
    if (email && password && name && age) {
      fetch(`http://localhost:8080/api/member/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          age,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((res) => {
          setWelcomeMessage(`${res.name} 님 회원가입이 완료되었습니다.`);
          setShowAlert(true);
        })
        .catch((e) => {
          console.log(e);
          alert(`${e} 에러 발생`);
        });
    } else {
      alert("모든 정보를 입력해주세요");
    }
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setShowConfirm(true); // ConfirmModal 띄우기
  }

  return (
    <div className={styles.signup_container}>
      <form className={styles.signup_form} onSubmit={handleSubmit}>
        <h2 className={styles.signup_title}>회원가입</h2>
        <input
          className={styles.signup_input}
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.signup_input}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.signup_input}
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.signup_input}
          type="number"
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.valueAsNumber)}
        />
        <button className={styles.signup_button} type="submit">
          회원가입
        </button>
      </form>

      {/* ConfirmModal */}
      {showConfirm && (
        <ConfirmModal
          message="회원가입 하시겠습니까?"
          onConfirm={() => {
            setShowConfirm(false);
            handleSignup(); // 회원가입 진행
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* AlertModal */}
      {showAlert && (
        <AlertModal
          message={welcomeMessage}
          onClose={() => {
            setShowAlert(false);
            history("/login");
          }}
        />
      )}
    </div>
  );
};

export default Signup;
