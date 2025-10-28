import React, { useEffect } from "react";
import { FaGoogle, FaGithub, FaTimes } from "react-icons/fa";

export default function AuthModal({ type, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const title = type === "login" ? "Login to MediTrack AI" : "Create Your Account";
  const switchText = type === "login" ? "Don't have an account?" : "Already have an account?";
  const switchType = type === "login" ? "signup" : "login";

  const handleGoogleLogin = () => {
    // connect firebase or fastapi oauth endpoint here
  };

  const handleGithubLogin = () => {
    // same here
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

        <div className="flex flex-col gap-3">
          <button onClick={handleGoogleLogin} className="border flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100">
            <FaGoogle /> Continue with Google
          </button>
          <button onClick={handleGithubLogin} className="border flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100">
            <FaGithub /> Continue with GitHub
          </button>
        </div>

        <div className="mt-6 border-t pt-4">
          {/* Here we’ll reuse login/signup forms from your existing files */}
          {type === "login" ? <LoginForm /> : <SignupForm />}
        </div>

        <p className="text-center text-sm mt-4">
          {switchText}{" "}
          <span
            onClick={() => setAuthType(switchType)}
            className="text-blue-600 cursor-pointer"
          >
            {type === "login" ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}
