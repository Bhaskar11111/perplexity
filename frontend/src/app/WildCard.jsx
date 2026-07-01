import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";

const WildCard = () => {

    const navigate=useNavigate()

  return (
    <div className="min-h-screen bg-[#716a82] px-3 py-4 font-light text-white sm:px-6 sm:py-8">
      <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <section className="grid w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#251f31] p-1 shadow-[0_28px_80px_rgba(18,12,28,0.45)] sm:max-w-xl lg:max-w-4xl lg:grid-cols-[1.05fr_1fr]">

          {/* Left Side */}
          <aside className="relative min-h-[245px] overflow-hidden rounded-[24px] bg-[#161220] p-5 sm:min-h-[320px] lg:min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
              alt="Landscape"
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#6d50df]/20 via-black/5 to-[#090713]/82" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="inline-flex items-center gap-1 text-lg font-normal tracking-normal">
                <i className="text-2xl ri-perplexity-fill"></i>
                <span>Perplexity</span>
              </div>

              <div className="max-w-[260px] pb-2 sm:pb-5 lg:mx-auto lg:pb-8 lg:text-center">
                <h2 className="text-2xl font-light leading-tight sm:text-3xl lg:text-xl">
                  Not all those who wander
                  <br/>
                  are lost.  
                </h2>

                <p className="mt-3 hidden text-sm leading-6 text-white/62 lg:block">
                  -JRR Tolkien
                </p>

                <p className="mt-3 block text-sm leading-6 text-white/62 lg:hidden">
                  Where curiosity meets insight.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Side */}
          <main className="flex min-h-[410px] items-center justify-center px-6 py-9 sm:min-h-[440px] sm:px-10 lg:min-h-[520px]">
            <div className="w-full max-w-sm">

              <h1 className="text-center text-7xl font-semibold tracking-normal text-white">
                404
              </h1>

              <h2 className="mt-2 text-center text-[1.85rem] font-light text-white/90 sm:text-3xl">
                Page Not Found
              </h2>

              <p className="mt-4 text-center text-sm leading-6 text-white/52">
                Sorry, the page you're looking for doesn't exist or has been
                moved.
              </p>

              
               <button onClick={()=>navigate(-1)} className="mt-3 h-12 w-full rounded-xl bg-[#7b5be6] text-sm text-center font-normal text-white transition hover:bg-[#8b6cf1] focus:outline-none focus:ring-2 focus:ring-[#a68cff]/70 sm:h-11">Back</button>
              

              <p className="mt-7 text-center text-sm leading-6 text-white/52">
                Don't have an account?{" "}
               <Link to='/register'>
                <span className="font-normal text-white/70 hover:text-white transition-all duration-100">
                  Sign up
                </span></Link>
              </p>

            </div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default WildCard;