import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, message, Select } from "antd";

const products = [
  { id: 1, name: "Chilanzar", description: "Описание Chilanzar" },
  { id: 2, name: "Yunsabad", description: "Описание Yunsabad" },
  { id: 3, name: "Mirzo Ulugbek", description: "Описание Mirzo Ulugbek" },
  { id: 4, name: "Yakkasaray", description: "Описание Yakkasaray" },
  { id: 5, name: "Shayxontoxur", description: "Описание Shayxontoxur" },
  { id: 6, name: "Olmazor", description: "Описание Olmazor" },
  { id: 7, name: "Bektemir", description: "Описание Bektemir" },
  { id: 8, name: "Yashnobod", description: "Описание Yashnobod" },
  { id: 9, name: "Mirobod", description: "Описание Mirobod" },
  { id: 10, name: "Sergeli", description: "Описание Sergeli" },
  { id: 11, name: "Uchtepa", description: "Описание Uchtepa" },
  { id: 12, name: "Yangihayot", description: "Описание Yangihayot" },
  { id: 13, name: "Tashkent District", description: "Описание Tashkent District" },
  { id: 14, name: "Samarkand", description: "Описание Samarkand" },
  { id: 15, name: "Bukhara", description: "Описание Bukhara" },
  { id: 16, name: "Khiva", description: "Описание Khiva" },
  { id: 17, name: "Fergana", description: "Описание Fergana" },
  { id: 18, name: "Namangan", description: "Описание Namangan" },
  { id: 19, name: "Andijan", description: "Описание Andijan" },
  { id: 20, name: "Nukus", description: "Описание Nukus" },
  { id: 21, name: "Urgench", description: "Описание Urgench" },
  { id: 22, name: "Navoi", description: "Описание Navoi" },
  { id: 23, name: "Jizzakh", description: "Описание Jizzakh" },
  { id: 24, name: "Termez", description: "Описание Termez" },
];

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
  const selectedWarehouse = watch("warehouse"); // Следим за выбранным складом

  const onSubmit = (data) => {
    if (data.quantity > product.stock) {
      message.error(`Max ${product.stock} ta.`);
      return;
    }
    console.log("Forma ma'lumotlari:", data);
    message.success(`Заказ на ${product.name} в количестве ${data.quantity} ta оформлен на склад ${data.warehouse}!`);
    alert(`Заказ на ${product.name} в количестве ${data.quantity} ta оформлен на склад ${data.warehouse}!`);
    reset(); // Formani tozalash
    onClose();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
    const maxValue = product.stock; // Максимальное значение равно product.stock
    const parsedValue = parseInt(value, 10);

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
          <Form.Item label={<span className="text-gray-100 font-semibold">Tovar nomi</span>}>
            <h3 className="text-gray-100 font-semibold">{product?.name}</h3>
            <p className="text-gray-100 font-semibold"> Part: <span className="text-red-500">{product?.code}</span></p>
            <span className="text-gray-100 font-semibold">{product?.stock} dona bor omborda</span>
          </Form.Item>
        )}

        {/* Поле для ввода количества */}
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Soni</span>}
          validateStatus={errors.quantity ? "error" : ""}
          help={errors.quantity?.message || (quantity > product?.stock && `Max ${product?.stock} ta`)}
        >
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Sonni kiriting",
              max: {
                value: product?.stock, // Максимум product.stock
                message: `Max ${product?.stock} ta`,
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
                onChange={handleQuantityChange} // Обработчик для ограничения ввода
                max={product?.stock} // Максимальное значение
                type="number" // Тип поля для мобильных устройств
              />
            )}
          />
        </Form.Item>

        {/* Поле для выбора склада */}
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Ombor</span>}
          validateStatus={errors.warehouse ? "error" : ""}
          help={errors.warehouse?.message}
        >
          <Controller
            name="warehouse"
            control={control}
            rules={{ required: "Omborni tanlang" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Omborni tanlang"
                className="custom-select"
              >
                {products.map((warehouse) => (
                  <Select.Option key={warehouse.id} value={warehouse.name}>
                    {warehouse.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        {/* Кнопка "Заказать" */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={quantity > product?.stock || !selectedWarehouse}
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
           Tovarni yuborish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;