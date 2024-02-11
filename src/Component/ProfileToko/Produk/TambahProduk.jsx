import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TambahProduk = () => {
  const [form, setForm] = useState({
    itemName: "",
    itemDescription: "",
    category: 1,
    itemPrice: "",
    file: null,
  });

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/kategori-produk"
        );

        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProductCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      const selectedCategoryId = categories.find(
        (category) => category.id === parseInt(e.target.value)
      ).id;

      setForm({ ...form, [e.target.name]: selectedCategoryId });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !form.file ||
        !form.itemName ||
        !form.itemPrice ||
        !form.itemJumlah ||
        !form.itemDescription
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields and select an image file.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("id_kategori", form.category);
      formData.append("nama", form.itemName);
      formData.append("jumlah", form.itemJumlah);
      formData.append("harga", form.itemPrice);
      formData.append("gambar", form.file);
      formData.append("deskripsi", form.itemDescription);

      const response = await axios.post(
        "http://localhost:8000/api/v1/produk",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.meta && response.data.meta.status === "error") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.data.message || "Something went wrong.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product created successfully",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/profile-toko";
          }
        });
      }
    } catch (error) {
      console.error("Error creating product:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="pills-personal"
        role="tabpanel"
        aria-labelledby="pills-personal-tab"
      >
        <div className="row">
          <div className="col">
            <div className="create-nft py-5 px-4">
              <form className="create-nft-form">
                <div className="upload-item mb-30">
                  <p>PNG,JPG,JPEG,SVG,WEBP,Mp3 & Mp4 (Max-150mb)</p>
                  <div className="custom-upload">
                    <div className="file-btn">
                      <i className="icofont-upload-alt"></i>
                      Upload a file
                    </div>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ marginTop: "10px", maxWidth: "100%" }}
                    />
                  )}
                </div>

                <div className="form-floating item-name-field mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="itemNameInput"
                    placeholder="Item Name"
                    name="itemName"
                    value={form.itemName}
                    onChange={handleChange}
                  />
                  <label for="itemNameInput">Nama Produk</label>
                </div>

                <div className="form-floating item-desc-field mb-30">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Jumlah"
                    id="itemJumlah"
                    name="itemJumlah"
                    value={form.itemJumlah}
                    onChange={handleChange}
                  />
                  <label for="itemJumlah">Jumlah</label>
                </div>

                <div className="item-price-field mb-3">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="selectCrypto"
                          aria-label="Floating label select"
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.nama}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="selectCrypto">Select Kategori</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="itemPriceInput"
                          placeholder="Item Price"
                          name="itemPrice"
                          value={form.itemPrice}
                          onChange={handleChange}
                        />
                        <label for="itemPriceInput">Harga</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-floating item-desc-field mb-30">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Item Description"
                    id="itemDesc"
                    name="itemDescription"
                    value={form.itemDescription}
                    onChange={handleChange}
                  />
                  <label htmlFor="itemDesc">Deskripsi Produk</label>
                </div>

                <div className="submit-btn-field text-center">
                  <button type="submit" onClick={handleSubmit}>
                    Create Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TambahProduk;
