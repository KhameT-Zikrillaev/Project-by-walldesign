import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Admin() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Здесь будут отображаться вложенные страницы */}
    </div>
  );
}