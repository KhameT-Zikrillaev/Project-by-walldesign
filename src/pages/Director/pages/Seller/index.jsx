import React, { useState } from "react";
import { DatePicker, Input, Button } from "antd";
import { FaPencilAlt } from "react-icons/fa"; // Импортируем иконку карандаша
import SearchForm from "@/components/SearchForm/SearchForm"; // Импортируем ваш компонент SearchForm

const { TextArea } = Input;

const districts = [
  {
    id: 1,
    description: "Описание Chilanzar",
    name: "Magic Wall",
    warehouse: "Yunsobod"
  },
  {
    id: 2,
    description: "Описание Yunsabad",
    name: "Color Dreams",
    warehouse: "Chilanzar"
  },
  {
    id: 3,
    description: "Описание Mirzo Ulugbek",
    name: "Wall Master",
    warehouse: "Mirzo Ulugbek"
  },
  {
    id: 4,
    description: "Описание Yakkasaray",
    name: "Dream Decor",
    warehouse: "Yakkasaray"
  },
  {
    id: 5,
    description: "Описание Shayxontoxur",
    name: "Home Style",
    warehouse: "Shayxontoxur"
  },
  {
    id: 6,
    description: "Описание Olmazor",
    name: "Wall Art",
    warehouse: "Olmazor",
  },
  {
    id: 7,
    description: "Описание Bektemir",
    name: "Creative Walls",
    warehouse: "Bektemir"
  },
  {
    id: 8,
    description: "Описание Yashnobod",
    name: "Modern Decor",
    warehouse: "Yashnobod"
  },
  {
    id: 9,
    description: "Описание Mirobod",
    name: "Elegant Walls",
    warehouse: "Mirobod"
  },
  {
    id: 10,
    description: "Описание Sergeli",
    name: "Wall Trends",
    warehouse: "Sergeli"
  },
  {
    id: 11,
    description: "Описание Uchtepa",
    name: "Style Home",
    warehouse: "Uchtepa"
  },
  {
    id: 12,
    description: "Описание Yangihayot",
    name: "Urban Decor",
    warehouse: "Yangihayot"
  },
  {
    id: 13,
    description: "Описание Tashkent District",
    name: "Wall Vision",
    warehouse: "Tashkent District"
  },
  {
    id: 14,
    description: "Описание Samarkand",
    name: "Golden Walls",
    warehouse: "Samarkand"
  },
  {
    id: 15,
    description: "Описание Bukhara",
    name: "Heritage Decor",
    warehouse: "Bukhara"
  },
  {
    id: 16,
    description: "Описание Khiva",
    name: "Ancient Walls",
    warehouse: "Khiva"
  },
  {
    id: 17,
    description: "Описание Fergana",
    name: "Silk Road Decor",
    warehouse: "Fergana"
  },
  {
    id: 18,
    description: "Описание Namangan",
    name: "Green Walls",
    warehouse: "Namangan"
  },
  {
    id: 19,
    description: "Описание Andijan",
    name: "Bright Decor",
    warehouse: "Andijan"
  },
  {
    id: 20,
    description: "Описание Nukus",
    name: "Desert Style",
    warehouse: "Nukus"
  },
  {
    id: 21,
    description: "Описание Urgench",
    name: "Oasis Decor",
    warehouse: "Urgench"
  },
  {
    id: 22,
    description: "Описание Navoi",
    name: "Mining Walls",
    warehouse: "Navoi"
  },
  {
    id: 23,
    description: "Описание Jizzakh",
    name: "Valley Decor",
    warehouse: "Jizzakh"
  },
  {
    id: 24,
    description: "Описание Termez",
    name: "Border Walls",
    warehouse: "Termez"
  }
];

export default function Seller() {
  const [visibleDistricts, setVisibleDistricts] = useState(12);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ date: false, comment: false }); // Состояние для ошибок
  const [filteredData, setFilteredData] = useState(districts); // Состояние для отфильтрованных данных

  const loadMoreDistricts = () => {
    setVisibleDistricts((prevVisibleDistricts) => prevVisibleDistricts + 12);
  };

  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setErrors((prev) => ({ ...prev, date: false })); // Сбрасываем ошибку даты
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setErrors((prev) => ({ ...prev, comment: false })); // Сбрасываем ошибку комментария
  };

  const handleMark = () => {
    let hasError = false;
    const newErrors = { date: false, comment: false };

    if (!selectedDate) {
      newErrors.date = true;
      hasError = true;
    }
    if (!comment.trim()) {
      newErrors.comment = true;
      hasError = true;
    }

    setErrors(newErrors); // Устанавливаем ошибки

    if (hasError) {
      return; // Прерываем выполнение, если есть ошибки
    }

    // Логика для отметки (можно добавить отправку данных или другие действия)
    console.log("Дата:", selectedDate);
    console.log("Комментарий:", comment);
    alert("Успешно отправлено!");

    // Закрываем карточку
    setExpandedCard(null);
    // Очищаем поля
    setSelectedDate(null);
    setComment("");
  };

  return (
    <div className="DirectorSeller pt-[150px] p-4">
      {/* Добавляем SearchForm для фильтрации */}
      <SearchForm
        data={districts} 
        onSearch={setFilteredData} 
        name=""
        title="Sotuvchilar" 
        showDatePicker={true} 
      />

      <div className="grid grid-cols-2 gap-4">
        {filteredData.slice(0, visibleDistricts).map((district) => (
          <div
            key={district.id}
            className="block bg-gray-800 text-white p-4 rounded-lg  transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold">{district.name}</h4>
                <p className="text-sm text-gray-300">{district.description}</p>
                <div className="mt-2">
                  <p className="text-sm">Ombor: {district.warehouse}</p>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(district.id)}
                className="flex border-gray-300 p-3 bg-gray-700  hover:bg-gray-600  rounded-xl items-center cursor-pointer gap-2 text-white hover:text-gray-300 transition"
              >
                {expandedCard === district.id ? (
                  "×" // Крестик для закрытия
                ) : (
                  <>
                    <FaPencilAlt className="text-lg" />
                    <span>Belgilash</span>
                  </>
                )}
              </button>
            </div>
            {expandedCard === district.id && (
              <div className="mt-4">
                <DatePicker
                  onChange={handleDateChange}
                  className="w-full mb-2 bg-gray-800 text-white"
                  style={{ backgroundColor: "#1F2937", color: "white" }}
                  required
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mb-2">
                    Пожалуйста, выберите дату!
                  </p>
                )}
                <TextArea
                  rows={2}
                  placeholder="Комментарий"
                  value={comment}
                  onChange={handleCommentChange}
                  className="mb-2 bg-gray-800 text-white"
                  style={{ backgroundColor: "#1F2937", color: "white" }}
                  required
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mb-2">
                    Пожалуйста, введите комментарий!
                  </p>
                )}
                <Button
                  type="primary"
                  className="w-full"
                  onClick={handleMark}
                  style={{
                    backgroundColor: "#364153",
                    borderColor: "#364153",
                    marginTop: "10px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2b3445")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#364153")
                  }
                >
                  Belgilash
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {visibleDistricts < filteredData.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreDistricts}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Yana
          </button>
        </div>
      )}
    </div>
  );
}