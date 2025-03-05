import React from 'react';
import { Route, Routes } from "react-router-dom";
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import AdminPanel from '@/pages/Admin/pages/Admin-ponel/index'; // Ваш существующий компонент админ-панели
import Storage from '@/pages/Admin/pages/Admin-ponel/pages/storege'; // Страница статистики
import Users from '@/pages/Admin/pages/Admin-ponel/pages/users'; // Страница пользователей

// Импортируем Warehouse и его страницы
// import Warehouse from '../../pages/Warehouse';
import Products from '@/pages/Warehouse/pages/Products';
import SendProductsToShopView from '@/pages/Warehouse/pages/SendProductsToShowcase';
import RemoveProductsFromShowcase from '@/pages/Warehouse/pages/RemoveProductsFromShowcase';
import TransferProductsToWarehouse from '@/pages/Warehouse/pages/TransferProductsToWarehouse';
import OrderProducts from '@/pages/Warehouse/pages/OrderProducts';
import Shop from '@/pages/Warehouse/pages/Shop';
import NotFound from '@/pages/Error404';

import Warehouse from '@/pages/Warehouse';

import Cashregister from '@/pages/Admin/pages/Cashregister';
import TransactionHistory from '@/pages/Admin/pages/TransactionHistory';
import Report from '@/pages/Admin/pages/Report';
export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/*' element={<NotFound />}/>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ADMIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/admin" element={<Profile />} />   
      <Route path="/admin">

      <Route path="admin-panel" element={<AdminPanel />}>
          <Route path="storage" element={<Storage />} /> {/* /admin/admin-panel/statistics */}
          <Route path="users" element={<Users />} /> {/* /admin/admin-panel/users */}
        </Route>
        
        <Route path="cash-register" element={<Cashregister />}></Route>
        <Route path="transaction-history" element={<TransactionHistory />}></Route>
        <Route path="report" element={<Report />}></Route>
      </Route>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~WAREHOUSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/warehouse" element={<Warehouse />}>
        <Route index element={<Profile />} /> {/* Этот компонент будет отображаться при переходе на /warehouse */}
        <Route path="products" element={<Products />} /> {/* /warehouse/products */}
        <Route path="send-to-showcase" element={<SendProductsToShopView />} /> {/* /warehouse/send-to-showcase */}
        <Route path="remove-from-showcase" element={<RemoveProductsFromShowcase />} /> {/* /warehouse/remove-from-showcase */}
        <Route path="transfer-to-warehouse" element={<TransferProductsToWarehouse />} /> {/* /warehouse/transfer-to-warehouse */}
        <Route path="order-products" element={<OrderProducts />} /> {/* /warehouse/order-products */}
        <Route path="cash-register" element={<WarehouseCashregister />} /> {/* /warehouse/cash */}
        <Route path="shop" element={<Shop />}/>
        
        <Route path="shop">
          <Route path="return-products" element={<ReturnProducts />} /> {/* /warehouse/shop/return-products */}
        </Route>
      </Route>


      
      {/* <Route path="/*" element={<Error />} /> */}
    </Routes>
  );
}