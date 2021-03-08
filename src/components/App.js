import { useEffect, useState } from "react";
import { authService } from "fBase";
import AppRoute from "Router";
import styled from "styled-components";

const Footer = styled.footer`
  color: white;
  width: 100vw;
  text-align: center;
  font-weight: 300;
  position: absolute;
  bottom: 50px;
`;
const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState();
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserData(user);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <MainContainer>
      {init ? (
        <AppRoute
          loggedIn={loggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <h1>LOADING...</h1>
      )}
      <Footer>
        <span>&copy;{new Date().getFullYear()} TwitterClone By Minseok</span>
      </Footer>
    </MainContainer>
  );
}

export default App;
