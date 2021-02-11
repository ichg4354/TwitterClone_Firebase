import { authService } from "fBase";
import React, { useState } from "react";

const Auth = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(false);
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let UserData;
    try {
      if (newUser === false) {
        const UserData = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        setNewUser(true);
        setLoggedIn(true);
        console.log(UserData);
      } else {
        const UserData = await authService.signInWithEmailAndPassword(
          email,
          password
        );
        console.log(UserData);
        setLoggedIn(true);
      }
    } catch (error) {
      alert(error);
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="email"
          onChange={onChange}
          type="text"
          value={email}
          required
        ></input>
        <input
          name="password"
          placeholder="password"
          onChange={onChange}
          type="password"
          value={password}
          required
        ></input>
        <input type="submit" value={newUser ? "Log in" : "Sign Up"}></input>
      </form>
      <div>
        <button>Sign in with Google</button>
        <button>Sign in with Github</button>
      </div>
    </div>
  );
};

export default Auth;
