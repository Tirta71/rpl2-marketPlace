import React from "react";
import ChildKategori from "../ChildKategori/ChildKategori";

export default function KategoriHome() {
  return (
    <>
      <section className="category-section padding-top padding-bottom">
        <div className="container">
          <div className="section-header style-4">
            <div className="header-shape">
              <span></span>
            </div>
            <h3>Browse By Catergory</h3>
          </div>
          <ChildKategori />
        </div>
      </section>
    </>
  );
}
