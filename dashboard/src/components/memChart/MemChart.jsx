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
    const test = Data.server_memory;
    // console.log(test);
    return(
      <div className="app">
        <div className="row">
          <div className="donut">
            <Chart
             type="pie"
              series={test } 
            options={{
                labels: ['mem_used', 'mem_free', 'mem_buffer', 'mem_cached']
            }}
            width ="380"
            />
          </div>
        </div>
      </div>
    )
  }
}