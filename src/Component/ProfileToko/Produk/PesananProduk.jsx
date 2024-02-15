import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonPesananProduk from "./ButtonPesananProduk";

export default function PesananPenjual() {
  const [transactions, setTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get("http://localhost:8000/api/v1/transaksi-penjual", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data.data);
        setFilteredTransactions(
          response.data.data.filter((transaction) =>
            [
              "Pending",
              "Dikonfirmasi",
              "Diproses",
              "Dikirim",
              "Diterima",
              "Dibayar",
            ].includes(transaction.status)
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.status === status
    );
    setFilteredTransactions(filteredTransactions);
  };

  return (
    <div
      className="tab-pane fade "
      id="pills-pesanan"
      role="tabpanel"
      aria-labelledby="pills-pesanan-tab"
    >
      <section
        className="activity-section padding-top padding-bottom"
        style={{ marginTop: "-5rem" }}
      >
        <div className="container">
          <div className="section-wrapper">
            <div className="row">
              <div className="col">
                <div className="section-header">
                  <h3>Pesanan Produk</h3>
                  <div className="nft-filter d-flex flex-wrap justify-content-center gap-15">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="sortSelect"
                        aria-label="Floating label select example"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dikonfirmasi">Dikonfirmasi</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Dibayar">Dibayar</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                      <label htmlFor="sortSelect">Sort By</label>
                    </div>
                  </div>
                </div>
                <div className="activity-wrapper">
                  <div className="row gy-3">
                    {filteredTransactions.map((transaction) => (
                      <div className="col-12" key={transaction.id}>
                        <div className="activity-item">
                          <div className="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                            <div className="lab-thumb me-3 me-md-4">
                              <img
                                src={`http://localhost:8000/storage/produk/${transaction.pesanan_produk[0].produk.gambar}`}
                                alt="img"
                                style={{
                                  width: "160px",
                                  height: "160px",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                            <div className="lab-content">
                              <h4>
                                <a
                                  href={`/detail-transaksi/penjual/${transaction.id}`}
                                >
                                  #{transaction.invoice_number}
                                </a>
                              </h4>
                              <p className="mb-2">
                                {transaction.pesanan_produk[0].produk.nama}
                                <b>
                                  {" "}
                                  Rp.{" "}
                                  {transaction.pesanan_produk[0].produk.harga}
                                </b>
                              </p>
                              <p className="user-id">
                                Alamat User{" "}
                                <a href="author.html">{transaction.alamat}</a>
                              </p>
                              <p>At: {transaction.tanggal_pesanan}</p>
                              <p>
                                Jumlah Dipesan:{" "}
                                {transaction.pesanan_produk[0].jumlah_produk}
                              </p>
                              <div
                                className="status"
                                style={{ float: "inline-end" }}
                              >
                                {transaction.status}
                              </div>
                            </div>
                            {transaction.status !== "selesai" && (
                              <ButtonPesananProduk transaction={transaction} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
