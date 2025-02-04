import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { getUser } from "@/services/backend";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { addUser } from "@/store/userSlice";
import SearchInput from "./Search";

export default function Navbar() {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(
    function () {
      async function fetchUser() {
        const user = await getUser();
        if (user) dispatch(addUser(user));
      }
      fetchUser();
    },
    [dispatch]
  );

  function handleLogout() {
    console.log("Logout successfully");
  }

  return (
    <>
      <nav className="w-full bg-background p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/home" className="text-xl font-bold text-violet-600">
            Tour Next
          </Link>

          <div className="hidden sm:flex flex-1 justify-center sm:max-w-xs md:max-w-sm">
            <SearchInput />
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-3">
                  {user.name ? (
                    <img src={user.photo} className="w-7 h-7 rounded-lg" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user.name ? (
                  <>
                    <Link to="/home/me">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link to="/home/favorites">
                      <DropdownMenuItem>Favorites</DropdownMenuItem>
                    </Link>

                    <Link to="/home/review">
                      <DropdownMenuItem>Reviews</DropdownMenuItem>
                    </Link>
                    <Link to="/home/updateMyPassword">
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>

                    <Link to="/signup">
                      <DropdownMenuItem>Signup</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="sm:hidden w-full max-w-lg mx-auto px-4 mt-2">
        <Input type="text" placeholder="Search Tour" className="w-full" />
      </div>
    </>
  );
}
