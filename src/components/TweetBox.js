import { storageService, dataService } from "fBase";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Tweets from "./Tweets";
import styled from "styled-components";

const TweetBox = ({ userData, setImageFile, imageFile }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const imageInput = document.getElementById("imageInput");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (imageFile) {
      await storageService
        .ref()
        .child(`images/${userData.uid}/${imageFile?.lastModified}`)
        .put(imageFile);
    }
    if (tweet !== "") {
      await dataService.collection("tweets").add({
        text: tweet,
        createdAt: Date.now(),
        userId: userData.uid,
        imagePath: imageFile
          ? `images/${userData.uid}/${imageFile?.lastModified}`
          : "",
      });
    }
    setTweet("");
    imageInput.value = "";
    setImageFile("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

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

  const onFileSubmit = (event) => {
    let {
      target: { files },
    } = event;
    setImageFile(files[0]);
  };

  const onClearBtnClick = () => {
    setImageFile(null);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      
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
