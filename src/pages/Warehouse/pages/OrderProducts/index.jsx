import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import SearchForm from "@/components/SearchForm/SearchForm";
import useFetch from "@/hooks/useFetch";
import { Spin } from "antd";
import useUserStore from "@/store/useUser"

export default function WarehouseOrderProducts() {
  const {user} = useUserStore()
  const [filteredData, setFilteredData] = useState([]);
  
  const { data, isLoading } = useFetch('warehouse', 'warehouse', {});
  useEffect(() => {
    let newData = data?.data?.warehouses?.filter(item => item?.id !== user?.warehouse?.id)
    setFilteredData(newData)
  }, [data])
  return (
    <div className="DirectorProduct mt-[150px] p-4">
      <SearchForm data={data?.data?.warehouses} name="" title="Omborlar ro'yxati" showDatePicker={false} onSearch={setFilteredData} />
      {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
      <div className="grid grid-cols-2 gap-4">
        {filteredData?.map((product) => (
          <Link
            key={product.id}
            state = {{id: product.id}}
            to={`/warehouse/order-products/${product.name}`}
            className="block bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition"
          >
            <h4>{product.name}</h4>
          </Link>
        ))}
      </div>
    )}
    </div>
  );
}
