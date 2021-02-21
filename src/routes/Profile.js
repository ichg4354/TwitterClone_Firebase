import { authService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";

const Profile = ({ userData, setNickNameG }) => {
  const [userName, setUsername] = useState(userData.displayName);
  const [updateProfileState, setUpdateProfileState] = useState(false);

  let history = useHistory();
  const onLogOutClick = async () => {
    await authService.signOut();
    history.push("/");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await userData.updateProfile({
      displayName: userName,
    });
    try {
      setNickNameG(userName);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsername(value);
  };

  const onUpdateProfileBtnClick = () => {
    setUpdateProfileState((prev) => !prev);
  };

  const onBackBtnClick = () => {
    setUpdateProfileState((prev) => !prev);
  };

  return (
    <>
      {updateProfileState ? (
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={userName}></input>
          <input type="submit" value="Update Profile"></input>
          <button onClick={onBackBtnClick}>Back</button>
        </form>
      ) : (
        <button onClick={onUpdateProfileBtnClick}>Update Profile</button>
      )}

      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
