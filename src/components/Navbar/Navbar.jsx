import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import logo from "@/assets/images/logo.png"; // Укажите правильный путь к вашему логотипу

const Navbar = () => {
  return (
    <div className="w-full h-[105px] left-0 top-0 flex justify-between fixed z-10 items-center mb-6 md:mb-10 py-6 px-6 md:px-6 bg-[#17212b] rounded-lg shadow-xl">
      {/* Логотип */}
      <div className="left-content">
        <div>
          <img className=" max-w-[120px] md:max-w-[180px] w-full" src={logo} alt="Logo" />
        </div>
      </div>

      {/* Правая часть: Имя пользователя и кнопка выхода */}
      <div className="right-content flex items-center space-x-4">
        <div className="text-right">
          <h2 className=" text-sm md:text-lg font-semibold text-white">
            Xamidullabek <br /> <span className="text-blue-600">Admin</span>
          </h2>
        </div>
        <Link
          to="/"
          className="flex items-center bg-[#95a5a6] hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out border border-white/20 hover:border-white/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Chiqish
        </Link>
      </div>
    </div>
  );
};

export default Navbar;