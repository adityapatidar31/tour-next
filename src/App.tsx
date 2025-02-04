import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import Hero from "./components/components/Hero";
import Product from "./components/components/pages/product/ProductPage";
import { Outlet } from "react-router-dom";
import Navbar from "./components/components/navbar/Navbar";
import HomePage from "./components/components/HomePage";
import LoginPage from "./components/components/pages/login/LoginPage";
import SignupPage from "./components/components/pages/signup/Signup";
import { useEffect, useState } from "react";
import { store } from "./store/store";
import { queryClient } from "./services/queryClient";
import ReviewPage from "./components/components/pages/review/ReviewPage";
import PasswordUpdate from "./components/components/pages/Password/PasswordUpdate";
import CreateTourPage from "./components/components/pages/createTour/CreateTourPage";

function Layout() {
  return (
    <div className="max-w-screen-xl mx-auto lg:px-13 ">
      <Navbar />
      <main className="mt-4">
        <Outlet /> {/* This will render the child route component */}
      </main>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          draggable
          theme={theme}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/home" element={<Layout />}>
              {/* The HomePage is the default for /home */}
              <Route path="" element={<HomePage />} />
              {/* The dynamic route is defined as :id */}
              <Route path=":id" element={<Product />} />
              <Route path="/home/review" element={<ReviewPage />} />
              <Route
                path="/home/updateMyPassword"
                element={<PasswordUpdate />}
              />
              <Route path="/home/createTour" element={<CreateTourPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
