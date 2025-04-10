import React from 'react';
import { Card, Tooltip, Badge } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

const WarehouseCard = ({ item }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <Badge status="success" text="Tasdiqlangan" />;
      case 'pending':
        return <Badge status="processing" text="Kutilmoqda" />;
      case 'rejected':
        return <Badge status="error" text="Rad etilgan" />;
      default:
        return <Badge status="default" text={status || 'Noma\'lum'} />;
    }
  };

  return (
    <Card
      className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
      bodyStyle={{ padding: "16px", color: "white" }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 flex items-center">
              <Tooltip title="Manba ombor">
                <span>{item.sourceWarehouse?.name || 'Noma\'lum'}</span>
              </Tooltip>
              <ArrowRightOutlined className="mx-2 text-yellow-400" />
              <Tooltip title="Manzil ombor">
                <span>{item.destinationWarehouse?.name || 'Noma\'lum'}</span>
              </Tooltip>
            </h3>
            <div className="mb-2">
              {getStatusBadge(item?.status)}
            </div>
          </div>
          <Tooltip title="Yaratilgan sana">
            <span className="text-xs text-gray-300">
              {formatDate(item?.createdAt)}
            </span>
          </Tooltip>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-300 mb-2">Mahsulotlar</h4>
          {item?.items && item?.items?.length > 0 ? (
            <div className="space-y-3">
              {item?.items?.map((product, index) => (
                <div key={index} className="border-b border-gray-600 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{product?.product?.article || 'Noma\'lum'}</span>
                    <span className="text-sm">{product?.quantity} dona</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>Partiya: {product?.product?.batch_number || 'Noma\'lum'}</span>
                    <Tooltip title="Narx o'zgarishi">
                      <span className={`${product?.new_price > product?.orginal_price ? 'text-green-400' : 'text-red-400'}`}>
                        {product?.orginal_price?.toLocaleString()} → {product?.new_price?.toLocaleString()} so'm
                      </span>
                    </Tooltip>
                  </div>
                  {product?.remarks && (
                    <p className="text-xs text-gray-400 mt-1 italic">Izoh: {product?.remarks}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Mahsulotlar mavjud emas</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WarehouseCard;