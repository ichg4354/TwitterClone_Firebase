import TweetContainer from "components/TweetContainer";
import React from "react";
import { useState } from "react/cjs/react.development";

const Home = ({ userData }) => {
  const [imageFile, setImageFile] = useState("");

  return (
    <div>
      <h1>HOME</h1>
      {imageFile ? (
        <img
          src={URL.createObjectURL(imageFile)}
          style={{ width: 50, height: 50 }}
        ></img>
      ) : null}
      <TweetContainer
        userData={userData}
        setImageFile={setImageFile}
        imageFile={imageFile}
      />
    </div>
  );
};

export default Home;
