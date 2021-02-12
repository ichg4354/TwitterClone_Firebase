import { authService } from "fBase";
import React, { useState } from "react";
import firebase from "firebase/app";

const Auth = () => {
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
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    try {
      let provider;
      if (name === "github") {
        provider = new firebase.auth.GithubAuthProvider();
      } else {
        provider = new firebase.auth.GoogleAuthProvider();
      }
      const result = await authService.signInWithPopup(provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={onChange}
          type="text"
          value={email}
          required
        ></input>
        <input
          name="password"
          placeholder="Password"
          onChange={onChange}
          type="password"
          value={password}
          required
        ></input>
        <input type="submit" value={newUser ? "Log in" : "Join"}></input>
        <span
          onClick={() => {
            newUser ? setNewUser(false) : setNewUser(true);
          }}
        >
          {newUser ? "Join" : "Log In"}
        </span>
        <span>{error}</span>
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Sign in with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Sign in with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
