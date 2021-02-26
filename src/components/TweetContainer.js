import { storageService, dataService } from "fBase";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Tweets from "./Tweets";

const TweetContainer = ({ userData, setImageFile, imageFile }) => {
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
      <button onClick={onClearBtnClick}>Clear</button>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          placeholder="Whats on your mind"
          id="tweetInput"
        ></input>
        <input type="submit" value="Tweet!"></input>
        <input
          type="file"
          accept="image/*"
          onChange={onFileSubmit}
          id="imageInput"
        />
        <div id="tweetContainer">
          {tweets.map((each) => (
            <Tweets
              tweetObj={each}
              key={each.id}
              isTweeter={userData.uid === each.userId}
              imagePath={each.imagePath}
            />
          ))}
        </div>
      </form>
    </>
  );
};

export default TweetContainer;
