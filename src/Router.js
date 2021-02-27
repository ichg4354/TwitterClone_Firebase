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
  return loggedIn ? (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home userData={userData} />
          </Route>
          <Route path="/profile" exact>
            <Profile userData={userData} setUserData={setUserData} />
          </Route>
        </Switch>
        <Navigation userData={userData} />
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
