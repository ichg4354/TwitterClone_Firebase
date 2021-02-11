import { useEffect, useState } from "react";
import { authService } from "fBase";
import AppRoute from "Router";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    authService.currentUser ? true : false
  );
  useEffect(() => console.log(loggedIn), [loggedIn]);
  return (
    <>
      <AppRoute loggedIn={loggedIn} setLoggedIn={(bool) => setLoggedIn(bool)} />
      <footer>&copy;{new Date().getFullYear} TwitterClone</footer>
    </>
  );
}

export default App;
