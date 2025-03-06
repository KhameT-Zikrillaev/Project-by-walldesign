import React from "react";
import { useParams } from "react-router-dom";

const products = [
  { name: "Chilanzar", description: "Описание Chilanzar" },
  { name: "Yunsabad", description: "Описание Yunsabad" },
];

export default function ProductDetails() {
  const { id } = useParams(); // Получаем параметр из URL

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="ProductDetails mt-[150px] p-4">
      <h1 className="text-white">{product.name}</h1>
      <p className="text-white">{product.description}</p>
    </div>
  );
}