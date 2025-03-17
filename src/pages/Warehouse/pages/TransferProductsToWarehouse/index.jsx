import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "@/components/SearchForm/SearchForm";
import useFetch from "@/hooks/useFetch";
import { Spin } from "antd";

export default function WarehouseTransferProducts() {
  const [visibleDistricts, setVisibleDistricts] = useState(12);
  const [filteredData, setFilteredData] = useState([]);
  const loadMoreDistricts = () => {
    setVisibleDistricts((prevVisibleDistricts) => prevVisibleDistricts + 12);
  };


 const { data, isLoading, refetch } = useFetch('warehouse', 'warehouse', {});


useEffect(() => {
  setFilteredData(data?.data?.warehouses)
  console.log(data?.data?.warehouses)
}, [data])

  // Если пользователь не авторизован, показываем сообщение

  console.log(data?.data?.warehouses)
  return (
    <div className="WarehouseTransferProduct mt-[150px] p-4">
       <SearchForm data={data?.data?.warehouses} name="" title="Omborlar" showDatePicker={false} onSearch={setFilteredData} />
       {isLoading ? (
  <div className="flex justify-center items-center h-[300px]">
    <Spin size="large" />
  </div>
) : filteredData?.length > 0 ? (
  <div className="grid grid-cols-2 gap-4">
    {filteredData.slice(0, visibleDistricts).map((product) => (
      <Link
        key={product.id}
        to={`/warehouse/transfer-to-warehouse/${product.name}`}
        className="block bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition"
      >
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </Link>
    ))}
  </div>
) : (
  <div className="flex justify-center items-center h-[300px] text-gray-400">
    Ombor topilmadi
  </div>
)}
      {visibleDistricts < filteredData?.length && (
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
