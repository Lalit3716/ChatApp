import { FC } from "react";
import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { rooms } from "../../mock/rooms";

const Rooms: FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { pathname } = useLocation();

  const handleClick = (roomId?: string) => {
    if (!roomId) {
      navigate("/friends/all");
    } else {
      navigate("/chats/" + roomId);
    }
  };

  return (
    <nav aria-label="alternative nav" className="h-full w-60">
      <div className="h-full overflow-auto dark:bg-slate-600 bg-gray-100">
        <div
          className={`dark:text-gray-300 text-gray-700 flex items-center p-4 hover:bg-gray-200 hover:dark:bg-gray-700 cursor-pointer justify-center ${
            !roomId && pathname !== "/" && "bg-gray-200 dark:bg-gray-700"
          }`}
          onClick={() => handleClick()}
        >
          <i className="fa fa-solid fa-users mr-2" />
          <h1>Friends</h1>
        </div>
        {rooms.map(room => (
          <div
            className={`flex items-center py-3 pl-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 ${
              room.id === roomId ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
            key={room.id}
            onClick={() => handleClick(room.id)}
          >
            <img
              src={room.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="text-sm">
              <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
                {room.name}
              </h1>
              <p className="dark:text-gray-300 text-gray-500 text-ellipsis">
                {room.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Rooms;
