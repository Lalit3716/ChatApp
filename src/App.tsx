import { FC } from "react";
import { Routes, Route } from "react-router";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Friends from "./components/Dashboard/Friends";
import Room from "./components/Dashboard/Room";
import RouteGuard from "./components/Guard/RouteGuard";

const App: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<RouteGuard />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/friends" element={<Friends />} />
            <Route path="/chats/:roomId" element={<Room />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
