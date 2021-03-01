import { authService } from "fBase";
import React from "react";
import { useState } from "react";
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
  width: 200px;
`;

const AuthSubmitBtn = styled.input`
  padding: 10;
  font-weight: 700;
  border-radius: 30px;
  padding: 10px 20px;
  margin-bottom: 5px;
  margin-top: 2px;
  border: none;
  width: 240px;
  background-color: #1da1f2;
`;

const QuestionSpan = styled.a`
  color: #1da1f2;
  font-size: 15px;
  text-decoration: underline;
  font-weight: 300;
  margin-bottom: 30px;
  font-weight: bold;
`;

const ErrorSpan = styled.span`
  color: white;
  font-weight: 300;
`;

const AuthForm = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
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
        <AuthSubmitBtn
          type="submit"
          value={newUser ? "Log in" : "Join"}
        ></AuthSubmitBtn>
        <QuestionSpan
          onClick={() => {
            newUser ? setNewUser(false) : setNewUser(true);
          }}
        >
          {newUser ? "Create Account" : "Sign In"}
        </QuestionSpan>
        <ErrorSpan>{error}</ErrorSpan>
      </AuthFormContainer>
    </form>
  );
};

export default AuthForm;
