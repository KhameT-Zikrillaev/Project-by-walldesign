import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import SearchForm from "@/components/SearchForm/SearchForm";
import useFetch from "@/hooks/useFetch";

export default function Report() {
  const [filteredData, setFilteredData] = useState([]);
  // const { name } = useParams();
  
  const { data, isLoading } = useFetch('warehouse', 'warehouse', {});

  return (
    <div className="DirectorProduct mt-[150px] p-4">
      <SearchForm data={data?.data?.warehouses} name="" title="Omborlar" showDatePicker={false} onSearch={setFilteredData}/>
      <div className="grid grid-cols-2 gap-4">
        {data?.data?.warehouses?.map((product) => (
          <Link
            key={product.id}
            to={`/admin/report/${product.name}`}
            state={{warehouseId: product.id}}
            className="block bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition"
          >
            <h4>{product.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
