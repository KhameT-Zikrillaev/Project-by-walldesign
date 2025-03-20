import React, { useState, useEffect } from "react";
import { Button, List, Image, InputNumber, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import userStore from "@/store/useUser";
import useApiMutation from "@/hooks/useApiMutation";
import { toast } from "react-toastify";

const AddProductOrderWarehouse = ({ onClose, selectedProducts, onSuccess, idWarehouse}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = userStore();
 console.log(idWarehouse)
  const { mutate, isLoading } = useApiMutation({
    url: 'warehouse-requests/send-request',
    method: 'POST',
    onSuccess: () => {
      onClose();
      toast.success("Buyurtma berildi");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Buyutma berishda xatolik!");
    },
  });

  useEffect(() => {
    if (selectedProducts) {
      const preselectedItems = selectedProducts.map((item, index) => ({
        ...item,
        key: `${item?.id}-${index}`,
        quantity: item?.quantity || 1,
      }));
      setSelectedItems(preselectedItems);
    }
  }, [selectedProducts]);

  const handleRemove = (key) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.filter((item) => item.key !== key);
      if (updatedItems.length === 0) {
        if (onSuccess) onSuccess();
        onClose();
      }
      return updatedItems;
    });
  };

  const handleQuantityChange = (key, value) => {
    setSelectedItems((prev) =>
      prev?.map((item) =>
        item?.key === key ? { ...item, quantity: value } : item
      )
    );
  };

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
        quantity: item?.quantity,
      })),
    };
  
    mutate(requestData);
  };
  
  return (
    <div className="flex min-h-[400px] min-w-[400px] flex-col md:flex-row w-full justify-between gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="w-full">
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
                <div style={{ display: "flex", alignItems: "center" }}>
                   <InputNumber
                    min={1}
                    max={product?.quantity}
                    value={product?.quantity}
                    onChange={(value) =>
                      handleQuantityChange(product.key, value)
                    }
                    style={{ width: 60, marginRight: 10 }}
                    controls={true}
                    step={1}      
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
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

        <div className="text-center text-white mt-4">
          <span>
            Tanlangan tovarlar soni:{" "}
            <strong>{selectedItems.length}</strong>
          </span>
        </div>

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
