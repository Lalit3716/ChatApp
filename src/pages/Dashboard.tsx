import React, { FC, useContext } from "react";

import authContext from "../contexts/authContext";

const Dashboard: FC = () => {
  const { logout } = useContext(authContext);

  return (
    <div>
      <h1 className="text-center text-6xl">Chat App</h1>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
