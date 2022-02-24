import { FC, useContext } from "react";
import { Routes, Route } from "react-router";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/Auth";
import authContext from "./contexts/authContext";
import Dashboard from "./pages/Dashboard";

const App: FC = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <AuthPage />}
        />
      </Routes>
    </Layout>
  );
};

export default App;
