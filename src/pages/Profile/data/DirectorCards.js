// data/AdminCards.js
import {
  FaListAlt,
  FaChartLine,
  FaUserTie, // Иконка для продавцов
} from "react-icons/fa";
import React from "react";

export const DirectorCards = [
  {
    icon: React.createElement(FaChartLine, {
      className: "text-4xl text-white mb-4",
    }),
    title: "Hisobotlar",
    description: "Analitika va statistika",
    link: "/director/report",
  },
  {
    icon: React.createElement(FaListAlt, {
      className: "text-4xl text-white mb-4",
    }),
    title: "Mahsulotlar",
    description: "Mahsulotlar ro'yxati",
    link: "/director/product-list",
  },
  {
    icon: React.createElement(FaUserTie, { // Используем FaUserTie для продавцов
      className: "text-4xl text-white mb-4",
    }),
    title: "Sotuvchilar",
    description: "Sotuvchilar",
    link: "/director/seller-list",
  },
];