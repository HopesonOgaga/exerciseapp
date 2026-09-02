import react from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages";
import Signup from "./components/signup";
import Login from "./components/login";

function ScrollToTopLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <ScrollToTopLayout></ScrollToTopLayout>,

    children: [
      {
        path: "/",
        element: <Index></Index>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);
