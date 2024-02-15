import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonPesananProduk from "./ButtonPesananProduk";

export default function PesananPenjual() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token);

    axios
      .get("http://localhost:8000/api/v1/transaksi-penjual", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

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
                      >
                        <option selected>Newest</option>
                        <option value="1">Trending</option>
                        <option value="2">Most Viewed</option>
                        <option value="3">Less Viewed</option>
                        <option value="3">Ending Soon</option>
                        <option value="3">Recently Sold </option>
                        <option value="3">Recently Created </option>
                        <option value="3">Recently Viewed </option>
                        <option value="3">Ending Soon</option>
                      </select>
                      <label for="sortSelect">Sort By</label>
                    </div>
                  </div>
                </div>
                <div className="activity-wrapper">
                  <div className="row gy-3">
                    {transactions.map((transaction) => (
                      <div className="col-12" key={transaction.id}>
                        <div className="activity-item">
                          <div className="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                            {transaction.status === "Dikirim" && (
                              <div
                                className="alert alert-info mt-2 w-100 "
                                role="alert"
                              >
                                Mohon Tunggu User Konfirmasi Produk
                              </div>
                            )}
                            {transaction.status === "Diterima" && (
                              <div
                                className="alert alert-info mt-2 w-100 "
                                role="alert"
                              >
                                Produk Sudah Diterima User
                              </div>
                            )}
                            {transaction.status === "Dibayar" && (
                              <div
                                className="alert alert-info mt-2 w-100 "
                                role="alert"
                              >
                                Pastikan Sudah Menerima Pembayaran
                              </div>
                            )}

                            <div className="lab-thumb me-3 me-md-4">
                              <img
                                src={`http://localhost:8000/storage/produk/${transaction.pesanan_produk[0].produk.gambar}`}
                                alt="img"
                                style={{ width: "160px", height: "160px" }}
                              />
                            </div>

                            <div className="lab-content">
                              <h4>
                                <a href={`${transaction.id}`}>
                                  #{transaction.invoice_number}
                                </a>
                              </h4>
                              <p className="mb-2">
                                {transaction.pesanan_produk[0].produk.nama}
                                <b>
                                  {"  "}
                                  Rp.
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
