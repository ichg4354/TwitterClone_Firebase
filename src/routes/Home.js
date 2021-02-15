import Navigation from "components/Navigation";
import { authService, dataService } from "fBase";
import React, { useLayoutEffect } from "react";
import { useEffect, useState } from "react/cjs/react.development";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (event) => {
    const form = document.getElementById("tweetInput");
    let text = form.value;
    let DATE = Date.now();
    event.preventDefault();
    await dataService.collection("tweets").add({
      tweet: tweet,
      date: DATE,
    });
    paintTweets(text, DATE);
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const paintTweets = (text, id) => {
    let tweetContainer = document.getElementById("tweetContainer");
    let li = document.createElement("li");
    let span = document.createElement("span");
    li.id = id;
    span.innerText = text;
    li.appendChild(span);
    tweetContainer.prepend(li);
  };

  const getData = async () => {
    let list = [];
    const data = await dataService
      .collection("tweets")
      .orderBy("date", "desc")
      .get();
    data.forEach((each) => {
      list.push({ id: each.data().date, text: each.data().tweet });
    });
    setTweets(list);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
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
      </form>
      <ul id="tweetContainer">
        {tweets.map((each) => (
          <li key={each.id}>
            <span>{each.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
