import Navigation from "components/Navigation";
import { authService, dataService, storageService } from "fBase";
import React, { useLayoutEffect, useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Tweets from "components/Tweets";

const Home = ({ userData }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState("");
  const imageInput = document.getElementById("imageInput");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (tweet !== "") {
      await dataService.collection("tweets").add({
        text: tweet,
        createdAt: Date.now(),
        userId: userData.uid,
        imagePath: `images/${userData.uid}/${imageFile.lastModified}`,
      });
    }
    if (imageFile) {
      await storageService
        .ref()
        .child(`images/${userData.uid}/${imageFile.lastModified}`)
        .put(imageFile);
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
    setLoading(false);
  };

  const onFileSubmit = (event) => {
    let {
      target: { files },
    } = event;
    setImageFile(files[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <h1>LOADING..</h1>
  ) : (
    <div>
      <h1>HOME</h1>
      <form onSubmit={onSubmit}>
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            style={{ width: 50, height: 50 }}
          ></img>
        ) : null}
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
    </div>
  );
};

export default Home;
