"use client";

import Link from "next/link";
import Image from "next/image";
import React, { use } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const path = usePathname();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/create-new-trip");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
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
          <Image
            src={user?.imageUrl || "/default-avatar.png"}
            alt="User Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-sm">Welcome, {user?.name}</span>
          <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
          {path == "/create-new-trip" ? (
            <Link href="/my-trips">
              <Button className="hover:cursor-pointer">My Trips</Button>
            </Link>
          ) : (
            <Link href="/create-new-trip">
              <Button className="hover:cursor-pointer">Create Trip</Button>
            </Link>
          )}
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
