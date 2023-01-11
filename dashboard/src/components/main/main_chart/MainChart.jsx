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
  
 componentDidMount(){

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
                     data : json
                    })
                  }
      });
  }
  render() {
    const Data = this.state.data;
    console.log(Data);
    const content=(
          <div className="divTableRow">
            <div className="divTableCell">{Data.procs_username}</div> 
            <div className="divTableCell">{Data.procs_name}</div> 
            <div className="divTableCell">{Data.procs_pid}</div>
            <div className="divTableCell">{Data.procs_ppid}</div>
            <div className="divTableCell">{Data.procs_status}</div>
            <div className="divTableCell">{Data.procs_mem_full_uss}</div>
            <div className="divTableCell">{Data.ts_create}</div>
          </div> 
    );
    return(
            <Chart
             type="bar"
            series={ [
                { name: "os",
                  data: Data.cnt_os,
                },
                ]} 
            options={{    
                plotOptions: {
                bar: {
                borderRadius: 4,
                horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: Data.os
                }
            }}
            />
        
    )

  }
}