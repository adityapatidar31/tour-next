import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleLogin() {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const body = {
        email,
        password,
        passwordConfirm: confirmPassword,
        name,
      };
      console.log(body);
      const response = await axios.post(
        "https://tour-next.onrender.com/api/v1/users/signup",
        body
      );
      console.log(response);
    } catch {
      console.log("Failed to signup, Try again later");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-violet-600 mb-6">
          Create an account
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <Input
            id="name"
            type="name"
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
            className="block text-sm font-medium text-gray-600"
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
            className="block text-sm font-medium text-gray-600"
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
            className="block text-sm font-medium text-gray-600"
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
          <Button
            onClick={handleLogin}
            className="bg-violet-600 w-full text-white hover:bg-violet-700 dark:bg-violet-400 dark:text-gray-900 dark:hover:bg-violet-500 "
          >
            Sign Up
          </Button>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mt-4 text-center">
          <Link to="/login" className="text-violet-600 hover:underline">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
