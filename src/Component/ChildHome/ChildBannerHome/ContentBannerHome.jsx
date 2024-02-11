import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContentBannerHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/produk/"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="swiper-wrapper">
      {products.slice(0, 3).map((product) => (
        <div key={product.id} className="swiper-slide">
          <div className="nft-item home-4">
            <div className="nft-inner">
              <div className="nft-item-bottom">
                <div className="nft-thumb">
                  <img
                    loading="lazy"
                    style={{
                      width: "500px",
                      height: "400px",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:8000/storage/produk/${product.gambar}`}
                    alt={`nft-img-${product.id}`}
                  />
                </div>
                <div className="nft-content">
                  <h4>
                    <a href={`/explore`}>{product.nama}</a>
                  </h4>
                  <div className="price-like d-flex justify-content-between align-items-center">
                    <p className="nft-price">
                      Price:{" "}
                      <span className="yellow-color"> Rp.{product.harga} </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
