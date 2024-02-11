import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ChiledHeaderProfile({ hasToken }) {
  const [namaUser, setNamaUser] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken || !hasToken) {
          console.error("Access token or authentication status is missing");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/pembeli",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userData = response.data.data;
        setNamaUser(userData.nama);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (hasToken) {
      fetchUserData();
    }
  }, [hasToken]);

  return (
    <>
      <Link
        to="#"
        className="dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-offset="-100,10"
      >
        <span data-blast="bgColor">
          <i className="icofont-user"></i>
        </span>{" "}
        <span className="d-none d-md-inline">
          {hasToken ? namaUser : "Guest"}
        </span>
      </Link>
    </>
  );
}
