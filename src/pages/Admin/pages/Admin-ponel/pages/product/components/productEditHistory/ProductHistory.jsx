import React, { useState } from "react";
import { Table, Pagination } from "antd";
import {
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import useFetch from "@/hooks/useFetch";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const ProductHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useFetch("products", "products", {
    limit,
    page,
    article: searchQuery,
  });

  const handlePageChange = (page) => {
    setPage(page);
    refetch();
  };

  const onSearch = (value) => setSearchQuery(value);

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
      render: (_, __, index) => (
        <span className="text-gray-100 font-semibold">
          {(page - 1) * limit + index + 1}
        </span>
      ),
      width: 70,
    },
    {
      title: "Artikul",
      dataIndex: "article",
      key: "article",
      render: (text) => (
        <span className="text-gray-100 font-semibold">{text}</span>
      ),
    },
    {
      title: "Partiya",
      dataIndex: "batch_number",
      key: "batch_number",
      render: (text) => (
        <span className="text-gray-100 font-semibold">{text}</span>
      ),
    },
    {
      title: "Rulon soni",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => (
        <span className="text-gray-100 font-semibold">{text}</span>
      ),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <span className="text-gray-100 font-semibold">{text}</span>
      ),
    },
    {
      title: "Rasm",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) => (
        <span className="h-[80px] w-[80px]">
          <img className="h-full w-auto" src={text}  />
        </span>
      ),
    },
    {
        title: "Izoh",
        dataIndex: "description",
        key: "description",
        render: (text) => (
            <span className="text-gray-100 font-semibold">{text}</span>
        ),
      },
  ];

  return (
    <div className="p-5">
      <div onClick={() => navigate(-1)} className="flex text-gray-100 mb-5 text-[20px] cursor-pointer font-semibold"><GrFormPreviousLink  className="text-[25px]"/> Orqaga </div>
      <div className="flex justify-between items-center mb-5">
        <div className="text-3xl font-bold  text-gray-100">Tahrirlangan mahsulotlar</div>
        <div className="flex gap-3 items-center">
          <Search
            placeholder="Qidirish"
            onSearch={onSearch}
            enterButton
            className="custom-search"
          />
        </div>
      </div>
      <div className="text-gray-100">
        <Table
          columns={columns}
          dataSource={data?.data?.products}
          pagination={false}
          className="custom-table"
          rowClassName={() => "custom-row"}
          bordered
          loading={isLoading}
        />
        <div className="flex justify-center mt-5">
          <Pagination
            className="custom-pagination"
            current={page}
            total={data?.data?.total}
            pageSize={limit}
            onChange={handlePageChange}
            itemRender={itemRender}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHistory;
