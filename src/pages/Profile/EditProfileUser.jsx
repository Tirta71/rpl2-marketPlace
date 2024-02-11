import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../Component/Util/Header";

export default function EditProfileUser() {
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    email: "",
    no_telepon: "",
    alamat: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token is missing");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/pembeli",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userData = response.data.data;

        // Populate the form fields with user data
        setFormData({
          nama: userData.nama,
          username: userData.username,
          email: userData.email,
          no_telepon: userData.no_telepon,
          alamat: userData.alamat,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      const response = await axios.get("http://localhost:8000/api/v1/pembeli", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = response.data.data;

      const updatedData = { ...userData, ...formData };

      await axios.put("http://localhost:8000/api/v1/pembeli", updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Swal.fire({
        title: "Success",
        text: "Berhasil Update Data",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile-toko";
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat mengupdate profil",
        icon: "error",
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row" style={{ marginTop: "8rem" }}>
          <h3 className="text-center mb-5">Update Your Profile</h3>
          <div className="col">
            <div className="create-nft py-5 px-4">
              <form className="create-nft-form" onSubmit={handleUpdateProfile}>
                <div className="form-floating item-name-field mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    placeholder="Nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="nama">Masukan Nama</label>
                </div>

                <div className="form-floating item-desc-field mb-30">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="username">Masukan Username</label>
                </div>

                <div className="form-floating item-desc-field mb-30">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email">Masukan Email</label>
                </div>

                <div className="form-floating item-desc-field mb-30">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="No Telepon"
                    id="no_telepon"
                    name="no_telepon"
                    value={formData.no_telepon}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="no_telepon">Masukan No Telepon</label>
                </div>

                <div className="form-floating item-desc-field mb-30">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Alamat"
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="alamat">Masukan Alamat</label>
                </div>

                <div className="submit-btn-field text-center">
                  <button type="submit">Update Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
