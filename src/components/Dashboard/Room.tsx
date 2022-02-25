import React, { useState } from "react";
import { useParams } from "react-router";
import ChatBox from "../Chats/ChatBox";
import MessageBox from "../Utils/InputBar";

const Room = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");

  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="flex items-center p-2 bg-slate-100 dark:bg-gray-700">
        <img
          src={`https://avatars.dicebear.com/api/initials/${"Jane Doe"}.svg`}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="text-sm">
          <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
            {"Jane Doe"}
          </h1>
          <p className="dark:text-gray-300 text-gray-500">
            {"janeDoe@gmail.com"}
          </p>
        </div>
      </div>
      <div className="overflow-auto p-4 dark:text-gray-200 flex-1">
        <ChatBox
          message="Hello How Are You?"
          isAuthor={true}
          date={new Date()}
        />
        <ChatBox message="I am fine you?" isAuthor={false} date={new Date()} />
      </div>
      <div className="p-4">
        <MessageBox value={message} onChange={setMessage} icon="paper-plane" />
      </div>
    </div>
  );
};

export default Room;
