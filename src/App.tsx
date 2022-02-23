import { FC } from "react";
import { Routes, Route } from "react-router";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/Auth";

const App: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
