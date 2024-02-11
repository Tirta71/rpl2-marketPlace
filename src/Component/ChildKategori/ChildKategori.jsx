import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChildKategori() {
  const [kategoriList, setKategoriList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category data
        const kategoriResponse = await axios.get(
          "http://localhost:8000/api/v1/kategori-produk"
        );

        const fetchedKategoriList = kategoriResponse.data.data;

        setKategoriList(fetchedKategoriList);
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="section-wrapper">
      <div className="category-wrapper">
        <div className="row justify-content-center g-4">
          {kategoriList.length > 0 ? (
            kategoriList.map((kategori) => (
              <div key={kategori.id} className="col-lg-4 col-sm-6">
                <div className="nft-item home-4 cat-item">
                  <div className="nft-inner">
                    <div className="nft-cat-thumb"></div>
                    <div className="nft-content">
                      <div className="author-details">
                        <h4>
                          <a href="/explore">{kategori.nama}</a>{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Belum ada produk</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
