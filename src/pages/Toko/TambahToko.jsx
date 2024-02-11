import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../Component/Util/Header";

export default function TambahToko() {
  const [namaToko, setNamaToko] = useState("");
  const [alamatToko, setAlamatToko] = useState("");
  const idUser = sessionStorage.getItem("id");

  const handleCreateToko = async (e) => {
    e.preventDefault();

    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:8000/api/v1/penjual-register",
        {
          id_user: idUser,
          nama_toko: namaToko,
          alamat_toko: alamatToko,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      sessionStorage.setItem("role", "Penjual");

      Swal.fire({
        icon: "success",
        title: "Toko Berhasil Dibuat",
        text: `Selamat! Toko ${response.data.data.nama_toko} telah dibuat.`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile-toko";
        }
      });
    } catch (error) {
      console.error("Create Store error:", error);

      Swal.fire({
        icon: "error",
        title: "Gagal Membuat Toko",
        text: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="row" style={{ marginTop: "5rem" }}>
        <h1 className="text-center mb-5">Buat Toko</h1>
        <div className="col">
          <div className="create-nft py-5 px-4">
            <form className="create-nft-form" onSubmit={handleCreateToko}>
              <div className="form-floating item-name-field mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="itemNameInput"
                  placeholder="Masukan Nama Toko"
                  value={namaToko}
                  onChange={(e) => setNamaToko(e.target.value)}
                />
                <label htmlFor="itemNameInput">Masukan Nama Toko</label>
              </div>

              <div className="form-floating item-desc-field mb-30">
                <textarea
                  className="form-control"
                  placeholder="Masukan Alamat Toko"
                  id="itemDesc"
                  value={alamatToko}
                  onChange={(e) => setAlamatToko(e.target.value)}
                ></textarea>
                <label htmlFor="itemDesc">Masukan Alamat Toko</label>
              </div>

              <div className="submit-btn-field text-center">
                <button type="submit">Buat Toko</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
