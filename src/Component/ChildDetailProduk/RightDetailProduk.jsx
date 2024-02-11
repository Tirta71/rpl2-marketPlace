import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RightDetailProduk() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");

        const productResponse = await axios.get(
          `http://localhost:8000/api/v1/produk/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProduct(productResponse.data.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <>
      <div className="col-lg-6">
        {product ? (
          <div className="item-desc-part">
            <div className="item-desc-inner">
              <div className="item-desc-thumb">
                <img
                  src={`http://localhost:8000/storage/produk/${product.gambar}`}
                  alt="item-img"
                />
              </div>
              <div className="item-desc-content">
                <h3>Deskripsi Produk</h3>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="details-tab tab-pane fade show active"
                    id="nav-details"
                    role="tabpanel"
                    aria-labelledby="nav-details-tab"
                  >
                    <p>{product.deskripsi}</p>

                    <ul className="other-info-list">
                      <li className="item-other-info">
                        <div className="item-info-title">
                          <h6>Jumlah Produk</h6>
                        </div>
                        <div className="item-info-details">
                          <p>{product.jumlah}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
