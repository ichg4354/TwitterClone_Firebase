import { useEffect, useState } from "react";
import { authService } from "fBase";
import AppRoute from "Router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRoute loggedIn={loggedIn} /> : <h1>LOADING...</h1>}
      <footer>&copy;{new Date().getFullYear()} TwitterClone</footer>
    </>
  );
}

export default App;
