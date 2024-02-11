import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormEditProduk() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({
    nama: "",
    jumlah: "",
    id_kategori: "",
    harga: "",
    deskripsi: "",
  });
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const productResponse = await axios.get(
          `http://localhost:8000/api/v1/produk/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(productResponse.data.data);

        // Fetch categories
        const categoriesResponse = await axios.get(
          "http://localhost:8000/api/v1/kategori-produk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(categoriesResponse.data.data);

        const selectedCategory = categories.find(
          (category) => category.id === productResponse.data.data.id_kategori
        );

        setUpdatedProduct({
          nama: productResponse.data.data.nama,
          jumlah: productResponse.data.data.jumlah,
          id_kategori: selectedCategory ? selectedCategory.id : "",
          harga: productResponse.data.data.harga,
          deskripsi: productResponse.data.data.deskripsi,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     setUpdatedProduct((prevProduct) => ({
  //       ...prevProduct,
  //       gambar: file,
  //     }));

  //
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //
  //     };
  //     reader.readAsDataURL(file);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/v1/produk/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success",
        text: "Product Success Updated",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile-toko";
        }
      });
    } catch (error) {
      Swal.fire({
        title: "error",
        text: error,
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "6rem" }}>
        <h3 className="text-center mb-5">Update Your Product</h3>
        <div className="col">
          <div className="create-nft py-5 px-4">
            <form className="create-nft-form" onSubmit={handleSubmit}>
              {/* <div className="upload-item mb-30">
                <p>PNG, JPG, JPEG, SVG, WEBP, Mp3 & Mp4 (Max-150mb)</p>
                <div className="custom-upload">
                  <div className="file-btn">
                    <i className="icofont-upload-alt"></i>
                    Upload a file
                  </div>
                  <input type="file" onChange={handleImageChange} />
                </div>

                {updatedProduct.gambar && (
                  <img
                    src={URL.createObjectURL(updatedProduct.gambar)}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                )}
              </div> */}

              <div className="form-floating item-name-field mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="itemNameInput"
                  placeholder="Item Name"
                  name="nama"
                  value={updatedProduct.nama}
                  onChange={handleInputChange}
                />
                <label htmlFor="itemNameInput">Masukan Nama Produk</label>
              </div>

              <div className="form-floating item-desc-field mb-30">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quantity"
                  id="itemJumlah"
                  name="jumlah"
                  value={updatedProduct.jumlah}
                  onChange={handleInputChange}
                />
                <label htmlFor="itemJumlah">Masukan Jumlah Produk</label>
              </div>

              <div className="item-price-field mb-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="selectCategory"
                        aria-label="Floating label select"
                        name="id_kategori"
                        value={updatedProduct.id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.nama}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="selectCategory">Select Category</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="itemPriceInput"
                        placeholder="Item Price"
                        name="harga"
                        value={updatedProduct.harga}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="itemPriceInput">
                        Masukan Harga Produk
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-floating item-desc-field mb-30">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Product Description"
                  id="itemDesc"
                  name="deskripsi"
                  value={updatedProduct.deskripsi}
                  onChange={handleInputChange}
                />
                <label htmlFor="itemDesc">Masukan Deskripsi Produk</label>
              </div>

              <div className="submit-btn-field text-center">
                <button type="submit">Update Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
