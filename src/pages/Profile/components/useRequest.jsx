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
    const quantity = request?.items[0]?.quantity ?? 0;
    const name = request?.destinationWarehouse?.name;
    const productName = `${request?.items[0]?.product?.article} nomli va ${request?.items[0]?.product?.batch_number} partiyali`;

    const confirmed = window.confirm(
      `✅ Mahsulotni berish\n\nSiz ${quantity} ta ${productName} mahsulotni ${name}ga bermoqchimisiz?`
    );
    if (confirmed) {
      try {
        await api.patch(`warehouse-requests/change-status/${request?.id}`, {
          status: "approved",
        });

        alert(`🎉 ${quantity} ta mahsulot ${name}ga muvaffaqiyatli berildi.`);
        notification.success({
          message: "Tasdiqlandi",
          description: `${quantity} ta mahsulot ${name}ga muvaffaqiyatli berildi.`,
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
