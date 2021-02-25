import Tweets from "components/Tweets";
import { authService, dataService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react/cjs/react.development";

const Profile = ({ userData, setUserData }) => {
  const [updateProfileState, setUpdateProfileState] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  const [newUserName, setNewUserName] = useState(userData.displayName);

  let history = useHistory();
  const onLogOutClick = async () => {
    await authService.signOut();
    history.push("/");
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userData.displayName !== newUserName) {
      await userData.updateProfile({
        displayName: newUserName,
        uid: userData.uid,
      });
    }
    try {
      setUpdateProfileState(false);
      setNewUserName(newUserName);
      setUserData({ displayName: newUserName });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onUpdateProfileBtnClick = () => {
    setUpdateProfileState((prev) => !prev);
  };

  const onBackBtnClick = () => {
    setUpdateProfileState((prev) => !prev);
  };

  const getUserTweets = async () => {
    dataService
      .collection("tweets")
      .where("userId", "==", userData.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let dataList = snap.docs.map((each) => ({
          ...each.data(),
          id: each.id,
        }));
        setUserTweets(dataList);
      });
  };

  useEffect(() => {
    getUserTweets();
  }, []);

  return (
    <>
      {updateProfileState ? (
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={newUserName}></input>
          <input type="submit" value="Update Profile"></input>
          <button onClick={onBackBtnClick}>Back</button>
        </form>
      ) : (
        <>
          <button onClick={onUpdateProfileBtnClick}>Update Profile</button>
          {userTweets.map((each) => (
            <Tweets
              key={each.createdAt}
              tweetObj={each}
              isTweeter={true}
              imagePath={each.imagePath}
            />
          ))}
          <button onClick={onLogOutClick}>Log Out</button>
        </>
      )}
    </>
  );
};

export default Profile;
