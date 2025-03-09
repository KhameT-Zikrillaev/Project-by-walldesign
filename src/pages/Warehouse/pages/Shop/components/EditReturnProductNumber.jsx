import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, message } from "antd";

const EditReturnProduct = ({ onClose, product }) => {
  console.log(product);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const quantity = watch("quantity"); // Следим за значением количества

  console.log(quantity);

  const onSubmit = (data) => {
    if (data.quantity > product.quantity) {
      message.error(`Max ${product.quantity} ta.`);
      return;
    }
    console.log("Forma ma'lumotlari:", data);
    message.success(
      `Заказ на ${product.name} в количестве ${data.quantity} ta оформлен!`
    );
    reset(); // Formani tozalash
    onClose();
  };

  // Функция для ограничения ввода только цифрами от 1 до product.quantity
  const handleQuantityChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
    const maxValue = product.quantity; // Максимальное значение равно product.quantity
    const parsedValue = parseInt(value, 10);

    // Если значение больше максимального, устанавливаем максимальное значение
    if (parsedValue > maxValue) {
      setValue("quantity", maxValue.toString());
    } else if (value === "") {
      setValue("quantity", ""); // Позволяем очистить поле
    } else {
      setValue("quantity", value); // Устанавливаем значение в форму
    }
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Отображение названия товара */}
        {product && (
          <Form.Item
           
          >
            <p className="text-gray-100 font-semibold">
              {" "}
              Jami narxi: <span className="text-red-500">{(quantity || product.quantity) * product?.price} so'm</span>
            </p>
          </Form.Item>
        )}

        {/* Поле для ввода количества */}
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Qaytarilgan mahsulot soni:</span>}
          validateStatus={errors.quantity ? "error" : ""}
          help={
            errors.quantity?.message ||
            (quantity > product?.quantity && `Max ${product?.quantity} ta`)
          }
        >
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Sonni kiriting",
              max: {
                value: product?.quantity, // Максимум product.quantity
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
                defaultValue={product?.quantity}
                {...field}
                onChange={handleQuantityChange} // Обработчик для ограничения ввода
                max={product?.quantity} // Максимальное значение
                type="number" // Тип поля для мобильных устройств
              />
            )}
          />
        </Form.Item>

        {/* Кнопка "Заказать" */}
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#2b3445")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#364153")
            }
          >
            Mahsulotni qaytarish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditReturnProduct;
