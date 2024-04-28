
import ReactApexChart from "react-apexcharts";
import './styles.css';
import { ApexOptions } from 'apexcharts';

type Series = {
    name: string,
    data: any[],
}

interface ChartType {
    type: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar" | "polarArea" | "rangeBar" | "treemap" | "boxPlot" | "rangeArea" | undefined;
}

type ChartProps = {
    options: ApexOptions,
    series: Series[],
    width?: number | string;
} & ChartType;

export const Chart = ({options,series,type, width}:ChartProps) => {

    return (

        <div className="mt-3 z-50 h-[300px] flex-1 mixed-chart">

            <ReactApexChart 
            options={options}
            series={series}
            type={type}
            height={400}
            width={width}
            
            />

        </div>

    );

}