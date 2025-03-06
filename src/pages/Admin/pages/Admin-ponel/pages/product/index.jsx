import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import ModalComponent from "@/components/modal/Modal";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
const { Search } = Input;

const data = [
    {
      id: 1,
      article: "ART-7560",
      batch: 4,
      roll_count: 6,
      image: "https://example.com/image1.jpg",
      price: 582.14
    },
    {
      id: 2,
      article: "ART-3795",
      batch: 16,
      roll_count: 8,
      image: "https://example.com/image2.jpg",
      price: 747.38
    },
    {
      id: 3,
      article: "ART-7946",
      batch: 11,
      roll_count: 13,
      image: "https://example.com/image3.jpg",
      price: 995.49
    },
    {
      id: 4,
      article: "ART-5594",
      batch: 10,
      roll_count: 26,
      image: "https://example.com/image4.jpg",
      price: 854.23
    },
    {
      id: 5,
      article: "ART-6743",
      batch: 9,
      roll_count: 7,
      image: "https://example.com/image5.jpg",
      price: 521.09
    },
    {
      id: 6,
      article: "ART-5989",
      batch: 15,
      roll_count: 26,
      image: "https://example.com/image6.jpg",
      price: 25.46
    },
    {
      id: 7,
      article: "ART-2070",
      batch: 12,
      roll_count: 27,
      image: "https://example.com/image7.jpg",
      price: 962.93
    },
    {
      id: 8,
      article: "ART-1198",
      batch: 12,
      roll_count: 34,
      image: "https://example.com/image8.jpg",
      price: 245.08
    },
    {
      id: 9,
      article: "ART-4948",
      batch: 18,
      roll_count: 37,
      image: "https://example.com/image9.jpg",
      price: 222.42
    },
    {
      id: 10,
      article: "ART-9086",
      batch: 2,
      roll_count: 20,
      image: "https://example.com/image10.jpg",
      price: 695.85
    },
    {
      id: 11,
      article: "ART-9009",
      batch: 2,
      roll_count: 10,
      image: "https://example.com/image11.jpg",
      price: 156.9
    }
  ]



const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSingleData, setProductSingleData] = useState(null);
  const [formType, setFormType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

  const showModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setProductSingleData(null);
  };
  
  const handleEdit = (record) => {
    setProductSingleData(record);
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
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
      width: 70,
    },
    {
      title: "Artikul",
      dataIndex: "article",
      key: "article",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
      title: "Partiya",
      dataIndex: "batch",
      key: "batch",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
      title: "Rulon soni",
      dataIndex: "roll_count",
      key: "roll_count",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
        title: "Narxi",
        dataIndex: "price",
        key: "price",
        render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
      },
      {
        title: "Rasm",
        dataIndex: "image",
        key: "image",
        render: (text) => <span className="text-gray-100 font-semibold"><img src={text} alt="" /></span>,
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
        <h1 className="text-3xl font-bold  text-gray-100">Mahsulotlar</h1>
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
        title={formType === "add" ? "Mahsulot qo'shish" : "Mahsulotni tahrirlash"}
      >
       {formType === "add" ? <AddProduct onClose={onClose}/> : <EditProduct onClose={onClose} productSingleData={productSingleData}/>} 
      </ModalComponent>
    </div>
  );
};

export default Product;
