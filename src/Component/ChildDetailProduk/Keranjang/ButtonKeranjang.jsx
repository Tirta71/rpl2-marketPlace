import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ButtonKeranjang({ product }) {
  const [qty, setQty] = useState("");

  const handleTambahKeranjang = async () => {
    try {
      const tokenFromSession = sessionStorage.getItem("accessToken");
      if (!tokenFromSession) {
        console.error("Token not found in session storage");
        return;
      }

      if (!qty || qty < 1) {
        Swal.fire({
          title: "Error",
          text: "Jumlah produk harus diisi dan minimal 1",
          icon: "error",
        });
        return;
      }

      if (qty > product.jumlah) {
        Swal.fire({
          title: "Error",
          text: "Jumlah produk melebihi stok yang tersedia",
          icon: "error",
        });
        return;
      }

      const data = {
        id_produk: product.id,
        qty_produk: qty,
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/keranjang",
        data,
        {
          headers: {
            Authorization: `Bearer ${tokenFromSession}`,
          },
        }
      );

      setQty("");

      console.log(response.data);
      Swal.fire({
        title: "Success",
        text: "Produk berhasil ditambahkan ke keranjang.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Swal.fire({
        title: "Error",
        text: `Produk gagal ditambahkan ke keranjang: ${error}`,
        icon: "error",
      });
    }
  };

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value));
  };

  return (
    <div className="buying-btns d-flex flex-wrap">
      <input
        type="number"
        value={qty}
        onChange={handleQtyChange}
        min={1}
        className="text-center rounded"
        placeholder="Jumlah Produk"
      />
      <button
        className="default-btn move-right"
        onClick={handleTambahKeranjang}
      >
        Tambahkan ke Keranjang
      </button>
    </div>
  );
}
