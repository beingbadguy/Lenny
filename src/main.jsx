import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MasterProvider from "./context/Context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Categories from "./Pages/Categories.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import User from "./Pages/User.jsx";
import Cart from "./Pages/Cart.jsx";
import Error from "./Pages/Error.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import LayoutDashboard from "./Layout/LayoutDashboard.jsx";
import AllProducts from "./Pages/AllProducts.jsx";
import Single from "./Pages/Single.jsx";
import SubCategories from "./Pages/SubCategories.jsx";
import Login from "./Pages/Login.jsx";
import Sign from "./Pages/Sign.jsx";
import Checkout from "./Pages/Checkout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "subcategories",
        element: <SubCategories />,
      },
      {
        path: "categories/:category_name",
        element: <Categories />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <Sign />,
      },
      {
        path: "wish",
        element: <Wishlist />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Single />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },

      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <LayoutDashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "allproducts",
        element: <AllProducts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MasterProvider>
    <RouterProvider router={router} />
  </MasterProvider>
  // </React.StrictMode>
);
