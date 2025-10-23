"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Wallet, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hotel } from "./Chatbox";
import axios from "axios";

type Props = {
  hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    hotel && getGooglePlaceDetail();
  }, [hotel]);

  const getGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-places-detail", {
      placeName: hotel?.hotel_name,
    });

    if (result?.data.e) return;

    setPhotoUrl(result?.data);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-35 mb-2 overflow-hidden">
        <Image
          src={photoUrl ? photoUrl : "/images/hotel-placeholder.jpg"}
          alt="place-image"
          width={400}
          height={200}
          className="rounded-xl shadow object-cover w-full h-full"
          style={{ objectPosition: "center" }}
        />
      </div>
      <h2 className="front-semibold text-lg">{hotel?.hotel_name}</h2>
      <h2 className="text-gray-500">{hotel?.hotel_address}</h2>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-green-600">
          <Wallet />
          {hotel?.price_per_night}
        </p>
        <p className="flex gap-2 text-yellow-500">
          <Star />
          {hotel?.rating}
        </p>
      </div>
      <Link
        href={
          "https://www.google.com/maps/search/?api=1&query=" + hotel?.hotel_name
        }
        target="_blank"
      >
        <Button
          variant={"outline"}
          className="mt-1 hover:cursor-pointer w-full"
        >
          View
        </Button>
      </Link>
      {/* <p className="line-clamp-2 text-gray-500">{hotel?.description}</p> */}
    </div>
  );
}

export default HotelCardItem;
