import { authService } from "fBase";
import React from "react";
import firebase from "firebase/app";
import AuthForm from "components/AuthForm";

const Auth = () => {
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
      <AuthForm />
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
