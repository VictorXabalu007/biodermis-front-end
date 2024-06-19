import { Progress } from "antd"
import { ProgressProps } from "antd/lib";



type ProgressCardPercentualProps = {


    percent: number,
    strokeColor: ProgressProps['strokeColor'],
}



export const ProgressCardPercentual = ({percent, strokeColor}:ProgressCardPercentualProps) => {

    return (
        <>

            <Progress 
            style={{background: '#FFF', borderRadius: '100%'}}
            type="circle"
            percent={parseFloat(percent.toFixed(2))} 
            strokeColor={strokeColor} 
            strokeWidth={12}
            format={(percent) => (
                <span className="text-black font-bold text-[20px]">{percent}%</span>
            )}

         
         />

        </>
    )

}