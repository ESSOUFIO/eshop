import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components";
import {
  Contact,
  Home,
  Login,
  Register,
  Reset,
  Admin,
  OrderHistory,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import { ShowOnLogin } from "./components/hiddenLink/hiddenLink";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProduct from "./components/reviewProduct/ReviewProduct";
import NotFound from "./pages/notFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout-success",
        element: <CheckoutSuccess />,
      },
      {
        path: "checkout-details",
        element: (
          <ShowOnLogin>
            <CheckoutDetails />
          </ShowOnLogin>
        ),
      },
      {
        path: "admin/*",
        element: (
          <AdminOnlyRoute>
            <Admin />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "review-product/:id",
        element: <ReviewProduct />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
