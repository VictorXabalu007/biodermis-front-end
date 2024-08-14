import { Col, Empty, Flex, Form, Image, Input, InputRef, Row, Select, Typography } from "antd";
import { useParams } from "react-router-dom";
import { SubHeader } from "../../shared/SubHeader";
import { useEffect, useRef, useState } from "react";
import { ProductsType } from "../service/getProducts";
import { useProductsData } from "../hooks/useProductsData";
import { Spinner } from "../../shared/Spinner";
import { Controller } from "react-hook-form";
import InputMoney from "../../shared/Input/InputNumber";
import { CATEGORIES } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { CategoryType } from "../../Categories/service/getCategory";
import { QuillInput } from "../../shared/Input/QuillInput";
import { Button } from "../../shared/Button";
import { useProductUpdate } from "../hooks/useProductUpdate";
import { API_URL } from "../../../service/url";

const ProductEditor = () => {

  const { id } = useParams();

  const { products } = useProductsData();

  const [currentProduct, setCurrentProduct] = useState<ProductsType>(
    {} as ProductsType
  );
  const [isLoading, setIsLoading] = useState(false);

  const dataCategories: CategoryType[] =
    JSON.parse(sessionStorage.getItem(CATEGORIES) ?? "{}") || [];

  const categories = [
    ...dataCategories.map((d) => ({
      value: d.id,
      label: d.categoria,
    })),
  ];

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const product = products?.find((p) => p.id === Number(id));
      if (product) {
        setCurrentProduct(product);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCurrentProduct({} as ProductsType);
      }
    }
  }, [id, products]);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const productNameRef = useRef<InputRef>(null);

  const {
    handleSubmit,
    control,
    contextHolder,
    setValue,
    updateProductMutation
  } = useProductUpdate({
    data:currentProduct,
    id:currentProduct.id,
    isEditing,
  })

  
  const onSubmit = (data:ProductsType) => {
    
    updateProductMutation.mutate(data);
    setIsEditable(!isEditable)
    setIsEditing(!isEditing)

  }

  useEffect(() => {

    if (currentProduct) {
      setValue("nome", currentProduct.nome);
      setValue("altura", currentProduct.altura);
      setValue("profundidade", currentProduct.profundidade);
      setValue("largura", currentProduct.largura);
      setValue("valorvenda", currentProduct.valorvenda);
      setValue("valormin", currentProduct.valormin);
      setValue("valormax", currentProduct.valormax);
      setValue("descricao", currentProduct.descricao);
      setValue("categoria_ids", currentProduct.categoria_ids);
      setValue("peso", currentProduct.peso);
    }

  }, [currentProduct, setValue]);

  console.log(currentProduct);

  const handleEdit = () => {
    setIsEditable(!isEditable);
    setIsEditing(!isEditing);
    productNameRef.current?.focus();
  };

  return (

    <Row gutter={[32, 32]}>

      {contextHolder}

      <Col lg={24}>
        <SubHeader heading="Editar produto" linkText="Voltar para produtos" />
      </Col>

      {currentProduct ? (
        isLoading ? (
          <Col lg={24}>
            <Spinner />
          </Col>
        ) : (
          <>
            <Col lg={12}>
              <Form 
                layout="vertical" 
                initialValues={currentProduct}
               
              >
                <Row gutter={[32, 32]}>
                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="nome"
                      defaultValue={currentProduct.nome}
                      render={({ field }) => (
                        <Form.Item 
                        
                        label="Nome"
                        >
                          <Input
                            {...field}
                            value={currentProduct.nome}
                            ref={productNameRef}
                            disabled={!isEditable}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                nome: e.target.value,
                              }));
                              field.onChange(e.target.value);
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="altura"
                      defaultValue={currentProduct?.altura}
                      render={({ field }) => (
                        <Form.Item label="Altura (em cm)">
                          <Input
                            {...field}
                            disabled={!isEditable}
                            type="number"
                            value={currentProduct?.altura}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                altura: e.target.value,
                              }));
                              field.onChange(e.target.value);
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="profundidade"
                      defaultValue={currentProduct?.profundidade}
                      render={({ field }) => (
                        <Form.Item label="Profundidade (em cms)">
                          <Input
                            {...field}
                            disabled={!isEditable}
                            type="number"
                            value={currentProduct?.profundidade}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                profundidade: e.target.value,
                              }));
                              field.onChange(e.target.value);
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="largura"
                      defaultValue={currentProduct?.largura}
                      render={({ field }) => (
                        <Form.Item label="Largura (em cms)">
                          <Input
                            {...field}
                            disabled={!isEditable}
                            type="number"
                            value={currentProduct?.largura}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                largura: e.target.value,
                              }));
                              field.onChange(e.target.value);
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="valorvenda"
                      render={({ field }) => (
                        <Form.Item label="Preço de venda (em R$)">
                          <InputMoney
                            className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            value={parseFloat(currentProduct.valorvenda)}
                            onChange={(e) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                valorvenda: e.target.value,
                              }));
                              field.onChange(e.target.value);
                            }}
                            prefix={"R$"}
                            readOnly={!isEditable}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="valormin"
                      defaultValue={currentProduct?.valormin}
                      render={({ field }) => (
                        <Form.Item label="Preço mínimo (em R$)">
                          <InputMoney
                            {...field}
                            className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            prefix="R$"
                            value={parseFloat(currentProduct.valormin)}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              field.onChange(e.target.value);
                            }}
                            readOnly={!isEditable}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="valormax"
                      defaultValue={currentProduct?.valormax}
                      render={({ field }) => (
                        <Form.Item label="Preço máximo (em R$)">
                          <InputMoney
                            className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            prefix="R$"
                            value={parseFloat(currentProduct.valormax)}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                valormax: e.target.value,
                              }));
                              field.onChange(e.target.value);
                            }}
                            readOnly={!isEditable}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="categoria_ids"
                      render={({ field }) => (
                        <Form.Item label="Categorias">
                          <Select
                            style={{
                              width: "250px",
                            }}
                            options={categories}
                            mode="multiple"
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            disabled={!isEditable}
                            value={
                              Array.isArray(field.value)
                                ? field.value
                                : currentProduct.categoria_ids || []
                            }
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="peso"
                      defaultValue={currentProduct?.peso}
                      render={({ field }) => (
                        <Form.Item label="Peso">
                          <Input
                            {...field}
                            value={currentProduct?.peso}
                            disabled={!isEditable}
                            onChange={(e)=>{
                              setCurrentProduct((prev) => ({
                                ...prev,
                                peso: e.target.value,
                              }));
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={24}>
                    <Controller
                      control={control}
                      name="descricao"
                      render={({ field }) => (
                        <Form.Item label="Descrição">
                          <QuillInput
                            className="mt-2"
                            id="description"
                            value={currentProduct.descricao}
                            onChange={(___, __, _, editor) => {
                              const text = editor.getHTML();

                              if (text !== currentProduct.descricao) {
                                if (text === "<p><br></p>") {
                                  field.onChange("");
                                  setCurrentProduct((prev) => ({
                                    ...prev,
                                    descricao: "",
                                  }));
                                } else {
                                  field.onChange(text);
                                  setCurrentProduct((prev) => ({
                                    ...prev,
                                    descricao: text,
                                  }));
                                }
                              }
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </Col>

                  <Col lg={24}>

                    {isEditing ? (
                      <Flex gap={15}>
                        <Button.Root
                          className="w-1/3"
                          htmlType="submit"
                          aria-label="submit fields"
                          onClick={handleSubmit(onSubmit)}
                        >
                          <Button.Wrapper>
                            <Button.Content content="Enviar" />
                          </Button.Wrapper>
                        </Button.Root>

                        <Button.Root
                          className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                          htmlType="reset"
                          aria-label="reset fields"
                        >
                          <Button.Wrapper>
                            <Button.Content content="cancelar" />
                          </Button.Wrapper>
                        </Button.Root>
                      </Flex>
                    ) : (
                      <Flex>
                        <Button.Root
                          className="w-1/3"
                          htmlType="button"
                          aria-label="enable editing"
                          onClick={handleEdit}
                        >
                          <Button.Wrapper>
                            <Button.Content content="editar" />
                          </Button.Wrapper>
                        </Button.Root>
                      </Flex>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col lg={12}>
            
                <Row>
                    
                    <Col lg={24}>

                      <Flex>


                        <Flex gap={4}>

                          <Typography.Title>
                            {currentProduct?.nome}
                          </Typography.Title>

                        </Flex>


                      </Flex>

                    </Col>

                    <Col lg={24}>

                      {currentProduct.imagens ? (
                        <>
                          <Row gutter={[16,16]}>
                          {currentProduct.imagens.map((image,index)=> (

                              <Col lg={8}>
                                
                                <Image 
                                  key={index}
                                  height={"150px"}
                                  src={API_URL + "/" + image} 
                                  alt={image} 
                                  fallback="https://via.placeholder.com/150"
                                  className="rounded-md m-0"
                                  style={
                                    {
                                      borderRadius: '10px',
                                      maxHeight: '200px',
                                      objectFit:'cover'
                                    }}
                                  
                                />

                              </Col>
                         
                          ))}
                             </Row>
                        </>
                      ) : (
                        <Empty 
                          description="Imagens não encontradas"
                        />
                      )}
                    </Col>
                </Row>
            
            </Col>
          </>
        )
      ) : (

        <Empty description="Produto não encontrado" />

      )}
      
    </Row>
  );
};

export default ProductEditor;
