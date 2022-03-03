import { FC, useState } from "react";
import { Outlet } from "react-router";
import Rooms from "../components/Dashboard/Rooms";
import Navbar from "../components/Layout/Navbar";
import FriendsProvider from "../components/Providers/FriendsProvider";
import Backdrop from "../components/Utils/Backdrop";
import useMediaQuery from "../hooks/useMediaQuery";

const Dashboard: FC = () => {
  const mq = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FriendsProvider>
      <div className="flex flex-col h-full">
        <Navbar />
        <main
          className="flex-1 flex flex-row"
          style={{
            maxHeight: "calc(100vh - 72px)",
          }}
        >
          {mq && !isOpen && (
            <i
              className="fa fa-bars text-gray-500 dark:text-gray-100 p-4 text-2xl cursor-pointer h-fit absolute"
              onClick={() => {
                setIsOpen(prev => !prev);
              }}
            />
          )}
          {mq && isOpen && (
            <>
              <Backdrop onClose={() => setIsOpen(prev => !prev)} />
              <Rooms absolute onClose={() => setIsOpen(prev => !prev)} />
            </>
          )}
          {!mq && <Rooms />}
          <Outlet />
        </main>
      </div>
    </FriendsProvider>
  );
};

export default Dashboard;
