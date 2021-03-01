import Tweets from "components/Tweets";
import UpdateProfileFrom from "components/UpdateProfileForm";
import { authService, dataService } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react/cjs/react.development";
import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 40px 40px;
`;

const ProfileFunctions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const LogoutBtn = styled.button`
  background-color: #1da1f2;
  color: white;
  padding: 2em 3em;
  border: none;
  border-radius: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  align-self: center;
  cursor: pointer;
  width: 80%;
  margin-bottom: 15px;
`;
const ProfileEditBtn = styled.button`
  width: 80%;
  background-color: #1da1f2;
  color: black;
  padding: 2em 3em;
  border-radius: 15px;
  border: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  align-self: center;
  cursor: pointer;
`;

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
    <ProfileContainer>
      {updateProfileState ? (
        <UpdateProfileFrom
          userData={userData}
          setUserData={setUserData}
          setUpdateProfileState={setUpdateProfileState}
        />
      ) : (
        <>
          <ProfileFunctions>
            <LogoutBtn onClick={onUpdateProfileBtnClick}>
              Update Profile
            </LogoutBtn>
            <ProfileEditBtn onClick={onLogOutClick}>Log Out</ProfileEditBtn>
          </ProfileFunctions>
          <h1 style={{ color: "#1da1f2" }}>MY TWEETS</h1>
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
    </ProfileContainer>
  );
};

export default Profile;
