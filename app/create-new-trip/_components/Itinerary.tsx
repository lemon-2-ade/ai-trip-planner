"use client";

import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./Chatbox";
import GoogleMap from "./GoogleMap";

// const TRIP_DATA = {
//   destination: "Manali",
//   duration: "8 days",
//   origin: "Goa",
//   budget: "Cheap",
//   group_size: "3 to 5 people",
//   hotels: [
//     {
//       hotel_name: "Hotel Manali Heights",
//       hotel_address: "Near Tibetan Monastery, Manali, Himachal Pradesh, 175131",
//       price_per_night: "₹800 - ₹1200",
//       hotel_image_url:
//         "https://www.example.com/images/hotel-manali-heights.jpg",
//       geo_coordinates: {
//         latitude: 32.2396,
//         longitude: 77.1887,
//       },
//       rating: 4.1,
//       description:
//         "A budget-friendly hotel offering basic amenities, located near Tibetan Monastery. Great for families seeking comfort without breaking the bank.",
//     },
//     {
//       hotel_name: "The Mountain Manali Guest House",
//       hotel_address: "Old Manali Road, Manali, Himachal Pradesh, 175131",
//       price_per_night: "₹700 - ₹1100",
//       hotel_image_url: "https://www.example.com/images/mountain-manali.jpg",
//       geo_coordinates: {
//         latitude: 32.2384,
//         longitude: 77.1931,
//       },
//       rating: 4,
//       description:
//         "Cozy family guesthouse with warm hospitality and peaceful surroundings, ideal for travelers on a budget.",
//     },
//     {
//       hotel_name: "Hotel Snow Leopard",
//       hotel_address: "Near Mall Road, Manali, Himachal Pradesh, 175131",
//       price_per_night: "₹900 - ₹1300",
//       hotel_image_url: "https://www.example.com/images/hotel-snow-leopard.jpg",
//       geo_coordinates: {
//         latitude: 32.2399,
//         longitude: 77.1892,
//       },
//       rating: 4.2,
//       description:
//         "Affordable hotel with scenic views and close proximity to Mall Road, perfect for families exploring Manali.",
//     },
//   ],
//   itinerary: [
//     {
//       day: 1,
//       day_plan: "Arrival in Manali and settle into hotel",
//       best_time_to_visit_day: "Afternoon",
//       activities: [
//         {
//           place_name: "Hadimba Temple",
//           place_details:
//             "Ancient cave temple surrounded by cedar forests, dedicated to goddess Hadimba.",
//           place_image_url: "https://www.example.com/images/hadimba-temple.jpg",
//           geo_coordinates: {
//             latitude: 32.2346,
//             longitude: 77.1901,
//           },
//           place_address: "Manali, Himachal Pradesh 175131",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "20 minutes from hotel",
//           best_time_to_visit: "Afternoon (2 PM - 5 PM)",
//         },
//       ],
//     },
//     {
//       day: 2,
//       day_plan: "Explore Old Manali Village and local markets",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "Old Manali",
//           place_details:
//             "A scenic village known for its cafes, handicrafts, and relaxed atmosphere.",
//           place_image_url: "https://www.example.com/images/old-manali.jpg",
//           geo_coordinates: {
//             latitude: 32.2387,
//             longitude: 77.194,
//           },
//           place_address: "Old Manali, Manali, Himachal Pradesh",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "15 minutes from hotel",
//           best_time_to_visit: "Morning (9 AM - 12 PM)",
//         },
//         {
//           place_name: "Manali Mall Road",
//           place_details:
//             "Shopping street with local shops, eateries, and handicraft stalls.",
//           place_image_url: "https://www.example.com/images/mall-road.jpg",
//           geo_coordinates: {
//             latitude: 32.239,
//             longitude: 77.1895,
//           },
//           place_address: "Manali Mall Road, Manali, Himachal Pradesh",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "10 minutes from Old Manali",
//           best_time_to_visit: "Afternoon (1 PM - 4 PM)",
//         },
//       ],
//     },
//     {
//       day: 3,
//       day_plan: "Visit Solang Valley for adventure and nature",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "Solang Valley",
//           place_details:
//             "Beautiful valley known for adventure sports like paragliding, zorbing, and skiing in winter.",
//           place_image_url: "https://www.example.com/images/solang-valley.jpg",
//           geo_coordinates: {
//             latitude: 32.273,
//             longitude: 77.1608,
//           },
//           place_address: "Solang Valley, Manali, Himachal Pradesh",
//           ticket_pricing: "Free entry; activity costs vary",
//           time_travel_each_location: "40 minutes from hotel",
//           best_time_to_visit: "Morning (8 AM - 12 PM)",
//         },
//       ],
//     },
//     {
//       day: 4,
//       day_plan: "Explore Naggar Castle and Village",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "Naggar Castle",
//           place_details:
//             "Historical castle offering stunning views of the Kullu Valley.",
//           place_image_url: "https://www.example.com/images/naggar-castle.jpg",
//           geo_coordinates: {
//             latitude: 32.2267,
//             longitude: 77.1533,
//           },
//           place_address: "Naggar, Himachal Pradesh",
//           ticket_pricing: "₹20 per person",
//           time_travel_each_location: "45 minutes from hotel",
//           best_time_to_visit: "Morning (9 AM - 12 PM)",
//         },
//         {
//           place_name: "Nicholas Roerich Art Gallery",
//           place_details:
//             "Art gallery showcasing the works of Russian painter Nicholas Roerich.",
//           place_image_url: "https://www.example.com/images/roerich-gallery.jpg",
//           geo_coordinates: {
//             latitude: 32.2271,
//             longitude: 77.1537,
//           },
//           place_address: "Naggar, Himachal Pradesh",
//           ticket_pricing: "₹10 per person",
//           time_travel_each_location: "5 minutes from Naggar Castle",
//           best_time_to_visit: "Afternoon (1 PM - 3 PM)",
//         },
//       ],
//     },
//   ],
// };

function Itinerary() {
  // @ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);

  const data = tripData
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData?.hotels.map((hotel, index: number) => (
                <HotelCardItem hotel={hotel} key={index} />
              ))}
            </div>
          ),
        },
        ...tripData?.itinerary.map((itinerary, index: number) => ({
          title: `Day ${itinerary.day}`,
          content: (
            <div key={index}>
              <p>Best Time: {itinerary?.best_time_to_visit_day}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itinerary?.activities.map((activity, index: number) => (
                  <PlaceCardItem activity={activity} key={index} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];

  return (
    <div className="relative w-full h-[80vh] overflow-auto">
      {!tripData && (
        <div className="w-full h-full p-4">
          <GoogleMap />
        </div>
      )}
      {tripData && <Timeline data={data} tripData={tripData} />}
    </div>
  );
}

export default Itinerary;
