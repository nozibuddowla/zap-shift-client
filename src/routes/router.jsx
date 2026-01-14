import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUS from "../pages/AboutUS/AboutUS";
import Error404 from "../components/Error404/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error404 />,
    hydrateFallback: () => (
      <div className="p-10 flex items-center justify-center text-center">
        Loading...
      </div>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/aboutus",
        Component: AboutUS,
      },
    ],
  },
]);
