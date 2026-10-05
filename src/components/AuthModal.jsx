import { useState } from "react";
import { useStore } from "../store/StoreContext";
import { X } from "./Icons";

export default function AuthModal() {
  const { authOpen, setAuthOpen, signIn } = useStore();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  if (!authOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    const name =
      form.name.trim() ||
      (form.email.includes("@") ? form.email.split("@")[0] : "Customer");
    signIn({ name, email: form.email });
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Sign in">
      <div className="absolute inset-0 bg-black/60" onClick={() => setAuthOpen(false)} />
      <div className="relative mx-auto mt-24 w-[92%] max-w-md bg-white p-8 shadow-card">
        <button
          onClick={() => setAuthOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-body transition-colors hover:bg-light hover:text-ink"
        >
          <X />
        </button>

        <div className="mb-6 flex gap-6 border-b border-gray-200">
          {["signin", "register"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`-mb-px cursor-pointer border-b-2 pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                mode === m ? "border-accent text-ink" : "border-transparent text-body hover:text-ink"
              }`}
            >
              {m === "signin" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label htmlFor="auth-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink">
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="input"
                placeholder="John Carter"
              />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="auth-pass" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink">
              Password
            </label>
            <input
              id="auth-pass"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-yellow w-full">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
          <p className="text-center text-xs text-body">
            Demo store — your details stay in this browser only.
          </p>
        </form>
      </div>
    </div>
  );
}
