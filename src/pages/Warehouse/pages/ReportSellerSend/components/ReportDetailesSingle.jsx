import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'

const ReportDetailesSingle = () => {
    const shopId = sessionStorage.getItem("shopId");
    const {date} = useParams();

    const { data, isLoading } = useFetch(`cash-register/date/${date}/shop/${shopId}`, `cash-register/date/${date}/shop/${shopId}`)
    console.log(data);
    
    console.log(shopId, date, isLoading);
    
  return (
    <div className='mt-[120px]'>ReportDetailesSingle</div>
  )
}

export default ReportDetailesSingle