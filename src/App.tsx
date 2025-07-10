import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import "./index.css";

import { Layout } from "./components/layout";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <div className="flex justify-end p-4">
            <DarkModeToggle />
          </div>
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
