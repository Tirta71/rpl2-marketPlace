/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRegister } from "../../Data/ApiUser";
import FormRegister from "../../Component/Login&Register/Register/FormRegister";

export default function Register() {
  const [userData, setUserData] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
    no_telepon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatErrorMessages = (errorObject) => {
    let messages = "";
    for (const field in errorObject) {
      messages += `${field}: ${errorObject[field].join(", ")}\n`;
    }
    return messages.trim();
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(ApiRegister, userData);

      if (response && response.data && response.data.meta.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/sign-in";
          }
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Registration failed. Please check the form and try again.",
          footer: formatErrorMessages(error.response.data.data.error),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Registration failed. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <div className="login-section padding-top padding-bottom">
        <div className="container">
          <div className="row g-5 align-items-center flex-md-row-reverse">
            <div className="col-lg-5">
              <div className="account-wrapper">
                <h3 className="title">Sign Up</h3>
                <FormRegister
                  handleChange={handleChange}
                  handleRegister={handleRegister}
                  userData={userData}
                />
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
    </>
  );
}
