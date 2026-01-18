import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUS from "../pages/AboutUS/AboutUS";
import Error404 from "../components/Error404/Error404";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import Rider from "../pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error404 />,
    hydrateFallback: <LoadingPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
      },
      {
        path: "/coverage",
        Component: Coverage,
        HydrateFallback: LoadingPage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/about-us",
        Component: AboutUS,
      },
      {
        path: "/send-parcel",
        HydrateFallback: LoadingPage,

        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/signin",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/reset-password",
        Component: ResetPassword,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
    ],
  },
]);
