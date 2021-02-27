import { useEffect, useState } from "react";
import { authService } from "fBase";
import AppRoute from "Router";
import styled from "styled-components";

function App() {
  const Footer = styled.footer`
    color: white;
    font-weight: 300;
    width: 100vw;
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin-bottom: 20px;
  `;
  const MainContainer = styled.div`
    min-height: 100vh;
    position: relative;
  `;
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
