import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-background p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-violet-600">Tour Next</div>

        <div className="hidden md:flex flex-1 justify-center max-w-md">
          <Input type="text" placeholder="Search Tour" className="w-84" />
        </div>

        <div className="hidden md:flex  space-x-4">
          <Button variant="ghost">Featured Tours</Button>
          <ThemeSwitcher />
          <Button variant="ghost">
            <User className="w-5 h-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Search..."
        className="w-11/12 md:hidden my-3 mx-3 sm:mx-7"
      />
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 mt-2">
          <Button variant="ghost" className="w-full">
            Featured Tours
          </Button>
          <Button variant="ghost" className="w-full">
            Time
          </Button>
          <Button variant="ghost" className="w-full">
            <User className="w-5 h-5" />
          </Button>
        </div>
      )}
    </nav>
  );
}
