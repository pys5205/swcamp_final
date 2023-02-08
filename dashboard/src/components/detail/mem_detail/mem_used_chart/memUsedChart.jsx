import React from 'react'
import Chart from "react-apexcharts";
import Loding from '../../../main/loding'
export default class memusedchart extends React.Component {
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
      fetch("/detail/memory", {
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
    // console.log(test);
    return (
      <>
        {this.state.isLoaded ?
          <Loding /> :
          <Chart
            type='area'
            height="200"
            series={[
              {
                name: "mem_used",
                data: Data.mem_used,
              },
            ]}
            options={{
            colors:['#6567aa'],
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
                categories: Data.ts_create,
                labels: { show: false },
                range: 20,
              },
            }}
          />
        }
      </>

    )
  }
}