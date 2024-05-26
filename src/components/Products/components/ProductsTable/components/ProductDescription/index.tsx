import { Controller, useForm } from "react-hook-form";
import { Form } from "../../../../../shared/Form";
import { Input } from "../../../../../shared/Input/Input";
import { InputRoot } from "../../../../../shared/Input/Input/InputRoot";
import InputMoney from "../../../../../shared/Input/InputNumber";

import { ProductImage } from "../ProductImage";
import React, { useRef, useState } from "react";
import { ProductsData } from "../../../../../Register/RegisterProducts/components/FormContainer";
import { TableActionsProps } from "../../../../../../@types/TableActions/TableActions";





type ProductsViewFields = {

  productName: string;
  sellPrice: number;
  weight: string;
  totalSold: string;
  height: string;
  width: string;
  depth: string;
  fakePrice:number;
  category: string;
  maxPrice:number;

}

export const ProductView = ({data, row, table}: TableActionsProps<ProductsData>) => {

  
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const productNameRef = useRef<HTMLInputElement>(null);

  const {control} = useForm<ProductsViewFields>({
    
  });

  const initialFields = {
    productName: data.productName,
    sellPrice: parseFloat(data.sellPrice),
    weight: data.weight,
    totalSold: "100",
    height: data.height,
    fakePrice: parseFloat(data.ficticiousPrice),
    width: data.width,
    depth: data.depth,
    maxPrice: parseFloat(data.maxPrice),
    category: data.category,
  };

  const [fields, setFields] = useState<ProductsViewFields>({
    ...initialFields,
  });

  const handleBlur = (fieldName: keyof ProductsViewFields) => {

    const isNumber = typeof fields[fieldName] === 'number';

    return () => {
      if (fields[fieldName] === "" || isNumber && isNaN(Number(fields[fieldName]))) {
        setFields({
           ...fields, 
           [fieldName]: initialFields[fieldName] 
        });
      } else {
        //@ts-ignore
        table.options.meta?.updateData(row.index, fieldName, fields[fieldName]);
      }
    };
  };

  const handleClick = () => {

      setIsEditable(true);
      productNameRef.current?.focus()
      
  }


  return (

    <article className="flex px-5 items-center min-h-[250px] gap-3">

      <div>
        <ProductImage 
          onClick={handleClick}
          productName={data.productName} 
        />
      </div>

      <form>

        <div className="flex mt-4 gap-10 items-center">

          <div className="flex gap-6 flex-col">

            <div className="flex gap-6">



              
              <Controller 
              control={control}
              name="productName"
              render={({field})=> (

              <Form.InputWrapper>
                <InputRoot>

                  <Input.Label
                    content="Nome do produto"
                    className="text-gray-neutral-400"
                  />

                  <input
                    
                    className="p-0 bg-transparent border focus:outline-none border-gray-neutral-200  rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                    value={fields.productName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                      setFields(prev => (
                        {...prev, 
                        productName: e.target.value}
                      ));
                      field.onChange(e.target.value)
                      
                    }}
                    ref={productNameRef}
                    
                    onBlur={handleBlur('productName')}
                    readOnly={!isEditable}
                  />

                </InputRoot>

              </Form.InputWrapper>

              )}

              />


          <Controller 
            
            control={control}
            name="sellPrice"
            render={({field})=> (

            <Form.InputWrapper>
              <InputRoot className="w-[120px]">
                <Input.Label
                  content="Preço de venda"
                  className="text-gray-neutral-400"
                />

                <InputMoney
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={fields.sellPrice}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setFields(prev => ({
                      ...prev,
                      sellPrice: parseFloat(e.target.value)
                    }));
                    field.onChange(e.target.value)
                  }}
                  prefix={"R$"}
                  onBlur={handleBlur('sellPrice')}
                  readOnly={!isEditable}

                
                />
              </InputRoot>

            </Form.InputWrapper>

            )}/>
              
          


            </div>

            <Controller 
            
            control={control}
            name="category"
            render={({field:{onChange}})=> (

            <Form.InputWrapper>
              <InputRoot >

                <Input.Label
                  content="Categoria"
                  className="text-gray-neutral-400"
                />

                <Input.System
                  className=" p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={fields.category}
                  onChange={(e) => {
                    setFields(prev => ({
                      ...prev,
                      category: e.target.value
                    }));
                    onChange(e.target.value)
                  }}
                  onBlur={handleBlur('category')}
                  readOnly={!isEditable}

                
                />
                
              </InputRoot>

            </Form.InputWrapper>

            )}/>

          </div>

          <div className="flex gap-6 flex-col">

            <Controller 
            control={control}
            name="weight"
            render={({field})=> (

              <Form.InputWrapper>
                <InputRoot>
                  <Input.Label content="Peso" className="text-gray-neutral-400" />

                  <Input.System
                    className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                    value={fields.weight}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                      setFields(prev => ({
                        ...prev,
                        weight: e.target.value
                      }));
                      field.onChange(e.target.value)
                    }}
                    onBlur={handleBlur('weight')}
                    readOnly={!isEditable}

                  />

                </InputRoot>
              </Form.InputWrapper>

              )}

            />

              <Controller 
                control={control}
                name="totalSold"
                render={({field})=> (
                  <Form.InputWrapper>
                  <InputRoot>
                    <Input.Label
                      content="Total vendidos"
                      className="text-gray-neutral-400"
                    />

                    <Input.System
                      className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                      value={fields.totalSold}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        setFields(prev => ({
                          ...prev,
                          totalSold: e.target.value
                        }));
                        field.onChange(e.target.value);
                      }}
                      onBlur={handleBlur('totalSold')}
                      readOnly={!isEditable}

                    />

                  </InputRoot>
                </Form.InputWrapper>

                )}

              />
          </div>

          <div className="flex gap-6 flex-col">

            <Controller
            control={control}
            name="height"
            render={({field})=> (

            <Form.InputWrapper>
              <InputRoot>
                <Input.Label
                  content="Altura"
                  className="text-gray-neutral-400"
                />

                <Input.System
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={fields.height}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setFields(prev => ({
                      ...prev,
                      height: e.target.value
                    }));
                    field.onChange(e.target.value);
                  }}
                  onBlur={handleBlur('height')}
                  readOnly={!isEditable}

                />
              </InputRoot>
            </Form.InputWrapper>

            )}
            />

            <Controller 
            control={control}
            name="fakePrice"
            render={({field})=> (

            <Form.InputWrapper>
              <InputRoot>
                <Input.Label
                  content="Preço fictício"
                  className="text-gray-neutral-400"
                />

                <InputMoney
                  prefix="R$"
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={fields.fakePrice}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setFields(prev => ({
                      ...prev,
                      fakePrice: parseFloat(e.target.value)
                    }));
                    field.onChange(e.target.value);
                  }}
                  onBlur={handleBlur('fakePrice')}
                  readOnly={!isEditable}

                />
              </InputRoot>
            </Form.InputWrapper>

            )}
            />

          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-5">

              <Controller 
              name="width"
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
                  value={fields.width}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setFields(prev => ({
                      ...prev,
                      width: e.target.value
                    }));
                    field.onChange(e.target.value);
                  }}
                  onBlur={handleBlur('width')}
                  readOnly={!isEditable}

              
                />
              </Input.Root>

              )}
              />

              <Controller
              name="depth"
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
                  value={fields.depth}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setFields(prev => ({
                      ...prev,
                      depth: e.target.value
                    }));
                    field.onChange(e.target.value);
                  }}
                  onBlur={handleBlur('depth')}
                  readOnly={!isEditable}

                />

              </Input.Root>


              )}
              />
            </div>

            <Controller 
            control={control}
            name="maxPrice"
            render={({field})=> (

            <Input.Root className="w-2/3">
              <Input.Label
                className="text-gray-neutral-400"
                htmlFor={"maxPrice"}
                content={"Preço máximo"}
              />

              <InputMoney
                className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                prefix="R$"
                value={fields.maxPrice}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  setFields(prev => ({
                    ...prev,
                    maxPrice: parseFloat(e.target.value)
                  }));
                  field.onChange(e.target.value);
                }}
                onBlur={handleBlur('maxPrice')}
                readOnly={!isEditable}

              />
            </Input.Root>

            )}
            />
          </div>
        </div>

      </form>

    </article>

  );

};
