import { ApexOptions } from "apexcharts";
import { GREEN_700, RED_500 } from "../../constants/classnames/classnames";
import { useMovimentationData } from "../useMovimentationData/useMovimentationData"

const monthNames = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export const useChartSeries = () => {
    const { getInputData, getOutputData } = useMovimentationData();
    
    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                mounted: (chart: any) => {
                    chart.windowResizeHandler();
                }
            },
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true
            }
        },
        colors: [RED_500, GREEN_700],
        xaxis: {
            categories: monthNames,
            type: 'category',
        },
        yaxis: {
            min: 0,
            max: 1000,
            tickAmount: 8,
            labels: {
                formatter: function (val: number) {
                    if (val >= 1000) {
                        return `R$${(val / 1000).toFixed(0)}k`;
                    } else {
                        return `R$${val}`;
                    }
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 1,
        },
        legend: {
            position: "top",
            markers: {
                radius: 12,
                width: 8,
                height: 8,
            }
        },
       
    };

    const series = [
      {
          name: "Saída",
          data: monthNames.map((_, index) => {
              const item = getOutputData().find(d => d.month === index);
              return item ? item.total : null;
          })
      },
      {
          name: "Entrada",
          data: monthNames.map((_, index) => {
              const item = getInputData().find(d => d.month === index);
              return item ? item.total : null;
          })
      }
  ];

    return {
        series,
        options,
    };
};