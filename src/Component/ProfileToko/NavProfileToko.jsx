import React from "react";

export default function NavProfileToko() {
  return (
    <>
      <nav className="profile-nav">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-allNft-tab"
            data-bs-toggle="tab"
            data-bs-target="#allNft"
            type="button"
            role="tab"
            aria-controls="allNft"
            aria-selected="true"
          >
            All Produk
          </button>
          <button
            className="nav-link"
            id="nav-about-tab"
            data-bs-toggle="tab"
            data-bs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="false"
          >
            Profile
          </button>

          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Setting
            </a>

            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/edit-profile">
                  Edit Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/edit-toko">
                  Edit Toko
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
