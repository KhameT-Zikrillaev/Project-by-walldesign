import React from 'react';
import { Route, Routes } from "react-router-dom";
import Profile from '../../pages/Profile';
import Login from '../../pages/Login';
import AdminPanel from '../../pages/Admin/pages/Admin-ponel/index'; // Ваш существующий компонент админ-панели
import Statistics from '../../pages/Admin/pages/Admin-ponel/pages/Statistics'; // Страница статистики
import Users from '../../pages/Admin/pages/Admin-ponel/pages/users'; // Страница пользователей

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      

{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ADMIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/admin" element={<Profile />} />
      <Route path="/sklad" element={<Profile />} />
      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route path="statistics" element={<Statistics />} /> {/* /admin-panel/statistics */}
        <Route path="users" element={<Users />} /> {/* /admin-panel/users */}
      </Route>

{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SKLAD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      {/* <Route path="/*" element={<Error />} /> */}
    </Routes>
  );
}