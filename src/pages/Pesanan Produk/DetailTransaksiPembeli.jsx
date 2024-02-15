import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../Component/Util/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DetailTransaksiPembeli() {
  const { id_transaksiPembeli } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:8000/api/v1/transaksi/${id_transaksiPembeli}`,
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
  }, [id_transaksiPembeli]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCreatePDF = () => {
    const doc = new jsPDF();

    // Set header
    doc.text(`Detail Transaksi #${transaction.invoice_number}`, 14, 15);

    // Set columns
    const columns = ["Field", "Value"];
    const rows = [];

    rows.push(["Invoice Number", transaction.invoice_number]);
    rows.push(["Total Harga", transaction.total_harga]);
    rows.push(["Tanggal Pesanan", transaction.tanggal_pesanan]);
    rows.push(["Alamat", transaction.alamat]);
    rows.push(["Status", transaction.status]);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    const pesananRows = transaction.pesanan_produk.map((pesanan) => [
      pesanan.produk.nama,
      pesanan.jumlah_produk,
      pesanan.produk.harga,
    ]);

    doc.setFont("helvetica");
    doc.setFontSize(10);

    doc.autoTable({
      head: [["Nama Produk", "Jumlah", "Harga"]],
      body: pesananRows,
      startY: doc.lastAutoTable.finalY + 10,
    });

    doc.save("transaksi.pdf");
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "10rem" }}>
        <h2>Detail Transaksi #{transaction.invoice_number}</h2>
        <table className="table text-white mt-2">
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

        <h3 className="mt-5">Detail Pesanan</h3>
        <table className="table text-white mt-2">
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
                <td>Rp. {pesanan.produk.harga}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-primary" onClick={handleBack}>
          Back
        </button>
        <button
          className="btn btn-primary mx-2 float-end"
          onClick={handleCreatePDF}
        >
          Cetak Invoice
        </button>
      </div>
    </>
  );
}
