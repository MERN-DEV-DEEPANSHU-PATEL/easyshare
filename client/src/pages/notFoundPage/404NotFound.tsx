// 404NotFound.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./404NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const redirectHome = setTimeout(() => {
  //     navigate("/");
  //   }, 5000);

  //   return () => clearTimeout(redirectHome);
  // }, [history]);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404 Not Found</h1>
        <p className="not-found-message">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="not-found-redirect">
          Redirecting you to the home page...
        </p>
      </div>
    </div>
  );
};

export default NotFound;
