import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navigation = ({ userData, nickNameG }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Profile">{nickNameG}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
