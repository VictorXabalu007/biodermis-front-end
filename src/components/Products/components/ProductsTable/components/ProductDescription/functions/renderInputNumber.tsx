import { Input } from "../../../../../../shared/Input/Input";
import InputMoney from "../../../../../../shared/Input/InputNumber";
import { InputData } from "../@types/InputData";

export const renderInputNumber = ({ ...data }: InputData) => {
    return (
      <Input.Root>
        <Input.Label
          className="text-gray-neutral-400"
          inputId={data.inputId}
          content={data.label}
        />

        <InputMoney onChange={(value) => console.log(value)} value={100} />
      </Input.Root>
    );
  };
