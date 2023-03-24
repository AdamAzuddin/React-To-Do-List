import React from "react";
import { Link, useLocation } from "react-router-dom";


const Footer = () => {
    const location = useLocation();

  return <footer>
    {/*  only show when in home path (/) */}
    {location.pathname === '/' && (<p>Copyright &copy; 2022</p>)}
    {location.pathname === '/' && (<Link to="/about">About</Link>)}
  </footer>;
};

export default Footer;
