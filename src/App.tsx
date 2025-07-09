import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import "./index.css";

import { Layout } from "./components/layout";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <h1>Welcome!</h1>
          <button onClick={logout}>Logout</button>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
