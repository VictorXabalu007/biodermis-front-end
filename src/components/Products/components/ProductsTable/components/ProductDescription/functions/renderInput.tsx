import { twMerge } from "tailwind-merge";
import { Input } from "../../../../../../shared/Input/Input";
import { InputData } from "../@types/InputData";

export const renderInput = ({ ...data }: InputData) => {

    return (
      <Input.Root>
        <Input.Label
          className="text-gray-neutral-400"
          inputId={data.inputId}
          content={data.label}
        />

        <Input.System
          placeholder={data.value}
          className={twMerge("p-0 bg-transparent rounded-none border-r-0 border-l-0 border-t-0 placeholder-gray-neutral-600", data.width)}
          value={data.value}
          readOnly
        />
      </Input.Root>
    );
  };