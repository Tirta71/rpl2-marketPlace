import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileToko() {
  const hasAccessToken = sessionStorage.getItem("accessToken");
  const userRole = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("id");
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const responseFirstEndpoint = await axios.get(
          "http://localhost:8000/api/v1/penjual",
          {
            headers: {
              Authorization: `Bearer ${hasAccessToken}`,
            },
          }
        );

        const localUserId = sessionStorage.getItem("id");

        const matchedPenjual = responseFirstEndpoint.data.data.find(
          (penjual) => penjual.user.id.toString() === localUserId
        );

        if (matchedPenjual) {
          const idPenjual = matchedPenjual.id;

          const responseSecondEndpoint = await axios.get(
            `http://localhost:8000/api/v1/penjual/${idPenjual}`,
            {
              headers: {
                Authorization: `Bearer ${hasAccessToken}`,
              },
            }
          );

          setShopData(responseSecondEndpoint.data.data);
        } else {
          console.error("Penjual not found for the current user");
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasAccessToken && userRole === "Penjual" && userId) {
      fetchShopData();
    }
  }, [hasAccessToken, userId, userRole]);

  if (hasAccessToken) {
    if (userRole === "Penjual") {
      if (loading) {
        return <div style={{ marginLeft: "2rem" }}>Loading...</div>;
      }

      if (shopData) {
        return (
          <div className="wallet-btn">
            <a href="/profile-toko">
              <span>
                <FontAwesomeIcon icon={faStore} data-blast="color" />
              </span>{" "}
              <span className="d-none d-md-inline">{shopData.nama_toko}</span>{" "}
            </a>
          </div>
        );
      } else {
        return (
          <div className="wallet-btn">
            <a href="/tambah-toko">
              <span>
                <FontAwesomeIcon icon={faStore} data-blast="color" />
              </span>{" "}
              <span className="d-none d-md-inline">Buat Toko</span>{" "}
            </a>
          </div>
        );
      }
    } else {
      return (
        <div className="wallet-btn">
          <a href="/tambah-toko">
            <span>
              <FontAwesomeIcon icon={faStore} data-blast="color" />
            </span>{" "}
            <span className="d-none d-md-inline">Buat Toko</span>{" "}
          </a>
        </div>
      );
    }
  }

  return null;
}
