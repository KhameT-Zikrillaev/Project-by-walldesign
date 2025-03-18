import React, { useState, useEffect } from 'react';
import { Card, Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import bgsklad from '@/assets/images/bg-sklad.png';
import SearchForm from '@/components/SearchForm/SearchForm';
// import bg from '@/assets/images/bg-login.jpg';
import ImageModal from '@/components/modal/ImageModal';
import useFetch from '@/hooks/useFetch';
import useUserStore from '@/store/useUser';

export default function Warehouse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filteredData, setFilteredData] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {user} = useUserStore()
  console.log(user);
  

  const {data, isLoading} = useFetch(`Storefront-product/${user?.shop?.id}`, `Storefront-product/${user?.shop?.id}`, );

  useEffect(() => {
    if(data){
      setFilteredData(data)
    }
  }, [data])
  
  const updateItemsPerPage = () => {
    setItemsPerPage(window.innerWidth < 768 ? 4 : 10);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const currentData = filteredData?.slice(
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
        <SearchForm data={data} name="" title="Vitrina" showDatePicker={false}  onSearch={setFilteredData} />
   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full px-4">
          {currentData?.map((item) => (
            <Card
              key={item?.id}
              className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              cover={
                <div
                onClick={() => setSelectedImage(item?.image_url)}
                  className="h-28 bg-cover cursor-pointer bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${item?.image_url})` }}
                />
              }
              bodyStyle={{ padding: '12px', color: 'white' }}
            >
              <div className="flex flex-col gap-2">
                <Tag color="blue">Part: <span className="text-red-500">{item?.batch_number}</span></Tag>
                <h4 className="text-sm font-semibold text-white">{item?.article}</h4>
              </div>
            </Card>
          ))}
        </div>
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage}
        />

        {filteredData.length > 0 && (
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
        )}
      </div>
    </div>
  );
}