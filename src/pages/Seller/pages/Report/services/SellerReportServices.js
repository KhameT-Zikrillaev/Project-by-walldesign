import api from "./api";

const SellerReportServices = {

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~показываем просто все
  getAll: async () => {
    const response = await api.get("/course");

    return response.data.data;
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~однозапросный

  getSingle: async (id) => {
    const response = await api.get(`/course/${id}`);
    return response.data.data;
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~многозапросный
  getAllByCourseId: async (id) => {
    if (id) {
      const response = await api.get(`/tariff/course/${id}`);
      return response.data.data;
    }
  },
  
};

export default SellerReportServices;