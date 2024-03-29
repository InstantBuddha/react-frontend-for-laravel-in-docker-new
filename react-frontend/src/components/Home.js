import React from "react";
import { Link } from "react-router-dom";
import HelmetMetaData from "./HelmetMetaData";

function Home() {
  const uniqueHelmetMetaData = {
    title: "React Frontend for Laravel in Docker New | Home Page",
    description: "This is the home page",
    type: "webapp",
  };

  return (
    <div>
      <HelmetMetaData {...uniqueHelmetMetaData} />
      <h1>This is Home</h1>

      <Link to="/login">
        <button type="button" className="btn btn-primary">
          Go to Admin User Login
        </button>
      </Link>
      <Link to="/member-registration">
        <button type="button" className="btn btn-primary">
          Go to new Member Registration Form
        </button>
      </Link>
      <Link to="/cors-test">
        <button type="button" className="btn btn-primary">
          Go to Basic CORS test
        </button>
      </Link>
    </div>
  );
}
export default Home;
