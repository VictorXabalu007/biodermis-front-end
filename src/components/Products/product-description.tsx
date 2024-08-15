import { useEffect, useRef, useState } from "react";
import { TableActionsProps } from "../../@types/TableActions/TableActions";
import { ProductsType } from "./service/getProducts";
import { CategoryType } from "../Categories/service/getCategory";

import { useProductUpdate } from "./hooks/useProductUpdate";
import { Flex, Image, Select } from "antd";
import { Controller } from "react-hook-form";
import { Button } from "../shared/Button";
import { Form } from "../shared/Form";
import { InputRoot } from "../shared/Input/Input/InputRoot";
import { Input } from "../shared/Input/Input";

import InputMoney from "../shared/Input/InputNumber";
import { CATEGORIES } from "../../constants/SessionStorageKeys/sessionStorageKeys";



export const ProductView = ({data}: TableActionsProps<ProductsType>) => {

  
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const productNameRef = useRef<HTMLInputElement>(null);
  
  
  const dataCategories:CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? '{}') || []

  

  const [fields, setFields] = useState<ProductsType>({
    ...data,
  });


  const handleBlur = (fieldName: keyof ProductsType) => {

    const isNumber = typeof fields[fieldName] === 'number';

    return () => {
      if (fields[fieldName] === "" || isNumber && isNaN(Number(fields[fieldName]))) {
        setFields({
           ...fields, 
           [fieldName]: fields[fieldName] 
        });
      } 
    };

  };

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
      setIsEditing(false)
    }

  },[text, isEditable])

  const {
    handleSubmit,
    onSubmit,
    contextHolder,
    control,
    result,
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

    if(result.success){
      setIsEditable(false);
      setIsEditing(false);
      setText('Editar produto');
    } 

  },[result]);


  return (

    <Flex align="center" gap={10} className="px-5 min-h-[420px]">

      {contextHolder}

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-5"
      >

     
          <Flex vertical className="w-[180px]">
              <Image 
                height={"150px"}
                src={data.imagePath} 
                alt={data.nome} 
                className="rounded-md m-0"
                style={
                  {
                    borderRadius: '5px 5px 0 0',
                    maxHeight: '200px',
                    width: '70vw',
                    objectFit:'cover'
                  }}
              />

              <Flex>

                <Button.Root 
                    onClick={handleClick}
                    style={{borderRadius: '5px 5px 0'}} 
                    className="flex-1 w-full m-0"
                    htmlType="submit"
                >
                    <Button.Wrapper>
                        <Button.Content content={text} />
                    </Button.Wrapper>
                </Button.Root>

              </Flex>

          </Flex>

        <Flex vertical>

          <Flex gap={40} align="center">

            <Flex gap={8} vertical >

              <Flex align="center" gap={20}>

                <Controller 
                control={control}
                name="nome"
                render={({field})=> (

                <Form.InputWrapper>
                  <InputRoot>

                    <Input.Label
                      content="Nome do produto"
                      className="text-gray-neutral-400"
                    />

                    <input
                      
                      className="p-0 bg-transparent border focus:outline-none border-gray-neutral-200  rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                      value={fields.nome}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                        setFields(prev => (
                          {...prev, 
                          nome: e.target.value}
                        ));
                        field.onChange(e.target.value)
                        
                      }}
                      ref={productNameRef}
                      
                      onBlur={handleBlur('nome')}
                      readOnly={!isEditable}
                    />

                  </InputRoot>

                </Form.InputWrapper>

                )}

                />

                <Controller 
                  
                  control={control}
                  name="valorvenda"
                  render={({field})=> (

                  <Form.InputWrapper>
                    <InputRoot className="w-[120px]">
                      <Input.Label
                        content="Preço de venda"
                        className="text-gray-neutral-400"
                      />

                      <InputMoney
                        
                        className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                        value={parseFloat(fields.valorvenda)}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {


                              setFields(prev => ({
                                ...prev,
                                valorvenda: e.target.value
                              }));
                              field.onChange(e.target.value)
                          
                          
                            }
                          }
                        prefix={"R$"}
                        onBlur={handleBlur('valorvenda')}
                        readOnly={!isEditable}

                      
                      />
                    </InputRoot>

                  </Form.InputWrapper>

                  )}/>
                
          


              


              </Flex>

              <div>

                <Controller 
                
                control={control}
                name="categoria_ids"
                render={({field:{onChange,value}})=> (

                <Form.InputWrapper>
                  <InputRoot>

                    <Input.Label
                      content="Categoria"
                      className="text-gray-neutral-400"
                    />


                    <Select
                      style={{
                        width:'250px'
                      }}
                      options={categories}
                      mode="multiple"
                      onChange={(selectedOption) => onChange(selectedOption)}
                      disabled={!isEditable}
                      value={value ? value : [...fields.categoria_ids,value]}
                    />

                    
                  </InputRoot>

                </Form.InputWrapper>

                )}/>

              </div>

            </Flex>

            <Flex gap={20} vertical>

              <Controller 
              control={control}
              name="peso"
              render={({field})=> (

                <Form.InputWrapper>
                  <InputRoot>
                    <Input.Label content="Peso" className="text-gray-neutral-400" />

                    <Input.System
                      className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                      value={fields.peso}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        setFields(prev => ({
                          ...prev,
                          peso: e.target.value
                        }));
                        field.onChange(e.target.value)
                      }}
                      onBlur={handleBlur('peso')}
                      readOnly={!isEditable}

                    />

                  </InputRoot>
                </Form.InputWrapper>

                )}

              />
              
              <Controller
              control={control}
              name="altura"
              render={({field})=> (

              <Form.InputWrapper>
                <InputRoot>
                  <Input.Label
                    content="Altura"
                    className="text-gray-neutral-400"
                  />

                  <Input.System
                    className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                    value={fields.altura}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                      setFields(prev => ({
                        ...prev,
                        altura: e.target.value
                      }));
                      field.onChange(e.target.value);
                    }}
                    onBlur={handleBlur('altura')}
                    readOnly={!isEditable}

                  />
                </InputRoot>
              </Form.InputWrapper>

              )}
              />
            </Flex>

            <Flex gap={20} vertical>


              <Controller 
              control={control}
              name="valormin"
              render={({field})=> (

              <Form.InputWrapper>
                <InputRoot>
                  <Input.Label
                    content="Preço mínimo"
                    className="text-gray-neutral-400"
                  />

                  <InputMoney
                    prefix="R$"
                    className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                    value={parseFloat(fields.valormin)}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                      setFields(prev => ({
                        ...prev,
                        valormin: e.target.value
                      }));
                      field.onChange(e.target.value);
                    }}
                    onBlur={handleBlur('valormin')}
                    readOnly={!isEditable}

                  />
                </InputRoot>
              </Form.InputWrapper>

              )}
              />

              
          <Controller 
                name="largura"
                control={control}
                render={({field})=> (

                <Input.Root>
                  <Input.Label
                    className="text-gray-neutral-400"
                    htmlFor={"width"}
                    content={"Largura"}
                  />

                  <Input.System
                    placeholder={"10cm"}
                    className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                    value={fields.largura}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                      setFields(prev => ({
                        ...prev,
                        largura: e.target.value
                      }));
                      field.onChange(e.target.value);
                    }}
                    onBlur={handleBlur('largura')}
                    readOnly={!isEditable}

                
                  />
                </Input.Root>

                )}
                />

            </Flex>

            <Flex gap={22} vertical>

              <Flex>

                <Controller
                name="profundidade"
                control={control}
                render={({field})=> (

                <Input.Root>
                  <Input.Label
                    className="text-gray-neutral-400"
                    htmlFor={"depth"}
                    content={"Profundidade"}
                  />

                  <Input.System
                    placeholder={"10cm"}
                    className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                    value={fields.profundidade}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                      setFields(prev => ({
                        ...prev,
                        profundidade: e.target.value
                      }));
                      field.onChange(e.target.value);
                    }}
                    onBlur={handleBlur('profundidade')}
                    readOnly={!isEditable}

                  />

                </Input.Root>


                )}
                />
              </Flex>

              <Controller 
              control={control}
              name="valormax"
              render={({field})=> (

              <Input.Root>
                <Input.Label
                  className="text-gray-neutral-400"
                  htmlFor={"maxPrice"}
                  content={"Preço máximo"}
                />

                <InputMoney
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  prefix="R$"
                  value={parseFloat(fields.valormax)}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setFields(prev => ({
                      ...prev,
                      valormax: e.target.value
                    }));
                    field.onChange(e.target.value);
                  }}
                  onBlur={handleBlur('valormax')}
                  readOnly={!isEditable}

                />
              </Input.Root>

              )}
              />
            </Flex>
            
          </Flex>

        </Flex>

      </form>

    </Flex>

  );

};
