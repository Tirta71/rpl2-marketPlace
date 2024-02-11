import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ChildEditToko() {
  const [newShopName, setNewShopName] = useState("");
  const [newShopAddress, setNewShopAddress] = useState("");

  const saveChanges = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const userId = sessionStorage.getItem("id");

      if (!accessToken || !userId) {
        console.error("Access token or user ID is missing");
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/v1/penjual`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const matchedPenjual = response.data.data.find(
        (penjual) => penjual.user.id.toString() === userId
      );

      if (matchedPenjual) {
        const penjualId = matchedPenjual.id;

        await axios.put(
          `http://localhost:8000/api/v1/penjual/${penjualId}`,
          {
            nama_toko: newShopName,
            alamat_toko: newShopAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        Swal.fire({
          title: "saved",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/profile-toko";
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Tolong Isi semua Field ",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating toko:", error);
    }
  };

  const handleUpdateToko = (e) => {
    e.preventDefault();

    if (!newShopName.trim() || !newShopAddress.trim()) {
      Swal.fire({
        title: "Error",
        text: "Semua field harus diisi",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          saveChanges();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  return (
    <div className="col">
      <div className="create-nft py-5 px-4">
        <form className="create-nft-form" onSubmit={handleUpdateToko}>
          <div className="form-floating item-name-field mb-3">
            <input
              type="text"
              className="form-control"
              id="itemNameInput"
              placeholder="Masukan Nama Toko"
              value={newShopName}
              onChange={(e) => setNewShopName(e.target.value)}
            />
            <label htmlFor="itemNameInput">Masukan Nama Toko Baru Anda</label>
          </div>

          <div className="form-floating item-desc-field mb-30">
            <textarea
              className="form-control"
              placeholder="Masukan Alamat Toko"
              id="itemDesc"
              value={newShopAddress}
              onChange={(e) => setNewShopAddress(e.target.value)}
            ></textarea>
            <label htmlFor="itemDesc">Masukan Alamat Toko Baru Anda</label>
          </div>

          <div className="submit-btn-field text-center">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
