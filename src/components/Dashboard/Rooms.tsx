import { FC, useContext } from "react";
import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router";
import authContext from "../../contexts/authContext";
import { friendsContext } from "../../contexts/friendsContext";

const Rooms: FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const { friends } = useContext(friendsContext);
  const { friendId } = useParams();
  const { pathname } = useLocation();

  const handleClick = (friendId?: string) => {
    if (!friendId) {
      navigate("/friends");
    } else {
      navigate("/chats/" + friendId);
    }
  };

  return (
    <nav
      aria-label="alternative nav"
      className="h-full w-60 border-gray-400 border-r-2 dark:border-none"
    >
      <div className="h-full overflow-auto dark:bg-slate-600 bg-gray-100">
        <div
          className={`dark:text-gray-100 text-gray-700 flex items-center p-4 hover:bg-gray-200 text-lg hover:dark:bg-gray-700 cursor-pointer ${
            !friendId && pathname !== "/" && "bg-gray-200 dark:bg-gray-700"
          }`}
          onClick={() => handleClick()}
        >
          <i className="fa fa-solid fa-users mr-2" />
          <h1>Friends</h1>
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
              className={`flex items-center py-3 pl-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 ${
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
              </div>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Rooms;
