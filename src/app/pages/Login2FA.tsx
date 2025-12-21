import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {SignupLoginBox} from "../../components/SignupLoginBox";
// import Illustration from "../../assets/images/Signup_img.svg";

export function Login2FA() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [values, setValues] = useState(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus(); // move to next box
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      const newValues = paste.split("");
      setValues(newValues);
      newValues.forEach((val, i) => {
        if (inputs.current[i]) inputs.current[i]!.value = val;
      });
      e.preventDefault();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = values.join("");
    console.log("2FA code submitted", { userId, code });
    // TODO: call 2FA verification API
    navigate("/home");
  }

  if (!userId) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <SignupLoginBox
      title="Login"
      // illustrationSrc={Illustration}
      // illustrationTitle="2FA Illustration"
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <p className="text-lg text-text-lighter-lm">
          A 6-digit code has been sent to 01*******81
        </p>

        {/* Six small boxes */}
        <div className="flex gap-2 justify-center w-fit" onPaste={handlePaste}>
          {values.map((val, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              maxLength={1}
              className="w-12 h-12 text-center text-xl border rounded bg-primary-lm"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-20 px-0 py-2 rounded-xl font-medium bg-accent-lm text-primary-lm"
        >
          Confirm
        </button>
      </form>
    </SignupLoginBox>
  );
}
