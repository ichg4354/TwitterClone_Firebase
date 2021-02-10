import { useState } from "react";
import { authService } from "../fBase";
import AppRoute from "../Router";

function App() {
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRoute loggedIn={loggedIn} />
      <footer>&copy;{new Date().getFullYear} TwitterClone</footer>
    </>
  );
}

export default App;
