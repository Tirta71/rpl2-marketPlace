/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ContentProductRecent() {
  const [produkList, setProdukList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const response = await axios.get("http://localhost:8000/api/v1/produk");
        setProdukList(response.data.data);
      } catch (error) {
        setError("Error fetching products");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {produkList.length > 0 ? (
        produkList.map((produk) => (
          <div key={produk.id} className="col-xl-3 col-lg-4 col-sm-6">
            <div className="nft-item home-4 style-2">
              <div className="nft-inner">
                <div className="nft-thumb">
                  <img
                    style={{ height: "200px", objectFit: "cover" }}
                    src={`http://localhost:8000/storage/produk/${produk.gambar}`}
                    alt="PRODUCT-IMAGE"
                  />
                </div>
                <div className="nft-content mt-5">
                  <div className="author-details d-flex flex-wrap align-items-center gap-15">
                    <div className="author-number">
                      <h3 className="fs-36">
                        {produk.jumlah <= 9
                          ? `0${produk.jumlah}`
                          : produk.jumlah}
                      </h3>
                    </div>
                    <div className="author-det-info">
                      <h5>
                        <Link to={`/detail-produk/${produk.id}`}>
                          {produk.nama}
                        </Link>
                      </h5>
                      <p className="nft-price yellow-color">
                        Rp. {produk.harga}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>Belum ada produk</p>
        </div>
      )}
    </>
  );
}
