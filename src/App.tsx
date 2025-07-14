import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import "./index.css";

import { Layout } from "./components/layout";
import { ThemeWrapper } from "./components/DarkModeToggle/DarkModeToggle";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <ThemeWrapper>
      {isAuthenticated ? <Layout /> : <Login />}

      <button
        onClick={logout}
        className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </ThemeWrapper>
  );
}

export default App;
