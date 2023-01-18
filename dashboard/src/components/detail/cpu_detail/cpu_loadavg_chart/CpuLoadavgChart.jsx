import React from 'react'
import Chart from "react-apexcharts";

// import * as dfd from "danfojs";

// function createData(ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create  ) {
//     return {ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create };
//     }
// var test = [];

export default class detailcpuavg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
  fetch("/server", { 
      method: "post", //통신방법햣
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system' : server
      }
        ),
    })
      .then((res) => res.json())
      .then((json) => {
       if (json === undefined) {
                    alert("오류");
                  } else {
                  //////////////////////////////////여기부터보자
                  // console.log(json);
                    this.setState({
                      isLoaded: true,
                     data : json
                    })
                  }
      });
  }
  render() {
    
    // console.log(this.state.data);
    const Data = this.state.data;
    //console.log(Data);
    return(
            <Chart
            type= 'area'
            height= "200"
            series={ [
                { name: "cpu_loadavg1",
                  data: Data.cpu_loadavg_1,
                },
                {name: "cpu_loadavg5",
                  data: Data.cpu_loadavg_5,
                },
                {name: "cpu_loadavg15",
                  data: Data.cpu_loadavg_15,
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
                colors: ['#008FFB', '#00E396', '#808080'],
                xaxis: {
                type: "datetime",
                  categories: Data.ts_create
                },
            }}
            />
    )
  }
}