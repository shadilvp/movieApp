import React from "react";

type GlowEffectCardBackgroundProps = {
  children: React.ReactNode;
};

export const GlowEffectCardBackground: React.FC<GlowEffectCardBackgroundProps>  = ({ children }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-md opacity-75 animate-pulse"></div>

      {/* Inner Card */}
      <div className="relative z-10 rounded-2xl bg-black p-8 border border-gray-800 shadow-lg">
        {children}
      </div>
    </div>
  );
};


