import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/components/Hero";
import Product from "./components/components/pages/product/ProductPage";
import { Outlet } from "react-router-dom";
import Navbar from "./components/components/navbar/Navbar";
import HomePage from "./components/components/HomePage";
import LoginPage from "./components/components/pages/login/LoginPage";
import RegisterPage from "./components/components/pages/register/registerPage";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Layout />}>
          {/* The HomePage is the default for /home */}
          <Route path="" element={<HomePage />} />
          {/* The dynamic route is defined as :id */}
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
