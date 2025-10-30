"use client";

import React, { useEffect, useState } from "react";
import { ArrowBigRightIcon } from "lucide-react";
import Image from "next/image";
import { Trip } from "../page";
import axios from "axios";
import Link from "next/link";

function MyTripCardItem({ trip }: { trip: Trip }) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    trip && getGooglePlaceDetail();
  }, [trip]);

  const getGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-places-detail", {
      placeName: trip?.tripDetails?.destination,
    });

    if (result?.data.e) return;

    setPhotoUrl(result?.data);
  };

  return (
    <Link href={`/view-trip/${trip?.id}`} className="p-3 shadow rounded-2xl ">
      {/* <Image
        src={photoUrl ? photoUrl : "/goa.jpg"}
        alt={trip?.id}
        width={400}
        height={400}
        className="rounded-xl object-cover"
      /> */}
      <div className="relative w-full h-40 mb-2 overflow-hidden">
        <Image
          src={photoUrl ? photoUrl : "/images/hotel-placeholder.jpg"}
          alt="place-image"
          width={400}
          height={400}
          className="rounded-xl shadow object-cover w-full h-full"
          style={{ objectPosition: "center" }}
        />
      </div>
      <h2 className="flex gap-2 font-semibold text-xl mt-2">
        {trip?.tripDetails?.origin} <ArrowBigRightIcon />{" "}
        {trip?.tripDetails?.destination}
      </h2>
      <h2 className="mt-2 text-gray-500">
        {trip?.tripDetails?.duration} Trip with {trip?.tripDetails?.budget}{" "}
        Budget
      </h2>
    </Link>
  );
}

export default MyTripCardItem;
