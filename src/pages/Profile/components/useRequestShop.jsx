import { useEffect, useState } from "react";
import { notification, Spin } from "antd";
import api from "@/services/api";


const useRequestShop = (user, id) => {
  const [requests, setRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "staff") return;

    const fetchData = async () => {
      try {
        const response = await api.get(`shop-request/pending-requests/${id}`);
        if (Array.isArray(response?.data) && response?.data?.length > 0) {
          setRequests(response.data);
          setCurrentIndex(0);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error({ message: "Xatolik", description: "Ma'lumotlarni yuklashda xatolik yuz berdi" });
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [user?.role, id]);

  useEffect(() => {
    if (requests.length > 0 && currentIndex < requests?.length) {
      showNextRequest(currentIndex);
    }
  }, [requests, currentIndex]);

  const showNextRequest = async (index) => {
    if (index >= requests?.length) return;

    const request = requests[index];
    const quantity = request?.items[0]?.quantity ?? 0;
    const price = request?.items[0]?.product?.price ?? 0;
    const name = request?.shop?.name;
    const productId = request?.items[0]?.product?.id;
    const shopId = request?.shop?.id;
    const productName = `${request?.items[0]?.product?.article} nomli va ${request?.items[0]?.product?.batch_number} partiyali`;
    const sellerId = request?.shop?.sellers[0]?.id

    
      const confirmed = window.confirm(`✅ Mahsulotni berish\n\nSiz ${quantity} ta ${productName} mahsulotni ${name}ga bermoqchimisiz?`);
      if (confirmed) {
        try {
          await api.patch(`shop-request/change-status/${request?.id}`, { status: "approved" });
          await api.post("order", {
            shop_id: shopId,
            warehouse_id: user?.warehouse?.id,
            seller_id: sellerId,
            total_amount: price * quantity,
            payment_method: "cash",
            items: [
              {
                productId: productId,
                orderId: request?.id,
                price: price,
                quantity: quantity,
                total: price * quantity
              }
            ]
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
          await api.patch(`shop-request/change-status/${request?.id}`, { status: "rejected" });
        } catch (error) {
          console.error("Statusni o‘zgartirishda xatolik:", error);
        }
      }
    

    setTimeout(() => setCurrentIndex((prev) => prev + 1), 500); // Keyingi buyurtmani ko‘rsatish
  };

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  return null;
};

export default useRequestShop;
