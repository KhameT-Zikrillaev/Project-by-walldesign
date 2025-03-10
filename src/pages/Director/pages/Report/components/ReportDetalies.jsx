import React, { useState, useEffect } from "react";
import { Card, Pagination, Tag } from "antd";
import "antd/dist/reset.css";
import bgsklad from "@/assets/images/bg-sklad.png";
import SearchForm from "../modules/SearchForm";
import bg from "@/assets/images/bg-login.jpg";
import { useParams } from "react-router-dom";
import ImageModal from "@/components/modal/ImageModal";
const products = [
  { id: 1, name: "Chilanzar", description: "Описание Chilanzar" },
  { id: 2, name: "Yunsabad", description: "Описание Yunsabad" },
  { id: 3, name: "Mirzo Ulugbek", description: "Описание Mirzo Ulugbek" },
  { id: 4, name: "Yakkasaray", description: "Описание Yakkasaray" },
  { id: 5, name: "Shayxontoxur", description: "Описание Shayxontoxur" },
  { id: 6, name: "Olmazor", description: "Описание Olmazor" },
  { id: 7, name: "Bektemir", description: "Описание Bektemir" },
  { id: 8, name: "Yashnobod", description: "Описание Yashnobod" },
  { id: 9, name: "Mirobod", description: "Описание Mirobod" },
  { id: 10, name: "Sergeli", description: "Описание Sergeli" },
  { id: 11, name: "Uchtepa", description: "Описание Uchtepa" },
  { id: 12, name: "Yangihayot", description: "Описание Yangihayot" },
  {
    id: 13,
    name: "Tashkent District",
    description: "Описание Tashkent District",
  },
  { id: 14, name: "Samarkand", description: "Описание Samarkand" },
  { id: 15, name: "Bukhara", description: "Описание Bukhara" },
  { id: 16, name: "Khiva", description: "Описание Khiva" },
  { id: 17, name: "Fergana", description: "Описание Fergana" },
  { id: 18, name: "Namangan", description: "Описание Namangan" },
  { id: 19, name: "Andijan", description: "Описание Andijan" },
  { id: 20, name: "Nukus", description: "Описание Nukus" },
  { id: 21, name: "Urgench", description: "Описание Urgench" },
  { id: 22, name: "Navoi", description: "Описание Navoi" },
  { id: 23, name: "Jizzakh", description: "Описание Jizzakh" },
  { id: 24, name: "Termez", description: "Описание Termez" },
];

const dataSource = [
  {
    key: "1",
    date: "2023-10-01",
    returnDate: "2023-10-05",
    code: "#4443",
    name: 'Oboi "Yashil o‘rmon"',
    color: "#008000",
    action: "sotib olindi",
    quantity: 10,
    returns: 2,
    price: 250000,
    party: "123-45",
    photo: bg,
    storeName: "Lesnoy Dom",
  },
  {
    key: "2",
    date: "2023-10-02",
    returnDate: "2023-10-06",
    code: "#4444",
    name: 'Oboi "Moviy okean"',
    color: "#0000FF",
    action: "sotib olindi",
    quantity: 5,
    returns: 1,
    price: 220000,
    party: "234-56",
    photo: bgsklad,
    storeName: "Okean Dekor",
  },
  {
    key: "3",
    date: "2023-10-03",
    returnDate: "2023-10-07",
    code: "#4445",
    name: 'Oboi "Qizil shafaq"',
    color: "#FF0000",
    action: "sotib olindi",
    quantity: 8,
    returns: 0,
    price: 275000,
    party: "345-67",
    photo: bg,
    storeName: "Solnechnyy Svet",
  },
  {
    key: "4",
    date: "2023-10-04",
    returnDate: "2023-10-08",
    code: "#4446",
    name: 'Oboi "Sariq qum"',
    color: "#FFFF00",
    action: "sotib olindi",
    quantity: 15,
    returns: 3,
    price: 190000,
    party: "456-78",
    photo: bg,
    storeName: "Peschanaya Lavka",
  },
  {
    key: "5",
    date: "2023-10-05",
    returnDate: "2023-10-09",
    code: "#4447",
    name: 'Oboi "Binafsha tuman"',
    color: "#800080",
    action: "sotib olindi",
    quantity: 3,
    returns: 0,
    price: 300000,
    party: "567-89",
    photo: bg,
    storeName: "Tumannyy Ray",
  },
  {
    key: "6",
    date: "2023-10-06",
    returnDate: "2023-10-10",
    code: "#4448",
    name: 'Oboi "Moviy osmon"',
    color: "#87CEEB",
    action: "sotib olindi",
    quantity: 7,
    returns: 1,
    price: 210000,
    party: "678-90",
    photo: bg,
    storeName: "Nebesnyy Mir",
  },
  {
    key: "7",
    date: "2023-10-07",
    returnDate: "2023-10-11",
    code: "#4449",
    name: 'Oboi "Pushti tong"',
    color: "#FFC0CB",
    action: "sotib olindi",
    quantity: 12,
    returns: 4,
    price: 230000,
    party: "789-12",
    photo: bg,
    storeName: "Rassvet Dekor",
  },
  {
    key: "8",
    date: "2023-10-08",
    returnDate: "2023-10-12",
    code: "#4450",
    name: 'Oboi "Kulrang tosh"',
    color: "#808080",
    action: "sotib olindi",
    quantity: 20,
    returns: 5,
    price: 280000,
    party: "890-23",
    photo: bg,
    storeName: "Kamennyy Ugol",
  },
  {
    key: "9",
    date: "2023-10-09",
    returnDate: "2023-10-13",
    code: "#4451",
    name: 'Oboi "Oq qor"',
    color: "#FFFFFF",
    action: "sotib olindi",
    quantity: 0,
    returns: 0,
    price: 200000,
    party: "901-34",
    photo: bg,
    storeName: "Zimniy Ray",
  },
  {
    key: "10",
    date: "2023-10-10",
    returnDate: "2023-10-14",
    code: "#4452",
    name: 'Oboi "Qora tun"',
    color: "#000000",
    action: "sotib olindi",
    quantity: 6,
    returns: 2,
    price: 260000,
    party: "012-45",
    photo: bg,
    storeName: "Nochnaya Magiya",
  },
];

export default function Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 5 карточек на странице
  const [filteredData, setFilteredData] = useState(dataSource);
  const [selectedImage, setSelectedImage] = useState(null);
  const { name } = useParams(); // Получаем параметр name из URL
  console.log("URL параметр name:", name);

  const product = products.find((p) => p.name === name);
  console.log("Найденный продукт:", product);

  const updateItemsPerPage = () => {
    setItemsPerPage(5); // Фиксированное количество карточек на странице
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-1 relative"
      style={{ backgroundImage: `url(${bgsklad})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>

      <div className="relative z-0 max-w-[1440px] mx-auto flex flex-col items-center justify-center mt-[120px]">
        <SearchForm
          data={dataSource}
          name={product.name}
          onSearch={setFilteredData}
        />
        <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
          {currentData.map((item) => (
            <Card
              key={item.key}
              className="shadow-lg hover:shadow-xl  transition-shadow rounded-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              bodyStyle={{ padding: "12px", color: "white" }}
            >
              <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
                <div
                  onClick={() => setSelectedImage(item.photo)}
                  className="w-full flex  sm:w-1/3 h-32 bg-cover bg-center rounded-lg cursor-pointer"
                  style={{ backgroundImage: `url(${item.photo})` }}
                />
                <div className="w-full sm:w-2/3 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                    <div className="flex gap-[5px]">
                      <Tag color="blue">{item.code}</Tag>
                      <Tag color="orange">{item?.party}</Tag>
                    </div>
                    {/* <h4 className="text-sm font-semibold text-white">
                      Do'kon nomi: {item.storeName}
                    </h4> */}
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">
                      Soni: {item.quantity} dona
                    </p>
                    <p className="text-gray-300 text-xs">
                      Jami narxi: {item.price * item.quantity} so'm
                    </p>
                    <p className="text-gray-300 text-xs">
                      Berilgan sanasi: {item.date}
                    </p>
                    <p className="text-gray-300 text-xs pt-2 text-right">
                      Do'kon nomi:{" "}
                      <span className="text-white font-bold">
                        {item.storeName}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage}
        />

        <div className="my-2 mb-12 md:mb-2 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="text-white [&_.ant-pagination-item]:bg-transparent [&_.ant-pagination-item]:transition [&_.ant-pagination-item:hover]:bg-white [&_.ant-pagination-item-active]:bg-white [&_.ant-pagination-item-active]:text-black"
          />
        </div>
      </div>
    </div>
  );
}
