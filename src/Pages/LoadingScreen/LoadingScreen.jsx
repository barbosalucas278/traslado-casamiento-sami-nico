import React from "react";
import Spinner from "../../Components/Spinner";
import "./loadingScreen.css";
function LoadingScreen() {
  return (
    <div className="container-screen d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  );
}

export default LoadingScreen;
