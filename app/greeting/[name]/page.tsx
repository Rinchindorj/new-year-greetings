"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Snowflake, Star, Gift, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

// 1. Main Page Component with Suspense (Required for Next.js 15)
export default function GreetingPage({ params }: { params: Promise<{ name: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#062016] flex items-center justify-center text-white font-serif">
        <p className="animate-pulse">Unwrapping your gift...</p>
      </div>
    }>
      <GreetingContent params={params} />
    </Suspense>
  );
}

// 2. The Actual Content Component
function GreetingContent({ params }: { params: Promise<{ name: string }> }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  
  // Unwrap the name from params (Next.js 15 way)
  const resolvedParams = React.use(params);
  const name = decodeURIComponent(resolvedParams.name);
  
  // Get data from URL search parameters
  const conclusion = searchParams.get('c') || "This year was a journey of growth.";
  const cheering = searchParams.get('s') || "Wishing you massive success in 2025!";

  // Wait for client-side to prevent "Hydration Mismatch" error
  useEffect(() => {
    setMounted(true);
  }, []);

  const nextStep = () => {
    setStep(2);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ffd700', '#ffffff']
    });
  };

  return (
    <div className="min-h-screen bg-[#062016] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Snowfall Background (Only shows after mounting) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20 }}
              animate={{ y: 1000, x: [0, 25, -25, 0] }}
              transition={{ duration: 10 + (i % 5), repeat: Infinity, ease: "linear" }}
              className="absolute text-white"
              style={{ left: `${(i * 7) % 100}%`, top: `-5%` }}
            >
              <Snowflake size={20} />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 ? (
          /* PAGE 1: CONCLUSION */
          <motion.div
            key="page1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="z-10 text-center max-w-lg bg-red-900/40 p-12 rounded-[40px] border-2 border-yellow-600/30 backdrop-blur-xl shadow-[0_0_50px_rgba(185,28,28,0.3)]"
          >
            <div className="flex justify-center mb-6 text-yellow-500">
              <Gift size={48} />
            </div>
            <h1 className="text-4xl font-bold mb-4 font-serif text-yellow-100">
              Hello, {name}!
            </h1>
            <p className="text-xl text-red-50/90 italic leading-relaxed mb-10">
              "{conclusion}"
            </p>
            <button 
              onClick={nextStep}
              className="group bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 mx-auto transition-all transform hover:scale-105"
            >
              Next Page <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ) : (
          /* PAGE 2: CHEERING */
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 text-center max-w-lg bg-white/10 p-12 rounded-[40px] border-2 border-white/20 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex justify-center mb-6 text-yellow-400 animate-pulse">
              <Star size={50} fill="currentColor" />
            </div>
            
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
              Happy 2025!
            </h2>
            
            <p className="text-2xl font-light text-white mb-8">
              {cheering}
            </p>

            <div className="flex flex-col gap-6 items-center">
              <div className="h-1 w-20 bg-yellow-600 rounded-full"></div>
              
              <button 
                onClick={() => setStep(1)}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                Go back to first page
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}