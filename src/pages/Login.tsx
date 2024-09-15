import { useState } from "react";
import axios from "axios";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess("Login successful!");
        setError("");
      }
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      window.location.href = "/product";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Login failed");
      } else {
        setError("An error occurred while connecting to the server.");
      }
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>

          <Typography endDecorator={<Link href="/register">Sign up</Link>} fontSize="sm" sx={{ alignSelf: "center" }}>
            Don&apos;t have an account?
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
