import React, { useState, useEffect } from 'react';
import { Card, Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import bgsklad from '../../../../assets/images/bg-sklad.png';
import SearchForm from './modules/SearchForm';
import bg from '../../../../assets/images/bg-login.jpg';
const dataSource = [
  { key: '1', date: '2023-10-01', returnDate: '2023-10-05', code: '#4443', name: 'Обои "Зеленый лес"', color: '#008000', action: 'куплено', quantity: 10, returns: 2, photo: bg },
  { key: '2', date: '2023-10-02', returnDate: '2023-10-06', code: '#4444', name: 'Обои "Синий океан"', color: '#0000FF', action: 'куплено', quantity: 5, returns: 1, photo: bg },
  { key: '3', date: '2023-10-03', returnDate: '2023-10-07', code: '#4445', name: 'Обои "Красный закат"', color: '#FF0000', action: 'куплено', quantity: 8, returns: 0, photo: bg },
  { key: '4', date: '2023-10-04', returnDate: '2023-10-08', code: '#4446', name: 'Обои "Желтый песок"', color: '#FFFF00', action: 'куплено', quantity: 15, returns: 3, photo: bg },
  { key: '5', date: '2023-10-05', returnDate: '2023-10-09', code: '#4447', name: 'Обои "Фиолетовый туман"', color: '#800080', action: 'куплено', quantity: 3, returns: 0, photo: bg },
  { key: '6', date: '2023-10-06', returnDate: '2023-10-10', code: '#4448', name: 'Обои "Голубое небо"', color: '#87CEEB', action: 'куплено', quantity: 7, returns: 1, photo: bg },
  { key: '7', date: '2023-10-07', returnDate: '2023-10-11', code: '#4449', name: 'Обои "Розовый рассвет"', color: '#FFC0CB', action: 'куплено', quantity: 12, returns: 4, photo: bg },
  { key: '8', date: '2023-10-08', returnDate: '2023-10-12', code: '#4450', name: 'Обои "Серый камень"', color: '#808080', action: 'куплено', quantity: 20, returns: 5, photo: bg },
  { key: '9', date: '2023-10-09', returnDate: '2023-10-13', code: '#4451', name: 'Обои "Белый снег"', color: '#FFFFFF', action: 'куплено', quantity: 0, returns: 0, photo: bg },
  { key: '10', date: '2023-10-10', returnDate: '2023-10-14', code: '#4452', name: 'Обои "Черная ночь"', color: '#000000', action: 'куплено', quantity: 6, returns: 2, photo: bg },
];

export default function Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // 4 карточки на странице
  const [filteredData, setFilteredData] = useState(dataSource);

  const updateItemsPerPage = () => {
    setItemsPerPage(4); // Фиксированное количество карточек на странице
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
                <div className="flex gap-2 items-center justify-between">
                <Tag color="blue">{item.code}</Tag>
                <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                </div>
                  
                  <Tag style={{ backgroundColor: item.color, color: '#fff' }}>{item.color}</Tag>
                  <p className="text-gray-300 text-xs">
                    Дата покупки: {item.date}, куплено: {item.quantity} шт.
                  </p>
                  {item.returns > 0 && (
                    <p className="text-gray-300 text-xs">
                      Дата возврата: {item.returnDate}, возвращено: {item.returns} шт.
                    </p>
                  )}
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