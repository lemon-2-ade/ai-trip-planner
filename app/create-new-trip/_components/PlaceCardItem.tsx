"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Ticket, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity } from "./Chatbox";

type Props = {
  activity: Activity;
};

function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    activity && getGooglePlaceDetail();
  }, [activity]);

  const getGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-places-detail", {
      placeName: activity?.place_name + ":" + activity?.place_address,
    });

    if (result?.data.e) return;

    setPhotoUrl(result?.data);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-35 mb-2 overflow-hidden rounded-xl">
        <Image
          src={photoUrl ? photoUrl : "/goa.jpg"}
          width={400}
          height={200}
          alt={activity?.place_name}
          className="object-cover w-full h-full"
          style={{ objectPosition: "center" }}
        />
      </div>
      <h2 className="font-semibold text-lg">{activity?.place_name}</h2>
      <p className="text-gray-500 line-clamp-2">{activity?.place_details}</p>
      <h2 className="flex gap-2 text-blue-500 line-clamp-2">
        <Ticket />
        {activity?.ticket_pricing}
      </h2>
      <p className="flex text-orange-400 line-clamp-1">
        <Clock /> {activity?.best_time_to_visit}
      </p>
      <Link
        href={
          "https://www.google.com/maps/search/?api=1&query=" +
          activity?.place_name
        }
        target="_blank"
      >
        <Button
          size={"sm"}
          variant={"outline"}
          className="w-full mt-2 hover:cursor-pointer"
        >
          View <ExternalLink />
        </Button>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
