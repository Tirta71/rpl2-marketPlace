/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import HeaderProfile from "./ChildHeader/HeaderProfile";

import ProfileToko from "./ChildHeader/ProfileToko";
import NavbarActive from "./ChildHeader/NavbarActive";
import Logo from "./Logo";
export default function Header() {
  return (
    <>
      <header className="header home-4">
        <div className="container-fluid">
          <div className="header__content">
            <div className="header__logo">
              <a href="/">
                <Logo />
              </a>
            </div>

            <form action="#" className="header__search">
              <input
                type="text"
                placeholder="Search items, collections, and creators"
              />
              <button type="button">
                <i className="icofont-search-2"></i>
              </button>
              <button type="button" className="close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                </svg>
              </button>
            </form>

            <NavbarActive />
            <div className="header__actions">
              <div className="header__action header__action--search">
                <button className="header__action-btn" type="button">
                  <i className="icofont-search-1"></i>
                </button>
              </div>

              <HeaderProfile />
              <ProfileToko />
            </div>

            <button className="menu-trigger header__btn" id="menu05">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
