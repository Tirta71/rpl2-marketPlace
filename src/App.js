import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeIndex from "./pages/Home/HomeIndex";
import Login from "./pages/Login&Register/Login";
import Register from "./pages/Login&Register/Register";

import TambahToko from "./pages/Toko/TambahToko";
import ProfileToko from "./pages/Profile/ProfileToko";
import Explore from "./pages/Explore/Explore";
import EditProfileToko from "./pages/Profile/EditProfileToko";
import EditProfileUser from "./pages/Profile/EditProfileUser";
import DetailProduk from "./pages/Explore/Produk/DetailProduk";
import NotFound from "./pages/NOT FOUND/NotFound";
import EditProdukToko from "./pages/Profile/Produk Toko/EditProdukToko";
import PesananProduk from "./pages/Pesanan Produk/PesananProduk";
import HistoryTransaksi from "./pages/Pesanan Produk/HistoryTransaksi";
import UpdatePesananUser from "./pages/Pesanan Produk/UpdatePesananUser";
import DetailTransaksiPenjual from "./pages/Pesanan Produk/DetailTransaksiPenjual";
import DetailTransaksiPembeli from "./pages/Pesanan Produk/DetailTransaksiPembeli";

const App = () => {
  const hasToken = !!sessionStorage.getItem("accessToken");

  const PrivateRoute = ({ element, path }) => {
    if (hasToken) {
      return element;
    } else {
      return <Navigate to="/sign-in" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/Not-Found404" element={<NotFound />} />
        <Route
          path="/profile-toko"
          element={
            <PrivateRoute element={<ProfileToko />} path="/profile-toko" />
          }
        />
        <Route
          path="/tambah-toko"
          element={
            <PrivateRoute element={<TambahToko />} path="/tambah-toko" />
          }
        />
        <Route
          path="/explore"
          element={<PrivateRoute element={<Explore />} path="/explore" />}
        />
        <Route
          path="/edit-toko"
          element={
            <PrivateRoute element={<EditProfileToko />} path="/edit-toko" />
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute element={<EditProfileUser />} path="/edit-profile" />
          }
        />
        <Route
          path="/detail-produk/:id"
          element={
            <PrivateRoute element={<DetailProduk />} path="/detail-produk" />
          }
        />
        <Route
          path="/edit-produk/:id"
          element={
            <PrivateRoute element={<EditProdukToko />} path="/edit-produk" />
          }
        />
        <Route
          path="/keranjang"
          element={
            <PrivateRoute element={<PesananProduk />} path="/keranjang" />
          }
        />
        <Route
          path="/history-pesanan"
          element={
            <PrivateRoute
              element={<HistoryTransaksi />}
              path="/history-pesanan"
            />
          }
        />
        <Route
          path="/detail-transaksi/penjual/:id_transaksi"
          element={
            <PrivateRoute
              element={<DetailTransaksiPenjual />}
              path="/detail-transaksi/penjual/:id_transaksi"
            />
          }
        />
        <Route
          path="/detail-transaksi/pembeli/:id_transaksiPembeli"
          element={
            <PrivateRoute
              element={<DetailTransaksiPembeli />}
              path="/detail-transaksi/pembeli/:id_transaksiPembeli"
            />
          }
        />
        <Route path="*" element={<Navigate to="/Not-Found404" />} />
      </Routes>
    </Router>
  );
};

export default App;
