import { FC, useState } from "react";
import FriendsList from "../Chats/FriendsList";
import SearchBar from "../Utils/InputBar";

const Friends: FC = () => {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

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
          />
          {active === "requests" && (
            <button className="mt-2 bg-green-400 text-gray-900 rounded px-4 py-2">
              <i className="fas fa-plus" />
              <span className="ml-2">Add Friend</span>
            </button>
          )}
        </div>
      </div>
      <div className="w-full">
        <FriendsList />
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
