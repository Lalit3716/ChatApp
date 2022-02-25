import { FC } from "react";

interface Props {
  friends: any;
  type: "requests" | "friends";
}

const FriendsList: FC = () => {
  return (
    <div className="mt-2 bg-slate-600 rounded p-4">
      <ul>
        <li className="flex items-center">
          <img
            src={`https://avatars.dicebear.com/api/initials/${"joe"}.svg`}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="text-sm">
            <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
              {"Jane Doe"}
            </h1>
            <p className="dark:text-gray-300 text-gray-500">
              {"user1@gmail.com"}
            </p>
          </div>
          <div className="ml-auto space-x-2">
            <button className="w-10 h-10 rounded-full text-white bg-slate-700 hover:bg-slate-800">
              <i className="fa fa-comment-dots" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-800 rotate-45 text-red-500">
              <i className="fas fa-plus" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FriendsList;
