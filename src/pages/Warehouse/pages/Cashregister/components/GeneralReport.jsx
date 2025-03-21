import React from 'react'
import bgsklad from '@/assets/images/bg-sklad.png';
import { useParams} from 'react-router-dom';
import useFetch from '@/hooks/useFetch';

export default function GeneralReport() {
    const { name } = useParams();
  const shopId = sessionStorage.getItem('shopId');

  const { data, isLoading, refetch } = useFetch(
    shopId ? `cash-transaction/shop/${shopId}` : null, 
    shopId ? `cash-transaction/shop/${shopId}` : null, 
    {},
    {
      enabled: !! shopId, 
    }
  );

console.log(data)
  return (
    <div className="min-h-screen bg-cover bg-center p-4 relative" style={{ backgroundImage: `url(${bgsklad})` }}>
      
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>
          <div className="relative text-white flex justify-center items-center z-10 mt-[150px]">
            <div className="">
            <span className="text-2xl font-bold">General Report</span>
            </div>
          </div>
        
       </div>
  )
}
