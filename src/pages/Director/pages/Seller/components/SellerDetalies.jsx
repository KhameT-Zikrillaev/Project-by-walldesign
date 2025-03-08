import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, Pagination, Tag, Button } from 'antd';
import 'antd/dist/reset.css';
import bgsklad from '@/assets/images/bg-sklad.png';
import SearchForm from '../modules/SearchForm';
import bg from '@/assets/images/bg-login.jpg';
const products = [
  { id: 1,  description: "Описание Chilanzar", name: "Magic Wall", warehouse: "Yunsobod" },
  { id: 2,  description: "Описание Yunsabad", name: "Color Dreams", warehouse: "Chilanzar" },
  { id: 3,  description: "Описание Mirzo Ulugbek", name: "Wall Master", warehouse: "Mirzo Ulugbek" },
  { id: 4,  description: "Описание Yakkasaray", name: "Dream Decor", warehouse: "Yakkasaray" },
  { id: 5,  description: "Описание Shayxontoxur", name: "Home Style", warehouse: "Shayxontoxur" },
  { id: 6,  description: "Описание Olmazor", name: "Wall Art", warehouse: "Olmazor" },
  { id: 7,  description: "Описание Bektemir", name: "Creative Walls", warehouse: "Bektemir" },
  { id: 8,  description: "Описание Yashnobod", name: "Modern Decor", warehouse: "Yashnobod" },
  { id: 9,  description: "Описание Mirobod", name: "Elegant Walls", warehouse: "Mirobod" },
  { id: 10, description: "Описание Sergeli", name: "Wall Trends", warehouse: "Sergeli" },
  { id: 11, description: "Описание Uchtepa", name: "Style Home", warehouse: "Uchtepa" },
  { id: 12, description: "Описание Yangihayot", name: "Urban Decor", warehouse: "Yangihayot" },
  { id: 13, description: "Описание Tashkent District", name: "Wall Vision", warehouse: "Tashkent District" },
  { id: 14, description: "Описание Samarkand", name: "Golden Walls", warehouse: "Samarkand" },
  { id: 15, description: "Описание Bukhara", name: "Heritage Decor", warehouse: "Bukhara" },
  { id: 16, description: "Описание Khiva", name: "Ancient Walls", warehouse: "Khiva" },
  { id: 17, description: "Описание Fergana", name: "Silk Road Decor", warehouse: "Fergana" },
  { id: 18, description: "Описание Namangan", name: "Green Walls", warehouse: "Namangan" },
  { id: 19, description: "Описание Andijan", name: "Bright Decor", warehouse: "Andijan" },
  { id: 20, description: "Описание Nukus", name: "Desert Style", warehouse: "Nukus" },
  { id: 21, description: "Описание Urgench", name: "Oasis Decor", warehouse: "Urgench" },
  { id: 22, description: "Описание Navoi", name: "Mining Walls", warehouse: "Navoi" },
  { id: 23, description: "Описание Jizzakh", name: "Valley Decor", warehouse: "Jizzakh" },
  { id: 24, description: "Описание Termez", name: "Border Walls", warehouse: "Termez" },
];
const dataSource = [
  { key: '1', code: 'OB001', name: 'Обои "Синий океан"', price: 1000, stock: 10, photo: bg },
  { key: '2', code: 'OB002', name: 'Обои "Зеленый лес"', price: 1200, stock: 5, photo: bg },
  { key: '3', code: 'OB003', name: 'Обои "Красный закат"', price: 1100, stock: 8, photo: bg },
  { key: '4', code: 'OB004', name: 'Обои "Желтый песок"', price: 900, stock: 15, photo: bg },
  { key: '5', code: 'OB005', name: 'Обои "Фиолетовый туман"', price: 1300, stock: 3, photo: bg },
  { key: '6', code: 'OB006', name: 'Обои "Голубое небо"', price: 950, stock: 7, photo: bg },
  { key: '7', code: 'OB007', name: 'Обои "Розовый рассвет"', price: 1050, stock: 12, photo: bg },
  { key: '8', code: 'OB008', name: 'Обои "Серый камень"', price: 800, stock: 20, photo: bg },
  { key: '9', code: 'OB009', name: 'Обои "Белый снег"', price: 1000, stock: 0, photo: bg },
  { key: '10', code: 'OB010', name: 'Обои "Черная ночь"', price: 1400, stock: 6, photo: bg },
  { key: '11', code: 'OB011', name: 'Обои "Оранжевый закат"', price: 1150, stock: 9, photo: bg },
  { key: '12', code: 'OB012', name: 'Обои "Коричневый дуб"', price: 1250, stock: 4, photo: bg },
  { key: '13', code: 'OB013', name: 'Обои "Бирюзовый океан"', price: 1350, stock: 15, photo: bg },
  { key: '14', code: 'OB014', name: 'Обои "Лавандовый туман"', price: 950, stock: 12, photo: bg },
  { key: '15', code: 'OB015', name: 'Обои "Мятный бриз"', price: 1100, stock: 7, photo: bg },
];

export default function ProductDetails() {
  const { name } = useParams(); // Получаем параметр name из URL
  console.log('URL параметр name:', name);

  const product = products.find((p) => p.name === name);
  console.log('Найденный продукт:', product)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filteredData, setFilteredData] = useState(dataSource);

  const updateItemsPerPage = () => {
    setItemsPerPage(window.innerWidth < 768 ? 4 : 10);
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
  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div
    className="min-h-screen bg-cover bg-center p-1 relative"
    style={{ backgroundImage: `url(${bgsklad})` }}
  >
    <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>

    <div className="relative z-0 max-w-[1440px] mx-auto flex flex-col items-center justify-center mt-[120px]">
      <SearchForm data={dataSource} name={product.name} onSearch={setFilteredData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full px-4">
        {currentData.map((item) => (
          <Card
            key={item.key}
            className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
            style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            cover={
              <div
                className="h-28 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${item.photo})` }}
              />
            }
            bodyStyle={{ padding: '12px', color: 'white' }}
          >
            <div className="flex flex-col gap-2">
              <Tag color="blue">Part: <span className="text-red-500">{item.code}</span></Tag>
              <h4 className="text-sm font-semibold text-white">{item.name}</h4>
              <div className="flex justify-between">
                <p className="text-gray-300 text-xs">Narxi: {item.price} so'm</p>
                <p className="text-gray-300 text-xs">Soni bor: {item.stock} dona.</p>
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