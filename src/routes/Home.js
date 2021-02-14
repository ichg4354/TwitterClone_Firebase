import Navigation from "components/Navigation";
import { authService } from "fBase";
import React from "react";
import { useState } from "react/cjs/react.development";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
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
    </div>
  );
};

export default Home;
