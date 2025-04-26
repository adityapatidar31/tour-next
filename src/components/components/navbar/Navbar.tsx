import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BaggageClaim, FerrisWheel, User } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { getUser } from "@/services/backend";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { addUser } from "@/store/userSlice";
import SearchInput from "./Search";

export default function Navbar({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}) {
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
          <div className="flex gap-2 items-center">
            <FerrisWheel className="text-violet-500" />
            <Link to="/home" className="text-xl font-bold text-violet-500">
              Tour Next
            </Link>
          </div>

          <div className="hidden sm:flex flex-1 justify-center sm:max-w-xs md:max-w-sm">
            <SearchInput />
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher setTheme={setTheme} theme={theme} />

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
                    {/* <Link to="/home/createTour">
                      <DropdownMenuItem>Create Tour</DropdownMenuItem>
                    </Link> */}
                    <Link to="/home/updateMyPassword">
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    </Link>
                    <Link to="/home/about">
                      <DropdownMenuItem>About</DropdownMenuItem>
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
                    <Link to="/home/about">
                      <DropdownMenuItem>About</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {user._id && (
              <Button variant="ghost" size="icon" className="p-3" asChild>
                <Link to="/home/bookings">
                  <BaggageClaim className="w-6 h-6 text-violet-500" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
      <div className="sm:hidden w-full max-w-lg mx-auto px-4 mt-2">
        <Input type="text" placeholder="Search Tour" className="w-full" />
      </div>
    </>
  );
}
