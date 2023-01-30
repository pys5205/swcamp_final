import React from 'react'
import Chart from "react-apexcharts";

export default class Cpucha extends React.Component {
    render() {
    console.log(this.props.data);
    const Data = this.props.text;
    // console.log(Data);
    return (
        <Chart
            type= 'line'
            height= "200"
            series={ [
                { name: "cpu_irq",
                  data: Data.cpu_irq,
                },
                {name: "cpu_softirq",
                  data: Data.cpu_softirq,
                },
                ]} 
            options={{    
                chart : {
                    stacked: true,
                },
                 stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
                    curve: "smooth",
                },
                legend: {
                  position: 'top',
                  horizontalAlign: 'left'
                },
                
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
                grid: { //격자 없앰
                    show:false,
                },
                colors: ['#008FFB', '#00E396'],
                xaxis: {
                  categories: Data.ts_create,
                  labels: { show: false },
                  range:20,
                },
            }}
            />
        )
    }
}