import React, { useState } from "react";
import Header from "../../Component/Util/Header";
import ChildHistoryPesanan from "../../Component/Child Pesanan Produk/ChildHistoryPesanan";

export default function HistoryTransaksi() {
  const [sortBy, setSortBy] = useState("All");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Header />
      <section className="activity-section padding-top padding-bottom">
        <div className="container">
          <div className="section-wrapper">
            <div className="row">
              <div className="col">
                <div className="section-header">
                  <h3>History Transaksi</h3>
                  <div className="nft-filter d-flex flex-wrap justify-content-center gap-15">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="sortSelect"
                        value={sortBy}
                        onChange={handleSortChange}
                        aria-label="Floating label select example"
                      >
                        <option value="All">All Transaction</option>
                        <option value="Pending">Pending</option>
                        <option value="Dikonfirmasi">Dikonfirmasi</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                      <label htmlFor="sortSelect">Sort By</label>
                    </div>
                  </div>
                </div>
                <ChildHistoryPesanan sortBy={sortBy} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
