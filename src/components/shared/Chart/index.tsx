
import ReactApexChart from "react-apexcharts";
import './styles.css';
import { ApexOptions } from 'apexcharts';
import { theme } from "antd";

type Series = {
    name: string,
    data: any[],
}


type TemplateChartProps = {
    options: ApexOptions,
    series: Series[],
    width?: number | string;
} & ApexChart;

export const Chart = ({options,series,type, width,...rest}:TemplateChartProps) => {

    
    const {
        token: {
            colorBgContainer
        }
    } = theme.useToken();


    return (

        <div style={{background: colorBgContainer}} className="mt-3 rounded z-50 h-[300px] flex-1 mixed-chart">

            <ReactApexChart 
            options={options}
            series={series}
            type={type}
            height={400}
            width={width}
            {...rest}
            
            />

        </div>

    );

}