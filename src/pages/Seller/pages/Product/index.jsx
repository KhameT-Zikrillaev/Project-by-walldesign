import React, { useState, useEffect } from 'react';
import { Card, Pagination, Tag, Input } from 'antd';
import 'antd/dist/reset.css';
import bgsklad from '../../../../assets/images/bg-sklad.png';
import { AiOutlineAppstore } from "react-icons/ai";

const { Search } = Input;

const dataSource = [
  { key: '1', code: 'OB001', name: 'Обои "Синий океан"', color: '#0000FF', price: '1000 руб', stock: 10 },
  { key: '2', code: 'OB002', name: 'Обои "Зеленый лес"', color: '#008000', price: '1200 руб', stock: 5 },
  { key: '3', code: 'OB003', name: 'Обои "Красный закат"', color: '#FF0000', price: '1100 руб', stock: 8 },
  { key: '4', code: 'OB004', name: 'Обои "Желтый песок"', color: '#FFFF00', price: '900 руб', stock: 15 },
  { key: '5', code: 'OB005', name: 'Обои "Фиолетовый туман"', color: '#800080', price: '1300 руб', stock: 3 },
  { key: '6', code: 'OB006', name: 'Обои "Голубое небо"', color: '#87CEEB', price: '950 руб', stock: 7 },
  { key: '7', code: 'OB007', name: 'Обои "Розовый рассвет"', color: '#FFC0CB', price: '1050 руб', stock: 12 },
  { key: '8', code: 'OB008', name: 'Обои "Серый камень"', color: '#808080', price: '800 руб', stock: 20 },
  { key: '9', code: 'OB009', name: 'Обои "Белый снег"', color: '#FFFFFF', price: '1000 руб', stock: 0 },
  { key: '10', code: 'OB010', name: 'Обои "Черная ночь"', color: '#000000', price: '1400 руб', stock: 6 },
  { key: '11', code: 'OB011', name: 'Обои "Оранжевый закат"', color: '#FFA500', price: '1150 руб', stock: 9 },
  { key: '12', code: 'OB012', name: 'Обои "Коричневый дуб"', color: '#A52A2A', price: '1250 руб', stock: 4 },
];

export default function Product() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  const updateItemsPerPage = () => {
    setItemsPerPage(window.innerWidth < 768 ? 4 : 8);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const filteredData = dataSource.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 relative"
      style={{ backgroundImage: `url(${bgsklad})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>

      <div className="relative z-0 flex flex-col items-center justify-center mt-[120px]">
        <div className="flex flex-col items-center justify-center gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 w-full max-w-md">
          <AiOutlineAppstore className="text-3xl text-white" />
          <span className="text-xl font-semibold text-white">Витрина</span>
          <Search
            placeholder="Поиск по названию"
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
          {currentData.map((item) => (
            <Card
              key={item.key}
              className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              cover={
                <div
                  className="h-28 bg-cover bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(https://via.placeholder.com/300x200?text=${item.name})` }}
                />
              }
              bodyStyle={{ padding: '12px', color: 'white' }}
            >
              <div className="flex flex-col gap-2">
                <Tag color="blue">{item.code}</Tag>
                <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                <Tag style={{ backgroundColor: item.color, color: '#fff' }}>{item.color}</Tag>
                <p className="text-gray-300 text-xs">{item.price}</p>
               
              </div>
            </Card>
          ))}
        </div>

        <div className="my-6 pb-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
}
