import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-violet-900 text-white py-6 mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo & Name */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Tour-Next</h2>
          <p className="text-sm opacity-75">Explore the world with us</p>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 my-4 md:my-0">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Tours
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:opacity-75" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="#" className="hover:opacity-75" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:opacity-75" aria-label="Instagram">
            <Instagram size={24} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm opacity-75 mt-4">
        &copy; {new Date().getFullYear()} Tour-Next. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
