import React from "react";
import { useState } from "react/cjs/react.development";

const UpdateProfileFrom = ({
  userData,
  setUserData,
  setUpdateProfileState,
}) => {
  const [newUserName, setNewUserName] = useState(userData.displayName);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userData.displayName !== newUserName) {
      await userData.updateProfile({
        displayName: newUserName,
        // uid: userData.uid,
        // updateProfile: (value) => userData.updateProfile(value),
      });
    }
    try {
      setUpdateProfileState(false);
      setNewUserName(newUserName);
      setUserData({
        displayName: newUserName,
        uid: userData.uid,
        updateProfile: (value) => userData.updateProfile(value),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onBackBtnClick = () => {
    setUpdateProfileState((prev) => !prev);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onChange} value={newUserName}></input>
      <input type="submit" value="Update Profile"></input>
      <button onClick={onBackBtnClick}>Back</button>
    </form>
  );
};

export default UpdateProfileFrom;
