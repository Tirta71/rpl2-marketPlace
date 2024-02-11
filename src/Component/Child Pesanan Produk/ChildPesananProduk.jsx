import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./PesananProduk.css";

export default function ChildPesananProduk() {
  const [keranjang, setKeranjang] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [alamat, setAlamat] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");

  useEffect(() => {
    const fetchKeranjang = async () => {
      try {
        const tokenFromSession = sessionStorage.getItem("accessToken");
        if (!tokenFromSession) {
          console.error("Token not found in session storage");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/keranjang",
          {
            headers: {
              Authorization: `Bearer ${tokenFromSession}`,
            },
          }
        );
        setKeranjang(response.data.data);

        const total = response.data.data.reduce(
          (accumulator, item) =>
            accumulator + item.produk.harga * item.qty_produk,
          0
        );
        setTotalHarga(total);
      } catch (error) {
        console.error("Error fetching cart:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch cart data",
          icon: "error",
        });
      }
    };

    fetchKeranjang();
  }, []);

  const handleCheckout = async () => {
    try {
      const tokenFromSession = sessionStorage.getItem("accessToken");
      if (!tokenFromSession) {
        console.error("Token not found in session storage");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/transaksi",
        {
          total_harga: totalHarga,
          alamat: alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromSession}`,
          },
        }
      );

      Swal.fire({
        title: "Success",
        text: "Produk Berhasil Di pesan",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/history-pesanan";
        }
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to checkout",
        icon: "error",
      });
    }
  };

  return (
    <section className="wallet-section padding-top padding-bottom">
      {keranjang.length === 0 ? (
        <p className="text-center">Tidak Ada Produk</p>
      ) : (
        <div className="container">
          <div className="wallet-inner">
            <div className="wallet-title">
              <h3 className="mb-3">Create Your Order</h3>
            </div>
            <div className="row g-3 justify-content-center">
              {keranjang.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="wallet-item">
                    <div className="wallet-item-inner">
                      <div className="wallet-thumb">
                        <img
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "10px",
                          }}
                          src={`http://localhost:8000/storage/produk/${item.produk.gambar}`}
                          alt={item.produk.nama}
                        />
                      </div>
                      <div className="wallet-content">
                        <h5>{item.produk.nama}</h5>
                        <p>Rp. {item.produk.harga}</p>
                        <div className="d-flex align-items-center">
                          Jumlah produk
                          <div className="jumlah_produk">
                            <button className="custom-btn">-</button>
                            <span>{item.qty_produk}</span>
                            <button className="custom-btn">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-5">
              <div className="col">
                <div className="create-nft py-5 px-4">
                  <h3 className="mb-5">Detail Checkout</h3>
                  <form className="create-nft-form">
                    <div className="form-floating item-name-field mb-3">
                      <input
                        type="text"
                        id="totalHarga"
                        className="form-control"
                        value={`Rp. ${totalHarga.toLocaleString()}`}
                        readOnly
                      />
                      <label htmlFor="itemNameInput">Total Harga</label>
                    </div>

                    <div className="form-floating item-desc-field mb-3">
                      <input
                        type="text"
                        id="alamat"
                        className="form-control"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                      />
                      <label htmlFor="itemDesc">Masukan Alamat</label>
                    </div>

                    <div className="form-floating">
                      <select
                        className="form-select"
                        aria-label="Floating label select"
                        id="metodePembayaran"
                        value={metodePembayaran}
                        onChange={(e) => setMetodePembayaran(e.target.value)}
                      >
                        <option value="COD">COD</option>
                      </select>
                      <label htmlFor="selectCrypto">
                        Pilih Metode Pembayaran
                      </label>
                    </div>

                    <div className="submit-btn-field text-center mt-5">
                      <button type="button" onClick={handleCheckout}>
                        Checkout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
