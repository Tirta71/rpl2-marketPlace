import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      await axios.post("http://localhost:8000/api/v1/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      sessionStorage.clear();

      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "You have been successfully logged out.",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/sign-in";
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "You have been successfully logged out.",
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "sign-in";
        }
      });
    }
  };

  return (
    <li>
      <button className="dropdown-item" onClick={handleLogout}>
        Sign Out
        <span className="ms-1">
          <i className="icofont-logout"></i>
        </span>
      </button>
    </li>
  );
};

export default Logout;
