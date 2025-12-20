// src/app/pages/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import SignupLoginBox from "../../components/SignupLoginBox";
import Illustration from "../../assets/images/Signup_img.svg";

export function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call auth API
    console.log("Login attempt", { userId, password });
    // after successful login navigate to home (or dashboard)
    navigate("/home");
  }

  return (
    <SignupLoginBox title="Login" illustrationSrc={Illustration} illustrationTitle="Login Illustration">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <label className="block">
          <div className="mb-2 text-sm text-text-lighter-lm)]">User ID</div>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="User ID"
          />
        </label>

        <label className="block">
          <div className="mb-2 text-sm text-text-lighter-lm">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Password"
          />
        </label>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl font-medium"
            style={{ backgroundColor: "#C23D00" , color: "white" }}
          >
            Login
          </button>

          <div className="text-sm text-text-lighter-lm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-accent-lm">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </SignupLoginBox>
  );
}
