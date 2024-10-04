import { useEffect, useRef, useState } from "react";


import { useProductUpdate } from "../../hooks/products/useProductUpdate";
import { Button, Col, Flex, Form, Image, InputRef, Row, Select } from "antd";
import { Controller } from "react-hook-form";

import InputMoney from "../shared/Input/input-money";
import { CATEGORIES } from "../../constants/sessionStorageKeys";
import FlatInput from "../shared/Input/flat-input";


export const ProductView = ({data}: {data:Product}) => {

  
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const productNameRef = useRef<InputRef>(null);
  
  const dataCategories:Category[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? '{}') || []


  const [fields, setFields] = useState<Product>({} as Product);

  useEffect(()=> {
    if(data){
      setFields(data)
    }
  },[data])

  const [text, setText] = useState('Editar produto');

  const handleClick = () => {

      setIsEditable(!isEditable);
      setIsEditing(!isEditing);
      setText('Salvar edição')
      productNameRef.current?.focus();

  }

  useEffect(()=> {

    if(!isEditable){
      setText('Editar produto');
      setIsEditing(false);
    }

  },[text, isEditable])

  const {
    handleSubmit,
    onSubmit,
    contextHolder,
    control,
    err,
    errors
  } = useProductUpdate({
    data,
    id: data.id,
    isEditing,
  });

  const categories = [
    ...dataCategories.map(d => ({
        value: d.id,
        label: d.categoria
    }))
  ]

  useEffect(()=> {

    if(err.length > 0){
      setIsEditable(true);
      setIsEditing(true);
      setText('Salvar edição');
    } 

  },[err]);

  const renderField = (
    fieldName: keyof Product,
    label: string,
    fieldType?: "text" | "number" | "select" | "money",
  ) => {
    return (
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => {
          const errorMessage = errors[fieldName]?.message;
          switch (fieldType) {
            case "number":
              return (
                <Form.Item
                 label={label} 
                 validateStatus={errorMessage ? "error" : ""}
                 help={errorMessage as string}
                 >
                  
                  <FlatInput
                    inputType="number"
                    {...field}
                    disabled={!isEditable}
                    value={field.value || ""}
                  />
                </Form.Item>
              );
            case "select":
              return (
                <Form.Item 
                label={label} 
                validateStatus={errorMessage ? "error" : ""} 
                help={errorMessage as string}
                >
                
                  <Select
                    {...field}
                    options={categories}
                    mode="multiple"
                    disabled={!isEditable}
                    value={field.value || []}
                  />
                </Form.Item>
              );
            case "money":
              return (
                <Form.Item
                 label={label}
                  validateStatus={errorMessage ? "error" : ""} 
                  help={errorMessage as string}>
                  <InputMoney
                    {...field}
                    prefix="R$"
                    disabled={!isEditable}
                    value={parseFloat(field.value) || 0}
                  />
                </Form.Item>
              );
            default:
              return (
                <Form.Item 
                label={label} 
                validateStatus={errorMessage ? "error" : ""} 
                help={errorMessage as string}
                >
                  <FlatInput
               
                    inputType="default"
                    {...field}
                    disabled={!isEditable}
                    value={field.value || ""}
              
                
                    
                  />
                </Form.Item>
              );
          }
        }}
      />
    );
  };



  return (

    <Flex align="center" gap={10} className="px-5 min-h-[420px]">

      {contextHolder}

      <Form 
        onFinish={handleSubmit(onSubmit)} 
        className="flex items-center gap-5"
        layout="vertical"
        initialValues={fields}
      >
     
          <Flex vertical className="w-[180px]">

              <Image 
                height={"150px"}
                src={data.imagePath} 
                alt={data.nome} 
                className="m-0"
                style={
                  {
                    borderRadius: '0',
                    maxHeight: '200px',
                    width: '70vw',
                    objectFit:'cover'
                  }}
              />

              <Flex>

     
                <Button
                  onClick={handleClick}
                  size="large"
                  style={{
                    borderRadius:'0 0 5px 5px',
                    flex:1
                  }}
                  htmlType={!isEditing ? "submit" : 'button'}
              
                >
                  {text}
                </Button>

              </Flex>

          </Flex>

          <Row gutter={[32, 32]}>
            <Col lg={6}>{renderField ("nome", "Nome","text")}</Col>
            <Col lg={6}>{renderField("valorvenda","Preço de venda", "money")}</Col>
            <Col lg={6}>{renderField("categoria_ids", "Categorias", "select")}</Col>
            <Col lg={6}>{renderField("peso", "Peso","number")}</Col>
            <Col lg={6}>{renderField("altura",  "Altura", "number")}</Col>
            <Col lg={4}>{renderField("largura","Largura", "number")}</Col>
            <Col lg={4}>{renderField("profundidade","Profundidade", "number")}</Col>
            <Col lg={4}>{renderField("valormin","Valor mínimo", "money")}</Col>
            <Col lg={4}>{renderField("valormax","Valor maximo", "money")}</Col>
        </Row>


      </Form>

    </Flex>

  );

};
