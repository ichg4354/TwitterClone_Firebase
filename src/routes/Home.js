import TweetBox from "components/TweetBox";
import React from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 40px 40px;
`;

const Home = ({ userData }) => {
  return (
    <HomeContainer>
      <TweetBox userData={userData} />
    </HomeContainer>
  );
};

export default Home;
