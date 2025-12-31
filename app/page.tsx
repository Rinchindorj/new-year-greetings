"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Snowflake, Gift, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#062016] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Snowflakes background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute animate-bounce" style={{ left: `${i * 7}%`, top: `${i * 5}%` }}>
            <Snowflake size={24} />
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center space-y-6"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-red-600 p-6 rounded-full shadow-2xl shadow-red-900/50">
            <Gift size={60} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent">
          Personalized <br /> Greetings
        </h1>
        
        <p className="text-xl text-emerald-100/70 max-w-md mx-auto italic">
          Create and send beautiful New Year messages to your loved ones.
        </p>

        <div className="pt-8">
          <Link href="/admin">
            <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2 mx-auto transition-all transform hover:scale-105 shadow-xl">
              Go to Creator <ChevronRight />
            </button>
          </Link>
        </div>
      </motion.div>

      <footer className="absolute bottom-10 text-white/30 text-sm">
        Built with ❤️ for 2025
      </footer>
    </div>
  );
}