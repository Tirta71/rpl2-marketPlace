import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function ContentExplore() {
  const [kategoriList, setKategoriList] = useState([]);
  const [produkList, setProdukList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [visibleProdukCount, setVisibleProdukCount] = useState(4);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/kategori-produk"
        );
        setKategoriList(response.data.data);
      } catch (error) {
        console.error("Error fetching kategori", error);
      }
    };

    const fetchProduk = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/produk");
        setProdukList(response.data.data);
      } catch (error) {
        console.error("Error fetching produk", error);
      }
    };

    fetchKategori();
    fetchProduk();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(
      categoryId !== "All Category" ? parseInt(categoryId) : null
    );

    setVisibleProdukCount(4);
  };

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    setVisibleProdukCount(4);
  };

  const filteredProdukList = selectedCategoryId
    ? produkList.filter((produk) => produk.id_kategori === selectedCategoryId)
    : produkList;

  const filteredAndSearchedProdukList = searchInput
    ? filteredProdukList.filter((produk) =>
        produk.nama.toLowerCase().includes(searchInput.toLowerCase())
      )
    : filteredProdukList;

  const loadMoreProduk = () => {
    setVisibleProdukCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <section className="explore-section padding-top padding-bottom">
        <div className="container">
          <div className="section-header">
            <div className="nft-filter d-flex flex-wrap justify-content-center">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="catSelect"
                  aria-label="Floating label select example"
                  onChange={handleCategoryChange}
                >
                  <option selected>All Category</option>
                  {kategoriList.map((kategori) => (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.nama}
                    </option>
                  ))}
                </select>
                <label htmlFor="catSelect">Select a Category</label>
              </div>
            </div>
            <div className="nft-search">
              <div className="form-floating nft-search-input">
                <input
                  type="text"
                  className="form-control"
                  id="nftSearch"
                  placeholder="Search Produk"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <label htmlFor="nftSearch">Search Produk</label>
                <button type="button">
                  {" "}
                  <i className="icofont-search-1"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="section-wrapper">
            <div className="explore-wrapper">
              {filteredAndSearchedProdukList.length > 0 ? (
                <div className="row justify-content-center gx-4 gy-3">
                  {filteredAndSearchedProdukList
                    .slice(0, visibleProdukCount)
                    .map((produk) => (
                      <div
                        key={produk.id}
                        className="col-xl-3 col-lg-4 col-sm-6"
                      >
                        <div className="nft-item">
                          <div className="nft-inner">
                            <div className="nft-item-bottom">
                              <div className="nft-thumb">
                                <img
                                  style={{
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                  loading="lazy"
                                  src={`http://localhost:8000/storage/produk/${produk.gambar}`}
                                  alt="nft-img"
                                />
                              </div>
                              <div className="nft-content">
                                <h4>
                                  <Link to={`/detail-produk/${produk.id}`}>
                                    {produk.nama}
                                  </Link>
                                </h4>
                                <div className="price-like d-flex justify-content-between align-items-center">
                                  <p className="nft-price">
                                    Harga{"  "}
                                    <span className="yellow-color">
                                      Rp. {produk.harga}
                                    </span>
                                  </p>
                                  <a href="#" className="nft-like">
                                    <FontAwesomeIcon icon={faShoppingCart} />{" "}
                                    {produk.jumlah}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center">
                  {searchInput
                    ? "Produk tidak ditemukan."
                    : "Tidak ada produk yang tersedia."}
                </p>
              )}
              {visibleProdukCount < filteredAndSearchedProdukList.length && (
                <div className="load-btn mt-5">
                  <button
                    onClick={loadMoreProduk}
                    className="default-btn move-bottom"
                  >
                    <span>Load More</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
