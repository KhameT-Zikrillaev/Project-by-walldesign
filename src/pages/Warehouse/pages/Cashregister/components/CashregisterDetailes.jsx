import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import bgsklad from '@/assets/images/bg-sklad.png'; // Импортируй изображение фона
import { FaCalendarDay, FaCalendarAlt } from 'react-icons/fa'; // Импортируй иконки
import { useLocation } from 'react-router-dom';


export default function CashregisterDetailes() {
  const { name } = useParams();
  const location = useLocation();
  const shopId = location.state?.shopId;

  React.useEffect(() => {
    if (shopId) {
      sessionStorage.setItem('shopId', shopId); // Сохраняем shopId в localStorage
    }
  }, [shopId]);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 relative"
      style={{ backgroundImage: `url(${bgsklad})` }} // Применяем фон
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div> {/* Затемнение и размытие фона */}
      <div className="relative flex justify-center items-center z-10 mt-[150px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-4">
          <Link
            to={`/warehouse/cash-register/${name}/kunlik`}
            className="flex flex-col items-center justify-center p-8 bg-black/50 md:bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            {/* Иконка для Kunlik */}
            <FaCalendarDay className="text-4xl text-white mb-4" />
            <span className="text-xl text-center font-semibold text-white">Kunlik</span>
            <p className="text-gray-200 text-center mt-4">Kunlik kassani yopish</p>
          </Link>
          <Link
            to={`/warehouse/cash-register/${name}/hammasi`}
            className="flex flex-col items-center justify-center p-8 bg-black/50 md:bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            {/* Иконка для Hammasi */}
            <FaCalendarAlt className="text-4xl text-white mb-4" />
            <span className="text-xl text-center font-semibold text-white">Hammasi</span>
            <p className="text-gray-200 text-center mt-4">Hamma kassani ko'rish</p>
          </Link>
        </div>
      </div>
    </div>
  );
}