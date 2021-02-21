import Navigation from "components/Navigation";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRoute = ({ loggedIn, userData }) => {
  const [nickNameG, setNickNameG] = useState(userData.displayName);
  return loggedIn ? (
    <>
      <Router>
        <Navigation userData={userData} nickNameG={nickNameG} />
        <Switch>
          <Route path="/" exact>
            <Home userData={userData} />
          </Route>
          <Route path="/profile" exact>
            <Profile userData={userData} setNickNameG={setNickNameG} />
          </Route>
        </Switch>
      </Router>
    </>
  ) : (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoute;
