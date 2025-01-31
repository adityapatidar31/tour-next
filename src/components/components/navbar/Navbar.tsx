import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="w-full bg-background p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-violet-600">Tour Next</div>

        <div className="hidden md:flex flex-1 justify-center max-w-md">
          <Input type="text" placeholder="Search Tour" className="w-84" />
        </div>

        <div className="hidden md:flex space-x-4">
          <Button variant="ghost">Featured Tours</Button>
          <ThemeSwitcher />
          <Button variant="ghost">
            <User className="w-5 h-5" />
          </Button>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Featured Tours</DropdownMenuItem>
              <DropdownMenuItem>
                <ThemeSwitcher />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Login</DropdownMenuItem>
              <DropdownMenuItem>Register</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
