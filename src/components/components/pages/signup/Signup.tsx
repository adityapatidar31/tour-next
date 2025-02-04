import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpUser } from "@/services/backend";
import { useAppDispatch } from "@/services/hooks";
import { addUser } from "@/store/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: user,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const body = {
        email,
        password,
        passwordConfirm: confirmPassword,
        name,
      };
      const user = await signUpUser(body);
      return user;
    },
    onSuccess: () => {
      setEmail("");
      setPassword("");
      navigate("/home");
    },
    onError: () => {
      toast.error("Failed to Signup. Try again later");
    },
  });

  function handleSignup(e: React.SyntheticEvent<EventTarget>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password and confirm password is not match");
      return;
    }
    const user = mutate();

    if (user) {
      dispatch(addUser(user));
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">
            Create an account
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="mt-2"
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <SyncLoader color="#fff" /> : "Login"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-primary hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
