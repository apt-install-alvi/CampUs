import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {SignupLoginBox} from "../../components/SignupLoginBox";
// import Illustration from "../../assets/images/Signup_img.svg";
import {Password} from "../../features/auth/components/Password";
import { InputField } from "../../components/InputField";

export function Login() {
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
    <SignupLoginBox 
    title="Login" 
    // illustrationSrc={Illustration} illustrationTitle="Login Illustration"
    >
      <form onSubmit={handleSubmit} className="space-y-2 max-w-xl">
        <InputField
        type="text"
        label="UserID"
        value={userId}
        changeHandler={(e)=>setUserId(e.target.value)}
        >
        </InputField>
        <Password label="Password" value={password} onChange={setPassword}/>

        <div className="flex items-center gap-4">
          <input type="submit" className="px-6 py-2 rounded-xl font-medium bg-accent-lm text-primary-lm cursor-pointer">
            Login
          </input>

          <p className="text-sm text-text-lighter-lm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-accent-lm cursor-pointer">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </SignupLoginBox>
  );
}
