import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";

export default function Shop() {
  return (
    <>
      <Navbar />
      <div className="mt-[150px] p-4">
        <div className="d-flex flex-column gap-2 mb-4">
          <Link className="text-white" to="/warehouse/shop/return-products">
            Возврат товаров
          </Link>
          <Link className="text-white" to="/warehouse/cash-register">
            Касса
          </Link>
        </div>

        {/* Здесь будет отображаться содержимое дочерних маршрутов */}
        <Outlet />
      </div>
    </>
  );
}
