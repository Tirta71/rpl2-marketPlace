import React from "react";
import ContentBannerHome from "./ChildBannerHome/ContentBannerHome";

export default function BannerHome() {
  return (
    <>
      {/* <!-- ===============//banner section start here \\================= --> */}
      <section
        className="banner-section home-4"
        style={{ backgroundImage: "url(assets/images/banner/bg-4.jpg)" }}
      >
        <div className="container">
          <div className="banner-wrapper">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <div className="banner-content">
                  <h1>
                    {" "}
                    <span className="theme-color-4">Create</span> And
                    <span className="theme-color-4">
                      {" "}
                      <br /> Sell
                    </span>{" "}
                    Your Items.
                  </h1>
                  <p>
                    Digital Marketplace For Item Buy, Sell, And Discover
                    Exclusive Item.
                  </p>
                  <div className="banner-btns d-flex flex-wrap">
                    <a
                      data-blast="bgColor"
                      href="explore.html"
                      className="default-btn move-top"
                    >
                      <span>Explore</span>{" "}
                    </a>
                    <a href="signin.html" className="default-btn move-right">
                      <span>Create</span>{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="nft-slider-wrapper">
                  <div className="swiper banner-item-slider-2">
                    <ContentBannerHome />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===============//banner section end here \\================= --> */}
    </>
  );
}
