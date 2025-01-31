import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/components/Hero";
import Product from "./components/components/Product";
import { Outlet } from "react-router-dom";
import Navbar from "./components/components/navbar/Navbar";
import HomePage from "./components/components/HomePage";

function Layout() {
  return (
    <div className="max-w-screen-xl mx-auto">
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
      </Routes>
    </BrowserRouter>
  );
}
