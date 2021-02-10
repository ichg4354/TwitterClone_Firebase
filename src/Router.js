import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./routes/Auth";
import EditProfile from "./routes/EditProfile";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

const AppRoute = ({ loggedIn }) =>
  loggedIn ? (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route paht="/editProfile" exact>
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
