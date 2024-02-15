import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

export default function ButtonPesananProduk({ transaction }) {
  if (!transaction || !transaction.status || !transaction.id) {
    return null;
  }

  const { id, status } = transaction;

  const handleUpdateStatus = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `http://localhost:8000/api/v1/transaksi/${id}/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Status pesanan berhasil diperbarui",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.log({ error });

      Swal.fire({
        title: "success",
        text: "Transaksi Sudah Selesai Terima Kasih :)",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  const renderButton = () => {
    if (status === "Pending") {
      return (
        <button
          className="btn btn-warning mt-2 w-100"
          onClick={handleUpdateStatus}
        >
          Konfirmasi Pesanan
        </button>
      );
    } else if (status === "Dikonfirmasi") {
      return (
        <button
          className="btn btn-info mt-2 w-100"
          onClick={handleUpdateStatus}
        >
          Proses Pesanan
        </button>
      );
    } else if (status === "Diproses") {
      return (
        <button
          className="btn btn-primary mt-2 w-100"
          onClick={handleUpdateStatus}
        >
          Kirim Pesanan
        </button>
      );
    }
    return null;
  };

  return <>{renderButton()}</>;
}
