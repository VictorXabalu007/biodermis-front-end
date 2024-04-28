import { GREEN_700, RED_500 } from "../../../../../constants/classnames/classnames";



export const options = {

    chart: {
      width: '0',
      events: {
        mounted: (chart:any) => {
          chart.windowResizeHandler();
        }
      }
    },

    colors:[RED_500, GREEN_700],

    xaxis: {
        categories: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    },
    yaxis: {

        min: 0,
        max: 200000,
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
        width: 5,
        colors: ['transparent'],
    },

    legend: {
        
        
        position: "top",
        
        markers: {
            radius: 12,
            width: 8,
            height: 8,
        }
    }
    


  };