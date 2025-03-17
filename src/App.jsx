import "./index.css";
import RouteRoutes from './config/routerconfig/index.jsx';
import { useEffect } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {setUser} = useUserStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenWall");

  const getUser = async () => {
    const response = await api.get("auth/profile");

    if(response?.status == 200){
      setUser(response?.data);
    }else{
      localStorage.removeItem("tokenWall");
      navigate('/')
    } 
  }

  useEffect(() => {
    if(token){
      getUser();
    }else{
      navigate('/')
    }
  }, [])

  return (
    <>
     <RouteRoutes/>
     <ToastContainer />
    </>
  );
}

export default App;
