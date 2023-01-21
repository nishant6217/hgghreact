import React from "react";
import sec from "./nortonsecurity.png";

export const SecurityContainer = () => {
  return (
    <>
      <div className="norton-sec">
        <img alt="Norton Security" src={sec} />
      </div>
      <div className="small-text color-6 mb10p">
        <div>Your security is of utmost importance.</div>
        <div>
          <a
            className="link"
            href="https://www.hdfcbank.com/personal/useful-links/security"
          >
            Know More...
          </a>
        </div>
      </div>
      <div style={{ fontSize: "18px" }} className="mb20p">
        We have added a host of new features!
      </div>
      <div className="mb10p" style={{ fontSize: "14px", color: "#1e1e1e" }}>
        You can now do so much more:
      </div>
      <div className="hdfcsmalltxt mB20">
        <ul className="bullet">
          <li>Anywhere access through Desktop or mobile</li>
          <li>Enhanced security measures</li>
        </ul>
      </div>
    </>
  );
};
