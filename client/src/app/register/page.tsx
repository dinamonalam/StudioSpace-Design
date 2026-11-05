"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StudioLogo } from "@/components/ui/StudioLogo";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Mail, Lock, User, Image as ImageIcon, UserPlus, Check, X } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, loginWithGoogle, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Google Account prompt modal state
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleName, setGoogleName] = useState("Dinamon Alam");
  const [googleEmail, setGoogleEmail] = useState("dinamonalam@gmail.com");
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // Mandatory password criteria:
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isMinLength = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && isMinLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please fill in your name and email.");
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage("Your password does not meet the security criteria.");
      toast.error("Invalid password. Must have uppercase, lowercase, and at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, email, password, photoUrl);
    setIsSubmitting(false);

    if (!success) {
      setErrorMessage("Registration failed. Please check the requirements and try again.");
    }
  };

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      toast.error("Please enter a valid Google email.");
      return;
    }
    setIsGoogleSubmitting(true);
    await loginWithGoogle("/dashboard", {
      name: googleName.trim() || "Dinamon Alam",
      email: googleEmail.trim(),
    });
    setIsGoogleSubmitting(false);
    setShowGoogleModal(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8 bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] transition-colors">
      <div className="w-full max-w-md space-y-8 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm">
        <div className="text-center">
          <StudioLogo size="lg" className="justify-center mb-6" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
            Create an Account
          </h1>
          <p className="mt-2 text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70">
            Join the StudioSpace creative community to list and book vetted production facilities.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs text-center font-medium animate-in fade-in">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Thorne"
                className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#123C32] dark:text-[#F4F0E5] placeholder:text-[#123C32]/45 dark:placeholder:text-[#F4F0E5]/45 focus:outline-none focus:border-[#C5A66A] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. julian@velvetmusic.io"
                className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#123C32] dark:text-[#F4F0E5] placeholder:text-[#123C32]/45 dark:placeholder:text-[#F4F0E5]/45 focus:outline-none focus:border-[#C5A66A] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-1.5">
              Photo URL (Optional)
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#123C32] dark:text-[#F4F0E5] placeholder:text-[#123C32]/45 dark:placeholder:text-[#F4F0E5]/45 focus:outline-none focus:border-[#C5A66A] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#123C32] dark:text-[#F4F0E5] placeholder:text-[#123C32]/45 dark:placeholder:text-[#F4F0E5]/45 focus:outline-none focus:border-[#C5A66A] transition-colors"
              />
            </div>

            {/* Live Criteria Indicators per prompt rules */}
            <div className="mt-2.5 p-3 rounded-xl bg-[#F4F0E5]/70 dark:bg-[#123C32]/60 border border-[#123C32]/10 dark:border-white/10 space-y-1.5 text-[11px]">
              <span className="text-[10px] uppercase font-bold text-[#123C32]/70 dark:text-[#F4F0E5]/70 tracking-wider block mb-1">
                Password Validation Criteria:
              </span>
              <div
                className={`flex items-center gap-2 transition-colors ${
                  hasUppercase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-[#123C32]/50 dark:text-[#F4F0E5]/50"
                }`}
              >
                {hasUppercase ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#123C32]/40 dark:text-[#F4F0E5]/40 shrink-0" />
                )}
                <span>Must have an Uppercase letter (A-Z)</span>
              </div>
              <div
                className={`flex items-center gap-2 transition-colors ${
                  hasLowercase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-[#123C32]/50 dark:text-[#F4F0E5]/50"
                }`}
              >
                {hasLowercase ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#123C32]/40 dark:text-[#F4F0E5]/40 shrink-0" />
                )}
                <span>Must have a Lowercase letter (a-z)</span>
              </div>
              <div
                className={`flex items-center gap-2 transition-colors ${
                  isMinLength ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-[#123C32]/50 dark:text-[#F4F0E5]/50"
                }`}
              >
                {isMinLength ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#123C32]/40 dark:text-[#F4F0E5]/40 shrink-0" />
                )}
                <span>Length must be at least 6 characters</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isPasswordValid}
            className="w-full font-bold shadow-sm gap-2 mt-4"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Account</span>
          </Button>

          {/* Social Google Login Button */}
          <div className="pt-2">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#123C32]/10 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#1A4D41] px-3 text-[#123C32]/60 dark:text-[#F4F0E5]/60 font-semibold">Or register with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowGoogleModal(true)}
              className="w-full gap-3 font-semibold bg-white dark:bg-[#1A4D41] hover:bg-[#F4F0E5]/40"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#123C32] dark:text-[#C5A66A] hover:underline">
            Log in here
          </Link>
        </p>

        {/* Google Account Selection Modal */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span className="font-semibold text-sm text-[#123C32] dark:text-[#F4F0E5]">
                    Google Account Registration
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="text-[#123C32]/50 dark:text-[#F4F0E5]/50 hover:text-[#123C32] dark:hover:text-[#F4F0E5]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70">
                Register on StudioSpace using your Google credentials.
              </p>

              <form onSubmit={handleGoogleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-1">
                    Google Account Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="text"
                      required
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      placeholder="Dinamon Alam"
                      className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-1">
                    Google Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="email"
                      required
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="dinamonalam@gmail.com"
                      className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowGoogleModal(false)}
                    disabled={isGoogleSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={isGoogleSubmitting}
                    className="font-semibold"
                  >
                    Continue as {googleName.split(" ")[0] || "User"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
