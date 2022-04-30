import React from "react";
import spinner from "../assets/spinner.gif";

function Spinner(props) {
  return (
    <div className="loading">
      {props.data ? <>Select a {props.data}</> : <p>Build Your Odds</p>}
      <img
        style={{ width: 40, margin: "auto", display: "block" }}
        src={spinner}
        alt="spinner"
      />
    </div>
  );
}

export default Spinner;
