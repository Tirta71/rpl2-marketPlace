import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ButtonUpdateStatus({ transaction }) {
  if (!transaction || !transaction.status || !transaction.id) {
    return null;
  }

  const { id, status } = transaction;

  const handleUpdateStatus = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `http://localhost:8000/api/v1/transaksi/${id}/update-status`,
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
    if (status === "Dikirim") {
      return (
        <button
          className="btn btn-primary mt-2 w-100"
          onClick={handleUpdateStatus}
        >
          Pesanan Diterima
        </button>
      );
    } else if (status === "Diterima") {
      return (
        <button
          className="btn btn-primary mt-2 w-100"
          onClick={handleUpdateStatus}
        >
          Sudah Dibayar
        </button>
      );
    } else if (status === "Dibayar") {
      return (
        <button
          className="btn btn-primary mt-2 w-100"
          onClick={handleUpdateStatus}
        >
          Selesaikan Pesanan
        </button>
      );
    }
    return null;
  };

  return <>{renderButton()}</>;
}
