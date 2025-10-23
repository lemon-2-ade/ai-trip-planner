'use client';

import React, { useEffect } from "react";
import Image from "next/image";
import { Wallet, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hotel } from "./Chatbox";
import axios from "axios";

function HotelCardItem({ hotel }: { hotel: Hotel }) {
  useEffect(() => {
    hotel && getGooglePlaceDetail();
  }, [hotel]);
  
  const getGooglePlaceDetail = async () => {
    const result = await axios.post('/api/google-place-detail', {
      placeName: hotel.hotel_name
    });
    console.log(result.data);
  };

  return (
    <div className="flex flex-col gap-1">
      <Image
        src={"/hotel.jpg"}
        alt="place-image"
        width={400}
        height={200}
        className="rounded-xl shadow object-cover mb-2"
      />
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
        <Button variant={"outline"} className="mt-1 hover:cursor-pointer">
          View
        </Button>
      </Link>
      {/* <p className="line-clamp-2 text-gray-500">{hotel?.description}</p> */}
    </div>
  );
}

export default HotelCardItem;
