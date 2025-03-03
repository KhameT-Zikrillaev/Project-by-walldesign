import React, { useState, useEffect } from "react";
import {Card } from "antd"; // Импортируем компоненты из Ant Design
import { Link } from "react-router-dom"; // Импортируем Link для создания ссылок
import bgsklad from "../../assets/images/bg-sklad.png";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import {
  FaShoppingCart,
  FaCashRegister,
  FaTachometerAlt,
  FaExchangeAlt,
  FaCog,
  FaListAlt,
  FaMoneyBillAlt,
  FaChartLine,
} from "react-icons/fa";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true); // Лоадер по умолчанию включен

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Выключаем лоадер через 3 секунды
    }, 2000);

    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, []);

  return (
    <div className="min-h-screen bg-[#17212b] p-4">
      {isLoading && <Loading />}
      {/* Логотип (наверху на мобильных устройствах) */}
      <Navbar />

      {/* Основной контент (сетка для десктопа и колонка для мобильных) */}
      <div className="flex mt-[120px]   flex-col-reverse md:flex-row gap-6">
        {/* Левая часть (60% на десктопе, полная ширина на мобильных) */}
        <div className="w-full bg-[#17212b] p-6 rounded-lg shadow-lg">
          {/* Карточка "Доступы админа" */}
          <Card
            title="Доступы админа"
            className="mb-6 shadow-sm uppercase border-0 text-center"
            headStyle={{ backgroundColor: "#7f8c8d", color: "white" }}
            bodyStyle={{ backgroundColor: "#17212b" }}
          >
            <div className="grid w-full max-w-[800px] bg-[#17212b] mx-auto grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/admin-panel/statistics"
                className="flex flex-col items-center justify-center text-base md:text-lg font-medium  bg-white hover:bg-gray-50 p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <FaCog className="text-[#7f8c8d] text-2xl mb-2" />{" "}
                {/* Иконка настроек */}
                <span className="text-[#7f8c8d] font-medium">Админ панель</span>
              </Link>
              <Link
                to="/operations"
                className="flex flex-col items-center justify-center text-base md:text-lg font-medium  bg-white hover:bg-gray-50 p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <FaListAlt className="text-[#7f8c8d] text-2xl mb-2" />{" "}
                {/* Иконка списка */}
                <span className="text-[#7f8c8d] font-medium">
                  Операции с номенклатурой
                </span>
              </Link>
              <Link
                to="/close-cash"
                className="flex flex-col items-center justify-center text-base md:text-lg font-medium  bg-white hover:bg-gray-50 p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <FaMoneyBillAlt className="text-[#7f8c8d] text-2xl mb-2" />{" "}
                {/* Иконка денег */}
                <span className="text-[#7f8c8d] font-medium">
                  Закрыть кассу
                </span>
              </Link>
              <Link
                to="/main-reports"
                className="flex flex-col items-center justify-center text-base md:text-lg font-medium  bg-white hover:bg-gray-50 p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <FaChartLine className="text-[#7f8c8d] text-2xl mb-2" />{" "}
                {/* Иконка графиков */}
                <span className="text-[#7f8c8d] font-medium">
                  Главные отчеты
                </span>
              </Link>
            </div>
          </Card>

          {/* Карточка "СКЛАД" */}
        </div>

        <div className="w-full  p-6 bg-[#17212b] rounded-lg shadow-lg">
          <Card
            title="Дополнительная информация"
            className="shadow-lg border-0"
            headStyle={{ backgroundColor: "#7f8c8d", color: "white" }}
            bodyStyle={{ backgroundColor: "#17212b" }}
          >
            <p>Здесь может быть что-то полезное.</p>
          </Card>
        </div>
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~нижний контент~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      <div className="section-2 flex flex-col md:flex-row items-center md:items-start">
        <img
          className=" md:w-[30%]  max-w-[300px] md:max-w-[500px] md:max-h-[350px] p-4 md:p-6"
          src={bgsklad}
          alt=""
        />
        <div className="w-full md:w-[70%] mt-6 md:mt-12 md:ml-6">
          <Card
            title="СКЛАД"
            className="shadow-sm text-center border border-gray-200 rounded-lg overflow-hidden bg-white"
            headStyle={{
              backgroundColor: "#7f8c8d",
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "600",
              padding: "1rem",
              borderBottom: "1px solid #E5E7EB",
            }}
            bodyStyle={{ backgroundColor: "#17212b" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <Link
                to="/sales"
                className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-purple-300"
              >
                <FaShoppingCart className="text-[#7f8c8d] text-xl mr-3" />
                <span className="text-[#7f8c8d] font-medium">Продажа</span>
              </Link>
              <Link
                to="/purchases"
                className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-purple-300"
              >
                <FaCashRegister className="text-[#7f8c8d] text-xl mr-3" />
                <span className="text-[#7f8c8d] font-medium">Покупка</span>
              </Link>
              <Link
                to="/counter"
                className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-purple-300"
              >
                <FaTachometerAlt className="text-[#7f8c8d] text-xl mr-3" />
                <span className="text-[#7f8c8d] font-medium">Счетчик</span>
              </Link>
              <Link
                to="/counter-movement"
                className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-purple-300"
              >
                <FaExchangeAlt className="text-[#7f8c8d] text-xl mr-3" />
                <span className="text-[#7f8c8d] font-medium">
                  Движение по счетчикам
                </span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
