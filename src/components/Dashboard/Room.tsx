import React from "react";
import { useParams } from "react-router";

const Room = () => {
  const { roomId } = useParams();

  return (
    <div className="flex-1 p-4">
      <h1 className="text-3xl text-gray-200">Room Id: {roomId}</h1>
    </div>
  );
};

export default Room;
