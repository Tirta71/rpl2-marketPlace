import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AboutProfileToko() {
  const [pembeliData, setPembeliData] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchPembeliData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/pembeli/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setPembeliData(response.data.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      }
    };

    fetchPembeliData();
  }, [accessToken, userId]);

  return (
    <>
      {pembeliData ? (
        <div
          className="tab-pane fade"
          id="about"
          role="tabpanel"
          aria-labelledby="nav-about-tab"
        >
          <div>
            <div className="row">
              <div className="col">
                <article>
                  <div className="info-card">
                    <div className="info-card-title">
                      <h4>Profile</h4>
                    </div>
                    <div className="info-card-content">
                      <ul className="info-list">
                        <li>
                          <p className="info-name">Name</p>
                          <p className="info-details">{pembeliData.nama}</p>
                        </li>
                        <li>
                          <p className="info-name">Username</p>
                          <p className="info-details">{pembeliData.username}</p>
                        </li>
                        <li>
                          <p className="info-name">No Telepon</p>
                          <p className="info-details">
                            {pembeliData.no_telepon}
                          </p>
                        </li>
                        <li>
                          <p className="info-name">Alamat</p>
                          <p className="info-details">
                            {pembeliData.alamat
                              ? pembeliData.alamat
                              : "Belum Menambahkan Alamat"}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
