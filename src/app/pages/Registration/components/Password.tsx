import React, { useState } from "react";
import { InputField } from "@/components/InputField";

interface PasswordProps {
  value: string;
  label: string;
  onChange: (value: string) => void;
  showStrength?: boolean;
  compareValue?: string;
  onMatchChange?: (matches: boolean) => void;
}

export const checkPasswordStrength = (password: string) => {
  if (!password) return { score: 0, messages: [], strength: "" };
  
  let score:number = 0;
  const messages:string[] = [];
  
  // Check length
  if (password.length >= 8) score++;
  else messages.push("At least 8 characters");
  
  // Check for uppercase
  if (/[A-Z]/.test(password)) score++;
  else messages.push("One uppercase letter");
  
  // Check for lowercase
  if (/[a-z]/.test(password)) score++;
  else messages.push("One lowercase letter");
  
  // Check for numbers
  if (/\d/.test(password)) score++;
  else messages.push("One number");
  
  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  else messages.push("One special character");
  
  let strength = "";
  if (score === 5) strength = "Very Strong";
  else if (score >= 4) strength = "Strong";
  else if (score >= 3) strength = "Medium";
  else if (score >= 2) strength = "Weak";
  else strength = "Very Weak";
  
  return { score, strength, messages };
};

// Get strength color based on score
const getStrengthColor = (score: number): string => {
  if (score <= 2) return "#EF4444"; // red
  if (score === 3) return "#F59E0B"; // yellow
  if (score === 4) return "#3B82F6"; // blue
  return "#10B981"; // green
};

export function Password({
  value,
  label,
  onChange,
  showStrength = false,
  compareValue = "",
  onMatchChange,
}: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordStrength = checkPasswordStrength(value);
  
  // Check if passwords match (only if compareValue is provided)
  const passwordsMatch = compareValue ? value === compareValue : true;
  
  // Notify parent about match status
  React.useEffect(() => {
    if (compareValue && onMatchChange) {
      onMatchChange(passwordsMatch);
    }
  }, [value, compareValue, passwordsMatch, onMatchChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Password Input with Toggle */}
      <div className="relative">
       <InputField
          name="password"
          label={label}
          type={showPassword ? "text" : "password"}
          value={value}
          changeHandler={handleInputChange}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}
          onCopy={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}
        />

        
        {/* View/Hide Toggle Button */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute mt-2 ml-2 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          
        </button>
      </div>

       {/*Password strength*/}
      {showStrength && value && (
        <div className="mt-2">
          <div className="flex align-center gap-1 w-3/4 text-sm mb-1">
            <span>
              Password strength: <strong>{passwordStrength.strength}</strong>
            </span>
            <span className="text-text-lighter-lm">({passwordStrength.score}/5)</span>
          </div>
          
          {/* Strength Bar */}
          <div className="h-2 w-3/4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(passwordStrength.score / 5) * 100}%`,
                backgroundColor: getStrengthColor(passwordStrength.score),
              }}
            />
          </div>
          
          
          {passwordStrength.messages.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Requirements: {passwordStrength.messages.join(", ")}
            </p>
          )}
        </div>
      )}

      {/* Password Match Indicator*/}
      {compareValue && value && (
        <p
          className={`text-sm mt-2 ${passwordsMatch ? "text-text-lighter-lm" : "text-accent-lm"}`}
        >
          {passwordsMatch ? "✔ Passwords match" : "✖ Passwords do not match"}
        </p>
      )}
    </>
  );
}