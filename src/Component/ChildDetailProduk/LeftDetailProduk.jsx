import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ButtonKeranjang from "./Keranjang/ButtonKeranjang";

export default function LeftDetailProduk() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:8000/api/v1/produk/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <>
      <div className="col-lg-6">
        {product ? (
          <div className="item-buy-part">
            <div className="nft-item-title">
              <h3>{product.nama}</h3>
            </div>

            <div className="item-price">
              <h4>Harga</h4>
              <p>
                <span>
                  <i className="icofont-coins"></i>Rp. {product.harga}
                </span>
              </p>
            </div>
            <ButtonKeranjang product={product} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
