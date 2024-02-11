import React from "react";

export default function FormRegister({
  userData,
  handleChange,
  handleRegister,
}) {
  return (
    <>
      <form className="account-form">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="userIdInput"
            placeholder="User ID"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <label htmlFor="userIdInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="namaInput"
            placeholder="Full Name"
            name="nama"
            value={userData.nama}
            onChange={handleChange}
          />
          <label htmlFor="namaInput">Full Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="confirmPass"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor="confirmPass">Confirm Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="teleponInput"
            placeholder="Phone Number"
            name="no_telepon"
            value={userData.no_telepon}
            onChange={handleChange}
          />
          <label htmlFor="teleponInput">Phone Number</label>
        </div>
        <div className="form-group">
          <div className="d-flex justify-content-between flex-wrap pt-sm-2">
            <div className="checkgroup">
              <input type="checkbox" name="remember" id="remember" disabled />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="forgot-pass.html">Forgot Password?</a>
          </div>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="d-block default-btn move-top"
            onClick={handleRegister}
          >
            <span>Signup Now</span>
          </button>
          <span class="d-block cate pt-2">
            Already Have an Account? <a href="/sign-in"> Sign In</a>
          </span>
        </div>
      </form>
    </>
  );
}
