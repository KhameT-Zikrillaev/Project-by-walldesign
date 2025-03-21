import React from 'react';
import bgsklad from '@/assets/images/bg-sklad.png';
import { useParams, useLocation } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { Spin, Tag, Card, Pagination, Button } from 'antd';
import ImageModal from '@/components/modal/ImageModal';
import userStore from '@/store/useUser';
import { toast } from 'react-toastify';
import useApiMutation from '@/hooks/useApiMutation';
import dayjs from 'dayjs'; // Убедитесь, что dayjs установлен

export default function CashregisterDetailes() {
    const { name } = useParams();
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const location = useLocation();
    const shopId = location.state?.shopId;
    const itemsPerPage = 10;
    const user = userStore();

    const todayDate = dayjs().format('YYYY-MM-DD');



    
    const { data, isLoading, refetch } = useFetch(
        shopId ? `cash-register/date/${todayDate}/shop/${shopId}` : null,
        shopId ? `cash-register/date/${todayDate}/shop/${shopId}` : null,
        {},
        {
            enabled: !!shopId,
        }
    );


     console.log(data?.data)

     const { data: cashTransactionData, isLoading: isCashTransactionLoading, refetch: refetchCashTransaction } = useFetch(
      shopId ? `cash-transaction/shop/${shopId}/date/${todayDate}` : null,
      shopId ? `cash-transaction/shop/${shopId}/date/${todayDate}` : null,
      {},
      {
          enabled: !!shopId,
      }
  );

    const { mutate, isLoading: isSending } = useApiMutation({
        url: 'cash-transaction/daily-report',
        method: 'POST',
        onSuccess: (data) => {
            toast.success('Kassa muvaffaqiyatli yopildi!');
            refetch(); // Обновите данные после успешного закрытия кассы
        },
        onError: (error) => {
            toast.error(`Xatolik: ${error.message || 'Kassani yopishda xatolik yuz berdi'}`);
            console.error('Error closing cash:', error);
        }
    });


    const handleCloseCash = () => {
        const body = {
            shopId: shopId,
            date: todayDate, // Используем сегодняшнюю дату
            closedBy: user?.user?.id // Используем ID текущего пользователя
        };

        mutate(body); // Отправляем запрос на закрытие кассы
    };

    const filteredData = data?.products || [];
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div
            className="min-h-screen bg-cover bg-center p-1 relative"
            style={{ backgroundImage: `url(${bgsklad})` }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>
            <div className="relative z-0 max-w-[1440px] mx-auto flex flex-col items-center justify-center mt-[120px]">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        {filteredData.length === 0 ? (
                            <div className="text-white text-lg">Tovar topilmadi</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4">
                                {currentData.map((item) => (
                                    <Card
                                        key={item?.product_id}
                                        className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.1)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                        }}
                                        cover={
                                            <img
                                                onClick={() => setSelectedImage(item?.image_url)}
                                                className="h-48 w-full bg-cover cursor-pointer bg-center rounded-t-lg"
                                                src={item?.image_url}
                                                alt=""
                                            />
                                        }
                                        bodyStyle={{ padding: "12px", color: "white" }}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-semibold text-white">{item?.article}</h3>
                                            <Tag color="blue">
                                                Part: <span className="text-red-500">{item?.batch_number}</span>
                                            </Tag>
                                            <h4 className="text-sm font-semibold text-white">
                                                {item?.price + " $" || "No price"}
                                            </h4>
                                            <div className="flex justify-between">
                                                <p className="text-gray-300 text-xs">Batch: {item?.quantity}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <ImageModal
                    isOpen={!!selectedImage}
                    onClose={() => setSelectedImage(null)}
                    imageUrl={selectedImage}
                />

                {filteredData.length > 0 && !isLoading && (
                    <div className="my-4 flex justify-center">
                        <Pagination
                            current={currentPage}
                            total={filteredData.length}
                            pageSize={itemsPerPage}
                            onChange={(page) => setCurrentPage(page)}
                            showSizeChanger={false}
                            className="custom-pagination"
                        />
                    </div>
                )}

                {filteredData.length > 0 && !isLoading && (
                    <Button
                        type="primary"
                        style={{ background: "#17212b" }}
                        onClick={handleCloseCash}
                        loading={isSending}
                        disabled={isSending} // Убрана проверка на selectedDate
                    >
                        Kassani Yopish
                    </Button>
                )}
            </div>
        </div>
    );
}