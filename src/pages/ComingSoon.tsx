import React, { useEffect, useState } from "react";
import Logo from "../assets/svg/logo_with_text.svg";

const ComingSoon: React.FC = () => {
  const [typed, setTyped] = useState("");
  const tagline =
    "We’re building something powerful... Stay tuned while data meets destiny.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(tagline.slice(0, i + 1));
      i++;
      if (i === tagline.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden animate-gradient">
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background: linear-gradient(-45deg, #0f172a, #1e3a8a, #0ea5e9, #0f172a);
            background-size: 400% 400%;
            animation: gradientShift 18s ease infinite;
          }
 
          @keyframes spinAura {
            0% { transform: rotate(0deg) scale(1); }
            100% { transform: rotate(360deg) scale(1.05); }
          }
 
          .shimmer-text {
            background: linear-gradient(90deg, #fff, #38bdf8, #fff);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 4s linear infinite;
          }
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>
      ={" "}
      <div className="relative mb-[80px]">
        <div className="absolute -inset-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full blur-3xl animate-[spinAura_12s_linear_infinite]"></div>
        <img
          src={Logo}
          alt="ALPHAS Logo"
          className="relative w-[300px] h-auto"
        />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-10 shimmer-text">
        Coming Soon
      </h1>
      <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mt-12 leading-relaxed min-h-[60px]">
        {typed}
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-12 inline-flex items-center gap-2 px-8 py-3 rounded-full border border-cyan-400 text-cyan-300 font-medium bg-white/5 backdrop-blur-md shadow-lg hover:bg-cyan-500/10 hover:border-cyan-300 hover:text-white hover:shadow-cyan-500/40 transition-all duration-300"
      >
        <span className="text-lg">←</span> Go Back
      </button>
      <footer className="fixed bottom-0 left-0 w-full py-4 bg-black/30 backdrop-blur-md border-t border-cyan-500/20 text-center">
        <p className="text-gray-300 text-sm">
          © ALPHAS {new Date().getFullYear()} • Command Your Business Future
        </p>
      </footer>
    </section>
  );
};

export default ComingSoon;
