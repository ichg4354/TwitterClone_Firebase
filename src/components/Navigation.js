import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({ userData }) => {
  const NavContainer = styled.div`
    height: 50px;
    color: white;
    display: flex;
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100vw;
    background-color: white;
  `;
  const NavUl = styled.ul`
    text-decoration: none;
    float: left;
    list-style-type: none;
    color: white;
  `;
  const NavLi = styled.li`
    text-decoration: none;
    float: left;
  `;
  return (
    <NavContainer>
      <NavUl>
        <NavLi>
          <Link to="/">
            <h3>HOME</h3>
          </Link>
        </NavLi>
        <NavLi>
          <Link to="/Profile">
            <h3>{userData?.displayName || "Undefined"}의 Profile</h3>
          </Link>
        </NavLi>
      </NavUl>
    </NavContainer>
  );
};

export default Navigation;
