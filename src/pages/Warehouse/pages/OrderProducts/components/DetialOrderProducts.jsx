import React, { useState, useEffect } from "react";
import { Card, Pagination, Tag, Button, Spin } from "antd";
import "antd/dist/reset.css";
// import bg from "@/assets/images/bg-login.jpg";
import ModalComponent from "@/components/modal/Modal";
import ImageModal from "@/components/modal/ImageModal";
import  bgsklad  from '@/assets/images/bg-sklad.png';
import SearchForm from "../modules/searchForm";
import AddProduct from './../modules/addProducts/index';
import useFetch from "@/hooks/useFetch";
import { useLocation, useParams } from "react-router-dom";

export default function WarehouseDetailProductsLists() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredData, setFilteredData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const {id} = useParams()
  const location = useLocation()
  const warehouseId = location?.state?.id
  
  const {data} = useFetch(`warehouse-products/${warehouseId}`, `warehouse-products/${warehouseId}`)
  
   useEffect(() => {
    setFilteredData(data?.products)
   }, [data])
  
  const showModal = (product) => {
    setSelectedProduct(product); // Устанавливаем выбранный товар
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Сбрасываем выбранный товар при закрытии модального окна
  };

  const updateItemsPerPage = () => {
    setItemsPerPage(window.innerWidth < 768 ? 4 : 10);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const currentData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSearchResults = (results) => {
    console.log('Search results:', results);
    setFilteredData(results);
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center p-1 relative"
      style={{ backgroundImage: `url(${bgsklad})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>

      <div className="relative z-0 max-w-[1440px] mx-auto flex flex-col items-center justify-center mt-[120px]">
        <SearchForm data={data?.products} onSearch={handleSearchResults} />
   {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <>
              {filteredData?.length === 0 ? (
              <div className="text-white text-lg">
                Tovar topilmadi
              </div>
              ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full px-4">
          {currentData?.map((item) => (
            <Card
              key={item.key}
              className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              cover={
                <div
                  onClick={() => setSelectedImage(item.image_url)}
                  className="h-28 bg-cover cursor-pointer bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${item.image_url})` }}
                />
              }
              bodyStyle={{ padding: "12px", color: "white" }}
            >
              <div className="flex flex-col gap-2">
                <Tag color="blue">
                  Part: <span className="text-red-500">{item.batch_number}</span>
                </Tag>
                <h4 className="text-sm font-semibold text-white">
                  {item.article}
                </h4>
                <div className="flex justify-between">
                  <p className="text-gray-300 text-xs">
                    Narxi: {item.price} so'm
                  </p>
                  <p className="text-gray-300 text-xs">
                    Soni bor: {item.quantity} dona.
                  </p>
                </div>
                <Button
                  type="primary"
                  onClick={() => showModal(item)}
                  style={{ backgroundColor: "#364153", borderColor: "#364153" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2b3445")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#364153")
                  }
                >
                  Buyurtma berish
                </Button>
              </div>
            </Card>
          ))}
        </div>
  )}
  </>
)}


        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage}
        />
        <div className="my-2 mb-12 md:mb-0 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredData?.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="custom-pagination"
          />
        </div>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={onClose}
        title={"Omborga buyurtma berish"}
      >
        <AddProduct onClose={onClose} product={selectedProduct} />
      </ModalComponent>
    </div>
  );
}
