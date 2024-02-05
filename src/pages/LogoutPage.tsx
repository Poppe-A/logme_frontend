import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { Button } from "@mui/material";

const LogoutPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      <h1>Logout Page</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default LogoutPage;