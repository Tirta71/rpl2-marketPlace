import axios from "axios";
import React, { useEffect, useState } from "react";
import imageMarketPlace from "../../Assets/image/pngwing.com.png";
import Loading from "../Util/Loading";

export default function ChildProfileToko() {
  const [penjualData, setPenjualData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenjualData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
          return;
        }

        const responseFirstEndpoint = await axios.get(
          "http://localhost:8000/api/v1/penjual",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setPenjualData(responseSecondEndpoint.data.data);
        } else {
          console.error("Penjual not found for the current user");
        }
      } catch (error) {
        console.error("Error fetching penjual data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPenjualData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="profile-item">
          <div className="profile-cover">
            <img src="/assets/images/profile/cover.jpg" alt="cover-pic" />
          </div>
          <div className="profile-information">
            <div className="profile-pic">
              <img src={imageMarketPlace} alt="DP" />
              <div className="custom-upload">
                <div className="file-btn">
                  <span className="d-none d-lg-inline-block">
                    <i className="icofont-camera"></i>
                    Edit
                  </span>
                  <span className="d-lg-none mr-0">
                    <i className="icofont-plus"></i>
                  </span>
                </div>
                <input type="file" />
              </div>
            </div>

            {penjualData ? (
              <div className="profile-name " style={{ textAlign: "left" }}>
                <h4>{penjualData.nama_toko}</h4>
                <p>{penjualData.alamat_toko}</p>
              </div>
            ) : (
              <div className="ml-5">Data tidak ditemukan.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
