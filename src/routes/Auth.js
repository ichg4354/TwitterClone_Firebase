import { authService } from "fBase";
import React from "react";
import firebase from "firebase/app";
import AuthForm from "components/AuthForm";
import styled from "styled-components";
import { ImTwitter, ImGithub, ImGoogle3 } from "react-icons/im";

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: black;
`;

const IconContainer = styled.div`
  margin-bottom: 30px;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 240px;
  justify-content: space-around;
`;

const SocialLoginBtn = styled.button`
  border-radius: 15px;
  border: none;
  margin-left: 10px;
  padding: 3px 15px;
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    try {
      let provider;
      if (name === "github") {
        provider = new firebase.auth.GithubAuthProvider();
      } else if (name === "google") {
        provider = new firebase.auth.GoogleAuthProvider();
      }
      const result = await authService.signInWithPopup(provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContainer>
      <IconContainer>
        <ImTwitter style={{ color: "#1DA1F2", width: 60, height: 60 }} />
      </IconContainer>
      <AuthForm />
      <SocialLoginContainer>
        <SocialLoginBtn onClick={onSocialClick} name="google">
          <ImGoogle3 style={{ width: 15, height: 15 }} />
          <br />
          Continue with Google
        </SocialLoginBtn>
        <SocialLoginBtn onClick={onSocialClick} name="github">
          <ImGithub style={{ width: 15, height: 15 }} />
          <br />
          Continue with Github
        </SocialLoginBtn>
      </SocialLoginContainer>
    </AuthContainer>
  );
};

export default Auth;
