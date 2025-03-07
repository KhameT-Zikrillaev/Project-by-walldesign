import React, { useState, useEffect } from 'react';
import { Card, Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import bgsklad from '../../../../assets/images/bg-sklad.png';
import SearchForm from './modules/SearchForm';
import bg from '../../../../assets/images/bg-login.jpg';

const dataSource = [
  { key: '1', date: '2023-10-01', code: '#4443', name: 'Обои "Зеленый лес"', quantity: 10, photo: bg },
  { key: '2', date: '2023-10-02', code: '#4444', name: 'Обои "Синий океан"', quantity: 5, photo: bg },
  { key: '3', date: '2023-10-03', code: '#4445', name: 'Обои "Красный закат"', quantity: 8, photo: bg },
  { key: '4', date: '2023-10-04', code: '#4446', name: 'Обои "Желтый песок"', quantity: 15, photo: bg },
  { key: '5', date: '2023-10-05', code: '#4447', name: 'Обои "Фиолетовый туман"', quantity: 3, photo: bg },
  { key: '6', date: '2023-10-06', code: '#4448', name: 'Обои "Голубое небо"', quantity: 7, photo: bg },
  { key: '7', date: '2023-10-07', code: '#4449', name: 'Обои "Розовый рассвет"', quantity: 12, photo: bg },
  { key: '8', date: '2023-10-08', code: '#4450', name: 'Обои "Серый камень"', quantity: 20, photo: bg },
  { key: '9', date: '2023-10-09', code: '#4451', name: 'Обои "Белый снег"', quantity: 0, photo: bg },
  { key: '10', date: '2023-10-10', code: '#4452', name: 'Обои "Черная ночь"', quantity: 6, photo: bg },
];

export default function Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 4 карточки на странице
  const [filteredData, setFilteredData] = useState(dataSource);

  const updateItemsPerPage = () => {
    setItemsPerPage(5); // Фиксированное количество карточек на странице
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-1 relative"
      style={{ backgroundImage: `url(${bgsklad})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>

      <div className="relative z-0 max-w-[1440px] mx-auto flex flex-col items-center justify-center mt-[120px]">
        <SearchForm data={dataSource} onSearch={setFilteredData} />

        <div className="grid grid-cols-1 gap-4 w-full px-4">
          {currentData.map((item) => (
            <Card
              key={item.key}
              className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              bodyStyle={{ padding: '12px', color: 'white' }}
            >
              <div className="flex gap-4">
                {/* Фото обоев */}
                <div
                  className="w-1/4 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${item.photo})` }}
                />
                {/* Данные */}
                <div className="w-3/4 flex flex-col gap-2">
                  <Tag color="blue" className="mb-2">
                    Part: <span className="text-red-500">{item.code}</span>
                  </Tag>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {item.name}
                  </h4>
                  <div className="flex justify-between">
                    <p className="text-gray-300 text-xs">
                      Sonni: {item.quantity} ta
                    </p>
                    <p className="text-gray-300 text-xs">
                      Sana: {item.date}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="my-2 mb-12 md:mb-0 flex justify-center">
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