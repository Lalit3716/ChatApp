import { FC, useContext } from "react";
import authContext from "../../contexts/authContext";

const Navbar: FC = () => {
  const { user } = useContext(authContext);

  return (
    <nav className="flex align-middle justify-between bg-gray-300 dark:bg-slate-700 p-4">
      <div className="dark:text-gray-100 text-3xl text-gray-800 font-semibold">
        <h1>Quick Chat</h1>
      </div>
      <div className="flex items-center">
        <img
          src={`https://avatars.dicebear.com/api/initials/${
            user!.username
          }.svg`}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="text-sm">
          <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
            {user!.username}
          </h1>
          <p className="dark:text-gray-300 text-gray-500">{user!.email}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
