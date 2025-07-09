import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import "./index.css";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>Welcome!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
