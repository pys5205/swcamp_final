import React from 'react'
import './memChart.css'
import Chart from "react-apexcharts";

// import * as dfd from "danfojs";

// function createData(ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create  ) {
//     return {ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create };
//     }
// var test = [];

export default class memchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
  fetch("/memory", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
       if (json === undefined) {
                    alert("오류");
                  } else {
                  //////////////////////////////////여기부터보자
                  console.log(json);
                    this.setState({
                      isLoaded: true,
                     data : json
                    })
                  }
      });
  }
  render() {
    console.log(this.state.data);
    const Data = this.state.data;
    return(
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
             type="line"
            series={ [
                { name: "memory_total",
                  data: Data.mem_total,
                },
                ]} 
            options={{    
                chart : {
                    height: 200,
                    width: 200,                    
                },
                 stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
                    curve: "smooth",
                    width: 3,
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
                grid: { //격자 없앰
                    show:false,
                },
                xaxis: {
                  type: "datetime",
                  categories: Data.ts_create
                }
            }}
            />
          </div>
          <div className="mixed-chart">
            <Chart
             type="line"
            series={ [
                { name: "mem_used",
                  data: Data.mem_used,
                },
                ]} 
            options={{    
                chart : {
                    height: 200,
                    width: 200,                    
                },
                 stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
                    curve: "smooth",
                    width: 3,
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
                grid: { //격자 없앰
                    show:false,
                },
                xaxis: {
                  type: "datetime",
                  categories: Data.ts_create
                }
            }}
            />
          </div>
          
        </div>
      </div>
    )
  }
}