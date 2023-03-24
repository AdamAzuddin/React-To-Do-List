import React from "react";
import { useLocation } from "react-router-dom";

import Button from "./Button";
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === '/' ?(<h1>{title}</h1>) : <h1>About Page</h1>}
      {location.pathname === '/' && (
        <Button
        // Button change colour to green when showAdd is true and green when false
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  )
};

Header.defaultProps = {
  title: "To do list",
};

const headingStyle = {
  color: "red",
  backgroundColor: "black",
};

export default Header;
