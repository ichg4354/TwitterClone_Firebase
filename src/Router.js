import Navigation from "components/Navigation";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react/cjs/react.development";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRoute = ({ loggedIn, userData, setUserData }) => {
  setInterval(() => console.log(userData?.displayName), 3000);
  return loggedIn ? (
    <>
      <Router>
        <Navigation userData={userData} />
        <Switch>
          <Route path="/" exact>
            <Home userData={userData} />
          </Route>
          <Route path="/profile" exact>
            <Profile userData={userData} setUserData={setUserData} />
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
