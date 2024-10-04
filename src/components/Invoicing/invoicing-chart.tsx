import { FaMoneyBills } from "react-icons/fa6";
import { Chart } from "../shared/Chart";
import { ChartHeader } from "../shared/Chart/components/ChartHeader";
import { ChartWrapper } from "../shared/Chart/components/ChartWrapper";
import { useChartSeries } from "../../hooks/useInvoicingChart";

const InvoicingChartContainer = () => {

  const {series,options} = useChartSeries();

  return (

    <ChartWrapper>

      <ChartHeader.Root>

        <ChartHeader.Wrapper>

          <ChartHeader.Icon icon={FaMoneyBills} />

          <ChartHeader.Content content="Faturamento mensal (entradas e saídas)" />
          
        </ChartHeader.Wrapper>

      </ChartHeader.Root>

      <Chart
        // @ts-ignore
        options={options}
        series={series}
        type="bar"
      />

    </ChartWrapper>

  );
};

export default InvoicingChartContainer