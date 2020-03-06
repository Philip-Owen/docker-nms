import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav>
      <div>
        <span id="logo">NMS</span>
      </div>
      <NavLinkList>
        <li>
          <StyledLink to="/">Device List</StyledLink>
        </li>
        <li>
          <StyledLink to="/add-devices">Add A Device</StyledLink>
        </li>
      </NavLinkList>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  #logo {
    padding: 10px 0;
    font-size: 25px;
    font-weight: bold;
  }
  #menu-toggle {
    display: none;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #menu-toggle {
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      border: 1px solid black;
      display: inline;
      text-decoration: none;
      :hover {
        border-color: gray;
      }
    }
  }
`;

const NavLinkList = styled.ul`
  list-style: none;
  display: flex;
  li {
    padding-right: 20px;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 18px;
  :hover {
    color: gray;
    text-decoration: underline;
  }
`;

export default Navbar;
