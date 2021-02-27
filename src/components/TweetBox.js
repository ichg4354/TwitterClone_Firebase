import { dataService } from "fBase";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Tweets from "./Tweets";
import styled from "styled-components";
import TweetForm from "./TweetForm";

const TweetBox = ({ userData, setImageFile, imageFile }) => {
  const [tweets, setTweets] = useState([]);

  const getData = async () => {
    dataService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let dataList = snap.docs.map((each) => ({
          ...each.data(),
          id: each.id,
        }));
        setTweets(dataList);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TweetForm
        imageFile={imageFile}
        userData={userData}
        setImageFile={setImageFile}
      />
      {tweets.map((each) => (
        <Tweets
          tweetObj={each}
          key={each.id}
          isTweeter={userData.uid === each.userId}
          imagePath={each.imagePath}
        />
      ))}
    </>
  );
};

export default TweetBox;
