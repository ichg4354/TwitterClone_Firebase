import { authService } from "fBase";
import React from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";

const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 10;
  font-weight: 700;
  border-radius: 30px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: none;
`;

const QuestionSpan = styled.a`
  color: white;
  font-size: 15px;
  text-decoration: underline;
  font-weight: 300;
`;
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState();

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let UserData;
    try {
      if (newUser === false) {
        UserData = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        setNewUser(true);
      } else {
        UserData = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
    clearInput();
  };
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <AuthFormContainer>
        <Input
          name="email"
          placeholder="Email"
          onChange={onChange}
          type="text"
          value={email}
          required
        ></Input>
        <Input
          name="password"
          placeholder="Password"
          onChange={onChange}
          type="password"
          value={password}
          required
        ></Input>
        <input type="submit" value={newUser ? "Log in" : "Join"}></input>
        <QuestionSpan
          onClick={() => {
            newUser ? setNewUser(false) : setNewUser(true);
          }}
        >
          {newUser
            ? "Do you want to create a new account?"
            : "Do you have a account?"}
        </QuestionSpan>
        <span>{error}</span>
      </AuthFormContainer>
    </form>
  );
};

export default AuthForm;
