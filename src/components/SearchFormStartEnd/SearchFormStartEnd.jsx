import React, { useState } from 'react';
import { Input, DatePicker, Button } from 'antd'; 
import { FaWarehouse, FaChartLine, FaListAlt, FaBox, FaUserTie } from "react-icons/fa";
import { TbShoppingCartCheck } from "react-icons/tb";
import { CloseCircleOutlined } from '@ant-design/icons'; 
import dayjs from 'dayjs'; 

const {  RangePicker } = DatePicker;
const { Search } = Input;
const iconMap = {
  Vitrina: FaListAlt,
  Vitrinasi: FaListAlt,
  Tovarlar: FaBox,
  Tovarlari: FaBox,
  Sotuvchilar: FaUserTie,
  Ombori: FaWarehouse,
  Omborlar: FaWarehouse,
  Omborxona: FaWarehouse,
  Hisobot: FaChartLine,
  Hisobotlar: FaChartLine,
  Hisobotlari: FaChartLine,
  Kassa: TbShoppingCartCheck,
  "Kassa ma'lumotlari": TbShoppingCartCheck,
  'Omboridigi mahsulotlarni yuborish': FaWarehouse,
  'Omboridigi mahsulotlarni vitringa yuborish': FaWarehouse,
  'Hisobotlar omborlar': FaWarehouse,
  'Hisobotlar sotuvchilar': FaUserTie,
  "Omborlar ro'yxati": FaWarehouse,
  "zakaz berish": FaWarehouse,
};

const SearchFormStartEnd = ({ data, onSearch, name, title, showDatePicker = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]); 

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (typeof onSearch === 'function') {
      if (onSearch.length >= 3) {
        onSearch(value, dateRange[0] ? dateRange[0].toDate() : null, dateRange[1] ? dateRange[1].toDate() : null);
      } else {
        if (!value || value.trim() === '') {
          onSearch(data?.products || data); 
          return;
        }
        
        const dataToFilter = data?.products || data;
        
        if (!dataToFilter || !Array.isArray(dataToFilter)) {
          console.warn('No data to filter or data is not an array');
          return;
        }
        const filteredData = dataToFilter.filter(item => {
          const articleMatch = item?.article && item?.article.toLowerCase().includes(value.toLowerCase());
          const nameMatch = item?.name && item?.name.toLowerCase().includes(value.toLowerCase());
          const descriptionMatch = item?.description && item?.description.toLowerCase().includes(value.toLowerCase());
          return articleMatch || nameMatch || descriptionMatch;
        });
        
        onSearch(filteredData); 
      }
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    
    if (typeof onSearch === 'function' && onSearch.length >= 3) {
      setTimeout(() => {
        onSearch(searchTerm, dates[0] ? dates[0].toDate() : null, dates[1] ? dates[1].toDate() : null);
      }, 0);
    }
  };

  const handleClear = () => {
    setSearchTerm(''); 
    setDateRange([null, null]);   
    if (typeof onSearch === 'function') {
      if (onSearch.length >= 3) {
        onSearch('', null, null);
      } else {
        onSearch(data?.products || data);
      }
    }
  };

  // Проверяем, нужно ли показывать кнопку очистки
  const shouldShowClearButton = searchTerm.length > 1 || dateRange.some(date => date !== null);

  const IconComponent = iconMap[title] || FaBox; 

  return (
    <div className="flex flex-col md:flex-row w-full justify-between gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300">
      <div className="flex justify-center md:justify-start items-center">
        <IconComponent className="text-3xl text-white" />
        <span className="text-xl font-semibold ml-2 text-white">{name} {title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        {showDatePicker && (
          <RangePicker
            onChange={handleDateRangeChange}
            value={dateRange}
            format="DD/MM/YYYY"
            className="custom-datepicker"
            placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
            style={{
              backgroundColor: "#17212b",
              "--placeholder-color": "white",
            }}
          />
        )}
        <div className="flex items-center gap-2 w-full">
          <Search
            placeholder="Qidirish"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            enterButton
            className="custom-search max-w-md"
            onSearch={handleSearch} 
          />
          {shouldShowClearButton && (
            <Button 
              type="primary" 
              icon={<CloseCircleOutlined />} 
              onClick={handleClear}
              className="flex items-center justify-center"
              style={{
                backgroundColor: "#17212b",}}
              title="Tozalash"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFormStartEnd;