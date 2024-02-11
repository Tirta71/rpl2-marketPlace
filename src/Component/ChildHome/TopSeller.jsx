import React from "react";
import ChildProductRecent from "../Child Product Recent/ChildProductRecent";

export default function TopSeller() {
  return (
    <>
      <section className="topseller-section padding-bottom">
        <div className="container">
          <div className="section-header style-4">
            <div className="header-shape">
              <span></span>
            </div>
            <h3>Product Recent</h3>
          </div>
          <ChildProductRecent />
        </div>
      </section>
    </>
  );
}
