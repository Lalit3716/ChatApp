import React, { FC, useContext } from "react";
import { useNavigate } from "react-router";
import authContext from "../../contexts/authContext";
import { friendsContext } from "../../contexts/friendsContext";
import { User } from "../../interfaces/auth";
import { Request } from "../../interfaces/request";

interface Props {
  item: Request | User;
  type: "requests" | "friends";
}

const FriendsListItem: FC<Props> = ({ item, type }) => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const { acceptRequest, rejectRequest, cancelRequest, removeFriend } =
    useContext(friendsContext);

  let username, email, isSender;
  if (type === "requests") {
    isSender = (item as Request).sender._id === user!._id;
    username = isSender
      ? (item as Request).receiver.username
      : (item as Request).sender.username;
    email = isSender
      ? (item as Request).receiver.email
      : (item as Request).sender.email;
  } else {
    username = (item as User).username;
    email = (item as User).email;
  }

  const handleCrossClick = () => {
    if (type === "friends") {
      removeFriend(item as User);
    } else {
      const isSender = (item as Request).sender._id === user!._id;
      if (isSender) {
        cancelRequest(item as Request);
      } else {
        rejectRequest(item as Request);
      }
    }
  };

  return (
    <li className="flex items-center mb-5 dark:bg-slate-600 bg-gray-300 rounded p-4">
      <img
        src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
        alt="avatar"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="text-sm">
        <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
          {username}
        </h1>
        <p className="dark:text-gray-300 text-gray-500">{email}</p>
      </div>
      <div className="ml-auto space-x-2">
        {type === "friends" && (
          <button
            className="w-10 h-10 rounded-full text-white dark:bg-slate-700 hover:dark:bg-slate-800 bg-gray-500 hover:bg-gray-600"
            onClick={() => navigate(`/chats/${item._id}`)}
          >
            <i className="fa fa-comment-dots" />
          </button>
        )}
        {type === "requests" && !isSender && (
          <button
            className="w-10 h-10 rounded-full text-white bg-green-500 hover:bg-green-600"
            onClick={() => acceptRequest(item as Request)}
          >
            <i className="fa fa-check" />
          </button>
        )}
        <button
          className="w-10 h-10 rounded-full dark:bg-slate-700 hover:dark:bg-slate-800 rotate-45 text-red-500 bg-gray-500 hover:bg-gray-600"
          onClick={handleCrossClick}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    </li>
  );
};

export default FriendsListItem;
