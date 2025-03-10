import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import SearchForm from "./modules/SearchForm";
const products = [
  { id: 1, name: "Chilanzar", description: "Описание Chilanzar" },
  { id: 2, name: "Yunsabad", description: "Описание Yunsabad" },
  { id: 3, name: "Qo'yliq", description: "Описание Chilanzar" },
  { id: 4, name: "Chinor", description: "Описание Chinor" },
  { id: 5, name: "Salar", description: "Описание Salar" },
  { id: 6, name: "Olamzor", description: "Описание Olamzor" },
];

export default function Report() {
  const [filteredData, setFilteredData] = useState(products);
  const { name } = useParams();

  return (
    <div className="DirectorProduct mt-[150px] p-4">
      <SearchForm data={products} onSearch={setFilteredData} name={'Omborlar'} />
      <div className="grid grid-cols-2 gap-4">
        {filteredData.map((product) => (
          <Link
            key={product.id}
            to={`/admin/report/${product.name}`}
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
