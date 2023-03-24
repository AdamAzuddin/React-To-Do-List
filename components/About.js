import React from "react";
import { Link, useLocation } from "react-router-dom";

// use Link instead of <a> in react router 
//so that there's no need to reload

const About = () => {
  const location = useLocation();
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <footer>
        <Link to="/">Go Back</Link>
      </footer>
    </div>
  );
};

export default About;
