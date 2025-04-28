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
import { Link, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "@/services/backend";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { addUser, deleteUser } from "@/store/userSlice";
import SearchInput from "./Search";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Navbar({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}) {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logout Successfully");
      dispatch(deleteUser());
      navigate("/home");
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });

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

            {user._id && (
              <Button variant="ghost" size="icon" className="p-3" asChild>
                <Link to="/home/bookings">
                  <BaggageClaim className="w-6 h-6 text-violet-500" />
                </Link>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user.name ? (
                  <Avatar className="cursor-pointer h-6 w-6">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <Button variant="ghost" size="icon" className="">
                    <User className="w-5 h-5" />
                  </Button>
                )}
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
                    <Link to="/home/about">
                      <DropdownMenuItem>About</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        mutate();
                      }}
                    >
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
          </div>
        </div>
      </nav>
      <div className="sm:hidden w-full max-w-lg mx-auto px-4 mt-2">
        <Input type="text" placeholder="Search Tour" className="w-full" />
      </div>
    </>
  );
}
