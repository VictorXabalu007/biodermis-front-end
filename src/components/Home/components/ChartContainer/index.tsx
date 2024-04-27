import { BORDER_GRAY } from "../../../../constants/classnames/classnames"
import { Chart } from "../../../shared/Chart"
import { ChartHeader } from "./util/components/ChartHeader"
import { options } from "./util/options"
import { series } from "./util/series"



export const ChartContainer = () => {

    return (

        <div style={{border:BORDER_GRAY}} 
        className="rounded-md flex flex-col w-full"
        >
            <ChartHeader />

            <Chart 
            // @ts-ignore
            options={options}
            series={series}
            type="bar"
            />

        </div>
    )

}