import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); 
  return (
    <>
      {/* Бургер-иконка для мобильных устройств */}
      {!isSidebarOpen && ( // Показывать бургер только если сайдбар закрыт
        <button
          className="md:hidden fixed top-8 left-4 z-50 p-2 bg-[#95a5a6] text-white rounded"
          onClick={() => setIsSidebarOpen(true)} // Открыть сайдбар
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      )}

      {/* Сайдбар */}
      <div
        className={`bg-[#17212b] shadow-xl to-gray-100 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out mt-[105px] z-40`}
      >
        {/* Кнопка закрытия (крестик) для мобильных устройств */}
        <button
          className="md:hidden absolute top-0 right-1 p-2 text-black"
          onClick={() => setIsSidebarOpen(false)} // Закрыть сайдбар
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className='mt-[10px]'>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin-panel/statistics"
                className={`block py-2.5 px-4 rounded transition duration-200 ${
                    location.pathname === '/admin-panel/statistics' // Проверяем активный маршрут
                      ? 'bg-[#7f8c8d] text-white' // Стиль для активной кнопки
                      : 'text-black hover:bg-gray-700' // Стиль для неактивной кнопки
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
              >
                   <span className="text-white font-medium">Статистика</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-panel/users"
                className={`block py-2.5 px-4 rounded transition duration-200 ${
                    location.pathname === '/admin-panel/users' // Проверяем активный маршрут
                      ? 'bg-[#7f8c8d] text-white' // Стиль для активной кнопки
                      : 'text-black hover:bg-gray-700' // Стиль для неактивной кнопки
                  }`}
                  onClick={() => setIsSidebarOpen(false)}// Закрыть сайдбар после клика
              >
              <span className="text-white font-medium">Пользователи</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Затемнение фона при открытом сайдбаре на мобильных устройствах */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)} // Закрыть сайдбар при клике на затемнение
        ></div>
      )}
    </>
  );
};

export default SideBar;