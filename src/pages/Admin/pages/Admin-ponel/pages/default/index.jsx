import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import ModalComponent from "@/components/modal/Modal";
import AddDefault from "./components/AddDefault";
import EditDefault from "./components/EditDefault";
const { Search } = Input;

const data = [
  {
    key: 1,
    name: "Sotuvchi 1",
    login: "o31dB5NN",
    password: "0WwYjrvtAv"
  },
  {
    key: 2,
    name: "Sotuvchi 2",
    login: "YmTkjoV1",
    password: "kkkrQmvF4e"
  },
  {
    key: 3,
    name: "Sotuvchi 3",
    login: "y5q4qGGt",
    password: "OdB9jiJm5G"
  },
  {
    key: 4,
    name: "Sotuvchi 4",
    login: "WkP03NOr",
    password: "p4PMQ9Xjfk"
  },
  {
    key: 5,
    name: "Sotuvchi 5",
    login: "MGqOL7vT",
    password: "HLFDu7stv1"
  },
  {
    key: 6,
    name: "Sotuvchi 6",
    login: "VO5qDouV",
    password: "Sli4tbrjbT"
  },
  {
    key: 7,
    name: "Sotuvchi 7",
    login: "g7Zlez68",
    password: "GQDjjGKTqL"
  },
  {
    key: 8,
    name: "Sotuvchi 8",
    login: "Ppb6k104",
    password: "rwreAAC5Kj"
  },
  {
    key: 9,
    name: "Sotuvchi 9",
    login: "QLyc76vY",
    password: "miO8IWiMBw"
  },
  {
    key: 10,
    name: "Sotuvchi 10",
    login: "GvRez2ap",
    password: "ezb9ilSxrC"
  },
  {
    key: 11,
    name: "Sotuvchi 11",
    login: "Uv0uKgFR",
    password: "Y22SRWw1pC"
  }
]




const Seller = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultSingleData, setDefaultSingleData] = useState(null);
  const [formType, setFormType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const showModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setDefaultSingleData(null);
  };
  
  const handleEdit = (record) => {
    setDefaultSingleData(record);
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
      title: "Sotuvchi nomi",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      render: (text) => <span className="text-gray-100 font-semibold">{text}</span>,
    },
    {
      title: "Parol",
      dataIndex: "password",
      key: "password",
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
        <div className="text-3xl font-bold  text-gray-100">Defaultlar</div>
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
        title={formType === "add" ? "Default qo'shish" : "Defaultni tahrirlash"}
      >
       {formType === "add" ? <AddDefault onClose={onClose}/> : <EditDefault onClose={onClose} defaultSingleData={defaultSingleData}/>} 
      </ModalComponent>
    </div>
  );
};

export default Seller;
