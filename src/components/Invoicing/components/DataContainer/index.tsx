import { inputData } from "./util/inputData";
import { DataItem } from "./components/DataItem";
import { outputData } from "./util/outputData";

export const DataContainer = () => {

  return (

    <div className="flex gap-3 mt-10 justify-between items-center">

      <DataItem
        title={"Entradas"}
        subtitle="(entradas totais)"
        cardData={inputData}
        cardType="input"
      />

      

      <DataItem
        title={"Saídas"}
        subtitle="(saídas totais)"
        cardData={outputData}
        cardType="output"
      />

    </div>

  );
};
