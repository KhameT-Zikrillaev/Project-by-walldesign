import { useEffect } from "react";
import api from "@/services/api";

const useRequest = (role, id) => {
  useEffect(() => {
    if (role !== "staff") return;

    const fetchData = async () => {
      try {
        const response = await api.get(`warehouse-requests/pending-requests/${id}`);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      }
    };

    fetchData(); // Boshlang‘ich so‘rov
    const intervalId = setInterval(fetchData, 60000); // 60 sekundda qayta so‘rov

    return () => clearInterval(intervalId); // Komponent unmount bo‘lsa, intervalni tozalaymiz
  }, [role]);
};

export default useRequest;
