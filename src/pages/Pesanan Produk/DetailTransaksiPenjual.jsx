import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Component/Util/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DetailTransaksiPenjual() {
  const [transaction, setTransaction] = useState(null);
  const { id_transaksi } = useParams();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:8000/api/v1/transaksi/${id_transaksi}/penjual`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransaction(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id_transaksi]);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text(`Transaksi #${transaction.invoice_number}`, 10, 10);

    const transaksiData = [
      ["Invoice Number", transaction.invoice_number],
      ["Total Harga", transaction.total_harga],
      ["Tanggal Pesanan", transaction.tanggal_pesanan],
      ["Alamat", transaction.alamat],
      ["Status", transaction.status],
    ];
    doc.autoTable({
      startY: 20,
      head: [["Data", "Nilai"]],
      body: transaksiData,
    });

    const pesananData = transaction.pesanan_produk.map((pesanan) => [
      pesanan.produk.nama,
      pesanan.jumlah_produk,
      pesanan.produk.harga,
    ]);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["Nama Produk", "Jumlah", "Harga"]],
      body: pesananData,
    });

    doc.save(`transaksi${transaction.invoice_number}.pdf`);
  };
  if (!transaction) {
    return <div>Loading...</div>;
  }
  const handleBack = () => {
    window.history.back();
  };
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "5rem" }}>
        <h2>Detail Transaksi #{transaction.invoice_number}</h2>
        <table className="table table-bordered mt-3 text-white">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Total Harga</th>
              <th>Tanggal Pesanan</th>
              <th>Alamat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{transaction.invoice_number}</td>
              <td>{transaction.total_harga}</td>
              <td>{transaction.tanggal_pesanan}</td>
              <td>{transaction.alamat}</td>
              <td>{transaction.status}</td>
            </tr>
          </tbody>
        </table>

        <h3>Detail Pesanan</h3>
        <table className="table table-bordered text-white">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Jumlah</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {transaction.pesanan_produk.map((pesanan) => (
              <tr key={pesanan.id}>
                <td>{pesanan.produk.nama}</td>
                <td>{pesanan.jumlah_produk}</td>
                <td>RP. {pesanan.produk.harga}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="btn-detailTransaksi">
          <button className="btn btn-info" onClick={handleBack}>
            Back
          </button>
          <button onClick={handlePrint} className="btn btn-info float-end">
            Cetak ke PDF
          </button>
        </div>
      </div>
    </>
  );
}
