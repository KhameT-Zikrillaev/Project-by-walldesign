import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, message } from "antd";
import useUserStore from "@/store/useUser";
import useApiMutation from "@/hooks/useApiMutation";
import { toast } from "react-toastify";

const AddProduct = ({ onClose, product }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const quantity = watch("quantity"); // Следим за значением количества
  const { user } = useUserStore();
  const idWarehouse = user?.shop?.warehouse_id; // warehouseId
  const idShop = user?.shop?.id; // shopID

  const { mutate, isLoading: isSending } = useApiMutation({
    url: '/shop-request/send-request', // Исправленный URL
    method: 'POST',
    onSuccess: (data) => {
      toast.success('Tovar muvaffaqiyatli zakaz qilindi!');
      onClose();
    },
    onError: (error) => {
      message.error(`Error: ${error.message || 'Failed to send products'}`);
      console.error('Error sending products to storefront:', error);
    }
  });

  const onSubmit = (data) => {
    if (data.quantity > product.quantity) {
      message.error(`Max ${product.quantity} ta.`);
      return;
    }

    const requestBody = {
      shopId: idShop,
      warehouseId: idWarehouse,
      items: [
        {
          productId: product.id, // Предполагаем, что product.id это идентификатор продукта
          quantity: data.quantity,
          remarks: data.remarks || "" // Добавляем remarks, если они есть
        }
      ]
    };

    mutate(requestBody); // Отправляем запрос на бекенд

    console.log("Forma ma'lumotlari:", data);
    message.success(`Заказ на ${product.article} в количестве ${data.quantity} ta оформлен!`);
    reset(); // Очищаем форму
    onClose();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxValue = product?.quantity;
    const parsedValue = parseInt(value, 10);

    if (parsedValue > maxValue) {
      setValue("quantity", maxValue.toString());
    } else if (value === "") {
      setValue("quantity", "");
    } else {
      setValue("quantity", value);
    }
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {product && (
          <Form.Item label={<span className="text-gray-100 font-semibold">Tovar nomi</span>}>
            <h3 className="text-gray-100 font-semibold">{product?.article}</h3>
            <p className="text-gray-100 font-semibold"> Part: <span className="text-red-500">{product?.batch_number}</span></p>
            <span className="text-gray-100 font-semibold">{product?.quantity} dona bor omborda</span>
          </Form.Item>
        )}

        <Form.Item
          label={<span className="text-gray-100 font-semibold">Soni</span>}
          validateStatus={errors.quantity ? "error" : ""}
          help={errors.quantity?.message || (quantity > product?.quantity && `Max ${product?.quantity} ta`)}
        >
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Sonni kiriting",
              max: {
                value: product?.quantity,
                message: `Max ${product?.quantity} ta`,
              },
              min: {
                value: 1,
                message: "Min 1 ta",
              },
            }}
            render={({ field }) => (
              <Input
                placeholder="Sonnini kiriting"
                className="custom-input"
                {...field}
                onChange={handleQuantityChange}
                max={product?.quantity}
                type="number"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={quantity > product?.quantity}
            style={{
              backgroundColor: "#364153",
              color: "#f3f4f6",
              fontWeight: "500",
              padding: "15px 20px",
              borderRadius: "8px",
              fontSize: "18px",
              width: "100%",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2b3445")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#364153")}
          >
            Buyurtma berish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;