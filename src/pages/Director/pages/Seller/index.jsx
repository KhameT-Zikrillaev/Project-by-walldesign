import React, { useState } from "react";
import { Link } from "react-router-dom";

const districts = [
  { id: 1,  description: "Описание Chilanzar", name: "Magic Wall", warehouse: "Yunsobod" },
  { id: 2,  description: "Описание Yunsabad", name: "Color Dreams", warehouse: "Chilanzar" },
  { id: 3,  description: "Описание Mirzo Ulugbek", name: "Wall Master", warehouse: "Mirzo Ulugbek" },
  { id: 4,  description: "Описание Yakkasaray", name: "Dream Decor", warehouse: "Yakkasaray" },
  { id: 5,  description: "Описание Shayxontoxur", name: "Home Style", warehouse: "Shayxontoxur" },
  { id: 6,  description: "Описание Olmazor", name: "Wall Art", warehouse: "Olmazor" },
  { id: 7,  description: "Описание Bektemir", name: "Creative Walls", warehouse: "Bektemir" },
  { id: 8,  description: "Описание Yashnobod", name: "Modern Decor", warehouse: "Yashnobod" },
  { id: 9,  description: "Описание Mirobod", name: "Elegant Walls", warehouse: "Mirobod" },
  { id: 10, description: "Описание Sergeli", name: "Wall Trends", warehouse: "Sergeli" },
  { id: 11, description: "Описание Uchtepa", name: "Style Home", warehouse: "Uchtepa" },
  { id: 12, description: "Описание Yangihayot", name: "Urban Decor", warehouse: "Yangihayot" },
  { id: 13, description: "Описание Tashkent District", name: "Wall Vision", warehouse: "Tashkent District" },
  { id: 14, description: "Описание Samarkand", name: "Golden Walls", warehouse: "Samarkand" },
  { id: 15, description: "Описание Bukhara", name: "Heritage Decor", warehouse: "Bukhara" },
  { id: 16, description: "Описание Khiva", name: "Ancient Walls", warehouse: "Khiva" },
  { id: 17, description: "Описание Fergana", name: "Silk Road Decor", warehouse: "Fergana" },
  { id: 18, description: "Описание Namangan", name: "Green Walls", warehouse: "Namangan" },
  { id: 19, description: "Описание Andijan", name: "Bright Decor", warehouse: "Andijan" },
  { id: 20, description: "Описание Nukus", name: "Desert Style", warehouse: "Nukus" },
  { id: 21, description: "Описание Urgench", name: "Oasis Decor", warehouse: "Urgench" },
  { id: 22, description: "Описание Navoi", name: "Mining Walls", warehouse: "Navoi" },
  { id: 23, description: "Описание Jizzakh", name: "Valley Decor", warehouse: "Jizzakh" },
  { id: 24, description: "Описание Termez", name: "Border Walls", warehouse: "Termez" },
];

export default function Seller() {
  const [visibleDistricts, setVisibleDistricts] = useState(12);

  const loadMoreDistricts = () => {
    setVisibleDistricts((prevVisibleDistricts) => prevVisibleDistricts + 12);
  };

  return (
    <div className="DirectorSeller pt-[150px] p-4">
      <h3 className="text-white mb-4 text-center">Sotuvchilar</h3>
      <div className="grid grid-cols-2 gap-4">
        {districts.slice(0, visibleDistricts).map((district) => (
          <Link
            key={district.id}
            to={`/director/seller-list/${district.name}`}
            className="block bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition"
          >
            <h4 className="text-lg font-semibold">{district.name}</h4>
            <p className="text-sm text-gray-300">{district.description}</p>
            <div className="mt-2">
              <p className="text-sm">Ombor: {district.warehouse}</p>
            </div>
          </Link>
        ))}
      </div>
      {visibleDistricts < districts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreDistricts}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Yana
          </button>
        </div>
      )}
    </div>
  );
}