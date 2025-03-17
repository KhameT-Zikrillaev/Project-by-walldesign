import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, message } from "antd";

const AddProduct = ({ onClose, product }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const stock = watch("stock"); // Следим за значением количества

  console.log(product);
  

  const onSubmit = (data) => {
    if (data.stock > product.stock) {
      message.error(`Max ${product.stock} ta.`);
      return;
    }
    console.log("Forma ma'lumotlari:", data);
    message.success(
      `Заказ на ${product.name} в количестве ${data.stock} ta оформлен!`
    );
    reset(); // Formani tozalash
    onClose();
  };

  // Функция для ограничения ввода только цифрами от 1 до product.stock
  const handlestockChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
    const maxValue = product.stock; // Максимальное значение равно product.stock
    const parsedValue = parseInt(value, 10);

    // Если значение больше максимального, устанавливаем максимальное значение
    if (parsedValue > maxValue) {
      setValue("stock", maxValue.toString());
    } else if (value === "") {
      setValue("stock", ""); // Позволяем очистить поле
    } else {
      setValue("stock", value); // Устанавливаем значение в форму
    }
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Отображение названия товара */}
        {product && (
          <Form.Item
            label={
              <span className="text-gray-100 font-semibold">Tovar nomi</span>
            }
          >
            <h3 className="text-gray-100 font-semibold">{product?.article}</h3>
            <p className="text-gray-100 font-semibold">
              {" "}
              Part: <span className="text-red-500">{product?.batch_number}</span>
            </p>
            <p className="text-gray-100 font-semibold">
              Jami narxi: { (stock || product?.quantity) * product?.price} so'm
            </p>
            <span className="text-gray-100 font-semibold">
              {product?.quantity} dona bor omborda
            </span>
          </Form.Item>
        )}

        {/* Поле для ввода количества */}
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Soni</span>}
          validateStatus={errors.quantity ? "error" : ""}
          help={
            errors.quantity?.message ||
            (stock > product?.quantity && `Max ${product?.quantity} ta`)
          }
        >
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Sonni kiriting",
              max: {
                value: product?.stock, // Максимум product.stock
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
                onChange={handlestockChange} // Обработчик для ограничения ввода
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
            disabled={stock > product?.quantity}
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
            Buyurtma berish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
