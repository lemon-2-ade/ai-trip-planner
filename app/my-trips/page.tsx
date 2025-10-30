"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../_components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

function MyTrips() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    if (user === null) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
    
    user && getUserTrips();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-200/30 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderCircle className="animate-spin h-15 w-15 text-gray-700" />
      </div>
    );
  }

  const getUserTrips = async () => {
    const res = await axios.get("/api/trips", {
      params: { userId: user?.id },
    });
    const trips = res.data;
    console.log(trips);
  };

  return (
    <div className="px-10 p-10 md:px-24 lg:px-48">
      <h2 className="font-bold text-2xl">My Trips</h2>
      {myTrips.length === 0 && (
        <div className="p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6">
          <h2>You haven't created any plans yet!</h2>
          <Link href="/create-new-trip">
            <Button className="hover:cursor-pointer">Create New Trip</Button>
          </Link>
        </div>
      )}

      
    </div>
  );
}

export default MyTrips;
