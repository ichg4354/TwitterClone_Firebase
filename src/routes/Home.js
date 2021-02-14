import Navigation from "components/Navigation";
import { authService, dataService } from "fBase";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dataService.collection("tweets").add({
      tweet: tweet,
      date: Date.now(),
    });
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const getData = async () => {
    const data = await dataService.collection("tweets").get({ query: "tweet" });
    console.log(data);
  };

  useEffect(() => getData(), []);
  return (
    <div>
      <h1>HOME</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          placeholder="Whats on your mind"
        ></input>
        <input type="submit" value="Tweet!"></input>
      </form>
      <ul></ul>
    </div>
  );
};

export default Home;
