import {
  Col, Empty, Flex, Form,
  Image, Input, InputRef, Popconfirm, Row, Select, Typography, Upload
} from "antd";
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
import { useUpload } from "../../../hooks/useUpload";
import { useImageUpload } from "../hooks/useImageUpload";
import { UploadFile } from "antd/lib";

const ProductEditor = () => {
  
  const { id } = useParams();
  const { products } = useProductsData();
  const [currentProduct, setCurrentProduct] = useState<ProductsType>({} as ProductsType);

  const [initialData,setInitialData] = useState({} as ProductsType)
  
  const {
    fileList,
    handlePreview,
    previewImage,
    previewOpen,
    uploadButton,
    setFileList,
    handleUpload,
    setPreviewOpen,
    setPreviewImage
  } = useUpload({ initialImage: currentProduct.imagens });

  const [isLoading, setIsLoading] = useState(false);

  const dataCategories: CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? "{}") || [];

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
        setInitialData(product)
      } else {
        setIsLoading(false);
        setCurrentProduct({} as ProductsType);
      }
    }
  }, [id, products]);

  const productNameRef = useRef<InputRef>(null);

  const {
    handleSubmit,
    control,
    contextHolder,
    setValue,
    errors,
    reset,
    updateProductMutation
  } = useProductUpdate({
    data: currentProduct,
    id: currentProduct.id,
    isEditing: true,
  });

  const {
    uploadImageMutation,
    imageContextHolder,
    deleteImageMutation
  } = useImageUpload({ id: currentProduct.id });

  const handleRemove = async (file: UploadFile) => {
    setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
    deleteImageMutation.mutate(currentProduct.id);
  };

  const onSubmit = (data: ProductsType) => {
    updateProductMutation.mutate(data);
    uploadImageMutation.mutate(fileList);
  };

  const handleCancel = () => {
    setCurrentProduct(initialData);
    
      setFileList(
        initialData.imagens.map((image) => ({
          url: API_URL + "/" + image,
          uid: image,
          name: image,
          status: 'done',
        }))
      )
  
    reset(initialData); 

  };

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
      setValue("imagens", currentProduct.imagens);
    }
  }, [currentProduct, setValue]);

  useEffect(() => {
    if (currentProduct) {
      productNameRef.current?.focus();
    }
  }, [currentProduct]);

  return (
    <Row gutter={[32, 32]}>
      {contextHolder}
      {imageContextHolder}

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
              <Form layout="vertical" initialValues={currentProduct} onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[32, 32]}>
                  <Col lg={12}>
                    <Controller
                      control={control}
                      name="nome"
                      defaultValue={currentProduct.nome}
                      render={({ field }) => (
                        <Form.Item
                          label="Nome"
                          validateStatus={errors.nome ? "error" : undefined}
                          help={errors.nome?.message}
                        >
                          <Input
                            {...field}
                            value={currentProduct.nome}
                            ref={productNameRef}
                            onChange={(e) => {
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
                        <Form.Item
                          label="Altura (em cm)"
                          validateStatus={errors.altura ? "error" : undefined}
                          help={errors.altura?.message}
                        >
                          <Input
                            {...field}
                            type="number"
                            value={currentProduct?.altura}
                            onChange={(e) => {
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
                        <Form.Item
                          label="Profundidade (em cm)"
                          validateStatus={errors.profundidade ? "error" : undefined}
                          help={errors.profundidade?.message}
                        >
                          <Input
                            {...field}
                            type="number"
                            value={currentProduct?.profundidade}
                            onChange={(e) => {
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
                        <Form.Item
                          label="Largura (em cm)"
                          validateStatus={errors.largura ? "error" : undefined}
                          help={errors.largura?.message}
                        >
                          <Input
                            {...field}
                            type="number"
                            value={currentProduct?.largura}
                            onChange={(e) => {
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
                        <Form.Item
                          label="Preço de venda (em R$)"
                          validateStatus={errors.valorvenda ? "error" : undefined}
                          help={errors.valorvenda?.message}
                        >
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
                        <Form.Item
                          label="Preço mínimo (em R$)"
                          validateStatus={errors.valormin ? "error" : undefined}
                          help={errors.valormin?.message}
                        >
                          <InputMoney
                            {...field}
                            className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            prefix="R$"
                            value={parseFloat(currentProduct.valormin)}
                            onChange={(e) => {
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
                      name="valormax"
                      defaultValue={currentProduct?.valormax}
                      render={({ field }) => (
                        <Form.Item
                          label="Preço máximo (em R$)"
                          validateStatus={errors.valormax ? "error" : undefined}
                          help={errors.valormax?.message}
                        >
                          <InputMoney
                            className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            prefix="R$"
                            value={parseFloat(currentProduct.valormax)}
                            onChange={(e) => {
                              setCurrentProduct((prev) => ({
                                ...prev,
                                valormax: e.target.value,
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
                      name="peso"
                      defaultValue={currentProduct?.peso}
                      render={({ field }) => (
                        <Form.Item
                          label="Peso"
                          validateStatus={errors.peso ? "error" : undefined}
                          help={errors.peso?.message}
                        >
                          <Input
                            {...field}
                            value={currentProduct?.peso}
                            onChange={(e) => {
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
                      name="categoria_ids"
                      render={({ field }) => (
                        <Form.Item
                          label="Categorias"
                          validateStatus={errors.categoria_ids ? "error" : undefined}
                          help={errors.categoria_ids?.message}
                        >
                          <Select
                            
                            options={categories}
                            mode="multiple"
                            onChange={(selectedOption) => field.onChange(selectedOption)}
                            value={Array.isArray(field.value) ? field.value : currentProduct.categoria_ids || []}
                            size="large"

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
                        <Form.Item
                          label="Descrição"
                          validateStatus={errors.descricao ? "error" : undefined}
                          help={errors.descricao?.message}
                        >
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
                    <Flex gap={15}>
                      <Button.Root
                        className="w-1/3"
                        htmlType="submit"
                        aria-label="submit fields"
                      >
                        <Button.Wrapper>
                          <Button.Content content="Enviar" />
                        </Button.Wrapper>
                      </Button.Root>
                      

                      <Popconfirm
                        title="Deseja mesmo cancelar?"
                        onConfirm={handleCancel}
                        
                      >

                        <Button.Root
                          className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                          htmlType="reset"
                          aria-label="reset fields"
                          disabled={initialData === currentProduct}
                        >
                          <Button.Wrapper>
                            <Button.Content content="Cancelar" />
                          </Button.Wrapper>
                        </Button.Root>


                      </Popconfirm>
                    </Flex>
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
                  <Row>
                    <Col lg={24}>
                      <Controller
                        control={control}
                        name="imagens"
                        defaultValue={currentProduct.imagens}
                        render={({ field }) => (
                          <>
                            <Upload
                              action={API_URL + '/upload'}
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={handlePreview}
                              onChange={(file) => {
                                handleUpload(file);
                                field.onChange(file.fileList);
                              }}
                              onRemove={(file) => {
                                handleRemove(file);
                                field.onChange(file);
                              }}
                              beforeUpload={() => false}
                            >
                              {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                              <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                  visible: previewOpen,
                                  onVisibleChange: (visible) => setPreviewOpen(visible),
                                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                              />
                            )}
                          </>
                        )}
                      />
                    </Col>
                  </Row>
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
