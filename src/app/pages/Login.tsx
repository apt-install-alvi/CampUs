import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupLoginBox from "../../components/SignupLoginBox";
import Illustration from "../../assets/signup2.jpg";
import Password from "../../features/auth/components/Password";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  console.log("Login attempt", { userId, password });

  if (!userId || !password) {
    console.warn("Validation failed: missing userId or password");
    return;
  }

  const targetPath = `/login/2fa/${encodeURIComponent(userId)}`;
  console.log("Navigating to:", targetPath);

  navigate(targetPath);
}


  return (
    <SignupLoginBox title="Login" illustrationSrc={Illustration} illustrationTitle="Login Illustration">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <label className="block">
          <div className="mb-2 text-sm text-[var(--color-text-lighter-lm)]">User ID</div>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-[12px] border px-4 py-3"
            placeholder="User ID"
          />
        </label>

        <label className="block">
          <div className="mb-2 text-sm text-[var(--color-text-lighter-lm)]">Password</div>
          <Password value={password} onChange={setPassword} placeholder="Password" />
        </label>

        <div className="flex items-center gap-4">
          <button type="submit" className="px-6 py-2 rounded-[12px] font-medium bg-[#C23D00] text-white">
            Login
          </button>

          <div className="text-sm text-[var(--color-text-lighter-lm)]">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-[var(--color-accent-lm)]">Sign Up</Link>
          </div>
        </div>
      </form>
    </SignupLoginBox>
  );
}
