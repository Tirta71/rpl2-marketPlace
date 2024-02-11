import React from "react";

export default function HandleAlert({ transaction }) {
  return (
    <>
      <div className="w-100">
        {transaction.status === "Pending" && (
          <div className="alert alert-warning mt-2 w-100" role="alert">
            Tunggu penjual konfirmasi pesanan
          </div>
        )}
        {transaction.status === "Dikonfirmasi" && (
          <div className="alert alert-info mt-2 w-100 " role="alert">
            Penjual sedang memproses pesanan
          </div>
        )}
        {transaction.status === "Diproses" && (
          <div className="alert alert-info mt-2 w-100 " role="alert">
            Tunggu Penjual Mengirim Produk
          </div>
        )}
        {transaction.status === "Dikirim" && (
          <div className="alert alert-danger mt-2 w-100 " role="alert">
            Mohon Konfirmasi Pesanan
          </div>
        )}
        {transaction.status === "Diterima" && (
          <div className="alert alert-danger mt-2 w-100 " role="alert">
            Mohon Selesaikan Pembayaran
          </div>
        )}
        {transaction.status === "Dibayar" && (
          <div className="alert alert-danger mt-2 w-100 " role="alert">
            Mohon Selesaikan Pesanan
          </div>
        )}
      </div>
    </>
  );
}
