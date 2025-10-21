"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React from "react";
import { useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import FinalUi from "./FinalUi";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSend = async (inputText?: string) => {
    const messageToSend = inputText?.trim() || userInput?.trim();
    if (!messageToSend) return;

    setLoading(true);
    const newMessage: Message = { role: "user", content: messageToSend };

    try {
      setMessages((prev: Message[]) => [...prev, newMessage]);

      if (!inputText) setUserInput("");

      const result = await axios.post("/api/ai", {
        messages: [...messages, newMessage],
      });

      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.response,
          ui: result?.data?.ui,
        },
      ]);
      console.log(result.data);
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
            onSend(value);
          }}
        />
      );
    } else if (uiType == "groupsize") {
      return (
        <GroupSizeUi
          onSelectedOption={(value: string) => {
            onSend(value);
          }}
        />
      );
    } else if (uiType == "tripduration") {
      // Implement trip duration UI when ready
      return null;
    } else if (uiType == "final") {
      return <FinalUi viewTrip={() => console.log()} />;
    } return null;
  };

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
