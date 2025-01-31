import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/components/Hero";
// import HomePage from "./components/components/HomePage";
import { Outlet } from "react-router-dom";
import Navbar from "./components/components/navbar/Navbar";

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
          {/* <Route path="" element={<HomePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
