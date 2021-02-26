import Tweets from "components/Tweets";
import UpdateProfileFrom from "components/UpdateProfileForm";
import { authService, dataService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react/cjs/react.development";

const Profile = ({ userData, setUserData }) => {
  const [updateProfileState, setUpdateProfileState] = useState(true);
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
        <UpdateProfileFrom
          onSubmit={onSubmit}
          onChange={onChange}
          onBackBtnClick={onBackBtnClick}
          newUserName={newUserName}
        />
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
