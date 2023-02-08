import React from 'react'
import './mainChart.css'
import Chart from "react-apexcharts";

// import * as dfd from "danfojs";

// function createData(ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create  ) {
//     return {ts_insert, system, cpu_per, cpu_sys, cpu_user, cpu_wait, cpu_irq, cpu_softirq, cpu_loadavg_1,cpu_loadavg_5, cpu_loadavg_15, ts_create };
//     }
// var test = [];


export default class mainchart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const interval = setInterval(async () => {
      fetch("/list/os", {
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
            // console.log(json);
            this.setState({
              isLoaded: true,
              data: json
            })
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }
  render() {
    const Data = this.state.data;
    // console.log(Data.cnt_os);
    return (
      <Chart
        type='bar'
        series={[
          {
            name: "cnt_os",
            data: Data.cnt_os,
          },
        ]}
        options={{
          xaxis: {
            categories: Data.os,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
        }}
      />

    )

  }
}