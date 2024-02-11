import React from "react";
import Header from "../../Component/Util/Header";
import ChildEditToko from "../../Component/ProfileToko/EditToko/ChildEditToko";

export default function EditProfileToko() {
  return (
    <div className="container">
      <Header />
      <div className="row" style={{ marginTop: "5rem" }}>
        <h1 className="text-center mb-5">Update Your Shop</h1>
        <ChildEditToko />
      </div>
    </div>
  );
}
