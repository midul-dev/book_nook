"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Password validation criteria
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password" && passwordError) {
      setPasswordError(null);
    }
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enforce Password Validation Criteria
    if (!isPasswordValid) {
      if (!hasMinLength) {
        setPasswordError("Password must be at least 6 characters long.");
      } else if (!hasUppercase) {
        setPasswordError("Password must include at least one uppercase letter (A-Z).");
      } else if (!hasLowercase) {
        setPasswordError("Password must include at least one lowercase letter (a-z).");
      } else {
        setPasswordError("Password does not meet required security criteria.");
      }
      return; // Do NOT proceed for invalid password
    }

    // Functionality placeholder: User will implement manual backend connection
    console.log("Ready for manual auth implementation:", {
      email: formData.email,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-background">
      {/* Subtle atmospheric ambient glow matching BookNook theme */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[480px] bg-gradient-to-tr from-emerald-600/15 via-emerald-800/10 to-amber-500/10 blur-3xl opacity-70 -z-10" />

      <div className="w-full max-w-md">
        {/* Brand Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xs relative">
          {/* Header */}
          <div className="text-center space-y-2.5 pb-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-900/10 dark:bg-emerald-400/10 border border-emerald-900/20 dark:border-emerald-400/20 text-[#164e38] dark:text-emerald-400 mb-1">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
              Sign in to manage your active loans, reserve community books, and explore your personal shelf.
            </p>
          </div>

          {/* Form Error Banner */}
          {passwordError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block">Password Validation Error</span>
                <span>{passwordError}</span>
              </div>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-emerald-800 dark:text-emerald-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition ${
                    passwordError
                      ? "border-destructive focus:ring-destructive/50"
                      : "border-border focus:ring-emerald-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground/80 font-mono pt-1">
                Must include 1 uppercase, 1 lowercase letter, and at least 6 characters.
              </p>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded accent-[#164e38]"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#164e38] hover:bg-[#123e2d] text-white rounded-xl font-medium text-sm gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <span>Sign In to Library</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] font-mono uppercase tracking-wider">
              <span className="bg-card px-3 text-muted-foreground">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className="w-full h-11 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Switch Link to Sign Up */}
          <div className="pt-6 text-center text-xs text-muted-foreground">
            Don&apos;t have a library account yet?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-emerald-800 dark:text-emerald-400 hover:underline underline-offset-2"
            >
              Register here
            </Link>
          </div>
        </div>

        {/* Security / Community Assurance micro-bar */}
        <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Encrypted Community Library Credentials</span>
        </div>
      </div>
    </div>
  );
}
