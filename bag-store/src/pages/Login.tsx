import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Enter a username and password.");
      return;
    }
    login(username.trim());
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-1 text-2xl font-semibold text-neutral-900">Bag Store</h1>
        <p className="mb-6 text-sm text-neutral-500">Sign in to browse the collection</p>

        <label className="mb-1 block text-sm font-medium text-neutral-700" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          data-testid="login-username"
          className="mb-4 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. jane"
          autoComplete="username"
        />

        <label className="mb-1 block text-sm font-medium text-neutral-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          data-testid="login-password"
          type="password"
          className="mb-4 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        {error && (
          <p data-testid="login-error" className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          data-testid="login-submit"
          className="w-full rounded-md bg-neutral-900 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Log in
        </button>

        <p className="mt-4 text-center text-xs text-neutral-400">
          Demo only — any username/password works.
        </p>
      </form>
    </div>
  );
}
