import React, { useState, useEffect } from "react";
import { Button, List, Image, InputNumber, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import userStore from "@/store/useUser";
import useApiMutation from "@/hooks/useApiMutation";
import { toast } from "react-toastify";

const AddProductOrderWarehouse = ({ onClose, selectedProducts, onSuccess, idWarehouse }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const { user } = userStore();

  const { mutate, isLoading } = useApiMutation({
    url: 'warehouse-requests/send-request',
    method: 'POST',
    onSuccess: () => {
      onClose();
      toast.success("Buyurtma berildi");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Buyurtma berishda xatolik!");
    },
  });

  // Инициализация данных при получении selectedProducts
  useEffect(() => {
    if (selectedProducts) {
      const preselectedItems = selectedProducts.map((item, index) => ({
        ...item,
        key: `${item?.id}-${index}`,
        quantity: item?.quantity || 1,
      }));
      setSelectedItems(preselectedItems);

      // Устанавливаем значения для InputNumber
      const initialValues = {};
      preselectedItems.forEach((item) => {
        initialValues[item.key] = item.quantity;
      });
      setInputValues(initialValues);
    }
  }, [selectedProducts]);

  // Обновление значения количества
  const handleQuantityChange = (key, value) => {
    if (value === undefined || value < 1) return;

    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSelectedItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, quantity: value } : item
      )
    );
  };

  // Удаление товара из списка
  const handleRemove = (key) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.filter((item) => item.key !== key);
      if (updatedItems.length === 0) {
        if (onSuccess) onSuccess();
        onClose();
      }
      return updatedItems;
    });

    // Удаляем значение из inputValues
    setInputValues((prev) => {
      const updatedValues = { ...prev };
      delete updatedValues[key];
      return updatedValues;
    });
  };

  // Отправка данных
  const onSubmit = () => {
    if (!user?.warehouse?.id) {
      message.error("Ombor ma'lumotlari topilmadi!");
      return;
    }

    if (selectedItems.length === 0) {
      message.warning("Нет выбранных товаров для отправки");
      return;
    }

    const requestData = {
      sourceWarehouseId: idWarehouse,
      destinationWarehouseId: user.warehouse?.id,
      items: selectedItems.map((item) => ({
        productId: item?.id,
        quantity: inputValues[item.key],
      })),
    };

    mutate(requestData);
  };

  return (
    <div className="flex min-h-[400px] min-w-[400px] flex-col md:flex-row w-full justify-between gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="w-full">
        {/* Список товаров */}
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <List
            dataSource={selectedItems}
            renderItem={(product) => (
              <List.Item
                key={product.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                {/* Изображение и описание товара */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={product?.image_url}
                    width={50}
                    height={50}
                    className="object-cover"
                    style={{ marginRight: "10px", borderRadius: "4px" }}
                    crossOrigin="anonymous"
                  />
                  <div className="ml-2">
                    <div className="text-white font-bold">{product?.article}</div>
                    <div className="text-gray-400">{product?.code}</div>
                  </div>
                </div>

                {/* Управление количеством и кнопка удаления */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputNumber
                    min={1}
                    value={inputValues[product.key]}
                    onChange={(value) => handleQuantityChange(product?.key, value)}
                    style={{ width: 60, marginRight: 10 }}
                    controls={true}
                    step={1}
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => handleRemove(product.key)}
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
              hideOnSinglePage: true,
            }}
          />
        </div>

        {/* Количество выбранных товаров */}
        <div className="text-center text-white mt-4">
          <span>
            Tanlangan tovarlar soni:{" "}
            <strong>{selectedItems.length}</strong>
          </span>
        </div>

        {/* Кнопка отправки */}
        <Button
          type="primary"
          onClick={onSubmit}
          loading={isLoading}
          disabled={isLoading || selectedItems.length === 0}
          style={{ marginTop: 20, width: "100%" }}
        >
          {isLoading ? "Отправка..." : "Yuborish"}
        </Button>
      </div>
    </div>
  );
};

export default AddProductOrderWarehouse;
