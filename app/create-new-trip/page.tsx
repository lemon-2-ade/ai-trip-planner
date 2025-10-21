import React from "react";
import Chatbox from "./_components/Chatbox";

function CreateNewTripPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10 p-10">
      <div>
        <Chatbox />
      </div>
      <div>Map and trip Plan to Display</div>
    </div>
  );
}

export default CreateNewTripPage;
