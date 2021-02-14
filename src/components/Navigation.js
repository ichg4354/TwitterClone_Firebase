import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Profile">Profile</Link>
      </li>
      <li>
        <Link to="/EditProfile">EditProfile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
