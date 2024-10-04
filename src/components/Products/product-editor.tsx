import {
  Button,
  Card,
  Checkbox,
  Col, Empty, Flex, Form,
  Image, Input, InputRef, notification, Popconfirm, Row, Select, Skeleton, Typography, Upload
} from "antd";

import { UploadFile } from "antd/lib";
import { useParams } from "react-router-dom";
import { useProductsData } from "../../hooks/products/useProductsData";
import { useEffect, useRef, useState } from "react";
import { useUpload } from "../../hooks/useUpload";
import { useProductUpdate } from "../../hooks/products/useProductUpdate";
import { CATEGORIES } from "../../constants/sessionStorageKeys";
import { SubHeader } from "../shared/SubHeader/sub-header";
import { useImageUpload } from "../../hooks/products/useImageUpload";
import { API_URL } from "../../service/url";
import { Controller } from "react-hook-form";
import InputMoney from "../shared/Input/input-money";
import { QuillInput } from "../shared/Input/QuillInput";
import DeleteButton from "../shared/Button/delete-button";


const ProductEditor = () => {
  
  const { id } = useParams();
  const { products } = useProductsData();
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);

  const [initialData,setInitialData] = useState({} as Product)
  
  const {
    fileList,
    handlePreview,
    uploadButton,
    setFileList,
    handleUpload,
  } = useUpload({ initialImage: currentProduct.imagens });

  const [isLoading, setIsLoading] = useState(false);

  const dataCategories: Category[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? "{}") || [];

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
        setCurrentProduct({} as Product);
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
    deleteImageMutation
  } = useImageUpload({ id: currentProduct.id });

  
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [initialName, setInitialName] = useState('');
  
  useEffect(() => {
    
    if(initialData.nome){
      setInitialName(initialData.nome)
    }

  }, [initialData])

  
  const handleRemove = async (file: UploadFile) => {

    setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
    notification.info({
      message: "Imagem removida",
      description: `Salve para atualizar a imagem`,
 
    })


  };


  const onSubmit = (data: Product) => {
    updateProductMutation.mutate(data);
    uploadImageMutation.mutate(fileList);
    if(selectedIndexes.length > 0){
      deleteImageMutation.mutate(selectedIndexes);
    }

  };

  const handleCancel = () => {
    setCurrentProduct(initialData);
    
      setFileList(
        initialData.imagens.map((image) => ({
          url:  API_URL + "/" + image,
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


  const toggleSelection = (fileIndex: number) => {
    setSelectedIndexes(prev => 
      prev.includes(fileIndex)
        ? prev.filter(index => index !== fileIndex)
        : [...prev, fileIndex]
    );
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
            <Skeleton />
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
                              setCurrentProduct((prev) => ({
                                ...prev,
                                valormin: e.target.value,
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
                          label="Peso (em gramas)"
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
                      <Button
                        className="w-1/3"
                        htmlType="submit"
                        aria-label="submit fields"
                        size="large"
                      >
                        Enviar
                      </Button>
                      

                      <Popconfirm
                        title="Deseja mesmo cancelar?"
                        onConfirm={handleCancel}
                        
                        
                      >

                        <Button
                          className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                          htmlType="reset"
                          aria-label="reset fields"
                          disabled={initialData === currentProduct}
                          size="large"
                        >
                          Cancelar
                        </Button>


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
                    <Flex className="w-full" justify="space-between" gap={4}>

                      <Typography.Title className="mb-5" level={3}>
                        {initialName}
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

                          <Form.Item
                          
                            validateStatus={errors.imagens ? "error" : undefined} 
                            help={errors.imagens?.message}
                          >

                              <Upload
                              
                                listType={'picture-card'}
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={(file) => {
                                  handleUpload(file);
                                  field.onChange(file.fileList);
                                  notification.info({
                                    message: 'Imagem adicionada',
                                    description: 'Não esqueça de salvar o cadastro para que ela apareça aqui',
                                  })
                                }}
                                onRemove={(file) => {
                                  handleRemove(file);
                                  
                                  field.onChange(fileList);
                                }}
                          
                                beforeUpload={() => false}
                      
                                itemRender={(_, file) => {
                                  const thumbUrl = file.thumbUrl || file.url; 
                            
                                  const fileIndex = fileList.findIndex(f => f.name === file.name);
                                  return (
                                    
                            
                                      <Card bodyStyle={{
                                        padding: 5
                                      }}>
                                            <Flex>

                                                <Flex gap={5} vertical>

                                                  <Checkbox
                                                          onChange={() => toggleSelection(fileIndex)}
                                                          checked={selectedIndexes.includes(fileIndex)}
                                                  />

                                                  <DeleteButton
                                                    onDelete={() => {
                                                  
                                            

                                                      toggleSelection(fileIndex);
                                                      handleRemove(file);
                                                      

                                                    }}
                                                  />
                                              

                                                </Flex>
                                                <Image
                                                  style={{
                                                    width:'150px',
                                                    height:'90px',
                                                    objectFit: 'cover'
                                                  }}
                                                  src={thumbUrl}
                                                  alt={file.name}
                                                  
                                                />
                                            
                                            

                                              </Flex>
                          
                                      </Card>
                                    
                                    
                            
                                  );
                                }}
                              >
                                {fileList.length >= 8 ? null : uploadButton}
                              </Upload>


                          </Form.Item>
                         
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
