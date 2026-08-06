"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="h-15">
        <h1 className="pl-6 md:pl-12 pt-4 text-lg md:text-xl italic text-blue-900">
          Solar Estimation System
        </h1>
      </header>

      <main>
        <section className="h-screen bg-[url('/bg_solar.png')] bg-cover bg-center">
          <p className="absolute top-36 left-6 md:top-45 md:left-30 text-sm md:text-base">
            ☼ Smart, Sustainable, Cost-Effective
          </p>

          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-black text-4xl sm:text-5xl md:text-6xl pt-36 md:pt-40 ml-6 md:ml-15"
          >
            Power Your Future
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-black text-4xl sm:text-5xl md:text-6xl ml-6 md:ml-15"
          >
            with Solar
          </motion.h2>

          <p className="mt-4 text-black text-sm md:text-base ml-6 md:ml-15">
            Discover the estimated cost and installation timeline tailored to
            your needs
          </p>

          <p className="text-black text-sm md:text-base ml-6 md:ml-15">
            tailored to your needs
          </p>

          <Link href="/estimate">
            <button className="border-2 px-8 md:px-11 py-2 md:py-1 text-base md:text-lg ml-6 md:ml-15 mt-5 bg-white text-black rounded-xl transition duration-300 hover:scale-105">
              Estimate Now →
            </button>
          </Link>
        </section>
      </main>

      <footer>
        {/* Footer */}
      </footer>
    </>
  );
}