"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "./auth/AuthProvider";

const menuOptions = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact us", path: "/contact-us" },
];

function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/create-new-trip");
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-2">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>
      {/* Menu Options */}
      <div className="flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      {/* Auth Button */}
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name}</span>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={() => router.push("/create-new-trip")}
          >
            Create Trip
          </Button>
        </div>
      ) : (
        <AuthModal>
          <Button className="hover:cursor-pointer">Get Started</Button>
        </AuthModal>
      )}
    </div>
  );
}

export default Header;
