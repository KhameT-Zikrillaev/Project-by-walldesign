import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import {
  FaCog,
  FaListAlt,
  FaMoneyBillAlt,
  FaChartLine,
  FaShoppingCart,
  FaCashRegister,
  FaTachometerAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import bgsklad from "../../assets/images/bg-sklad.png"; // Ваша картинка

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgsklad})` }}
    >
      {isLoading && <Loading />}
      <Navbar />

      {/* Размытый фон */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-[120px]">
        {/* Блок с пользователем */}
        <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300">
          <AiOutlineUser className="text-3xl text-white" />
          <span className="text-xl font-semibold text-white">Администратор</span>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Панель управления</h1>
          <p className="text-gray-200">Выберите раздел для работы</p>
        </div>

        {/* Кнопки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {/* Админ панель */}
          <Link
            to="/admin-panel/statistics"
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <FaCog className="text-4xl text-white mb-4" />
            <span className="text-xl font-semibold text-white">Админ панель</span>
            <p className="text-gray-200 text-center mt-2">Управление системой</p>
          </Link>

          {/* Касса */}
          <Link
            to="/operations"
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <FaListAlt className="text-4xl text-white mb-4" />
            <span className="text-xl font-semibold text-white">Касса</span>
            <p className="text-gray-200 text-center mt-2">Операции с финансами</p>
          </Link>

          {/* История операций */}
          <Link
            to="/close-cash"
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <FaMoneyBillAlt className="text-4xl text-white mb-4" />
            <span className="text-xl font-semibold text-white">История операций</span>
            <p className="text-gray-200 text-center mt-2">Просмотр всех транзакций</p>
          </Link>

          {/* Отчеты */}
          <Link
            to="/main-reports"
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <FaChartLine className="text-4xl text-white mb-4" />
            <span className="text-xl font-semibold text-white">Отчеты</span>
            <p className="text-gray-200 text-center mt-2">Аналитика и статистика</p>
          </Link>

          {/* Продажи */}
          <Link
            to="/sales"
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <FaShoppingCart className="text-4xl text-white mb-4" />
            <span className="text-xl font-semibold text-white">Продажи</span>
            <p className="text-gray-200 text-center mt-2">Управление продажами</p>
          </Link>

          {/* Покупки */}
          <Link
            to="/purchases"
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <FaCashRegister className="text-4xl text-white mb-4" />
            <span className="text-xl font-semibold text-white">Покупки</span>
            <p className="text-gray-200 text-center mt-2">Управление закупками</p>
          </Link>
        </div>
      </div>
    </div>
  );
}