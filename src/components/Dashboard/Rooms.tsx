import { FC, useContext } from "react";
import { createPortal } from "react-dom";
import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { friendsContext } from "../../contexts/friendsContext";

interface Props {
  absolute?: boolean;
  onClose?: () => void;
}

const Rooms: FC<Props> = props => {
  const navigate = useNavigate();
  const { friends } = useContext(friendsContext);
  const { friendId } = useParams();
  const { pathname } = useLocation();

  const handleClick = (friendId?: string) => {
    if (props.onClose) {
      props.onClose();
    }
    if (!friendId) {
      navigate("/friends");
    } else {
      navigate("/chats/" + friendId);
    }
  };

  return (
    <nav
      aria-label="alternative nav"
      className={`h-full w-60 border-gray-400 border-r-2 dark:border-none ${
        props.absolute && "absolute z-20 top-0"
      }`}
    >
      <div className="h-full overflow-auto dark:bg-slate-600 bg-gray-100">
        <div className="flex">
          <div
            className={`dark:text-gray-100 flex-1 text-gray-700 flex items-center p-4 hover:bg-gray-200 text-lg hover:dark:bg-gray-700 cursor-pointer ${
              !friendId && pathname !== "/" && "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => handleClick()}
          >
            <i className="fa fa-solid fa-users mr-2" />
            <h1>Friends</h1>
          </div>
          {props.onClose && (
            <div
              className="flex items-center justify-center p-2 text-xl cursor-pointer mr-2"
              onClick={props.onClose}
            >
              <i className="fa fa-times text-gray-500 dark:text-gray-100" />
            </div>
          )}
        </div>
        {friends.length === 0 && (
          <div className="mt-10 text-2xl dark:text-gray-50">
            <p className="text-center">No Friends</p>
            <p className="text-center text-lg">Add Some Friends First</p>
          </div>
        )}
        {friends.length > 0 &&
          friends.map((friend, index) => (
            <div
              key={index}
              className={`flex items-center relative py-3 pl-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 ${
                friend._id === friendId ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
              onClick={() => handleClick(friend._id)}
            >
              <div className="relative">
                <img
                  src={`https://avatars.dicebear.com/api/initials/${
                    friend!.username
                  }.svg`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="flex h-3 w-3 absolute bottom-0 right-4">
                  <span
                    className={`${
                      friend.online ? "bg-green-500" : "bg-gray-500"
                    } rounded-full h-full w-full inline-flex border border-gray-600`}
                  />
                </span>
              </div>
              <div className="text-sm">
                <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
                  {friend.username}
                </h1>
                <span className="text-sm text-gray-700 dark:text-gray-200 text-ellipsis">
                  {friend.lastMessage && friend.lastMessage.length > 20
                    ? friend.lastMessage?.substring(0, 20) + "..."
                    : friend.lastMessage}
                </span>
              </div>
              {friend.unseen !== 0 && (
                <span className="text-gray-200 flex justify-center items-center text-center ml-auto mr-2 w-5 h-5 bg-green-500 rounded-full">
                  <span className="">{friend.unseen}</span>
                </span>
              )}
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Rooms;
