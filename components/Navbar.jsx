"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs"; 


const Navbar = () => {
  const { router, user } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-2 md:px-16 lg:px-32 py-1 pb-3 border-b border-gray-300 text-gray-700 mb-4">
      <Image
        className="cursor-pointer w-32 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-md:hidden">
        <Link
          href="/"
          className="hover:text-orange-500 hover:font-semibold transition"
        >
          Home
        </Link>

        <Link
          href="/"
          className="hover:text-orange-500 hover:font-semibold transition"
        >
          Analyst
        </Link>

        <Link
          href="#contact"
          className="hover:text-orange-500 hover:font-semibold transition"
        >
          Contact
        </Link>
        
          <button
            onClick={() => router.push("/")}
            className="text-xs bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 transition"
          >
            Progress Analisis Data Anda
          </button>
      </div>
      <ul className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <UserButton />
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-orange-500 hover:font-semibold transition"
          >
            <Image src={assets.user_icon} alt="user icon" className="w-6 h-6" />
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <button className="group flex items-center gap-2 hover:text-orange-500 hover:font-semibold transition">
          <Image
            src={assets.user_icon}
            alt="user icon"
            className="w-6 h-6 transition group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:hue-rotate-30"
          />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
