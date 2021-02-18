import Navigation from "components/Navigation";
import { authService, dataService, storageService } from "fBase";
import React, { useLayoutEffect, useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Tweets from "components/Tweets";

const Home = ({ userData }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    if (tweet !== "") {
      await dataService.collection("tweets").add({
        text: tweet,
        createdAt: Date.now(),
        userId: userData.uid,
      });
    }
    await storageService.child("/image").put(imageFile);
    setTweet("");
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
    console.log(event);
    let {
      target: { files },
    } = event;
    setImageFile({ files });
    console.log(files.item(0));
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
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          placeholder="Whats on your mind"
          id="tweetInput"
        ></input>
        <input type="submit" value="Tweet!"></input>
        <input type="file" accept="image/*" onChange={onFileSubmit} />
        <div id="tweetContainer">
          {tweets.map((each) => (
            <Tweets
              tweetObj={each}
              key={each.id}
              isTweeter={userData.uid === each.userId}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default Home;
