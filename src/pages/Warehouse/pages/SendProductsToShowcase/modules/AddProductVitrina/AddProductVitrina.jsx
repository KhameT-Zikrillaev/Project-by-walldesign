import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {Form, InputNumber, Button, Checkbox, List, Image, Input } from "antd";
import bg from "@/assets/images/bg-login.jpg";
 const { Search } = Input;
const AddProductVitrina = ({ onClose }) => {
  const { handleSubmit, control, reset } = useForm();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [search, setSearch] = useState("");

  const dataSource = [
    { key: "1", code: "OB001", name: "Обои 'Синий океан'", price: "1000 руб", stock: 10, photo: bg },
    { key: "2", code: "OB002", name: "Обои 'Зеленый лес'", price: "1200 руб", stock: 5, photo: bg },
    { key: "3", code: "OB003", name: "Обои 'Красный закат'", price: "1100 руб", stock: 8, photo: bg },
    { key: "4", code: "OB004", name: "Обои 'Желтый песок'", price: "900 руб", stock: 15, photo: bg },
    { key: "5", code: "OB005", name: "Обои 'Фиолетовый туман'", price: "1300 руб", stock: 3, photo: bg },
    { key: "6", code: "OB006", name: "Обои 'Голубое небо'", price: "950 руб", stock: 7, photo: bg },
    { key: "7", code: "OB007", name: "Обои 'Розовый рассвет'", price: "1050 руб", stock: 12, photo: bg },
    { key: "8", code: "OB008", name: "Обои 'Серый камень'", price: "800 руб", stock: 20, photo: bg },
    { key: "9", code: "OB009", name: "Обои 'Белый снег'", price: "1000 руб", stock: 0, photo: bg },
    { key: "10", code: "OB010", name: "Обои 'Черная ночь'", price: "1400 руб", stock: 6, photo: bg },
  ];

  const filteredData = dataSource.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (product, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p.key !== product.key));
    }
  };

  const handleQuantityChange = (key, value) => {
    setSelectedProducts(
      selectedProducts.map((p) => (p.key === key ? { ...p, quantity: value } : p))
    );
  };

  const onSubmit = () => {
    console.log("Отправленные товары:", selectedProducts);
    reset();
    setSelectedProducts([]);
    onClose();
  };

  return (
    <div className="flex  min-h-[400px] min-w-[400px] flex-col md:flex-row w-full justify-between gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
      <Form className="w-full" layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Search
        placeholder="Qidirish"
        onChange={(e) => setSearch(e.target.value)}
        enterButton
        className="custom-search max-w-md"
      />
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <List
            dataSource={filteredData}
            renderItem={(product) => (
              <List.Item style={{ display: "flex", alignItems: "center" }}>
                <Checkbox onChange={(e) => handleSelect(product, e.target.checked)} />
                <Image src={product.photo} width={50} height={50} style={{ margin: "0 10px" }} />
                <div className="ml-4" style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: "bold" }}>{product.name}</div>
                  <div>{product.price}</div>
                </div>
                {selectedProducts.find((p) => p.key === product.key) && (
                  <Controller
                    name={`quantity_${product.key}`}
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        min={1}
                        max={product.stock}
                        onChange={(value) => handleQuantityChange(product.key, value)}
                        style={{ width: 60 }}
                      />
                    )}
                  />
                )}
              </List.Item>
            )}
            pagination={{ pageSize: 5 }}
          />
        </div>
        <Button type="primary" htmlType="submit" style={{ marginTop: 20, width: "100%" }}>
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default AddProductVitrina;
