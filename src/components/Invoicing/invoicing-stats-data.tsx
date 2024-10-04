
import { useMovimentationData } from "../../hooks/useMovimentationData";
import { DataItem } from "./data-item";

import { Flex } from "antd";

const InvoicingDataContainer = () => {

  const {
    getInputData, 
    getOutputData,
  } = useMovimentationData();
  

  
  const allInputData = getInputData().flatMap(d => d.monthData);
  const allOutputData = getOutputData().flatMap(d => d.monthData);

  
  return (

    <Flex 
    className="mt-10"
    justify="space-between"
    align="center"
    gap={15}
    
    >

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

    </Flex>

  );
};

export default InvoicingDataContainer