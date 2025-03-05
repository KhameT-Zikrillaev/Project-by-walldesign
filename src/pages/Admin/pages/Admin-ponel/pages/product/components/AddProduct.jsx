import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, message } from "antd";

const AddProduct = ({onClose}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Forma ma'lumotlari:", data);
    message.success("Ombor muvaffaqiyatli qo‘shildi!");
    reset(); // Formani tozalash
    onClose();
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Ombor nomi */}
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Artikul</span>}
          validateStatus={errors.article ? "error" : ""}
          help={errors.article?.message}
        >
          <Controller
            name="article"
            control={control}
            rules={{ required: "Artikul majburiy" }}
            render={({ field }) => (
              <Input placeholder="Artikulni kiriting" className="custom-input" {...field} />
            )}
          />
        </Form.Item>
        
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Partiya</span>}
          validateStatus={errors.batch ? "error" : ""}
          help={errors.batch?.message}
        >
          <Controller
            name="batch"
            control={control}
            rules={{ required: "Partiya majburiy" }}
            render={({ field }) => (
              <Input placeholder="Partiyani kiriting" className="custom-input" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Rulon soni</span>}
          validateStatus={errors.roll_count ? "error" : ""}
          help={errors.roll_count?.message}
        >
          <Controller
            name="roll_count"
            control={control}
            rules={{ required: "Rulon soni majburiy" }}
            render={({ field }) => (
              <Input placeholder="Rulon sonini kiriting" type="number" className="custom-input" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Narxi</span>}
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            rules={{ required: "Narxi majburiy" }}
            render={({ field }) => (
              <Input placeholder="Narxini kiriting" type="number" className="custom-input" {...field} />
            )}
          />
        </Form.Item>

        {/* Yuborish tugmasi */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#364153",
              color: "#f3f4f6",
              fontWeight: "500",
              padding: "15px 20px",
              borderRadius: "8px",
              fontSize: "18px",
              width: "100%"
            }}
          >
            Yaratish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
