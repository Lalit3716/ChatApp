import { FC } from "react";
import { User } from "../../interfaces/auth";
import { Request } from "../../interfaces/request";
import FriendsListItem from "./FriendsListItem";

interface Props {
  type: "requests" | "friends";
  filterOnline?: boolean;
  friends: Request[] | User[];
}

const FriendsList: FC<Props> = ({ friends, type, filterOnline = false }) => {
  return (
    <div className="mt-2 rounded p-4">
      <ul>
        {friends.map((friend, index) => {
          if (type === "requests") {
            return (
              <FriendsListItem item={friend} type="requests" key={index} />
            );
          }
          if (type === "friends") {
            if (filterOnline) {
              if ((friend as User).online) {
                return (
                  <FriendsListItem item={friend} type="friends" key={index} />
                );
              }
            } else {
              return (
                <FriendsListItem item={friend} type="friends" key={index} />
              );
            }
          }
        })}
      </ul>
      {friends.length === 0 && (
        <div className="text-center dark:text-gray-200">
          {type === "requests" ? "No requests" : "No friends"}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
