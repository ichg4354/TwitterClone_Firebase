import { useEffect, useState } from "react";
import { authService, storageService } from "fBase";
import AppRoute from "Router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState(null);
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
    <>
      {init ? (
        <AppRoute
          loggedIn={loggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <h1>LOADING...</h1>
      )}
      <footer>&copy;{new Date().getFullYear()} TwitterClone</footer>
    </>
  );
}

export default App;
