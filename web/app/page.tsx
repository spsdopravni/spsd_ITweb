'use client';

import { motion } from "motion/react"
import React from "react";
// lucide react icons


export default function Home() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl text-white font-bold mb-4">Welcome to the Student Map</h1>
      <p className="text-lg text-white">Vytvořeno studenty, pro studenty</p>
    </motion.div>
  );
}
