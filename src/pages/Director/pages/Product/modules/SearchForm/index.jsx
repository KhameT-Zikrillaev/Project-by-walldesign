import React, { useState } from 'react';
import { Input } from 'antd';
import {FaWarehouse} from "react-icons/fa6";
const { Search } = Input;

const SearchForm = ({ data, onSearch,name }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    onSearch(filteredData); // Передаем отфильтрованные данные в родительский компонент
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-between gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 ">
      <div className="flex justify-center  md:justify-start items-center">
      <FaWarehouse className="text-3xl text-white" />
      <span className="text-xl font-semibold text-white ml-2">{name}</span>
      </div>
      <Search
        placeholder="Qidirish"
        onChange={(e) => handleSearch(e.target.value)}
        enterButton
        className="custom-search max-w-md"
      />
    </div>
  );
};

export default SearchForm;