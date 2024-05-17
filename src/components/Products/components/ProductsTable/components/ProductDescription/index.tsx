import { Form } from "../../../../../shared/Form";
import { Input } from "../../../../../shared/Input/Input";
import { InputRoot } from "../../../../../shared/Input/Input/InputRoot";
import InputMoney from "../../../../../shared/Input/InputNumber";
import { Products } from "../../util/productsData";

import { ProductImage } from "../ProductImage";

export const ProductView = ({ ...data }: Products) => {


  return (

    <article className="flex px-5 items-center min-h-[250px] gap-3">

      <div>
        <ProductImage 
          productName={data.productName} 
        />
      </div>

      <form>

        <div className="flex max-w-3xl mt-4 gap-10 items-center">

          <div className="flex w-1/2 gap-6 flex-col">

            <Form.InputWrapper>
              <InputRoot>
                <Input.Label
                  content="Nome do produto"
                  className="text-gray-neutral-400"
                />

                <Input.System
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={data.productName}
                />
              </InputRoot>

            </Form.InputWrapper>

            <Form.InputWrapper>
              <InputRoot className="w-2/3">
                <Input.Label
                  content="Preço de venda"
                  className="text-gray-neutral-400"
                />

                <InputMoney
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={100}
                  onChange={(e) => console.log(e)}
                  prefix={"R$"}
                />
              </InputRoot>
            </Form.InputWrapper>
          </div>

          <div className="flex gap-6 flex-col">
            <Form.InputWrapper>
              <InputRoot>
                <Input.Label content="Peso" className="text-gray-neutral-400" />

                <Input.System
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={"10kg"}
                />
              </InputRoot>
            </Form.InputWrapper>

            <Form.InputWrapper>
              <InputRoot>
                <Input.Label
                  content="Total vendidos"
                  className="text-gray-neutral-400"
                />

                <Input.System
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={data.totalSold}
                />
              </InputRoot>
            </Form.InputWrapper>
          </div>

          <div className="flex gap-6 flex-col">
            <Form.InputWrapper>
              <InputRoot>
                <Input.Label
                  content="Altura"
                  className="text-gray-neutral-400"
                />

                <Input.System
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={"10cm"}
                />
              </InputRoot>
            </Form.InputWrapper>

            <Form.InputWrapper>
              <InputRoot>
                <Input.Label
                  content="Preço fictício"
                  className="text-gray-neutral-400"
                />

                <InputMoney
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={100}
                  onChange={(e) => console.log(e)}
                  prefix={"R$"}
                />
              </InputRoot>
            </Form.InputWrapper>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-5">
              <Input.Root>
                <Input.Label
                  className="text-gray-neutral-400"
                  htmlFor={"width"}
                  content={"Largura"}
                />

                <Input.System
                  placeholder={"10cm"}
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={"10cm"}
                  readOnly
                />
              </Input.Root>

              <Input.Root>
                <Input.Label
                  className="text-gray-neutral-400"
                  htmlFor={"depth"}
                  content={"Profundidade"}
                />

                <Input.System
                  placeholder={"10cm"}
                  className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                  value={"10cm"}
                  readOnly
                />
              </Input.Root>
            </div>

            <Input.Root className="w-2/3">
              <Input.Label
                className="text-gray-neutral-400"
                htmlFor={"maxPrice"}
                content={"Preço máximo"}
              />

              <InputMoney
                className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 text-gray-neutral-600"
                prefix="R$"
                readOnly
                onChange={(value) => console.log(value)}
                value={100}
              />
            </Input.Root>
          </div>
        </div>
      </form>
    </article>
  );
};
