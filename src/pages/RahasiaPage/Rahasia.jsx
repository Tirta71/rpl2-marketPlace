import axios from "axios";
import React from "react";

export default function Rahasia() {
  const accessToken = localStorage.getItem("accessToken");

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  window.addEventListener("beforeunload", clearLocalStorage);

  return (
    <div>
      <p>Hayo Kamu Ngapain</p>
    </div>
  );
}
