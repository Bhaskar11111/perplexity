import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Purple Glow */}
      <div className="absolute left-1/2 top-40 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-8 py-24">

        <span className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
          About
        </span>

        <h1 className="max-w-3xl text-5xl font-thin leading-tight md:text-6xl">
          Etos is an AI workspace designed to feel
          <span className="text-violet-400"> simple, focused</span> and
          human.
        </h1>

        <p className="mt-10 max-w-2xl text-lg font-light leading-8 text-white/60">
          Instead of overwhelming the experience with countless features,
          Etos focuses on thoughtful conversations, clean design and an
          interface that disappears into the background so your ideas stay in
          the foreground.
        </p>

        <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-white/60">
          Every interaction is designed to feel calm, fast and intuitive.
          Whether you're writing, brainstorming, learning or simply thinking,
          Etos provides a space where AI feels like a natural extension of your
          workflow.
        </p>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-10 flex flex-col gap-4 text-sm text-white/45">
          <p>
            <span className="text-white/70">Project</span> - Etos
          </p>

          <p>
            <span className="text-white/70">Designed & Developed by</span> -
            Bhaskar Mishra
          </p>

          <p>
            <span className="text-white/70">Vision</span> - Making AI feel
            elegant, accessible and distraction-free.
          </p>
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
          >
            Back Home
          </Link>
        </div>

      </section>
    </main>
  );
}