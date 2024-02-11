import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiLogin } from "../../../Data/ApiUser";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      console.error("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(ApiLogin, {
        username: email,
        password: password,
      });

      if (response && response.data && response.data.data) {
        console.log("Login success:", response.data);

        sessionStorage.setItem("accessToken", response.data.data.access_token);
        Object.entries(response.data.data.user).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
        Swal.fire({
          icon: "success",
          title: "Login Successfull",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };
  return (
    <>
      <form className="account-form">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-group">
          <div className="d-flex justify-content-between flex-wrap pt-sm-2">
            <div className="checkgroup">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="forgot-pass.html">Forgot Password?</a>
          </div>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="d-block default-btn move-top"
            onClick={handleLogin}
          >
            <span>Signin Now</span>
          </button>
          <span class="d-block cate pt-2">
            Don’t Have any Account? <a href="/sign-up"> Sign Up</a>
          </span>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
