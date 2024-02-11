/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Header from "../../Component/Util/Header";
import ContentExplore from "../../Component/Content Explore/ContentExplore";
import Loading from "../../Component/Util/Loading";

export default function Explore() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Header />
      {!loading && <ContentExplore />}
    </>
  );
}
