import { useState } from "react";
import SellerReportServices from "../services/SellerReportServices";


export const useGetReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getReport = async () => {
    setIsLoading(true);
    try {
      const response = await SellerReportServices.getAll();
      return response;
    } catch (err) {
      console.error(err);
      //   toast.error(err.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getReport,
    isLoading,
  };
};
