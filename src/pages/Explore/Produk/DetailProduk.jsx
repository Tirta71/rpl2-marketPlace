import React, { useEffect, useState } from "react";
import Header from "../../../Component/Util/Header";
import RightDetailProduk from "../../../Component/ChildDetailProduk/RightDetailProduk";
import LeftDetailProduk from "../../../Component/ChildDetailProduk/LeftDetailProduk";
import Loading from "../../../Component/Util/Loading";

export default function DetailProduk() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="item-details-section padding-top padding-bottom">
          <div className="container">
            <div className="item-details-wrapper">
              <div className="row g-5">
                <RightDetailProduk />
                <LeftDetailProduk />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
