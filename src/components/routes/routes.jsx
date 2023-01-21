import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, VerifyOtp, VerifyPan, VerifyBranch, VerifyName } from "../../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/verify/pan",
    element: <VerifyPan />,
  },
  {
    path: "/verify/otp",
    element: <VerifyOtp />,
  },
  {
    path: "/verify/name",
    element: <VerifyName />,
  },
  {
    path: "/verify/branch",
    element: <VerifyBranch />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
