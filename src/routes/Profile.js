import { authService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  let history = useHistory();
  const onLogOutClick = async () => {
    await authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
