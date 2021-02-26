import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navigation = ({ userData }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Profile">
            {userData.displayName || "Undefined"}의 Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
