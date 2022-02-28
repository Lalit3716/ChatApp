import { FC, useContext, useState } from "react";
import { friendsContext } from "../../contexts/friendsContext";
import { Request } from "../../utils/request";
import FriendsList from "../Chats/FriendsList";
import SearchBar from "../Utils/InputBar";
import useHttp from "../../hooks/useHttp";
import { User } from "../../interfaces/auth";
import authContext from "../../contexts/authContext";

const Friends: FC = () => {
  const { isLoading, sendRequest, error } = useHttp();
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const { friends, requests, sendRequestTo } = useContext(friendsContext);
  const { user: loggedInUser } = useContext(authContext);

  const onSendRequest = (username: string) => {
    if (!username) {
      return;
    }
    const url =
      `${process.env.SERVER || "http://localhost:8000"}/users/` + username;
    sendRequest(
      () => Request.get(url),
      {},
      (user: User) => {
        if (user._id === loggedInUser!._id) {
          alert("You can't send request to yourself");
          return;
        }

        if (friends.find(f => f._id.toString() === user._id.toString())) {
          alert("You are already friends with this user");
          return;
        }

        sendRequestTo(user);
      }
    );
  };

  return (
    <div className="h-full p-4 flex-1 overflow-auto">
      <div className="flex w-full justify-between items-center flex-col space-y-2 sm:flex-row">
        <div className="flex space-x-4 dark:text-gray-400 text-gray-500">
          <Tab
            label="All"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          <Tab
            label="Online"
            active={active === "online"}
            onClick={() => setActive("online")}
          />
          <Tab
            label="Requests"
            active={active === "requests"}
            onClick={() => setActive("requests")}
          />
        </div>
        <div>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeHolder={active === "requests" ? "Username" : "Search"}
            icon="search"
            error={error && active === "requests"}
          />
          {error !== "" && active === "requests" && (
            <div className="text-red-500">{error}</div>
          )}
          {active === "requests" && (
            <button
              className="mt-2 bg-green-400 text-gray-900 rounded px-4 py-2"
              onClick={() => onSendRequest(search)}
            >
              <i className="fas fa-plus" />
              <span className="ml-2">Add Friend</span>
            </button>
          )}
        </div>
      </div>
      <div className="w-full">
        <FriendsList
          friends={active === "requests" ? requests : friends}
          type={active === "requests" ? "requests" : "friends"}
          filterOnline={active === "online"}
        />
      </div>
    </div>
  );
};

interface TabProps {
  active: boolean;
  label: string;
  onClick?: () => void;
}

const Tab: FC<TabProps> = props => {
  return (
    <div onClick={props.onClick}>
      <span
        className={`dark:font-semibold cursor-pointer ${
          props.active && "dark:text-gray-200 font-semibold text-gray-900"
        }`}
      >
        {props.label}
      </span>
    </div>
  );
};

export default Friends;
