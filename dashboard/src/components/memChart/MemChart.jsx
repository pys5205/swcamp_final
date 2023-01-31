import React from 'react'
import './memChart.css'
import Chart from "react-apexcharts";
import Loding from '../main/loding';
// import * as dfd from "danfojs";

// function createData(ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create  ) {
//     return {ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create };
//     }
// var test = [];

export default class memchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      data: []
    };
  }

  componentDidMount() {
    const current = decodeURI(window.location.href);
    // console.log(current.split('/')[4])
    const system = current.split('/')[4];
    const interval = setInterval(async () => {
      fetch("/memory", {
        method: "post", //통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          'system': system
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === undefined) {
            alert("오류");
          } else {
            //////////////////////////////////여기부터보자
            // console.log(json);
            this.setState({
              isLoaded: false,
              data: json
            })
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }
  render() {
    // console.log(this.state.data);
    const Data = this.state.data;
    const test = Data.server_memory;
    // console.log(test);
    return (
      <>
      {this.state.isLoaded ? 
    <Loding /> :
      <Chart
        type="pie"
        height="250"
        series={test}
        options={{
          labels: ['사용중', '빈공간', '버퍼', '캐시']
        }}
      />
      }
      </>
    )
  }
}