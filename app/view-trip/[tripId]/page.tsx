"use client";

import { useAuth } from "@/app/_components/auth/AuthProvider";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trip } from "@/app/my-trips/page";
import Itinerary from "@/app/create-new-trip/_components/Itinerary";
import { useTripDetail } from "@/app/provider";

function ViewTrip() {
  const { tripId } = useParams();
  const { user } = useAuth();
  const [tripData, setTripData] = useState<Trip>();
  // @ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

  const getTrip = async () => {
    const res = await axios.get(`/api/trips/${tripId}`);
    const trip = res.data;
    setTripData(trip);
    setTripDetailInfo(trip.tripDetails);
  };

  useEffect(() => {
    user && getTrip();
  }, [user]);

  return (
    <div>
      <Itinerary />
    </div>
  );
}

export default ViewTrip;
