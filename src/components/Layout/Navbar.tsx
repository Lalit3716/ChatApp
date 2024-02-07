import { FC, useContext } from "react";
import authContext from "../../contexts/authContext";

const Navbar: FC = () => {
  const { user, logout } = useContext(authContext);

  return (
    <nav className="flex align-middle justify-between bg-gray-300 dark:bg-slate-700 p-4">
      <div className="dark:text-gray-100 text-3xl text-gray-800 font-semibold">
        <h1>Quick Chat</h1>
      </div>
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user!.username}`}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="text-sm">
          <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
            {user!.username}
          </h1>
          <p className="dark:text-gray-300 text-gray-500">{user!.email}</p>
        </div>
        <button
          onClick={logout}
          className="border dark:bg-blue-700 ml-2 p-2 rounded hover:dark:bg-blue-800 text-white bg-blue-400 hover:bg-blue-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
