import Tweets from "components/Tweets";
import UpdateProfileFrom from "components/UpdateProfileForm";
import { authService, dataService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react/cjs/react.development";

const Profile = ({ userData, setUserData }) => {
  const [updateProfileState, setUpdateProfileState] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  let history = useHistory();

  const onLogOutClick = async () => {
    await authService.signOut();
    history.push("/");
  };

  const onUpdateProfileBtnClick = () => {
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
          userData={userData}
          setUserData={setUserData}
          setUpdateProfileState={setUpdateProfileState}
        />
      ) : (
        <>
          <button onClick={onUpdateProfileBtnClick}>Update Profile</button>
          <button onClick={onLogOutClick}>Log Out</button>
          {userTweets.map((each) => (
            <Tweets
              key={each.createdAt}
              tweetObj={each}
              isTweeter={true}
              imagePath={each.imagePath}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Profile;
