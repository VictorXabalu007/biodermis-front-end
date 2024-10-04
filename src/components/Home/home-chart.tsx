
import { FaMoneyBills } from "react-icons/fa6"
import { Chart } from "../shared/Chart"
import { ChartHeader } from "../shared/Chart/components/ChartHeader"
import { InputRangePicker } from "../shared/Input/range-picker"
import { ChartWrapper } from "../shared/Chart/components/ChartWrapper"
import { useChartSeries } from "../../hooks/useInvoicingChart"


const HomeChart = () => {

    const {series,options} = useChartSeries();
    
    return (

        <ChartWrapper>

            <ChartHeader.Root>

                <ChartHeader.Wrapper>
                    <ChartHeader.Icon icon={FaMoneyBills} />

                    <ChartHeader.Content content="Faturamento mensal (entradas e saídas)" />
                </ChartHeader.Wrapper>

                <ChartHeader.Prefix>

                    <InputRangePicker />

                </ChartHeader.Prefix>

            </ChartHeader.Root>

            <Chart 
            // @ts-ignore
            options={options}
            series={series}
            type="bar"
            height={350}
            
            
            />

    </ChartWrapper>
       
    );

}

export default HomeChart