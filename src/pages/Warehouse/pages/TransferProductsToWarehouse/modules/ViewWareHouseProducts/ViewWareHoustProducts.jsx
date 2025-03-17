import React, { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

export default function ViewWareHoustProducts({ idwarehouse }) {
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading, refetch } = useFetch(
    idwarehouse ? `warehouse-products/${idwarehouse}` : null, // Если id нет, не делаем запрос
    {},
    {
      enabled: !!idwarehouse, // Запрос будет выполнен только если id существует
    }
  );

  useEffect(() => {
    if (data) {
      setFilteredData(data); // Обновляем filteredData при изменении data
    }
  }, [data]);

  console.log(data);

  return <div>{idwarehouse}</div>;
}