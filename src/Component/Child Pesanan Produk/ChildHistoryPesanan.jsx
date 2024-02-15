import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonUpdateStatus from "./ButtonUpdateStatus";
import HandleAlert from "./HandleAlert";
import { Link } from "react-router-dom";

export default function ChildHistoryPesanan({ sortBy }) {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const tokenFromSession = sessionStorage.getItem("accessToken");
        if (!tokenFromSession) {
          console.error("Token not found in session storage");
          return;
        }
        setToken(tokenFromSession);

        const response = await axios.get(
          "http://localhost:8000/api/v1/transaksi",
          {
            headers: {
              Authorization: `Bearer ${tokenFromSession}`,
            },
          }
        );

        const filteredTransactions = response.data.data.filter(
          (transaction) => {
            switch (sortBy) {
              case "Pending":
                return transaction.status === "Pending";
              case "Dikonfirmasi":
                return transaction.status === "Dikonfirmasi";
              case "Diproses":
                return transaction.status === "Diproses";
              case "Dikirim":
                return transaction.status === "Dikirim";
              case "Selesai":
                return transaction.status === "Selesai";
              default:
                return true;
            }
          }
        );

        const sortedTransactions = filteredTransactions.sort((a, b) => {
          if (a.status === "Selesai") return 1;
          if (b.status === "Selesai") return -1;
          return 0;
        });
        setTransactions(sortedTransactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [sortBy]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : transactions.length > 0 ? (
        <div className="activity-wrapper">
          <div className="row gy-3">
            {transactions.map((transaction, index) => (
              <div key={index} className="col-12">
                <div className="activity-item">
                  <div className="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                    <HandleAlert transaction={transaction} />
                    <div className="lab-content">
                      <Link to={`/detail-transaksi/pembeli/${transaction.id}`}>
                        <h4>#{transaction.invoice_number}</h4>
                      </Link>

                      <p className="mb-2">
                        Total Harga <b>Rp.{transaction.total_harga}</b>
                      </p>
                      <p>At: {transaction.tanggal_pesanan}</p>
                    </div>
                    <div className="status">{transaction.status}</div>
                    {transaction.status !== "Selesai" && (
                      <ButtonUpdateStatus transaction={transaction} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">Tidak ada history transaksi</div>
      )}
    </>
  );
}
