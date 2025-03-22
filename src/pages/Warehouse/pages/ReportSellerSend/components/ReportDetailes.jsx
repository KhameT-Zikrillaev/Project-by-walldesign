import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SearchFormStartEnd from "@/components/SearchFormStartEnd/SearchFormStartEnd";
import { Pagination, Spin } from "antd";
import useFetch from "@/hooks/useFetch";
import WarehouseSendShopReportCard from "@/components/warehousesendShopReport";

const reportDataArray = [
  {
    date: "2024-10-21",
    totalSum: 1500000,
    returnSum: 200000,
    netProfit: 1300000,
  },
  {
    date: "2024-10-20",
    totalSum: 2300000,
    returnSum: 300000,
    netProfit: 2000000,
  },
  {
    date: "2024-10-19",
    totalSum: 1800000,
    returnSum: 100000,
    netProfit: 1700000,
  },
  {
    date: "2024-10-18",
    totalSum: 1900000,
    returnSum: 150000,
    netProfit: 1750000,
  },
  {
    date: "2024-10-17",
    totalSum: 2100000,
    returnSum: 250000,
    netProfit: 1850000,
  },
];

const ReportDetailes = () => {
  const [selectedDates, setSelectedDates] = useState({ from: null, to: null });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { name } = useParams();
  const shopId = sessionStorage.getItem("shopId"); 

  const startDate = selectedDates?.from;
  const endDate = selectedDates?.to;
  const isFetchEnabled = !!(shopId && startDate && endDate);

  const { data, isLoading } = useFetch(
    `cash-register/date-range/shop/${shopId}`,
    `cash-register/date-range/shop/${shopId}`,
    { startDate, endDate, page, limit },
    { enabled: isFetchEnabled }
  );
    
  console.log(data?.data[0]);
  

  const handleDateSearch = (from, to) => {
    setSelectedDates({ from, to });
    setPage(1);
  };

  return (
    <div className="mt-[120px] px-2">
      <SearchFormStartEnd
        title={`${name} hisobotlari`}
        onSearch={handleDateSearch}
      />

      {!startDate || !endDate ? (
        <p className="text-center text-gray-500 text-[20px] pt-14">
          Iltimos, sanani tanlang
        </p>
      ) : isLoading ? (
        <div className="flex justify-center mt-20">
          <Spin size="large" />
        </div>
      ) : reportDataArray.length ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data[0].map((report, index) => (
            <Link key={index} to={`/warehouse/report-seller-send/${name}/${report.date}`}>
              <WarehouseSendShopReportCard  report={report} />
            </Link>
          ))}
          <div className="flex justify-center mt-4 col-span-full">
            <Pagination
              current={page}
              pageSize={limit}
              total={data?.data[1] || 0}
              onChange={(page) => setPage(page)}
              // showSizeChanger
              // onShowSizeChange={(current, size) => setLimit(size)}
              className="custom-pagination"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Hech narsa yo‘q</p>
      )}
    </div>
  );
};

export default ReportDetailes;
