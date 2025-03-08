// data/ProductManagementCards.js
import {
    FaBox,
    FaTruck,
    FaWarehouse,
    FaCashRegister,
    FaStore,
    FaShoppingCart,
    FaChartLine,
  } from "react-icons/fa";
  import React from "react";
  
  export const SkladCards = [
    {
      icon: React.createElement(FaBox, { className: "text-4xl text-white mb-4" }),
      title: "Tovarlar",
      description: "Tovarlarni boshqarish",
      link: "/warehouse/product-list",
    },
    {
      icon: React.createElement(FaTruck, { className: "text-4xl text-white mb-4" }),
      title: "Tovarlarni vitrinaga jo'natish",
      description: "Tovarlarni vitrinaga jo'natish",
      link: "/warehouse/send-to-showcase",
    },
    {
      icon: React.createElement(FaWarehouse, {
        className: "text-4xl text-white mb-4",
      }),
      title: "Tovarlarni vitrinadan o'chirish",
      description: "Tovarlarni vitrinadan o'chirish",
      link: "/warehouse/remove-from-showcase",
    },
    {
      icon: React.createElement(FaTruck, { className: "text-4xl text-white mb-4" }),
      title: "Mahsulotlarni boshqa omborga jo'natish",
      description: "Mahsulotlarni boshqa omborga jo'natish",
      link: "/warehouse/transfer-to-warehouse",
    },
    {
      icon: React.createElement(FaChartLine, {
          className: "text-4xl text-white mb-4",
      }),
      title: "Hisobotlar",
      description: "Tarix va arxiv",
      link: "/warehouse/report",
  },
    {
      icon: React.createElement(FaCashRegister, {
        className: "text-4xl text-white mb-4",
      }),
      title: "Kassa",
      description: "Moliya operatsiyalarini boshqarish",
      link: "/warehouse/cash-register",
    },
    {
      icon: React.createElement(FaStore, { className: "text-4xl text-white mb-4" }),
      title: "Mahsulot qaytarish",
      description: "Do'konlardan mahsulot qaytarish",
      link: "/warehouse/shop",
    },
    // {
    //   icon: React.createElement(FaArchive, {
    //     className: "text-4xl text-white mb-4",
    //   }),
    //   title: "Arxiv",
    //   description: "Arxiv ma'lumotlari",
    //   link: "/warehouse/archive",
    // },
    {
      icon: React.createElement(FaShoppingCart, {
        className: "text-4xl text-white mb-4",
      }),
      title: "Mahsulot zakaz qilish",
      description: "Yangi mahsulotlar zakaz qilish",
      link: "/warehouse/order-products",
    },
  ];