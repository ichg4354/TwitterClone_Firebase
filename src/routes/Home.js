import TweetBox from "components/TweetBox";
import React from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";

const Home = ({ userData }) => {
  const [imageFile, setImageFile] = useState("");
  const HomeContainer = styled.div`
    padding: 0 40px;
  `;

  return (
    <HomeContainer>
      {imageFile ? (
        <img
          src={URL.createObjectURL(imageFile)}
          style={{ width: 50, height: 50 }}
        ></img>
      ) : null}
      <TweetBox
        userData={userData}
        setImageFile={setImageFile}
        imageFile={imageFile}
      />
    </HomeContainer>
  );
};

export default Home;
