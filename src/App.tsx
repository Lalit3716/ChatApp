import { FC, useContext } from "react";
import { Routes, Route } from "react-router";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/Auth";
import authContext from "./contexts/authContext";
import Dashboard from "./pages/Dashboard";
import Friends from "./components/Dashboard/Friends";
import Room from "./components/Dashboard/Room";

const App: FC = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <AuthPage />}
        >
          <Route path="/friends/all" element={<Friends />} />
          <Route path="/chats/:roomId" element={<Room />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
