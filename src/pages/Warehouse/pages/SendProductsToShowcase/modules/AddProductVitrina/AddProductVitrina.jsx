import React, { useState, useEffect } from "react";
import { Button, List, Image, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import userStore from "@/store/useUser";
import useApiMutation from "@/hooks/useApiMutation";
import { toast } from "react-toastify";

const AddProductVitrina = ({ onClose, selectedProducts, onSuccess, warehouseId, warehouseName, shopId }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = userStore();

  // Используем useApiMutation для POST запроса
  const { mutate, isLoading: isSending } = useApiMutation({
    url: 'Storefront-product',
    method: 'POST',
    onSuccess: (data) => {
      toast.success('Tovar muvaffaqiyatli qo`shildi!');
      if (onSuccess) onSuccess();
      onClose();
    },
    onError: (error) => {
      message.error(`Error: ${error.message || 'Failed to send products'}`);
      console.error('Error sending products to storefront:', error);
    }
  });
  
  // Преобразуем выбранные товары в нужный формат с уникальным ключом
  useEffect(() => {
    if (selectedProducts) {
      const preselectedItems = selectedProducts?.map((item, index) => ({
        ...item,
        key: `${item?.id}-${index}`,
        quantity: 1, // Устанавливаем количество по умолчанию
      }));
      setSelectedItems(preselectedItems);
    }
  }, [selectedProducts]);

  // Удаляем товар из списка по уникальному ключу
  const handleRemove = (key) => {
    setSelectedItems((prev) => {
      const updatedItems = prev?.filter((item) => item?.key !== key);
      if (updatedItems?.length === 0) {
        if (onSuccess) onSuccess(); // Закрываем, если все товары удалены
        onClose();
      }
      return updatedItems;
    });
  };

  // Отправка данных
  const onSubmit = () => {
    if (selectedItems?.length === 0) {
      message.warning('Tanlangan tovar yoq');
      return;
    }
    
    // Проверяем наличие ID магазина
    if (!shopId) {
      message.error('ID магазина (shopId) не указан. Невозможно отправить товары.');
      console.error('shopId is undefined or empty', { shopId, warehouseId, warehouseName });
      return;
    }
    
    // Формируем данные для отправки на бэкенд
    const requestData = {
      productIds: selectedItems?.map(item => item.id), // Массив ID продуктов
      shopId: shopId // Используем shopId вместо warehouseId
    }; 
    console.log('Отправляем данные:', requestData);
    // Отправляем данные на бэкенд
    mutate(requestData);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto p-4">
        {/* Отображаем информацию о магазине */}
        <div
          className="mb-4"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "rgba(23, 33, 43, 0.7)",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <List
            dataSource={selectedItems}
            renderItem={(product) => (
              <List.Item
                key={product?.key}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "10px 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={product?.image_url}
                    alt={product?.article}
                    width={50}
                    height={50}
                    crossOrigin="anonymous"
                    className="object-cover"
                    style={{ marginRight: "10px" }}
                  />
                  <div className="ml-2">
                    <div className="text-white font-bold">{product?.article}</div>
                    <div className="text-white">{product?.batch_number}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => handleRemove(product?.key)}
                    style={{
                      color: "#fff",
                      backgroundColor: "#17212b",
                      borderRadius: "4px",
                      width: "28px",
                      height: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.2s ease",
                      marginRight: "10px",
                    }}
                    className="hover:bg-red-600"
                  />
                </div>
              </List.Item>
            )}
            pagination={{ 
              pageSize: 3,
              className: "custom-pagination",
              hideOnSinglePage: true // Скрыть пагинацию, если все элементы помещаются на одной странице
            }}
          />
        </div>

        {/* Количество товаров */}
        <div className="text-center text-white mt-4">
          <span>
           Tanlangan tovarlar soni:{" "}
            <span className="font-bold">{selectedItems?.length}</span>
          </span>
        </div>

        {/* Кнопка отправки */}
        <Button
          type="primary"
          onClick={onSubmit}
          loading={isSending}
          disabled={isSending || selectedItems?.length === 0 || !shopId}
          style={{ marginTop: 20, width: "100%" }}
        >
          {isSending ? 'Отправка...' : 'Yuborish'}
        </Button>
      </div>
    </div>
  );
};

export default AddProductVitrina;