import { useEffect, useState } from "react";
import { notification, Spin } from "antd";
import api from "@/services/api";

const useRequest = (role, id) => {
  const [requests, setRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "staff") return;

    const fetchData = async () => {
      try {
        const response = await api.get(
          `warehouse-requests/pending-requests/${id}`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRequests(response.data);
          setCurrentIndex(0);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Xatolik",
          description: "Ma'lumotlarni yuklashda xatolik yuz berdi",
        });
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [role, id]);

  useEffect(() => {
    if (requests.length > 0 && currentIndex < requests?.length) {
      showNextRequest(currentIndex);
    }
  }, [requests, currentIndex]);

  const showNextRequest = async (index) => {
    if (index >= requests?.length) return;
  
    const request = requests[index];
    const name = request?.destinationWarehouse?.name;
  
    // Mahsulotlar ro'yxatini yaratish
    const productList = request?.items
      .map(
        (item) =>
          `${item?.quantity} ta ${item?.product?.article} nomli va ${item?.product?.batch_number} partiyali`
      )
      .join("\n");
  
    const confirmed = window.confirm(
      `✅ Mahsulotni berish\n\nSiz quyidagi mahsulotlarni ${name}ga bermoqchimisiz?\n\n${productList}`
    );
  
    if (confirmed) {
      try {
        await api.patch(`warehouse-requests/change-status/${request?.id}`, {
          status: "approved",
        });
  
        alert(`🎉 Mahsulotlar ${name}ga muvaffaqiyatli berildi.`);
        notification.success({
          message: "Tasdiqlandi",
          description: `Mahsulotlar ${name}ga muvaffaqiyatli berildi.`,
        });
      } catch (error) {
        console.error("Statusni o‘zgartirishda xatolik:", error);
        notification.error({
          message: "Xatolik",
          description: "Buyurtma holatini o‘zgartirishda xatolik yuz berdi.",
        });
      }
    } else {
      alert("⚠️ Buyurtma bekor qilindi.");
      notification.warning({
        message: "Bekor qilindi",
        description: "Buyurtma bekor qilindi.",
      });
      try {
        await api.patch(`warehouse-requests/change-status/${request?.id}`, {
          status: "rejected",
        });
      } catch (error) {
        console.error("Statusni o‘zgartirishda xatolik:", error);
      }
    }
  
    setTimeout(() => setCurrentIndex((prev) => prev + 1), 500); // Keyingi buyurtmani ko‘rsatish
  };
  

  if (loading)
    return <Spin size="large" className="flex justify-center mt-10" />;

  return null;
};

export default useRequest;
