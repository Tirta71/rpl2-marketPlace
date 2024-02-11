import React, { useState, useEffect } from "react";

import Header from "../../Component/Util/Header";
import BannerHome from "../../Component/ChildHome/BannerHome";
import KategoriHome from "../../Component/ChildHome/KategoriHome";
import TopSeller from "../../Component/ChildHome/TopSeller";
import Footer from "../../Component/Util/Footer";
import Scrolltop from "../../Component/Util/Scrolltop";

export default function HomeIndex() {
  return (
    <>
      <>
        <Header />
        <BannerHome />
        <KategoriHome />
        <TopSeller />
        <Footer />
        <Scrolltop />
      </>
    </>
  );
}
