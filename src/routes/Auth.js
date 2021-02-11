import { authService } from "fBase";
import React, { useState } from "react";

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
        <input type="submit" value={newUser ? "Log in" : "Sign Up"}></input>
        <span
          onClick={() => {
            newUser ? setNewUser(false) : setNewUser(true);
          }}
        >
          {newUser ? "Are you New here?" : "Do you have a account?"}
        </span>
        <span>{error}</span>
      </form>
      <div>
        <button>Sign in with Google</button>
        <button>Sign in with Github</button>
      </div>
    </div>
  );
};

export default Auth;
