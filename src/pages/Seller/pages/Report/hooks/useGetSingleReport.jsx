import { useState } from "react";
import SellerReportServices from "../services/SellerReportServices";


export const useGetSingleReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getSingleReport = async (id) => {
    setIsLoading(true);
    try {
      const response = await SellerReportServices.getSingle(id);
      return response;
    } catch (err) {
      console.error(err);
      //   toast.error(err.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getSingleReport,
    isLoading,
  };
};
