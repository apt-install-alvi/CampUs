// src/app/pages/Signup.tsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupLoginBox from "../../components/SignupLoginBox";
import {Password} from "../../features/auth/components/Password"; // Direct import
import Illustration from "../../assets/images/Signup_img.svg";
import { useLocation } from "react-router";
const DEPTS = ["CSE", "EECE", "CE", "ME", "NSE", "NAME", "EWCE", "PME", "BME", "ARCH"];
const LEVELS = ["1", "2", "3", "4"];

type FormData = {
  name: string;
  studentId: string;
  dept: string;
  level: string;
  batch: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const location = useLocation();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    dept: "",
    level: "",
    batch: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

// Handle OCR data when returning from scanning
useEffect(() => {
  const ocrData = location.state?.ocrData;
  if (ocrData) {
    console.log("Setting OCR data:", ocrData);
    setFormData(prev => ({
      ...prev,
      name: ocrData.name || prev.name,
      studentId: ocrData.studentId || prev.studentId,
      dept: ocrData.dept || prev.dept,
      batch: ocrData.batch || prev.batch,
    }));
    
    // Clear the state to prevent re-application on refresh
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title);
    }
  }
}, [location.state]);


  // Common border style for all inputs
  const inputBorderStyle = { borderColor: "#9CA3AF", borderWidth: "1px" };

  function chooseFile() {
    fileRef.current?.click();
  }

function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  const f = e.target.files?.[0] || null;
  if (!f) {
    setFileName(null);
    return;
  }

  // Convert file to base64 and navigate to OCR page
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    setFileName(f.name);
    
    // navigate to OCR page with base64 data
    navigate("/signup/ocr", { 
      state: { 
        fileBase64: base64, 
        fileName: f.name,
        fileType: f.type 
      } 
    });
  };
  reader.onerror = (error) => {
    console.error('Error reading file:', error);
    alert('Error reading file. Please try again.');
  };
  reader.readAsDataURL(f);
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      password: value
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      confirmPassword: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Add more validations
    console.log("Form submitted:", formData);
      navigate('/login');
    
  };

  return (
    <SignupLoginBox
      title="Signup"
      illustrationSrc={Illustration}
    >
      {/* CHOOSE FILE - with consistent border */}
      <div className="mb-6">
        <div
          className="flex items-stretch w-full rounded-xl border"
          style={{
            ...inputBorderStyle,
            height: 48,
            backgroundColor: "white"
          }}
        >
          <button
            type="button"
            onClick={chooseFile}
            className="px-5 rounded-xl text-sm font-medium text-primary-lm"
            style={{
              backgroundColor: "#C23D00",
              color: "#FFFFFF",
              minWidth: 120,
              borderRight: "1px solid #9CA3AF"
            }}
          >
            Choose File
          </button>

          <div
            className="flex-1 flex items-center px-4 text-sm"
            style={{
              color: fileName ? "#1F2937" : "#6B7280",
            }}
          >
            {fileName ?? "Upload ID (image/pdf)"}
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full rounded-xl border px-4 py-3 placeholder:opacity-60"
          style={inputBorderStyle}
          placeholder="Name"
        />

        {/* Student ID Input */}
        <input
          name="studentId"
          value={formData.studentId}
          onChange={handleInputChange}
          className="w-full rounded-xl border px-4 py-3 placeholder:opacity-60"
          style={inputBorderStyle}
          placeholder="Student ID"
        />

        {/* Dept and Level Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="dept"
            value={formData.dept}
            onChange={handleInputChange}
            className="w-full rounded-xl border px-4 py-3"
            style={{
              ...inputBorderStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20'><path d='M5 7l5 5 5-5' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "16px",
              paddingRight: "32px",
            }}
          >
            <option value="">Dept</option>
            {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full rounded-xl border px-4 py-3"
            style={{
              ...inputBorderStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20'><path d='M5 7l5 5 5-5' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "16px",
              paddingRight: "32px",
            }}
          >
            <option value="">Level</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Batch Input */}
        <input
          name="batch"
          value={formData.batch}
          onChange={handleInputChange}
          className="w-full rounded-xl border px-4 py-3 placeholder:opacity-60"
          style={inputBorderStyle}
          placeholder="Batch"
        />

        {/* Email Input */}
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full rounded-xl border px-4 py-3 placeholder:opacity-60"
          style={inputBorderStyle}
          placeholder="Email"
        />

        {/* Mobile Input */}
        <input
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          className="w-full rounded-xl border px-4 py-3 placeholder:opacity-60"
          style={inputBorderStyle}
          placeholder="Mobile Number"
        />

        {/* Password Field */}
        <Password
          value={formData.password}
          onChange={handlePasswordChange}
          placeholder="Password"
          showStrength={true}
        />

        {/* Confirm Password Field */}
        <Password
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          compareValue={formData.password}
          onMatchChange={setPasswordsMatch}
        />

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl font-medium "
            style={{ backgroundColor: "#C23D00" , color: "white" }}
          >
            Signup
          </button>

          <span className="text-sm text-text-lighter-lm">
            Already have an account?{" "}
            <Link to="/login" className="underline text-accent-lm">
              Login
            </Link>
          </span>
        </div>
      </form>
    </SignupLoginBox>
  );
}
