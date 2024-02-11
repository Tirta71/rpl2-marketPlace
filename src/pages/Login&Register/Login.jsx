/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Scrolltop from "../../Component/Util/Scrolltop";
import FormLogin from "../../Component/Login&Register/Login/FormLogin";

export default function Login() {
  return (
    <>
      <div className="login-section padding-top padding-bottom">
        <div className=" container">
          <div className="row g-5 align-items-center flex-md-row-reverse">
            <div className="col-lg-5">
              <div className="account-wrapper">
                <h3 className="title">Sign In</h3>
                <FormLogin />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="account-img">
                <img src="assets/images/account/01.png" alt="shape-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrolltop />
    </>
  );
}
