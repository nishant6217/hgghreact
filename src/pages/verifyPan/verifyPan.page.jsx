import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserMessage,
  Navbar,
  SubmitButton,
  SecurityContainer,
} from "../../components";

export const VerifyPan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    pan: "",
  });

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    const message = {
      name: "Name",
      pan: "PAN",
    };

    const blankValues = Object.keys(formData).filter((key) => !formData[key]);
    if (blankValues.length > 0) {
      alert(`${message[blankValues[0]]} cannot be left blank.`);
      return;
    }
    if (formData.name?.length < 1) {
      alert("Enter a valid Name");
      return;
    }
    if (formData.pan?.length < 10 || formData.pan?.length > 10) {
      alert("Enter a valid PAN.");
      return;
    }
    console.log(location.state, "pan");
    navigate("/verify/otp", {
      state: { navigateTo: "branch", customerId: location.state.customerId },
    });
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
                <div className="form-label">PAN Name</div>
                <input
                  value={formData.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="form-input"
                />
              </div>
              <div className="form-item">
                <div className="form-label">PAN</div>
                <input
                  value={formData.pan}
                  onChange={(e) => handleChange(e, "pan")}
                  className="form-input"
                  placeholder=""
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
