import React, { useState } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import ModalComponent from "@/components/modal/Modal";
import AddStorage from "./components/AddStorage";
const { Search } = Input;

const data = [
  { key: "1", name: "Markaziy Ombor", login: "admin", password: "admin123", phone_number: "123456789" },
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
          // style={{ backgroundColor: "green", borderColor: "green" }}
          className="edit-btn"
        />
        <Popconfirm
          title="O‘chirishni tasdiqlaysizmi?"
          onConfirm={() => console.log("Deleted", record.key)}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  },
];

const Statistics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onSearch = (value) => console.log(value);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold  text-gray-100">Omborlar</h1>
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
          onClick={showModal}
        >
          Qo'shish
        </Button>
        </div>
      </div>
      <div className=" text-gray-100">
      <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          className=" custom-table"
          rowClassName={() => "custom-row"}
          bordered
        />
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={onClose}
        title={"Ombor qo'shish"}
      >
        <AddStorage onClose={onClose}/>
      </ModalComponent>
    </div>
  );
};

export default Statistics;
