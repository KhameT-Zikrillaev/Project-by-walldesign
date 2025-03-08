import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Chilanzar", description: "Описание Chilanzar" },
  { id: 2, name: "Yunsabad", description: "Описание Yunsabad" },
];

export default function WarehouseProducts() {
  return (
    <div className="DirectorProduct mt-[150px] p-4">
      <h3 className="text-white mb-4">Список Магазинов</h3>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/warehouse/send-to-showcase/${product.name}`}
            className="block bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition"
          >
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
