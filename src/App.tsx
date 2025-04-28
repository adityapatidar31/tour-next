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
import AboutPage from "./components/components/pages/about/About";
import Footer from "./components/components/Footer";
import ProfilePage from "./components/components/pages/profile/ProfilePage";
import BookingPage from "./components/components/pages/bookings/BookingPage";
import FirstTimeAlert from "./components/components/RenderAlert";
import FavoritePage from "./components/components/pages/favourite/FavoritePage";

function Layout({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}) {
  return (
    <div className="max-w-screen-xl mx-auto lg:px-13 ">
      <div className="flex flex-col min-h-screen">
        <FirstTimeAlert />
        <Navbar setTheme={setTheme} theme={theme} />
        <main className="mt-4 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // If no theme in localStorage, default to dark
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
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
            <Route
              path="/home"
              element={<Layout setTheme={setTheme} theme={theme} />}
            >
              {/* The HomePage is the default for /home */}
              <Route path="" element={<HomePage />} />
              {/* The dynamic route is defined as :id */}
              <Route path=":id" element={<Product />} />
              <Route path="/home/review" element={<ReviewPage />} />
              <Route path="/home/about" element={<AboutPage />} />
              <Route path="/home/me" element={<ProfilePage />} />
              <Route path="/home/bookings" element={<BookingPage />} />
              <Route path="/home/favorites" element={<FavoritePage />} />
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
