"use client";

import React, { useEffect, useState } from "react";
import Chatbox from "./_components/Chatbox";
import Itinerary from "./_components/Itinerary";
import { useAuth } from "../_components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

function CreateNewTripPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-200/30 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderCircle className="animate-spin h-15 w-15 text-gray-700" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-10 p-10">
      <div>
        <Chatbox />
      </div>
      <div className="col-span-2">
        <Itinerary />
      </div>
    </div>
  );
}

export default CreateNewTripPage;
