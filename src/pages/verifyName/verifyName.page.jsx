import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserMessage,
  Navbar,
  SubmitButton,
  SecurityContainer,
} from "../../components";

export const VerifyName = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    const message = {
      name: "Account Holder Name",
    };

    const blankValues = Object.keys(formData).filter((key) => !formData[key]);
    if (blankValues.length > 0) {
      alert(`${message[blankValues[0]]} cannot be left blank.`);
      return;
    }
    if (formData.name?.length < 1) {
      alert("Enter a valid Account Holder Name");
      return;
    }
    navigate("/verify/otp", { state: { navigateTo: "otp" } });
  };
  return (
    <div className="page-container home">
      <Navbar />
      <div className="page-body">
        <div className="page-form-container">
          <div className="page-form-container-title">Login to NetBanking</div>
          <div className="page-form-container-body mb20p">
            <div className="page-form-container-left">
              <div className="form-item">
                <div className="form-label">Account Holder Name</div>
                <input
                  value={formData.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="form-input"
                />
              </div>
              <div className="form-item">
                <SubmitButton onClick={handleSubmit} />
              </div>
              <UserMessage />
            </div>
            <div className="page-form-container-right">
              <SecurityContainer />
            </div>
          </div>
          <div className="home-page-footer"></div>
        </div>
      </div>
    </div>
  );
};
