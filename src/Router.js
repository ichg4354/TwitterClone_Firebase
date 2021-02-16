import Navigation from "components/Navigation";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Auth from "routes/Auth";
import EditProfile from "routes/EditProfile";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRoute = ({ loggedIn, userData }) =>
  loggedIn ? (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <Home userData={userData} />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/editProfile" exact>
            <EditProfile />
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

export default AppRoute;
