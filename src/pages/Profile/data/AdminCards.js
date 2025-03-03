// data/AdminCards.js
import {
  FaCog,
  FaListAlt,
  FaMoneyBillAlt,
  FaChartLine,
  FaShoppingCart,
  FaCashRegister,
} from "react-icons/fa";
import React from "react";

export const AdminCards = [
  {
    icon: React.createElement(FaCog, { className: "text-4xl text-white mb-4" }),
    title: "Admin panel",
    description: "Tizimni boshqarish",
    link: "/admin/admin-panel/statistics",
  },
  {
    icon: React.createElement(FaListAlt, {
      className: "text-4xl text-white mb-4",
    }),
    title: "Kassa",
    description: "Moliya operatsiyalari",
    link: "/admin/cash-register",
  },
  {
    icon: React.createElement(FaMoneyBillAlt, {
      className: "text-4xl text-white mb-4",
    }),
    title: "Operatsiyalar tarixi",
    description: "Barcha tranzaksiyalarni ko'rish",
    link: "/admin/transaction-history",
  },
  {
    icon: React.createElement(FaChartLine, {
      className: "text-4xl text-white mb-4",
    }),
    title: "Hisobotlar",
    description: "Analitika va statistika",
    link: "/admin/report",
  }
];