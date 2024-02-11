import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import ChiledHeaderProfile from "./ChildHeaderProfile/ChiledHeaderProfile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
export default function HeaderProfile() {
  const namaUser = sessionStorage.getItem("nama");
  const hasToken = !!sessionStorage.getItem("accessToken");
  const role = sessionStorage.getItem("role");

  return (
    <div className="header__action header__action--profile">
      <div className="dropdown">
        <ChiledHeaderProfile namaUser={namaUser} hasToken={hasToken} />

        <ul className="dropdown-menu">
          {hasToken && role === "Penjual" && (
            <li>
              <Link to="/profile-toko" className="dropdown-item">
                <span className="me-1">
                  <i className="icofont-options"></i>
                </span>
                Profile
              </Link>
            </li>
          )}

          {hasToken && (
            <li>
              <Link to="/history-pesanan" className="dropdown-item">
                <span className="me-1">
                  <i className="icofont-lightning-ray"></i>
                </span>
                Activity
              </Link>
            </li>
          )}
          {hasToken && (
            <li>
              <Link to="/keranjang" className="dropdown-item">
                <span className="me-1">
                  <FontAwesomeIcon icon={faCartShopping} data-blast="color" />
                </span>
                Checkout
              </Link>
            </li>
          )}

          {!hasToken && (
            <>
              <li>
                <Link to="/sign-up" className="dropdown-item">
                  <span className="me-1">
                    <i className="icofont-space-shuttle"></i>
                  </span>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="dropdown-item">
                  <span className="me-1">
                    <i className="icofont-login"></i>
                  </span>{" "}
                  Sign In
                </Link>
              </li>
            </>
          )}

          {hasToken && <Logout />}
        </ul>
      </div>
    </div>
  );
}
