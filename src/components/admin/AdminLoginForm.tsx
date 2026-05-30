"use client";

import { useState } from "react";

type AdminLoginFormProps = {
  initialError?: string;
};

export function AdminLoginForm({ initialError }: AdminLoginFormProps) {
  const [error, setError] = useState(initialError || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setIsSubmitting(false);
      setError(response.status === 401 ? "Invalid password." : "Unable to sign in.");
      return;
    }

    sessionStorage.setItem("nmc_admin_authenticated", "true");
    window.location.href = "/admin/products";
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md rounded-card border border-novamedix-border bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-bold text-navy">Admin Login</h2>
      <p className="mt-2 text-sm text-slate-600">Enter the admin password to manage products.</p>
      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
      <label className="mt-5 block text-sm font-bold text-navy" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="mt-2 h-11 w-full rounded-lg border border-novamedix-border px-3 outline-none focus:border-novamedix-blue"
        required
      />
      <button className="mt-5 h-11 rounded-lg bg-novamedix-blue px-5 text-base font-bold text-white disabled:opacity-60" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Checking..." : "Enter Admin"}
      </button>
    </form>
  );
}
