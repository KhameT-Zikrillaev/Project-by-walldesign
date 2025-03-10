import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, message } from "antd";

const AddSeller2 = ({onClose}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Forma ma'lumotlari:", data);
    message.success("Sotuvchi 2 muvaffaqiyatli qo‘shildi!");
    reset(); // Formani tozalash
    onClose();
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Ombor nomi */}
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Sotuvchi 2 nomi</span>}
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Sotuvchi 2 nomi majburiy" }}
            render={({ field }) => (
              <Input placeholder="Sotuvchi 2 nomini kiriting" className="custom-input" {...field} />
            )}
          />
        </Form.Item>
        
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Login</span>}
          validateStatus={errors.login ? "error" : ""}
          help={errors.login?.message}
        >
          <Controller
            name="login"
            control={control}
            rules={{ required: "Login majburiy" }}
            render={({ field }) => (
              <Input placeholder="Login kiriting" className="custom-input" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-gray-100 font-semibold">Parol</span>}
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: "Parol majburiy" }}
            render={({ field }) => (
              <Input placeholder="Parolni kiriting" className="custom-input" {...field} />
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

export default AddSeller2;
