import React, { useState } from 'react';
import { Input, DatePicker } from 'antd'; // Импортируем DatePicker из antd
import {FaWarehouse} from "react-icons/fa6";
import dayjs from 'dayjs'; // Для работы с датами

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchForm = ({ data, onSearch ,name}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dates, setDates] = useState([]); // Состояние для хранения выбранных дат

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    onSearch(filteredData); // Передаем отфильтрованные данные в родительский компонент
  };

  const handleDateChange = (dates) => {
    setDates(dates);
    // Если нужно выполнить фильтрацию по датам, добавьте логику здесь
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-between gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
      {/* Логотип и заголовок */}
      <div className="flex justify-center md:justify-start items-center">
        <FaWarehouse className="text-3xl text-white" />
        <span className="text-xl font-semibold ml-2 text-white">{name} </span>
      </div>

      {/* Поле для выбора диапазона дат */}
      <div className="flex flex-col md:flex-row gap-3">
      <Search
        placeholder="Qidirish"
        onChange={(e) => handleSearch(e.target.value)}
        enterButton
        className="custom-search max-w-md"
      />
      </div>

  
    </div>
  );
};

export default SearchForm;