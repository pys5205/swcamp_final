import React from 'react'
import Chart from "react-apexcharts";

export default class memavilchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
   const current = decodeURI(window.location.href);
   // console.log(current.split('/')[4])
   const system = current.split('/')[4];
   const interval = setInterval(async () => {
  fetch("/detail/memory", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system':system
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
                      isLoaded: true,
                     data : json
                    })
                  }
      });
   }, 2000);
    return () => clearInterval(interval);
  }
  render() {
    // console.log(this.state.data);
    const Data = this.state.data;
    // console.log(test);
    return(
            <Chart
             type='area'
             height="200"
              series={ [
                { name: "mem_avail",
                  data: Data.mem_avail ,
                },
                ]} 
            options={{
                legend: {
                  position: 'top',
                  horizontalAlign: 'left'
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
                xaxis: {
                type: "datetime",
                  categories: Data.ts_create
                },
            }}
            />

    )
  }
}