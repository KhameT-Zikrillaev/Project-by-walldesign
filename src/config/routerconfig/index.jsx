import React from 'react';
import { Route, Routes } from "react-router-dom";
import Homepage from '../../pages/Home';
import Login from '../../pages/Login';
import AdminPanel from '../../pages/Admin-ponel/index'; // Ваш существующий компонент админ-панели
import Statistics from '../../pages/Admin-ponel/pages/Statistics'; // Страница статистики
import Users from '../../pages/Admin-ponel/pages/users'; // Страница пользователей

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route path="statistics" element={<Statistics />} /> {/* /admin-panel/statistics */}
        <Route path="users" element={<Users />} /> {/* /admin-panel/users */}
      </Route>
      {/* <Route path="/*" element={<Error />} /> */}
    </Routes>
  );
}