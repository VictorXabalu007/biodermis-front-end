import { Input } from "../../../../../shared/Input/Input";
import InputMoney from "../../../../../shared/Input/InputNumber";
import { DataType } from "../../util/productsData";
import { ProductImage } from "../ProductImage";
import { InputData } from "./@types/InputData";
import { renderInput } from "./functions/renderInput";
import { renderInputNumber } from "./functions/renderInputNumber";



export const ProductDescription = ({ ...data }: DataType) => {
    

  const inputData: InputData[][] = [

    [
      {
        label: "Nome Do produto",
        inputId: "priceOfSell",
        placeholder: data.productName,
        value: data.productName,
        inputType: "input",
        
      },
      {
        label: "Preço de venda",
        inputId: "priceOfSell",
        placeholder: data.productName,
        value: data.productName,
        inputType: "inputNumber",
      },
    ],
    [
      {
        label: "Peso",
        inputId: "weight",
        placeholder: "10kg",
        value: "10kg",
        inputType: "input",
      },
      {
        label: "Total vendidos",
        inputId: "totalSold",
        placeholder: data.totalSold,
        value: data.totalSold,
        inputType: "input",
      },
    ],
    [
      {
        label: "Altura",
        inputId: "height",
        placeholder: "10cm",
        value: "10cm",
        inputType: "input",
       
      },
      {
        label: "Preço fictício",
        inputId: "fictitiousPrice",
        placeholder: "100",
        value: "100",
        inputType: "inputNumber",
      },
    ],
  ];

  return (

    <article className="flex px-5 items-center min-h-[250px] gap-3">

      <div>
        <ProductImage productName={data.productName} />
      </div>

      <form>

        <div className="flex max-w-4xl mt-4 gap-2 items-center">
            {inputData.map((item,index) => {

            return (

                <div key={index} className="flex flex-col flex-wrap">

                    {item.map((data) => {
                        return (
                            
                        <div key={data.inputId} className="my-3 mx-2">
                            {data.inputType === "input"
                            ? renderInput(data)
                            : renderInputNumber(data)}
                        </div>
                        );
                    })}


                </div>

            );

            })}

                <div className="flex flex-col gap-6">

                    <div className="flex gap-5">
                        <Input.Root>
                            <Input.Label
                            className="text-gray-neutral-400"
                            inputId={'width'}
                            content={'Largura'}
                            />

                            <Input.System
                            placeholder={'10cm'}
                            className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 placeholder-gray-neutral-600"
                            value={'10cm'}
                            readOnly
                            />
                        </Input.Root>

                        <Input.Root>
                            <Input.Label
                            className="text-gray-neutral-400"
                            inputId={'depth'}
                            content={'Profundidade'}
                            />

                            <Input.System
                            placeholder={'10cm'}
                            className="p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 placeholder-gray-neutral-600"
                            value={'10cm'}
                            readOnly
                            />
                        </Input.Root>
                    </div>

                    <Input.Root className="w-2/3">
                        <Input.Label
                        className="text-gray-neutral-400"
                        inputId={'maxPrice'}
                        content={'Preço máximo'}
                        />

                        <InputMoney readOnly onChange={(value) => console.log(value)} value={100} />
                    </Input.Root>


                </div>

        </div>

      </form>

    </article>
  );
};
