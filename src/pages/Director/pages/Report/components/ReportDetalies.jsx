import React, { useState, useEffect } from 'react';
import { Card, Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import bgsklad from '@/assets/images/bg-sklad.png';
import SearchForm from '../modules/SearchForm';
import bg from '@/assets/images/bg-login.jpg';
import { useParams } from 'react-router-dom';

const products = [
  { id: 1, name: "Chilanzar", description: "Описание Chilanzar" },
  { id: 2, name: "Yunsabad", description: "Описание Yunsabad" },
  { id: 3, name: "Mirzo Ulugbek", description: "Описание Mirzo Ulugbek" },
  { id: 4, name: "Yakkasaray", description: "Описание Yakkasaray" },
  { id: 5, name: "Shayxontoxur", description: "Описание Shayxontoxur" },
  { id: 6, name: "Olmazor", description: "Описание Olmazor" },
  { id: 7, name: "Bektemir", description: "Описание Bektemir" },
  { id: 8, name: "Yashnobod", description: "Описание Yashnobod" },
  { id: 9, name: "Mirobod", description: "Описание Mirobod" },
  { id: 10, name: "Sergeli", description: "Описание Sergeli" },
  { id: 11, name: "Uchtepa", description: "Описание Uchtepa" },
  { id: 12, name: "Yangihayot", description: "Описание Yangihayot" },
  { id: 13, name: "Tashkent District", description: "Описание Tashkent District" },
  { id: 14, name: "Samarkand", description: "Описание Samarkand" },
  { id: 15, name: "Bukhara", description: "Описание Bukhara" },
  { id: 16, name: "Khiva", description: "Описание Khiva" },
  { id: 17, name: "Fergana", description: "Описание Fergana" },
  { id: 18, name: "Namangan", description: "Описание Namangan" },
  { id: 19, name: "Andijan", description: "Описание Andijan" },
  { id: 20, name: "Nukus", description: "Описание Nukus" },
  { id: 21, name: "Urgench", description: "Описание Urgench" },
  { id: 22, name: "Navoi", description: "Описание Navoi" },
  { id: 23, name: "Jizzakh", description: "Описание Jizzakh" },
  { id: 24, name: "Termez", description: "Описание Termez" },
];

const dataSource = [
  { key: '1', date: '2023-10-01', code: '#4443', name: 'Обои "Зеленый лес"', quantity: 10, price: 1000, photo: bg },
  { key: '2', date: '2023-10-02', code: '#4444', name: 'Обои "Синий океан"', quantity: 5, price: 1200, photo: bg },
  { key: '3', date: '2023-10-03', code: '#4445', name: 'Обои "Красный закат"', quantity: 8, price: 1100, photo: bg },
  { key: '4', date: '2023-10-04', code: '#4446', name: 'Обои "Желтый песок"', quantity: 15, price: 900, photo: bg },
  { key: '5', date: '2023-10-05', code: '#4447', name: 'Обои "Фиолетовый туман"', quantity: 3, price: 1300, photo: bg },
  { key: '6', date: '2023-10-06', code: '#4448', name: 'Обои "Голубое небо"', quantity: 7, price: 950, photo: bg },
  { key: '7', date: '2023-10-07', code: '#4449', name: 'Обои "Розовый рассвет"', quantity: 12, price: 1050, photo: bg },
  { key: '8', date: '2023-10-08', code: '#4450', name: 'Обои "Серый камень"', quantity: 20, price: 800, photo: bg },
  { key: '9', date: '2023-10-09', code: '#4451', name: 'Обои "Белый снег"', quantity: 0, price: 1000, photo: bg },
  { key: '10', date: '2023-10-10', code: '#4452', name: 'Обои "Черная ночь"', quantity: 6, price: 1400, photo: bg },
];

export default function Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 5 карточек на странице
  const [filteredData, setFilteredData] = useState(dataSource);
  const { name } = useParams(); // Получаем параметр name из URL
  console.log('URL параметр name:', name);

  const product = products.find((p) => p.name === name);
  console.log('Найденный продукт:', product);

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
        <SearchForm data={dataSource} name={product.name} onSearch={setFilteredData} />

        <div className="grid grid-cols-1 gap-4 w-full px-4">
          {currentData.map((item) => {
            const totalAmount = item.quantity * item.price; // Общая сумма
            return (
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
                    <div className="flex justify-between">
                      <p className="text-gray-300 text-xs">
                        Narxi: {item.price} so'm
                      </p>
                      <p className="text-gray-300 text-xs">
                        Umumiy summa: {totalAmount} so'm
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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