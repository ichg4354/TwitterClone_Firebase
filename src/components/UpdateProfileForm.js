import React from "react";

const UpdateProfileFrom = ({
  onSubmit,
  onChange,
  onBackBtnClick,
  newUserName,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onChange} value={newUserName}></input>
      <input type="submit" value="Update Profile"></input>
      <button onClick={onBackBtnClick}>Back</button>
    </form>
  );
};

export default UpdateProfileFrom;
