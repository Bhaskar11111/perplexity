import React from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

const BrandLogo = () => (
  <span className="grid size-8 grid-cols-2 gap-0.5 rounded-lg bg-white/12 p-1 ring-1 ring-white/15 backdrop-blur">
    <span className="rounded-sm bg-white" />
    <span className="rounded-sm bg-[#8d6bff]" />
    <span className="rounded-sm bg-[#8d6bff]" />
    <span className="rounded-sm bg-white/80" />
  </span>
);

const AuthCard = ({
  mode,
  title,
  subtitle,
  fields,
  formData,
  showPassword,
  onChange,
  onSubmit,
  onTogglePassword,
}) => {
  const isRegister = mode === "register";

  return (
    <div className="min-h-screen bg-[#716a82] px-3 py-4 font-light text-white sm:px-6 sm:py-8">
      <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <section className="grid w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#251f31] p-1 shadow-[0_28px_80px_rgba(18,12,28,0.45)] sm:max-w-xl lg:max-w-4xl lg:grid-cols-[1.05fr_1fr]">
          <aside className="relative min-h-[245px] overflow-hidden rounded-[24px] bg-[#161220] p-5 sm:min-h-[320px] lg:min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
              alt="Dusk landscape"
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#6d50df]/20 via-black/5 to-[#090713]/82" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 justify-center text-lg font-normal tracking-normal"
                >
                  <i className="text-2xl ri-perplexity-fill"></i>
                  <span>Perplexity</span>
                </Link>
              </div>

              <div className="max-w-[260px] pb-2 sm:pb-5 lg:mx-auto lg:pb-8 lg:text-center">
                <h2 className="text-2xl font-light leading-tight sm:text-3xl lg:text-xl">
                  Create Ideas,
                  <br />
                  Get Inspired
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/62 lg:block hidden">
                  Turn quick questions into sharper thinking with a focused workspace.
                </p>
                <p className="mt-3 text-sm leading-6 text-white/62 lg:hidden block">
                Where curiosity meets insight.
                
                </p>
            
              </div>
            </div>
          </aside>

          <main className="flex min-h-[410px] items-center justify-center px-6 py-9 sm:min-h-[440px] sm:px-10 lg:min-h-[520px]">
            <div className="w-full max-w-sm">
              <h1 className="text-[1.85rem] font-light tracking-normal text-white/82 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/52">
                {subtitle}{" "}
                <Link
                  to={isRegister ? "/login" : "/register"}
                  className="font-normal text-white/70 transition hover:text-white"
                >
                  {isRegister ? "Log in" : "Sign up"}
                </Link>
              </p>

              <form onSubmit={onSubmit} className="mt-7 space-y-4 sm:mt-8">
                <div className="space-y-4">
                  {fields.map((field) => {
                    const isPassword = field.type === "password";

                    return (
                      <label key={field.name} className="relative block">
                        <span className="sr-only">{field.placeholder}</span>
                        <input
                          type={isPassword && showPassword ? "text" : field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChange}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          className={`h-12 w-full rounded-xl border border-white/12 bg-[#30283d] px-4 text-sm font-light text-white outline-none transition placeholder:text-white/34 hover:border-white/18 focus:border-[#9a7af0] focus:bg-[#342c42] focus:ring-2 focus:ring-[#9a7af0]/20 sm:h-11 ${
                            isPassword ? "pr-11" : ""
                          }`}
                        />

                        {isPassword && (
                          <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/42 transition hover:text-white/80"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        )}
                      </label>
                    );
                  })}
                </div>

                {isRegister && (
                  <label className="flex items-center gap-2 pt-1 text-xs leading-5 text-white/55 sm:text-[11px]">
                    <span className="relative grid size-3.5 place-items-center rounded-sm border border-white/20 bg-white/90 text-[#2b213b]">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={onChange}
                        className="peer absolute inset-0 opacity-0"
                      />
                      <Check size={11} className="hidden peer-checked:block" strokeWidth={3} />
                    </span>
                    I agree to the Terms & Conditions
                  </label>
                )}

                <button
                  type="submit"
                  className="mt-3 h-12 w-full rounded-xl bg-[#7b5be6] text-sm font-normal text-white transition hover:bg-[#8b6cf1] focus:outline-none focus:ring-2 focus:ring-[#a68cff]/70 sm:h-11"
                >
                  {isRegister ? "Create account" : "Continue"}
                </button>
              </form>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default AuthCard;
