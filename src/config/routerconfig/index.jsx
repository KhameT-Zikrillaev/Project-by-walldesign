import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Error404 from '@/pages/Error404';


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Admin~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Admin from '@/pages/Admin';
import AdminAdminPanel from '@/pages/Admin/pages/Admin-ponel/index';
import AdminStorege from '@/pages/Admin/pages/Admin-ponel/pages/storege';
import AdminUsers from '@/pages/Admin/pages/Admin-ponel/pages/users';
import AdminReport from '@/pages/Admin/pages/Report';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Warehouse~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Warehouse from '@/pages/Warehouse';
import WarehouseProducts from '@/pages/Warehouse/pages/Product';
import WarehouseSendProductsToShopView from '@/pages/Warehouse/pages/SendProductsToShowcase';
import WarehouseRemoveProductsFromShowcase from '@/pages/Warehouse/pages/RemoveProductsFromShowcase';
import WarehouseTransferProductsToWarehouse from '@/pages/Warehouse/pages/TransferProductsToWarehouse';
import WarehouseOrderProducts from '@/pages/Warehouse/pages/OrderProducts';
import WarehouseShop from '@/pages/Warehouse/pages/Shop';
import WarehouseReturnProducts from '@/pages/Warehouse/pages/Shop/pages/ReturnProducts';
import WarehouseCashregister from '@/pages/Warehouse/pages/Cashregister';
import WarehouseReport from '@/pages/Warehouse/pages/Report';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Seller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Seller from '@/pages/Seller';
import SellerProduct from '@/pages/Seller/pages/Product';
import SellerWarehouse from '@/pages/Seller/pages/Warehouse';
import SellerReport from '@/pages/Seller/pages/Report';


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Director~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Director from '@/pages/Director';
import DirectorProduct from '@/pages/Director/pages/Product';
import DirectorSeller from '@/pages/Director/pages/Seller';
import DirectorReport from '@/pages/Director/pages/Report';
import ProductDetails from '@/pages/Director/pages/Product/components/ProductDetalies';
import SellerDetails from '@/pages/Director/pages/Seller/components/SellerDetalies';
import DirectorReportDetails from '@/pages/Director/pages/Report/components/ReportDetalies';
export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error404 />} />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ADMIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Profile />} /> {/* Этот компонент будет отображаться при переходе на /admin */}
        
        <Route path="admin-panel" element={<AdminAdminPanel />}>
          <Route path="storege" element={<AdminStorege />} /> {/* /admin/admin-panel/statistics */}
          <Route path="users" element={<AdminUsers />} /> {/* /admin/admin-panel/users */}
        </Route>
        <Route path="report" element={<AdminReport />}></Route>
      </Route>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~WAREHOUSE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/warehouse" element={<Warehouse />}>
        <Route index element={<Profile />} /> {/* Этот компонент будет отображаться при переходе на /warehouse */}
        <Route path="product-list" element={<WarehouseProducts />} /> {/* /warehouse/products */}
        <Route path="send-to-showcase" element={<WarehouseSendProductsToShopView />} /> {/* /warehouse/send-to-showcase */}
        <Route path="remove-from-showcase" element={<WarehouseRemoveProductsFromShowcase />} /> {/* /warehouse/remove-from-showcase */}
        <Route path="transfer-to-warehouse" element={<WarehouseTransferProductsToWarehouse />} /> {/* /warehouse/transfer-to-warehouse */}
        <Route path="order-products" element={<WarehouseOrderProducts />} /> {/* /warehouse/order-products */}
        <Route path="cash-register" element={<WarehouseCashregister />} /> {/* /warehouse/cash */}
        <Route path="shop" element={<WarehouseShop />}/>
        <Route path="report" element={<WarehouseReport />}></Route>
        <Route path="shop">
          <Route path="return-products" element={<WarehouseReturnProducts />} /> {/* /warehouse/shop/return-products */}
        </Route>
      </Route>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SELLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/seller" element={<Seller />}>
        <Route index element={<Profile />} /> {/* Этот компонент будет отображаться при переходе на /seller */}
        <Route path="product-list" element={<SellerProduct />} /> {/* /seller/product-list */}
        <Route path="warehouse" element={<SellerWarehouse />} /> {/* /seller/warehouse */}
        <Route path="report" element={<SellerReport />} /> {/* /seller/report */}
      </Route>


      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DIRECTOR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Route path="/director" element={<Director />}>
        <Route index element={<Profile />} /> {/* Этот компонент будет отображаться при переходе на /seller */}
        <Route path="seller-list" element={<DirectorSeller/>} /> {/* /Director/product-list */}
        <Route path="seller-list/:name" element={<SellerDetails />} /> {/* Динамический маршрут */}
        <Route path="product-list" element={<DirectorProduct />} /> {/* /Director/product-list */}
        <Route path="product-list/:name" element={<ProductDetails />} /> {/* Динамический маршрут */}
        <Route path="report" element={<DirectorReport />} /> {/* /Director/report */}
        <Route path="report/:name" element={<DirectorReportDetails />} /> {/* Динамический маршрут */}
      </Route>
    </Routes>
  );
}