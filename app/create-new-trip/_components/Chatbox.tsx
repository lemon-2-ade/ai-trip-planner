"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import FinalUi from "./FinalUi";
import TripDurationUi from "./TripDurationUi";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo = {
  budget: string,
  destination: string,
  duration: string,
  group_size: string,
  origin: string,
  hotels: Hotel[],
  itinerary: Itinerary,
};

export type Hotel = {
  hotel_name: string,
  hotel_address: string,
  price_per_night: string,
  hotel_image_url: string,
  geo_coordinates: {
    latitude: number,
    longitude: number,
  },
  rating: number,
  description: string,
};

export type Activity = {
  place_name: string,
  place_details: string,
  place_image_url: string,
  geo_coordinates: {
    latitude: number,
    longitude: number,
  },
  place_address: string,
  ticket_pricing: string,
  time_travel_each_location: string,
  best_time_to_visit: string,
};

export type Itinerary = {
  day: number,
  day_plan: string,
  best_time_to_visit_day: string,
  activities: Activity[],
};

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>(null);

  const onSend = async () => {
    if (!userInput?.trim()) return;

    setLoading(true);
    setUserInput("");

    const newMessage: Message = {
      role: "user",
      content: userInput,
    };

    setMessages((prev: Message[]) => [...prev, newMessage]);

    try {
      const result = await axios.post("/api/ai", {
        messages: [...messages, newMessage],
        isFinal: isFinal,
      });
      console.log(result.data);

      !isFinal &&
        setMessages((prev: Message[]) => [
          ...prev,
          {
            role: "assistant",
            content: result?.data?.response,
            ui: result?.data?.ui,
          },
        ]);

      if (isFinal) {
        setTripDetail(result?.data?.trip_plan);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const RenderGenerativeUi = (ui: string) => {
    const uiType = (ui || "").toLowerCase().trim();
    console.log("Rendering UI type:", uiType); // Debug log

    if (uiType == "budget") {
      return (
        <BudgetUi
          onSelectedOption={(value: string) => {
            setUserInput(value);
          }}
        />
      );
    } else if (uiType == "groupsize") {
      return (
        <GroupSizeUi
          onSelectedOption={(value: string) => {
            setUserInput(value);
          }}
        />
      );
    } else if (uiType == "tripduration") {
      return (
        <TripDurationUi
          onSelectedOption={(value: string) => {
            setUserInput(value);
          }}
        />
      );
    } else if (uiType == "final") {
      return <FinalUi viewTrip={() => console.log()} disable={!tripDetail} />;
    }
    return null;
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.ui == "final") {
      setIsFinal(true);
      setUserInput("Okay great!");
      onSend();
    }
  }, [messages]);

  return (
    <div className="h-[80vh] flex flex-col">
      {messages.length === 0 && <EmptyBoxState />}
      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div key={index} className="flex justify-end mt-2">
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start mt-2">
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin h-5 w-5" />
            </div>
          </div>
        )}
      </section>
      {/* User Input */}
      <section>
        <div className="border-2 shadow-lg rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
          <Button
            size={"icon"}
            className="absolute bottom-6 right-6 hover:cursor-pointer"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Chatbox;
