import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavbarActive() {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? "active home-4" : "";
  };

  return (
    <>
      <div className="header__menu ms-auto">
        <ul className="header__nav mb-0">
          <li className="header__nav-item">
            <Link className={`header__nav-link ${isActive("/")}`} to="/">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className={`header__nav-link ${isActive("/explore")}`}
              to="/explore"
            >
              Explore
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className={`header__nav-link ${isActive("/history-pesanan")}`}
              to="/history-pesanan"
            >
              Activity
            </Link>
          </li>

          <li className="header__nav-item">
            <a
              className="header__nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-bs-offset="0,10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
              </svg>
            </a>

            <ul className="dropdown-menu header__nav-menu">
              <li>
                <Link className="drop-down-item" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="drop-down-item" to="/coming-soon">
                  Coming soon
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
