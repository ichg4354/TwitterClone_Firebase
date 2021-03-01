import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import {
  RiProfileLine,
  RiTwitterLine,
  RiProfileFill,
  RiTwitterFill,
} from "react-icons/ri";
import { useLocation } from "react-router-dom";

const NavContainer = styled.div`
  height: 50px;
  color: white;
  display: flex;
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100vw;
  z-index: 1;
  background-color: black;
  justify-content: space-evenly;
  align-items: center;
`;
const NavUl = styled.ul`
  text-decoration: none;
  float: left;
  list-style-type: none;
  color: white;
  padding: 0;
  margin: 0;
`;
const NavLi = styled.li`
  text-decoration: none;
  float: left;
  padding: 0;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  text-align: center;
`;
const IconText = styled.span`
  color: #1da1f2;
  font-size: 6;
  font-weight: 300;
  text-decoration: none;
`;

const Navigation = ({ userData }) => {
  const locationObj = useLocation();
  const currentLocation = locationObj.pathname;
  return (
    <NavContainer>
      <NavUl>
        <NavLi>
          <Link to="/" style={{ textDecoration: "none" }}>
            <IconBox>
              {currentLocation === "/" ? (
                <RiTwitterFill
                  style={{ width: "30px", height: "30px", color: "#1DA1F2" }}
                />
              ) : (
                <RiTwitterLine
                  style={{ width: "30px", height: "30px", color: "#1DA1F2" }}
                />
              )}
              <IconText>HOME</IconText>
            </IconBox>
          </Link>
        </NavLi>
        <NavLi>
          <Link to="/Profile" style={{ textDecoration: "none" }}>
            <IconBox>
              {currentLocation === "/" ? (
                <RiProfileLine
                  style={{ width: "30px", height: "30px", color: "#1DA1F2" }}
                />
              ) : (
                <RiProfileFill
                  style={{ width: "30px", height: "30px", color: "#1DA1F2" }}
                />
              )}
              <IconText>Profile</IconText>
            </IconBox>
          </Link>
        </NavLi>
      </NavUl>
    </NavContainer>
  );
};

export default Navigation;
