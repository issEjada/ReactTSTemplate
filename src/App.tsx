import { useContext } from "react";
import { AuthContext } from "./context/Context";
import Login from "./pages/Login/Login";
import "./index.css";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <ThemeProvider>{isAuthenticated ? <Layout /> : <Login />}</ThemeProvider>
  );
}

export default App;
