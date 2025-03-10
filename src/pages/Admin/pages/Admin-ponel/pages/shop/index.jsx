import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import ModalComponent from "@/components/modal/Modal";
import AddShop from "./components/AddShop";
import EditShop from "./components/EditShop";
const { Search } = Input;

const data = [
  {
    key: 1,
    name: "Sotuvchi 1",
  },
  {
    key: 2,
    name: "Sotuvchi 2",
  },
  {
    key: 3,
    name: "Sotuvchi 3",
  },
  {
    key: 4,
    name: "Sotuvchi 4",
  },
  {
    key: 5,
    name: "Sotuvchi 5",
  },
  {
    key: 6,
    name: "Sotuvchi 6",
  },
  {
    key: 7,
    name: "Sotuvchi 7",
  },
  {
    key: 8,
    name: "Sotuvchi 8",
  },
  {
    key: 9,
    name: "Sotuvchi 9",
  },
  {
    key: 10,
    name: "Sotuvchi 10",
  },
  {
    key: 11,
    name: "Sotuvchi 11",
  }
]




const Seller = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellerSingleData, setSellerSingleData] = useState(null);
  const [formType, setFormType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const showModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSellerSingleData(null);
  };
  
  const handleEdit = (record) => {
    setSellerSingleData(record);
    showModal("edit");
  };

  const onSearch = (value) => console.log(value);

  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return (
        <button
          style={{
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          <LeftOutlined /> 
        </button>
      );
    }
    if (type === "next") {
      return (
        <button
          style={{
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
           <RightOutlined />
        </button>
      );
    }
    return originalElement;
  };

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
      width: 70,
    },
    {
      title: "Magazin nomi",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
      title: "Ombor nomi",
      dataIndex: "warehouse",
      key: "warehouse",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="edit-btn"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="O‘chirishni tasdiqlaysizmi?"
            onConfirm={() => console.log("Deleted", record.key)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} className="edit-btn" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="text-3xl font-bold  text-gray-100">Magazinlar</div>
        <div className="flex gap-3 items-center">
        <Search placeholder="Qidirish" onSearch={onSearch} enterButton className="custom-search"/>
        <Button
          type="primary"
          style={{
            backgroundColor: "#364153",
            color: "#f3f4f6",
            fontWeight: "500",
            padding: "17px 20px",
            borderRadius: "8px",
            fontSize: "20px"
          }}
          className="hover:bg-[#0056b3] hover:border-[#004494] focus:bg-[#004494] "
          onClick={() => showModal("add")}
        >
          Qo'shish
        </Button>
        </div>
      </div>
      <div className="text-gray-100">
        <Table
          columns={columns}
          dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          pagination={false}
          className="custom-table"
          rowClassName={() => "custom-row"}
          bordered
        />
        <div className="flex justify-center mt-5">
          <Pagination
            className="custom-pagination"
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            itemRender={itemRender}
          />
        </div>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={onClose}
        title={formType === "add" ? "Magazin qo'shish" : "Magazinni tahrirlash"}
      >
       {formType === "add" ?<AddShop onClose={onClose}/> : <EditShop onClose={onClose} sellerSingleData={sellerSingleData}/>} 
      </ModalComponent>
    </div>
  );
};

export default Seller;
