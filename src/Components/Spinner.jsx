import React from "react";
import ImgSpinner from "../assets/spinner.gif";
import "./spinner.css";
function Spinner() {
  return (
    <div>
      <img src={ImgSpinner} alt="" />
    </div>
  );
}

export default Spinner;
