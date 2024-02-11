import React from "react";
import Header from "../../Component/Util/Header";
import ChildProfileToko from "../../Component/ProfileToko/ChildProfileToko";
import NavProfileToko from "../../Component/ProfileToko/NavProfileToko";
import AboutProfileToko from "../../Component/ProfileToko/AboutProfileToko";
import TambahProduk from "../../Component/ProfileToko/Produk/TambahProduk";
import TampilProfilProduk from "../../Component/ProfileToko/Produk/TampilProfilProduk";

export default function ProfileToko() {
  return (
    <>
      <Header />

      <section className="profile-section padding-top padding-bottom">
        <div className="container">
          <div className="section-wrapper">
            <div className="member-profile">
              <ChildProfileToko />

              <div className="profile-details">
                <NavProfileToko />
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane activity-page fade show active"
                    id="allNft"
                    role="tabpanel"
                  >
                    <div>
                      <div className="row">
                        <div className="col">
                          <article>
                            <div className="activity-tab">
                              <ul
                                className="nav nav-pills mb-30 px-2"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="pills-personal-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-personal"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-personal"
                                    aria-selected="false"
                                  >
                                    <i className="icofont-flask"></i>
                                    Tambah Produk
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link active"
                                    id="pills-mentions-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-mentions"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-mentions"
                                    aria-selected="true"
                                  >
                                    <i className="icofont-flash"></i>
                                    My Produk
                                  </button>
                                </li>

                                <li className="custom-select">
                                  <select>
                                    <option value="1">All</option>
                                    <option value="2">Recent</option>
                                    <option value="3">Relevant</option>
                                    <option value="4">Popular</option>
                                  </select>
                                </li>
                              </ul>
                              <div
                                className="tab-content activity-content"
                                id="pills-tabContent"
                              >
                                <TambahProduk />
                                <TampilProfilProduk />
                              </div>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AboutProfileToko />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
