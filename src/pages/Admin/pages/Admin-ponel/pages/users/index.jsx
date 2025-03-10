import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ModalComponent from "@/components/modal/Modal";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { Select } from "antd";
import { set } from "react-hook-form";

const { Option } = Select;

const { Search } = Input;

const data = [
  { key: "1", name: "Markaziy Ombor", login: "admin", password: "admin123", phone_number: "123456789", isAllowed: true },
  { key: "2", name: "Janubiy Filial", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "3", name: "Shimoliy Ombor", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "4", name: "Sharqiy Ombor", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "5", name: "G‘arbiy Filial", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "6", name: "Bosh Ofis Ombori", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "7", name: "Kichik Ombor 1", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "8", name: "Kichik Ombor 2", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "9", name: "Katta Ombor", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "10", name: "Mahalliy Ombor", login: "admin", password: "admin123", phone_number: "123456789" },
  { key: "11", name: "Eksport Ombori", login: "admin", password: "admin123", phone_number: "123456789" },
];

const Statistics = () => {
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storageSingleData, setStorageSingleData] = useState(null);
  const [formType, setFormType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleChange = (value) => {
    setUserRole(value);
    console.log("Tanlangan Ombor ID:", value);
  };

  const showModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setStorageSingleData(null);
  };

  const handleEdit = (record) => {
    setStorageSingleData(record);
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
      title: "Ombor nomi",
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
      title: "Telfon raqami",
      dataIndex: "phone_number",
      key: "phone_number",
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
        <div className="text-3xl font-bold text-gray-100">Omborlar</div>
        <div className="flex gap-3 items-center">
          <Search
            placeholder="Qidirish"
            onSearch={onSearch}
            enterButton
            className="custom-search"
          />
          <Select
            value={userRole}
            placeholder="Rol tanlang"
            className="custom-select-filter"
            onChange={handleChange}
            dropdownClassName="custom-dropdown"
          >
            <Option value="electronics">Elektronika</Option>
            <Option value="clothing">Kiyim-kechak</Option>
            <Option value="food">Oziq-ovqat</Option>
          </Select>
          <Button
            type="primary"
            style={{
              backgroundColor: "#364153",
              color: "#f3f4f6",
              fontWeight: "500",
              padding: "17px 20px",
              borderRadius: "8px",
              fontSize: "20px",
            }}
            className="hover:bg-[#0056b3] hover:border-[#004494] focus:bg-[#004494]"
            onClick={() => showModal("add")}
          >
            Qo'shish
          </Button>
        </div>
      </div>
      <div className="text-gray-100">
        <Table
          columns={columns}
          dataSource={data.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
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
        title={
          formType === "add" ? "Ombor 2 qo'shish" : "Ombor 2 ni tahrirlash"
        }
      >
        {formType === "add" ? (
          <AddUser onClose={onClose} />
        ) : (
          <EditUser onClose={onClose} storageSingleData={storageSingleData} />
        )}
      </ModalComponent>
    </div>
  );
};

export default Statistics;
