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
      {isAuthenticated ? (
        <Layout>
          <h1>Welcome!</h1>
          <button onClick={logout}>Logout</button>
        </Layout>
      ) : (
        <Login />
      )}
    </ThemeWrapper>
  );
}

export default App;
