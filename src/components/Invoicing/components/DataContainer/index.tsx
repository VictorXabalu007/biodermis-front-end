
import { DataItem } from "./components/DataItem";
import { useMovimentationData } from "../../../../hooks/useMovimentationData/useMovimentationData";

export const DataContainer = () => {

  const {
    getInputData, 
    getOutputData,
  } = useMovimentationData();
  

  

  const allInputData = getInputData().flatMap(d => d.monthData);
  const allOutputData = getOutputData().flatMap(d => d.monthData);

  
  return (

    <div className="flex flex-wrap gap-3 mt-10 justify-between items-center">

      <DataItem
        title={"Entradas"}
        subtitle="(entradas totais)"
        cardData={allInputData}
        cardType="input"
      />

      

      <DataItem
        title={"Saídas"}
        subtitle="(saídas totais)"
        cardData={allOutputData}
        cardType="output"
      />

    </div>

  );
};
