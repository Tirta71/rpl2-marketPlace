/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function TampilProfilProduk() {
  const [produkList, setProdukList] = useState([]);
  const [visibleProdukCount, setVisibleProdukCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [noProduk, setNoProduk] = useState(false);

  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchPenjualId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/penjual",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const penjual = response.data.data.find(
          (penjual) => penjual.user.id.toString() === userId
        );

        if (penjual) {
          const penjualId = penjual.id;

          const produkResponse = await axios.get(
            `http://localhost:8000/api/v1/penjual/${penjualId}/produk`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (
            produkResponse.data &&
            Array.isArray(produkResponse.data.data) &&
            produkResponse.data.data.length > 0
          ) {
            setProdukList(produkResponse.data.data);
          } else {
            setNoProduk(true);
          }
        } else {
          console.error("Penjual not found for the current user");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPenjualId();
  }, [accessToken, userId]);

  const handleLoadMore = () => {
    setVisibleProdukCount(produkList.length);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          className="tab-pane fade mentions-section show active"
          id="pills-mentions"
          role="tabpanel"
          aria-labelledby="pills-mentions-tab"
        >
          {noProduk ? (
            <p>Belum ada produk.</p>
          ) : (
            <>
              <div className="row justify-content-center gx-3 gy-2">
                {produkList.slice(0, visibleProdukCount).map((produk) => (
                  <div key={produk.id} className="col-lg-4 col-sm-6">
                    <div className="nft-item">
                      <div className="nft-inner">
                        <div className="nft-item-bottom">
                          <div className="nft-thumb">
                            <img
                              style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                              src={`http://localhost:8000/storage/produk/${produk.gambar}`}
                              alt="nft-img"
                              onClick={() => {
                                window.location.href = `/detail-produk/${produk.id}`;
                              }}
                            />
                          </div>
                          <div className="nft-content">
                            <h4>
                              <a href={`/detail-produk/${produk.id}`}>
                                {produk.nama}
                              </a>{" "}
                            </h4>
                            <div className="price-like d-flex justify-content-between align-items-center">
                              <p className="nft-price">
                                Harga:{" "}
                                <span className="yellow-color">
                                  Rp. {produk.harga}
                                </span>
                              </p>
                              <Link
                                to={`/edit-produk/${produk.id}`}
                                className="nft-like"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {visibleProdukCount < produkList.length && (
                <div className="load-btn">
                  <button
                    onClick={handleLoadMore}
                    className="default-btn move-bottom"
                  >
                    <span>Load More</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
