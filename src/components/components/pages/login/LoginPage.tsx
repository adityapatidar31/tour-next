import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState<string>("");

  async function handleLogin() {
    try {
      const data = {
        email,
        password,
      };
      const response = await axios.post(
        "https://tour-next.onrender.com/api/v1/users/login",
        data
      );
      console.log(response);
    } catch {
      console.log("Failed to login. Try again");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          Welcome Back
        </h2>

        {/* {error && <div className="text-red-500 text-sm mb-4">{error}</div>} */}

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
            placeholder="Enter your password"
            className="mt-2"
          />
        </div>

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/signup" className="text-primary hover:underline">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
